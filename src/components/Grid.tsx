import * as React from 'react';

import Cell from './Cell';

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
  let bombs: Array<[number, number]>;
  bombs = [];
  for(let i = 0; i < numBombs; i++) {
    let duplicate: boolean = false;
    // initialize random x and y
    let x: number = Math.floor(Math.random() * size[0]);
    let y: number = Math.floor(Math.random() * size[1]);
    // check if there is a bomb already there
    if (bombs.some(elem => elem === [x,y])) {
      duplicate = true;
    }
    // loop until a non duplicate bomb location has been found
    while (duplicate) {
      x = Math.floor(Math.random() * size[0]);
      y = Math.floor(Math.random() * size[1]);
      if (bombs.some(elem => elem === [x,y])) {
        duplicate = true;
      }
    }
    bombs.push([x,y]);
  }

  let cells: Cell[][];
  cells = [];

  // populate actual cell matrix
  for(let i = 0; i < size[0]; i++) {
    let row: Cell[];
    row = [];
    for(let j = 0; j < size[1]; j++) {
      if (bombs.some(elem => elem === [i,j])) {
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
              <Cell hasBomb={false}/>
            ))}
          </div>
        ))}
      </div>

    );
  }
}
export default Grid;
