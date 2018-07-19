import * as React from 'react';

import '../styles/Cell.css';

interface ICellProps {
  column: number;
  hasBomb: boolean;
  hasExploded: boolean;
  isFlagged: boolean;
  isOpened: boolean;
  onValueChange: any;
  numMinesAround: number;
  row: number;
}

class Cell extends React.Component<ICellProps, any> {

  constructor(props: ICellProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public onClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      this.props.onValueChange(this.props, "left");
    } else if (e.type === 'contextmenu') {
      e.preventDefault()
      this.props.onValueChange(this.props, "right");
    }
  }

  public render() {

    let className: string;
    // check what kind of cell should be rendered
    if (this.props.isFlagged) {
      className = "cell-flag";
    } else if (this.props.hasExploded) {
      className = "cell-explode";
    } else if (this.props.isOpened) {
      className = "cell-open";
    } else {
      className = "cell-closed";
    }

    return (
        <button
          className={className}
          onClick={this.onClick}
          onContextMenu={this.onClick}
        >
         { this.props.isOpened === true && this.props.numMinesAround !== 0 ? this.props.numMinesAround: ""}
        </button>
    );
  }
}

export default Cell;
