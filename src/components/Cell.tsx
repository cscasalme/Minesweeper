import * as React from 'react';

import '../styles/Cell.css';

interface ICellProps {
  hasBomb: boolean;
}

interface ICellState {
  hasExploded: boolean;
  isFlagged: boolean;
  isOpened: boolean;
}

class Cell extends React.Component<ICellProps, ICellState> {

  constructor(props: ICellProps) {
    super(props);
    this.state = {
      hasExploded: false,
      isFlagged: false,
      isOpened: false,
    }

    this.onClick = this.onClick.bind(this);
  }

  public onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      // if user tried to open bomb
      if (this.props.hasBomb && !this.state.isOpened) {
        this.setState({
          hasExploded: true,
          isFlagged: false,
          isOpened: true,
        });
      } else if (!this.state.isFlagged && !this.state.isOpened) {
        this.setState({
          hasExploded: false,
          isFlagged: false,
          isOpened: true,
        });
      }
    } else if (e.type === 'contextmenu') {
      // if user tried to open flagged cell
      if (!this.state.isFlagged && !this.state.isOpened) {
        this.setState({
          hasExploded: false,
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
    } else if (this.state.hasExploded) {
      className = "cell-explode"
    } else if (this.state.isOpened) {
      className = "cell-open"
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
