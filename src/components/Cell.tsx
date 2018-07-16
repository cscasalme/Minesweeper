import * as React from 'react';

interface ICellProps {
  hasBomb: boolean
}

interface ICellState {
  isFlagged: boolean
  isOpened: boolean
}

class Cell extends React.Component<ICellProps, ICellState> {

  constructor(props: CellProps) {
    super(props);
    this.state = {
      isFlagged: false,
      isOpened: false
    }
  }

   private onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      alert('Left click');
    } else if (e.type === 'contextmenu') {
      alert('Right click');
    }
  }

  public render() {

    let className: string;
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
