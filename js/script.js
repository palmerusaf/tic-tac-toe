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
  let _cells = [];

  const _initCellArray = () => {
    for (let rowIndex = 0; rowIndex < _GRID_SIZE; rowIndex++)
      for (let columnIndex = 0; columnIndex < _GRID_SIZE; ++columnIndex)
        _cells.push(BoardCell(rowIndex, columnIndex));
    return _cells;
  };
  _cells = _initCellArray();

  const _getCell = (rowIndex, columnIndex) =>
    _cells.filter(
      (cell) =>
        (cell.getRowIndex() === rowIndex) &
        (cell.getColumnIndex() === columnIndex)
    )[0];

  const setCellContent = (rowIndex, columnIndex, mark) =>
    _getCell(rowIndex, columnIndex).setContent(mark);

  const getCellContent = (rowIndex, columnIndex) =>
    _getCell(rowIndex, columnIndex).getContent();

  const isCellInBackDiagonal = (rowIndex, columnIndex) =>
    rowIndex === columnIndex;

  const isCellInForwardDiagonal = (rowIndex, columnIndex) =>
    rowIndex + columnIndex === _GRID_SIZE - 1;

  const resetArray = () => {
    _cells.forEach((cell) => cell.resetCell());
  };

  return {
    resetArray,
    isCellInBackDiagonal,
    isCellInForwardDiagonal,
    setCellContent,
    getCellContent,
  };
})();
// GameBoard Tests
{
  /*
  console.log("resetArray() tests");
  GameBoard.cells[1].setContent("X");
  GameBoard.cells.forEach((cell) => console.log(cell.getIsPlayed()));
  GameBoard.resetArray();
  GameBoard.cells.forEach((cell) => console.log(cell.getIsPlayed()));
  //*/
  /*
  console.log("getRowContent tests"); /*
  //*/
  /*
  console.log("getColumnContent tests");
  //*/
  /*
  console.log("isCellInForwardDiagonal tests");
  console.log(GameBoard.isCellInForwardDiagonal(0, 2));
  console.log(GameBoard.isCellInForwardDiagonal(1, 1));
  console.log(GameBoard.isCellInForwardDiagonal(2, 0));
  console.log(GameBoard.isCellInForwardDiagonal(2, 1));
  //*/
  /*
  console.log("isCellInBackDiagonal tests");
  console.log(GameBoard.isCellInBackDiagonal(0, 0));
  console.log(GameBoard.isCellInBackDiagonal(1, 1));
  console.log(GameBoard.isCellInBackDiagonal(2, 2));
  console.log(GameBoard.isCellInBackDiagonal(1, 2));
  //*/
  /*
  console.log("getForwardDiagonalContent tests");
  //*/
  /*
  console.log("getBackDiagonalContent tests");
  //*/
  /*
  console.log("get/setCellContent tests");
  GameBoard.setCellContent(1, 1, "X");
  console.log(GameBoard.getCellContent(1, 1));
  console.log(GameBoard.getCellContent(1, 0));
  //*/
}
