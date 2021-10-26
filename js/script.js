"use strict";

// create game board cells for GameBoard array
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

// GameBoard module handles all data access and initialization
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
        cell.getRowIndex() === rowIndex && cell.getColumnIndex() === columnIndex
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

  const _getCellsWithProp = (propType, desiredProp) =>
    _cells.filter((cell) => {
      if (propType === "column") return cell.getColumnIndex() === desiredProp;
      if (propType === "row") return cell.getRowIndex() === desiredProp;
      if (propType === "forwardDiagonal")
        return isCellInForwardDiagonal(
          cell.getRowIndex(),
          cell.getColumnIndex()
        );
      if (propType === "backDiagonal")
        return isCellInBackDiagonal(cell.getRowIndex(), cell.getColumnIndex());
    });

  const getColumnContent = (columnIndex) =>
    _getCellsWithProp("column", columnIndex).map((cell) => cell.getContent());

  const getRowContent = (rowIndex) =>
    _getCellsWithProp("row", rowIndex).map((cell) => cell.getContent());

  const getForwardDiagonalContent = () =>
    _getCellsWithProp("forwardDiagonal").map((cell) => cell.getContent());

  const getBackDiagonalContent = () =>
    _getCellsWithProp("backDiagonal").map((cell) => cell.getContent());

  const getGridSize = () => _GRID_SIZE;

  return {
    resetArray,
    isCellInBackDiagonal,
    isCellInForwardDiagonal,
    setCellContent,
    getCellContent,
    getColumnContent,
    getRowContent,
    getForwardDiagonalContent,
    getBackDiagonalContent,
    getGridSize,
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
  console.log("getRowContent tests"); 
  GameBoard.setCellContent(1, 0, "X");
  GameBoard.setCellContent(1, 1, "O");
  GameBoard.setCellContent(1, 2, "X");
  console.log(GameBoard.getRowContent(1));
  console.log(GameBoard.getRowContent(2));
  //*/
  /*
  console.log("getColumnContent tests");
  GameBoard.setCellContent(0, 1, "X");
  GameBoard.setCellContent(1, 1, "O");
  GameBoard.setCellContent(2, 1, "X");
  console.log(GameBoard.getColumnContent(1));
  console.log(GameBoard.getColumnContent(2));
  //*/
  /*
  console.log("getForwardDiagonalContent tests");
  GameBoard.setCellContent(2, 0, "X");
  GameBoard.setCellContent(1, 1, "O");
  GameBoard.setCellContent(0, 2, "X");
  console.log(GameBoard.getForwardDiagonalContent());
  console.log(GameBoard.getBackDiagonalContent());
  //*/
  /*
  console.log("getBackDiagonalContent tests");
  GameBoard.setCellContent(0, 0, "X");
  GameBoard.setCellContent(1, 1, "O");
  GameBoard.setCellContent(2, 2, "X");
  console.log(GameBoard.getBackDiagonalContent());
  console.log(GameBoard.getForwardDiagonalContent());
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
  console.log("get/setCellContent tests");
  GameBoard.setCellContent(1, 1, "X");
  console.log(GameBoard.getCellContent(1, 1));
  console.log(GameBoard.getCellContent(1, 0));
  //*/
}

// Render module handles all DOM access and initialization
const Render = (() => {
  const _body = document.querySelector("body");
  const _container = document.createElement("div");
  _container.className = "board";
  _body.appendChild(_container);
  const _initCells = (() => {
    for (let row = 0; row < GameBoard.getGridSize(); row++)
      for (let column = 0; column < GameBoard.getGridSize(); column++) {
        const cell = document.createElement("div");
        cell.className = "board__cell";
        cell.style.width = `${100 / GameBoard.getGridSize()}%`;
        cell.style.height = `${100 / GameBoard.getGridSize()}%`;
        cell.dataset.row = row;
        cell.dataset.column = column;
        cell.addEventListener("click", (e) => {
          console.log("GameController.onClick");
          console.log(e);
        });
        _container.appendChild(cell);
      }
  })();

  const _selectCell = (rowIndex, columnIndex) =>
    document.querySelector(
      `.board__cell[data-row='${rowIndex}'][data-column='${columnIndex}']`
    );

  const displayContentToCell = (rowIndex, columnIndex, mark) =>
    (_selectCell(rowIndex, columnIndex).textContent = mark);

  const eraseContentFromAllCells = () => {
    [...document.querySelectorAll(".board__cell")].forEach(
      (cell) => (cell.textContent = "")
    );
  };

  return { displayContentToCell, eraseContentFromAllCells };
})();
// Render Tests
{
  /*
  console.log("displayContentToCell Tests");
  Render.displayContentToCell(1, 1, "X");
  //*/
  /*
  console.log("eraseContentFromAllCells Tests");
  Render.displayContentToCell(0, 1, "X");
  Render.displayContentToCell(1, 1, "X");
  Render.displayContentToCell(2, 1, "O");
  Render.eraseContentFromAllCells();
  Render.displayContentToCell(0, 0, "X");
  Render.displayContentToCell(0, 1, "X");
  Render.displayContentToCell(0, 2, "O");
  Render.eraseContentFromAllCells();
  //*/
}
