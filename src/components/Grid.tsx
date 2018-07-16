import * as React from 'react';

import Cell from './components/Cell';
import Position from './components/Position'

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

    };

  }

  function createBoard(size: [number, number], numBombs: number): Cell {
    // populate bombs array with random locations in grid
    for ()

  }

  public render() {
    return (

    );
  }
}

export default Grid;
