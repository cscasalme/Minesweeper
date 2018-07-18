import * as React from 'react';

import Cell from './Cell';
import Position from './Position';

interface IGridProps {
  columns: number;
  numBombs: number;
  rows: number;
}

interface IGridState {
  cells: Cell[][];
}

class Grid extends React.Component<IGridProps, IGridState> {

  constructor(props: IGridProps) {
    super(props);

    this.state = {
      cells: this.createBoard([this.props.rows, this.props.columns], this.props.numBombs)
    };

    this.createBoard = this.createBoard.bind(this);
    this.cellClick = this.cellClick.bind(this);
  }

  public cellClick(props: any, type: string) {
    const newCells = this.state.cells;

    if (type === 'left') {
      // Do not allow the user to open a flagged cell
      // If cell is unflagged and has bomb, then it explodes
      if (props.hasBomb && !props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: true,
                                                      hasExploded: true,
                                                      isFlagged: oldCell.props.isFlagged,
                                                      isOpened: true,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
      } else if (!props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: oldCell.props.isFlagged,
                                                      isOpened: true,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
      }
    } else if (type === 'right') {
      // If cell is unopened and has not been flagged, flag it
      // If the cell is flagged, then unflag it.
      if (!props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: true,
                                                      isOpened: oldCell.props.isFlagged,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
      } else if (props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: false,
                                                      isOpened: oldCell.props.isFlagged,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
      }
    }
    this.setState({
      cells: newCells,
    });
  }

  public createBoard(size: [number, number], numBombs: number): Cell[][] {
    // populate bombs array with random locations in grid
    let bombs: Position[];
    bombs = [];
    for(let i = 0; i < numBombs; i++) {
      let duplicate: boolean = false;
      // initialize random x and y
      const x: number = Math.floor(Math.random() * size[0]);
      const y: number = Math.floor(Math.random() * size[1]);
      let pos: Position = new Position(x, y);
      // check if there is a bomb already there
      if (bombs.some(elem => elem === pos)) {
        duplicate = true;
      }
      // loop until a non duplicate bomb location has been found
      while (duplicate) {
        const newx: number = Math.floor(Math.random() * size[0] + 1);
        const newy: number = Math.floor(Math.random() * size[1] + 1);
        pos = new Position(newx, newy);
        // check if there is a bomb already there
        if (bombs.some(elem => elem.x === pos.x && elem.y === pos.y)) {
          duplicate = true;
        }
      }
      bombs.push(pos);
    }

    let cells: Cell[][];
    cells = [];

    // populate actual cell matrix
    for(let i = 0; i < size[0]; i++) {
      let row: Cell[];
      row = [];
      for(let j = 0; j < size[1]; j++) {
        if (bombs.some(elem => elem.x === i && elem.y === j)) {
          row.push(new Cell({column: j,
                   hasBomb: true,
                   hasExploded: false,
                   isFlagged: false,
                   isOpened: false,
                   onValueChange: this.cellClick,
                   row: i}));
        } else {
          row.push(new Cell({column: j,
                   hasBomb: false,
                   hasExploded: false,
                   isFlagged: false,
                   isOpened: false,
                   onValueChange: this.cellClick,
                   row: i}));
        }
      }
      cells.push(row);
    }
    return cells;
  }

  public componentDidUpdate(prevProps: IGridProps) {
    if (prevProps.rows !== this.props.rows ||
        prevProps.columns !== this.props.columns ||
        prevProps.numBombs !== this.props.numBombs) {
      this.setState({
        cells: this.createBoard([this.props.rows, this.props.columns], this.props.numBombs)
      });
    }
  }

  public render() {
    return (
      <div className="grid">
        {this.state.cells.map((row, x) => (
          <div key={x.toString()} className="row">
            {row.map((cell, y) => (
              <Cell key={x.toString() + y.toString()}
                    column={y}
                    hasBomb={cell.props.hasBomb}
                    hasExploded={cell.props.hasExploded}
                    isFlagged={cell.props.isFlagged}
                    isOpened={cell.props.isOpened}
                    onValueChange={this.cellClick}
                    row={x}/>
            ))}
          </div>
        ))}
      </div>

    );
  }
}

export default Grid;
