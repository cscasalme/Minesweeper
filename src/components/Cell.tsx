import * as React from 'react';

type CellProps {
  hasBomb: boolean
}

type CellState {
  isOpened: boolean
  isFlagged: boolean
}

class Cell extends React.Component<CellProps, CellState> {

  constructor(props: CellProps) {
    super(props);
    this.state = {
      isOpened: false,
      isFlagged: false
    }
  }

   onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      alert('Left click');
    } else if (e.type === 'contextmenu') {
      alert('Right click');
    }
  }

  public render() {

    var className: string;
    // check what kind of cell should be rendered
    if (this.state.isFlagged) {
      className = "cell-flag"
    } else if (this.state.isOpened) {
      className = "cell-open"
    } else if (this.props.hasBomb && this.state.isOpened) {
      className = "cell-explode"
    } else {
      className = "cell-closed"
    }

    return (
        <button
          className={className}
          onClick={this.onClick}
        >
          {"click me"}
        </button>
    );
  }
}

export default Cell;
