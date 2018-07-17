import * as React from 'react';

import '../styles/Cell.css';

interface ICellProps {
  hasBomb: boolean;
}

interface ICellState {
  isFlagged: boolean;
  isOpened: boolean;
}

class Cell extends React.Component<ICellProps, ICellState> {

  constructor(props: ICellProps) {
    super(props);
    this.state = {
      isFlagged: false,
      isOpened: false
    }

    this.onClick = this.onClick.bind(this);
    this.openCell = this.openCell.bind(this);
  }

  public openCell() {
    this.setState({
      isFlagged: false,
      isOpened: true,
    });
  }

  public onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      // if user tried to open flagged cell
      if (!this.state.isFlagged && !this.state.isOpened) {
        this.openCell()
        this.setState({
          isFlagged: false,
          isOpened: true,
        });
      }
    } else if (e.type === 'contextmenu') {
      // if user tried to open flagged cell
      if (!this.state.isFlagged && !this.state.isOpened) {
        this.setState({
          isFlagged: true,
          isOpened: false,
        });
      }
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
          {}
        </button>
    );
  }
}

export default Cell;
