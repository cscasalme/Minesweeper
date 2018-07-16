import * as React from 'react';

type CellProps {
}

type CellState {
  isOpened: boolean
  isBomb: boolean
  isFlagged: boolean
}

class Cell extends React.Component<CellProps> {

  constructor(props: CellProps) {
    super(props);
    this.state = {
      isOpened: false,
      isBomb: false,
      isFlagged: false
    }
  }

  private handleClick(e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.type === 'click') {
      console.log('Left click');
    } else if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  public render() {

    var className: string = ""
    // check what kind of cell should be rendered
    if (this.isflagged == true) {
      className = cell-flag
    } else if (this.isOpened == true) {
      className = cell-open
    } else if (this.isBomb == true && this.isOpened == true) {
      className = cell-explode
    }

    return (
        <button
          className={className}
          onClick={this.handleClick}
        >
          {"click me"}
        </button>
    );
  }
}

export default Cell;
