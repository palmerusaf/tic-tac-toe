"use strict";

// create game board cells for gameboard array
const BoardCell = function (rowIndex, columnIndex) {
  const _rowIndex = rowIndex;
  const _columnIndex = columnIndex;
  let _isPlayed = false;
  let _content = "";

  const getRowIndex = () => _rowIndex;
  const getColumnIndex = () => _columnIndex;
  const getIsPlayed = () => _isPlayed;
  const setContent = function (mark) {
    if (_isPlayed) return console.log("Cell already played.");
    if (mark !== "X" && mark !== "O")
      return console.log("Error: Invalid mark.");
    _content = mark;
    _isPlayed = true;
  };
  const getContent = () => _content;
  const resetCell = () => {
    _isPlayed = false;
    _content = "";
  };

  return {
    getRowIndex,
    getColumnIndex,
    getIsPlayed,
    setContent,
    getContent,
    resetCell,
  };
};
// BoardCell tests
/*
const nc = BoardCell(0, 1);
console.log(nc.getRowIndex());
console.log(nc.getColumnIndex());
console.log(nc.getIsPlayed());
console.log(nc.setPlayersMark("z"));
console.log(nc.setPlayersMark("X"));
console.log(nc.getIsPlayed());
console.log(nc.getPlayersMark());
console.log(nc.setPlayersMark("O"));
//*/

//gameboard module handles all gameboard data and initialization
const GameBoard = (() => {
  const _GRID_SIZE = 3;
  let cells = [];
  const _initCellArray = () => {
    for (let rowIndex = 0; rowIndex < _GRID_SIZE; rowIndex++)
      for (let columnIndex = 0; columnIndex < _GRID_SIZE; ++columnIndex)
        cells.push(BoardCell(rowIndex, columnIndex));
    return cells;
  };
  cells = _initCellArray();

  const resetArray = () => {
    cells.forEach((cell) => cell.resetCell());
  };

  return { cells, resetArray };
})();
// GameBoard Tests
//*
GameBoard.cells[1].setContent("X");
GameBoard.cells.forEach((cell) => console.log(cell.getIsPlayed()));
GameBoard.resetArray();
GameBoard.cells.forEach((cell) => console.log(cell.getIsPlayed()));
//*/
