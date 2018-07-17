import * as React from 'react';

import Cell from './Cell';
import Position from './Position';

interface IGridProps {
  numBombs: number;
  size: [number, number];
}

interface IGridState {
  cells: Cell[][];
  numBombsLeft: number;
}

// Helper Function
function createBoard(size: [number, number], numBombs: number): Cell[][] {
  // populate bombs array with random locations in grid
  let bombs: Position[];
  bombs = [];
  for(let i = 0; i < numBombs; i++) {
    let duplicate: boolean = false;
    // initialize random x and y
    const x: number = Math.floor(Math.random() * size[0]);
    const y: number = Math.floor(Math.random() * size[1]);
    const pos: Position = new Position(x, y);
    // check if there is a bomb already there
    if (bombs.some(elem => elem === pos)) {
      duplicate = true;
    }
    // loop until a non duplicate bomb location has been found
    while (duplicate) {
      const newx: number = Math.floor(Math.random() * size[0] + 1);
      const newy: number = Math.floor(Math.random() * size[1] + 1);
      const newpos: Position = new Position(newx, newy);
      // check if there is a bomb already there
      if (bombs.some(elem => elem.x === newpos.x && elem.y === newpos.y)) {
        duplicate = true;
      }
    }

    bombs.push(pos);
  }

  let cells: Cell[][];
  cells = [];

  let s: number = 0
  // populate actual cell matrix
  for(let i = 0; i < size[0]; i++) {
    let row: Cell[];
    row = [];
    for(let j = 0; j < size[1]; j++) {
      const pos: Position = new Position(i, j);
      if (bombs.some(elem => elem.x === pos.x && elem.y === pos.y)) {
        s = s+1;
        row.push(new Cell({ hasBomb: true}));
      } else {
        row.push(new Cell({ hasBomb: false}));
      }
    }
    cells.push(row);
  }
  return cells;
}

class Grid extends React.Component<IGridProps, IGridState> {

  constructor(props: IGridProps) {
    super(props);
    this.state = {
      cells: createBoard(this.props.size, this.props.numBombs),
      numBombsLeft: this.props.numBombs
    };
  }

  public onClick(e: React.MouseEvent<HTMLButtonElement>) {
     if (e.type === 'click') {
       alert('Left click');
     } else if (e.type === 'contextmenu') {
       alert('Right click');
     }
  }

  public render() {
    return (
      <div className="grid">
        {this.state.cells.map((row, i) => (
          <div key={i} className="row">
            {row.map(cell => (
              <Cell hasBomb={cell.props.hasBomb}/>
            ))}
          </div>
        ))}
      </div>

    );
  }
}
export default Grid;
