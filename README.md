MINESWEEPER GAME
---------------------

CONTENTS OF THIS FILE
---------------------
  * Introduction
  * Instructions

INTRODUCTION
---------------------

Architecture of the app
-----------
The game is made up of 4 components.
App, Grid, Cell, and Menu.
Each of these components is its own object with different properties.

Cell represents each individual square in the minesweeper grid.
  props include:  column
                  hasBomb
                  hasExploded
                  isFlagged
                  isOpened
                  onValueChange
                  numMinesAround
                  row
  - Each cell is a button. When clicked, the cell sends info to the grid.
  - This info tells the grid to re-render the cell as a new one with different properties.

Grid is a matrix made up of unique cells
  props include:  columns
                  numBombs
                  onValueChange
                  rows

  - The grid also sends info to the App container regarding the status of the game.

Menu is a drop down menu of game options
  props include:  header
                  items
                  onValueChange
  - The menu is made up of buttons. When one of the options are clicked, the menu sends the App
    the game options chosen.

App is the container for all the rest of the components



Things that can be improved
---------------------------
One thing that can be improved is the User Interface. As I am new to typescript and React,
I couldn't improve upon this with the time I had.

Another thing that can be improved is the timer. The timer starts when the page is loaded.
I would eventually want to change it so that the timer started when a cell was opened.

INSTRUCTIONS
---------------------
To open a cell: left click
To flag a cell: right click

The game ends when you either click a bomb or flag all of the bombs!
