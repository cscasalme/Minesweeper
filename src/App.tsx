import * as React from 'react';
import './styles/App.css';

import Grid from './components/Grid';
import Menu from './components/Menu';

import logo from './assets/logo.svg';

class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="menu" >
          <Menu header={"Grid Size"} items={ ["6x6 grid and 5 bombs",
                                              "8x8 grid and 10 bombs",
                                              "16x16 grid and 40 bombs",
                                              "24x24 grid and 99 bombs"]} selection={"None"}/>
        </div>
        <div className="grid" >
          <Grid numBombs={5} size={[6,6]}/>
        </div>
      </div>
    );
  }
}

export default App;
