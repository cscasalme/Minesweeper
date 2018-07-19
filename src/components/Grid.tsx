import * as React from 'react';

import Cell from './Cell';
import Position from './Position';

interface IGridProps {
  columns: number;
  numBombs: number;
  onValueChange: any;
  rows: number;
}

interface IGridState {
  cells: Cell[][];
  numFlags: number;
  numOpened: number;
}

class Grid extends React.Component<IGridProps, IGridState> {

  constructor(props: IGridProps) {
    super(props);

    this.state = {
      cells: this.createBoard([this.props.rows, this.props.columns], this.props.numBombs),
      numFlags: 0,
      numOpened: 0,
    };

    this.createBoard = this.createBoard.bind(this);
    this.cellClick = this.cellClick.bind(this);
    this.isValidPosition = this.isValidPosition.bind(this);
    this.numOpened = this.numOpened.bind(this);
  }

  public numOpened() {
    const newCells = this.state.cells;
    let num: number = 0;
    for(let i = 0; i < this.props.rows; i++) {
      for(let j = 0; j < this.props.columns; j++) {
        const cell: Cell = newCells[i][j];
        if (cell.props.isOpened) {
          num = num + 1;
        }
      }
    }
    return num;
  }

  public isValidPosition(row: number, column: number) {
    if (row < 0 || column < 0 || row >= this.props.rows || column >= this.props.columns) {
      return false;
    } else {
      return true;
    }
  }

  public cellClick(props: any, type: string) {
    const newCells = this.state.cells;
    if (type === 'continue') {
      if (!props.hasBomb && !props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: oldCell.props.isFlagged,
                                                      isOpened: true,
                                                      numMinesAround: oldCell.props.numMinesAround,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
        this.setState({
          cells: newCells,
          numFlags: this.state.numFlags,
          numOpened: this.state.numOpened + 1,
        });
        if (props.numMinesAround === 0 ) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i !== 0 || j !== 0) {
                const newRow: number = props.row + i;
                const newColumn: number = props.column + j;
                if (this.isValidPosition(newRow, newColumn)) {
                  this.cellClick(newCells[newRow][newColumn].props, "continue");
                }
              }
            }
          }
        }
      }
    } else if (type === 'left') {
      // Do not allow the user to open a flagged cell
      // If cell is unflagged and has bomb, then it explodes
      if (props.hasBomb && !props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: true,
                                                      hasExploded: true,
                                                      isFlagged: oldCell.props.isFlagged,
                                                      isOpened: true,
                                                      numMinesAround: oldCell.props.numMinesAround,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
        this.setState({
          cells: newCells,
          numFlags: this.state.numFlags,
        });
        this.props.onValueChange("defeat")
      } else if (!props.hasBomb && !props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: oldCell.props.isFlagged,
                                                      isOpened: true,
                                                      numMinesAround: oldCell.props.numMinesAround,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})

        this.setState({
          cells: newCells,
          numFlags: this.state.numFlags,
        });
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i !== 0 || j !== 0) {
              const newRow: number = props.row + i;
              const newColumn: number = props.column + j;
              if (this.isValidPosition(newRow, newColumn)) {
                this.cellClick(newCells[newRow][newColumn].props, "continue");
              }
            }
          }
        }
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
                                                      numMinesAround: oldCell.props.numMinesAround,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
        this.setState({
          cells: newCells,
          numFlags: this.state.numFlags + 1,
        });
        const numOpen: number = this.numOpened();
        if ((this.props.rows * this.props.columns-1) === (numOpen + this.state.numFlags)) {
          this.props.onValueChange("victory")
        }
      } else if (props.isFlagged && !props.isOpened) {
        const oldCell: Cell = newCells[props.row][props.column]
        newCells[props.row][props.column] = new Cell({column: oldCell.props.column,
                                                      hasBomb: oldCell.props.hasBomb,
                                                      hasExploded: oldCell.props.hasExploded,
                                                      isFlagged: false,
                                                      isOpened: false,
                                                      numMinesAround: oldCell.props.numMinesAround,
                                                      onValueChange: this.cellClick,
                                                      row: oldCell.props.row})
        this.setState({
          cells: newCells,
          numFlags: this.state.numFlags - 1,
        });
      }
    }
  }

  public createBoard(size: [number, number], numBombs: number): Cell[][] {
    // populate bombs array with random locations in grid
    let bombs: Position[];
    bombs = [];
    while (bombs.length < numBombs) {
      // initialize random x and y
      const x: number = Math.floor(Math.random() * (size[0]));
      const y: number = Math.floor(Math.random() * (size[1]));
      const pos: Position = new Position(x, y);
      // check if there is a bomb already there
      if (!bombs.some(elem => elem.x === pos.x && elem.y === pos.y)) {
        bombs.push(pos);
      }
    }

    let numMinesArray: number[][];
    numMinesArray = [];

    // initialize numMinesArray to be 0
    for(let i = 0; i < size[0]; i++) {
      let row: number[];
      row = [];
      for(let j = 0; j < size[1]; j++) {
        row.push(0)
      }
      numMinesArray.push(row);
    }

    // iterate through bombs array setting the numMines array
    bombs.forEach((bomb) => {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i !== 0 || j !== 0) {
            const newX: number = bomb.x + i;
            const newY: number = bomb.y + j;
            if (newX >= 0 && newY >= 0 && newX < size[0] && newY < size[1]) {
              numMinesArray[newX][newY] = numMinesArray[newX][newY] + 1
            }
          }
        }
      }
    });

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
                   numMinesAround: numMinesArray[i][j],
                   onValueChange: this.cellClick,
                   row: i}));
        } else {
          row.push(new Cell({column: j,
                   hasBomb: false,
                   hasExploded: false,
                   isFlagged: false,
                   isOpened: false,
                   numMinesAround: numMinesArray[i][j],
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
                    numMinesAround={cell.props.numMinesAround}
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
