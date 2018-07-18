import * as React from 'react';
import './styles/App.css';

import Cell from './components/Cell'
import Grid from './components/Grid';
import Helper from './components/Helper';
import Menu from './components/Menu';

import logo from './assets/regular_shibe.png';

interface IAppState {
  grid: Grid;
  height: number;
  numBombs: number;
  numFlags: number;
  numOpened: number;
  width: number;
}

class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      grid: new Grid({numBombs: 5, size: [6, 6]}),
      height: 6,
      numBombs: 5,
      numFlags: 0,
      numOpened: 0,
      width: 6,
    };

    this.updateWidthValue = this.updateWidthValue.bind(this);
  }

  public updateWidthValue(width: string) {
    let newWidth: number;
    if (width === "8") {
      newWidth = 8;
    } else if (width === "16") {
      newWidth = 16;
    } else if (width === "24") {
      newWidth = 24;
    } else {
      newWidth = 6;
    }
    this.setState({
      grid: new Grid({numBombs: this.state.numBombs, size: [newWidth, this.state.height]}),
      height: this.state.height,
      numBombs: this.state.numBombs,
      numFlags: this.state.numFlags,
      numOpened: this.state.numOpened,
      width: newWidth,
    });
  }

  public render() {
    alert("app")
    alert(this.state.width);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="regular_shibe" alt="logo" />
          <h1 className="App-title">Minesweeper</h1>
        </header>
        <div className="menu" >
          <Menu header={"Width"} items={ ["6","8","16","24"]} onValueChange={this.updateWidthValue}/>
          <Grid numBombs={this.state.numBombs} size={[this.state.width, this.state.height]}/>
        </div>
      </div>
    );
  }
}

export default App;
