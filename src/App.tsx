import * as React from 'react';
import './styles/App.css';

import Cell from './components/Cell';
// import Grid from './components/Grid';
import Menu from './components/Menu';
import Position from './components/Position';

import logo from './assets/regular_shibe.png';

interface IAppState {
  columns: number;
  grid: Cell[][];
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
      grid: createBoard([6,6],5),
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
      grid: createBoard([this.state.rows,this.state.columns],newBombs),
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
        grid: createBoard([newRows,prevState.columns],prevState.numBombs),
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
        grid: createBoard([prevState.rows,newCols],prevState.numBombs),
        numBombs: prevState.numBombs,
        numFlags: prevState.numFlags,
        numOpened: prevState.numOpened,
        rows: prevState.rows,
      }
    });
  }

  public render() {
    alert(this.state.grid.length)
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
          <div className="grid">
            {this.state.grid.map((row, x) => (
              <div key={x.toString()} className="row">
                {row.map((cell, y) => (
                  <Cell key={x.toString() + y.toString()} hasBomb={cell.props.hasBomb}/>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function createBoard(size: [number, number], numBombs: number): Cell[][] {
  // populate bombs array with random locations in grid
  let bombs: Position[];
  bombs = [];
  for(let i = 0; i < numBombs; i++) {
    let duplicate: boolean = false;
    // initialize random x and y
    const x: number = Math.floor(Math.random() * size[0]);
    const y: number = Math.floor(Math.random() * size[1]);
    const pos: Position = new Position(x, y);
    // check if there is a bomb already there
    if (bombs.some(elem => elem === pos)) {
      duplicate = true;
    }
    // loop until a non duplicate bomb location has been found
    while (duplicate) {
      const newx: number = Math.floor(Math.random() * size[0] + 1);
      const newy: number = Math.floor(Math.random() * size[1] + 1);
      const newpos: Position = new Position(newx, newy);
      // check if there is a bomb already there
      if (bombs.some(elem => elem.x === newpos.x && elem.y === newpos.y)) {
        duplicate = true;
      }
    }
    bombs.push(pos);
  }

  let cells: Cell[][];
  cells = [];

  // populate actual cell matrix
  for(let i = 0; i < size[0]; i++) {
    let row: Cell[];
    row = [];
    for(let j = 0; j < size[1]; j++) {
      const pos: Position = new Position(i, j);
      if (bombs.some(elem => elem.x === pos.x && elem.y === pos.y)) {
        row.push(new Cell({ hasBomb: true}));
      } else {
        row.push(new Cell({ hasBomb: false}));
      }
    }
    cells.push(row);
  }
  return cells;
}

export default App;
