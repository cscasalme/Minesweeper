import * as React from 'react';

import Cell from './Cell';

type GridProps {
  numBombs: number;
  size: [number, number]
}

type GridState {
  cells: Cell[][];
  numBombsLeft: number;
}

class Grid extends React.Component<GridProps, GridState> {

  constructor(props: GridProps) {
    super(props);
    this.state = {
      numBombsLeft: this.props.numBombs,
      cells: createBoard(this.props.size, this.props.numBombs)
    };

  }

  function createBoard(size: [number, number], numBombs: number): Cell[][] {
    // populate bombs array with random locations in grid
    let bombs: Array<[number, number]> = [];
    for(let i = 0; i < numBombs; i++) {
      let duplicate: boolean = false;
      // initialize random x and y
      const x: number = Math.floor(Math.random() * size[0]);
      const y: number = Math.floor(Math.random() * size[1]);
      // check if there is a bomb already there
      if (bombs.some(x => x === [x,y])) {
        duplicate = true;
      }
      // loop until a non duplicate bomb location has been found
      while (duplicate) {
        const x: number = Math.floor(Math.random() * size[0]);
        const y: number = Math.floor(Math.random() * size[1]);
        if (bombs.some(elem => elem === [x,y])) {
          duplicate = true;
        }
      }
      bombs.push([x,y]);
    }

    let cells: Cell[][] = [];

    // populate actual cell matrix
    for(let i = 0; i < size[0]; i++) {
      let row: Cell[] = [];
      for(let j = 0; j < size[1]; j++) {
        if (bombs.includes([i,j])) {
          row.push(new Cell(true));
        } else {
          row.push(new Cell(false));
        }
      }
      cells.push(row);
    }

    return cells;

  }

  public render() {
    return (

    );
  }
}

export default Grid;
