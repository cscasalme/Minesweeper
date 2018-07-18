import * as React from 'react';

import Cell from './Cell';

interface IGridProps {
  cells: Cell[][];
  numBombs: number;
}

interface IGridState {
  numBombsLeft: number;
}

class Grid extends React.Component<IGridProps, IGridState> {

  constructor(props: IGridProps) {
    super(props);

    this.state = {
      numBombsLeft: this.props.numBombs,
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
    alert(this.props.cells.length);
    return (
      <div className="grid">
        {this.props.cells.map((row, x) => (
          <div key={x.toString()} className="row">
            {row.map((cell, y) => (
              <Cell key={x.toString() + y.toString()} hasBomb={cell.props.hasBomb}/>
            ))}
          </div>
        ))}
      </div>

    );
  }
}
export default Grid;
