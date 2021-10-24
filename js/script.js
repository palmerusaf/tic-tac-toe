"use strict";

// create game board cells for gameboard array
const BoardCell = function (rowIndex, columnIndex) {
  const _rowIndex = rowIndex;
  const _columnIndex = columnIndex;
  let _isPlayed = false;
  let _playersMark = "";
  const getRowIndex = () => _rowIndex;
  const getColumnIndex = () => _columnIndex;
  const getIsPlayed = () => _isPlayed;
  const setPlayersMark = function (mark) {
    if (_isPlayed) return console.log("Cell already played.");
    if (mark !== "X" && mark !== "O")
      return console.log("Error: Invalid mark.");
    _playersMark = mark;
    _isPlayed = true;
  };
  const resetCell = function () {
    _isPlayed = false;
    _playersMark = "";
  };
  const getPlayersMark = () => _playersMark;
  return {
    getRowIndex,
    getColumnIndex,
    getIsPlayed,
    setPlayersMark,
    getPlayersMark,
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
console.log(nc.resetCell());
console.log(nc.getIsPlayed());
console.log(nc.getPlayersMark());
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
return {cells};
})();
console.log(GameBoard.cells);