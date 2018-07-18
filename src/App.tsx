import * as React from 'react';

import './styles/App.css';

import Grid from './components/Grid';
import Menu from './components/Menu';

import logo from './assets/regular_shibe.png';

interface IAppState {
  columns: number;
  grid: Grid;
  numBombs: number;
  numFlags: number;
  numOpened: number;
  rows: number;
}

class App extends React.Component<any, IAppState> {

  constructor(props: any) {
    super(props);

    this.state = {
      columns: 6,
      grid: new Grid({columns: 6, numBombs: 5, rows: 6}),
      numBombs: 5,
      numFlags: 0,
      numOpened: 0,
      rows: 6,
    };
    this.updateBombsValue = this.updateBombsValue.bind(this);
    this.updateRowValue = this.updateRowValue.bind(this);
    this.updateColValue = this.updateColValue.bind(this);
  }

  public updateBombsValue(bombs: string) {
    let newBombs: number;
    if (bombs === "10") {
      newBombs = 10;
    } else if (bombs === "30") {
      newBombs = 30;
    } else {
      newBombs = 5;
    }
    this.setState({
      columns: this.state.columns,
      grid: new Grid({columns: this.state.columns, numBombs: newBombs, rows: this.state.rows}),
      numBombs: newBombs,
      numFlags: this.state.numFlags,
      numOpened: this.state.numOpened,
      rows: this.state.rows,
    });
  }

  public updateRowValue(rows: string) {
    let newRows: number;
    if (rows === "8") {
      newRows = 8;
    } else if (rows === "10") {
      newRows = 10;
    } else {
      newRows = 6;
    }
    this.setState((prevState, props) => {
      return {
        columns: prevState.columns,
        grid: new Grid({columns: this.state.columns, numBombs: this.state.numBombs, rows: newRows}),
        numBombs: prevState.numBombs,
        numFlags: prevState.numFlags,
        numOpened: prevState.numOpened,
        rows: newRows,
      }
    });
  }

  public updateColValue(cols: string) {
    let newCols: number;
    if (cols === "8") {
      newCols = 8;
    } else if (cols === "10") {
      newCols = 10;
    } else {
      newCols = 6;
    }
    this.setState((prevState, props) => {
      return {
        columns: newCols,
        grid: new Grid({columns: newCols, numBombs: this.state.numBombs, rows: this.state.rows}),
        numBombs: prevState.numBombs,
        numFlags: prevState.numFlags,
        numOpened: prevState.numOpened,
        rows: prevState.rows,
      }
    });
  }

  public render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="regular_shibe" alt="logo" />
          <h1 className="App-title">Minesweeper</h1>
        </header>
        <div className="menu" >
          <Menu header={"Rows"} items={ ["6","8","10"]} onValueChange={this.updateRowValue}/>
          <Menu header={"Columns"} items={ ["6","8","10"]} onValueChange={this.updateColValue}/>
          <Menu header={"Bombs"} items={ ["5","10","30"]} onValueChange={this.updateBombsValue}/>
          <Grid columns={this.state.columns} numBombs={this.state.numBombs} rows={this.state.rows}/>
        </div>
      </div>
    );
  }
}

export default App;
