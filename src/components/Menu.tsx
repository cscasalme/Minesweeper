import * as React from 'react';

import '../styles/Menu.css';

interface IMenuProps {
  header: string;
  items: string[];
  onValueChange: any;
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
    this.closeMenu = this.closeMenu.bind(this);
  }

  public menuClick(e: React.MouseEvent<HTMLButtonElement>) {
     if (e.type === 'click') {
       if (!this.state.isVisible) {
         this.setState({
           isVisible: true,
         });
         document.addEventListener('click', this.closeMenu);
       }
     }
  }

  public closeMenu() {
    this.setState({
      isVisible: false,
    });
    document.removeEventListener('click', this.closeMenu);
  }

  public render() {
    return (
      <div>
        <button className={"game-options"} onClick={this.menuClick}>{this.props.header}</button>
        {
          this.state.isVisible
            ? (
              <div>
                {this.props.items.map(item => (
                  <button key={this.props.header + item} className={"menu-button"}
                    onClick={this.props.onValueChange.bind(this,item)}
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
