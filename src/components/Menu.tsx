import * as React from 'react';

import '../styles/Menu.css';

interface IMenuProps {
  header: string;
  items: string[];
  selection: string;
}

interface IMenuState {
  isVisible: boolean;
}

class Menu extends React.Component<IMenuProps, IMenuState>  {

  constructor(props: IMenuProps) {
    super(props);
    this.state = {
      isVisible: false,
    };

    this.menuClick = this.menuClick.bind(this);
  }

  public menuClick(e: React.MouseEvent<HTMLButtonElement>) {
     if (e.type === 'click') {
       if (!this.state.isVisible) {
         this.setState({
           isVisible: true,
         });
       } else {
         this.setState({
           isVisible: false,
         });
       }
     }
  }

  public optionClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.type === 'click') {
      // if user tried to open flagged cell
      alert("hi");
    }
  }

  public render() {
    return (
      <div>
        <button className="game-options" onClick={this.menuClick}>{this.props.header}</button>
        {
          this.state.isVisible
            ? (
              <div className="menu">
                {this.props.items.map(item => (
                  <button className={"menu-button"}
                    onClick={this.optionClick}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}
export default Menu;
