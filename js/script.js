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
  const getPlayersMark = () => _playersMark;
};