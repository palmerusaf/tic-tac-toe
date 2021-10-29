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

  const reset = () => {
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
    reset,
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

  const GameBoardDisplay = (() => {
    const _board = document.createElement("div");
    _board.className = "flex board";
    _body.appendChild(_board);

    const _initCells = (() => {
      for (let row = 0; row < GameBoard.getGridSize(); row++)
        for (let column = 0; column < GameBoard.getGridSize(); column++) {
          const cell = _buildCell(row, column);
          _addEventToCell(cell);
          _board.appendChild(cell);
        }
    })();

    function _buildCell(row, column) {
      const cell = document.createElement("div");
      cell.className = "flex board__cell";
      cell.style.width = `${100 / GameBoard.getGridSize()}%`;
      cell.style.height = `${100 / GameBoard.getGridSize()}%`;
      cell.dataset.row = row;
      cell.dataset.column = column;
      return cell;
    }

    function _addEventToCell(cell) {
      cell.addEventListener("click", GameController.handleBoardCellClickEvent);
    }

    function _selectCell(rowIndex, columnIndex) {
      return document.querySelector(
        `.board__cell[data-row='${rowIndex}'][data-column='${columnIndex}']`
      );
    }

    const displayContentToCell = (rowIndex, columnIndex, mark) =>
      (_selectCell(rowIndex, columnIndex).textContent = mark);

    const reset = () => {
      [...document.querySelectorAll(".board__cell")].forEach(
        (cell) => (cell.textContent = "")
      );
    };
    return { displayContentToCell, reset };
  })();

  const _Buttons = (() => {
    function _buildButton(label) {
      const button = document.createElement("button");
      button.className = "button";
      button.textContent = label;
      return button;
    }

    const resetButton = () => {
      const button = _buildButton("Reset Game");
      button.addEventListener("click", GameController.resetGame());
      return button;
    };

    const okButton = () => {
      const button = _buildButton("OK");
      return button;
    };

    return { resetButton, okButton };
  })();

  const Windows = (() => {
    const _messageWindow = (message) => {
      const window = document.createElement("div");
      window.className = "flex-col msg-window";
      window.textContent = message;
      const buttonField = _buildButtonField();
      window.appendChild(buttonField);
      return window;

      function _buildButtonField() {
        const buttonField = document.createElement("span");
        buttonField.className = "flex msg-window__button-container";
        _attachButtonsToButtonField(buttonField);
        return buttonField;

        function _attachButtonsToButtonField(buttonField) {
          const resetButton = _Buttons.resetButton();
          _attachMsgWindowPropertiesToButton(resetButton);
          const okButton = _Buttons.okButton();
          _attachMsgWindowPropertiesToButton(okButton);
          buttonField.appendChild(resetButton);
          buttonField.appendChild(okButton);

          function _attachMsgWindowPropertiesToButton(button) {
            button.className += " msg-window__button";
            button.addEventListener("click", _closeMsgWindow);

            function _closeMsgWindow() {
              const window = document.querySelector(".msg-window");
              window.remove();
            }
          }
        }
      }
    };

    const winnerMessage = (winner) =>
      _body.appendChild(
        _messageWindow(`Congratulations ${winner}, you have won!!!`)
      );

    const tieMessage = () =>
      _body.appendChild(
        _messageWindow("No more moves available. The game has ended in a tie.")
      );

    return { winnerMessage, tieMessage };
  })();

  const PlayerBar = (() => {
    const _NUM_OF_PLAYERS = GameController.getNumOfPlayers();
    function playerBarContainer() {
      const container = document.createElement("div");
      container.className = "flex player-bar";
      container.appendChild(playerFieldContainer());
      container.appendChild(_Buttons.resetButton());
      return container;
    }
    function playerFieldContainer() {
      const container = document.createElement("div");
      container.className = "flex player-bar__player-field";
      buildFormArray().forEach((form) => container.appendChild(form));
      return container;
    }
    function buildFormArray() {
      let formArray = [];
      for (let index = 0; index < _NUM_OF_PLAYERS; index++)
        formArray.push(buildPlayerForm(index));
      return formArray;
    }
    function buildPlayerForm(index) {
      const playerForm = document.createElement("form");
      playerForm.className = "flex player-bar__player-form";
      playerForm.id = "player-form" + index;
      playerForm.action = "#";
      playerForm.onsubmit = "return false";
      playerForm.appendChild(buildPlayerEntryBox(index));
      playerForm.appendChild(buildSetPlayerAliasButton(index));
      return playerForm;
    }
    function buildPlayerEntryBox(index) {
      const entryBox = document.createElement("input");
      entryBox.className = "player-bar__entry-box";
      entryBox.type = "text";
      entryBox.placeholder = `Enter name for Player ${index + 1}`;
      entryBox.required = true;
      return entryBox;
    }
    function buildSetPlayerAliasButton(index) {
      const button = document.createElement("input");
      button.className = "button player-bar__set-name-button";
      button.type = "submit";
      button.value = "Set Name";
      button.dataset.index = index;
      button.addEventListener("click", handleButtonEvent);
      return button;
    }
    function handleButtonEvent(event) {
      const index = event.target.dataset.index;
      const form = document.getElementById("player-form" + index);
      const textBoxValue = form[0].value;
      if (textBoxValue) {
        switchFormToNamePlate(textBoxValue, index);
        GameController.setPlayerAlias(textBoxValue, index);
      }
    }
    function switchFormToNamePlate(textBoxValue, index) {
      const namePlate = buildPlayerNamePlate(textBoxValue, index);
      insertPlayerNamePlate(namePlate, index);

      deletePlayerForm(index);
    }
    function deletePlayerForm(index) {
      document.getElementById("player-form" + index).remove();
    }
    function buildPlayerNamePlate(textBoxValue, index) {
      const namePlate = document.createElement("div");
      namePlate.className = "player-bar__name-plate";
      namePlate.id = "player-name-plate" + index;
      namePlate.textContent = textBoxValue;
      return namePlate;
    }
    function insertPlayerNamePlate(namePlate, index) {
      const playerFieldContainer = document.querySelector(
        ".player-bar__player-field"
      );
      const form = document.getElementById("player-form" + index);
      playerFieldContainer.insertBefore(namePlate, form);
    }
    const reset = () => {
      const oldPlayerBarContainer = document.querySelector(".player-bar");
      oldPlayerBarContainer.remove();
      _body.appendChild(playerBarContainer());
    };

    _body.appendChild(playerBarContainer());
    return { reset };
  })();

  return {
    GameBoardDisplay,
    Windows,
    PlayerBar,
  };
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

// Player factory that stores info about player objects
const Player = () => {
  let _alias = "";
  let _mark = "";
  let _isTurn = false;
  let _isWinner = false;

  const setAlias = (alias) =>
    _alias ? console.log("Error: Player name already set.") : (_alias = alias);
  const getAlias = () => _alias;

  const setMark = (mark) =>
    _mark ? console.log("Error: Player mark already set.") : (_mark = mark);
  const getMark = () => _mark;

  const setIsTurn = (bool) =>
    bool === _isTurn
      ? console.log(`Error: isPlayerTurn already set to ${bool}.`)
      : (_isTurn = bool);
  const getIsTurn = () => _isTurn;

  const setIsWinner = (bool) =>
    bool === _isWinner
      ? console.log(`Error: isWinner already set to ${bool}.`)
      : (_isWinner = bool);
  const getIsWinner = () => _isWinner;

  const reset = () => {
    _alias = "";
    _mark = "";
    _isTurn = false;
    _isWinner = false;
  };

  return {
    setAlias,
    getAlias,
    setMark,
    getMark,
    getIsTurn,
    setIsTurn,
    setIsWinner,
    getIsWinner,
    reset,
  };
};
// Player Tests
{
  /*
  const myPlayer = Player();
  console.log("set/getAlias Tests");
  myPlayer.setAlias("Branden");
  console.log(myPlayer.getAlias());
  myPlayer.setAlias("Branden");
  //*/
  /*
  const myPlayer = Player();
  console.log("set/getMark Tests");
  myPlayer.setMark("X");
  console.log(myPlayer.getMark());
  myPlayer.setMark("O");
  //*/
  /*
  const myPlayer = Player();
  console.log("set/getIsTurn Tests");
  myPlayer.setIsTurn(true);
  console.log(myPlayer.getIsTurn());
  myPlayer.setIsTurn(true);
  //*/
  /*
  const myPlayer = Player();
  console.log("set/getIsWinner Tests");
  myPlayer.setIsWinner(true);
  console.log(myPlayer.getIsWinner());
  myPlayer.setIsWinner(true);
  //*/
  /*
  const myPlayer = Player();
  console.log("reset Tests");
  myPlayer.setAlias("Branden");
  myPlayer.setIsWinner(true);
  myPlayer.setIsTurn(true);
  myPlayer.setMark("X");
  console.log("winner = " + myPlayer.getIsWinner());
  console.log("isTurn = " + myPlayer.getIsTurn());
  console.log("mark = " + myPlayer.getMark());
  console.log("player name = " + myPlayer.getAlias());
  myPlayer.reset();
  console.log("winner = " + myPlayer.getIsWinner());
  console.log("isTurn = " + myPlayer.getIsTurn());
  console.log("mark = " + myPlayer.getMark());
  console.log("player name = " + myPlayer.getAlias());
  //*/
}

// GameController Module handles logic for determining win and servers as go
// between for Render and GameBoard Module
const GameController = (() => {
  const _NUM_OF_PLAYERS = 2;
  let _players = [];
  const _initPlayers = (() => {
    for (let i = 0; i < _NUM_OF_PLAYERS; i++) {
      const player = Player();
      _players.push(player);
    }
  })();
  const setPlayerAlias = (playerAlias, playerIndex) =>
    _players[playerIndex].setAlias(playerAlias);

  const getNumOfPlayers = () => _NUM_OF_PLAYERS;

  const resetGame = () => {
    GameBoard.reset();
    Render.GameBoardDisplay.reset();
    Render.PlayerBar.reset();
  };

  return {
    setPlayerAlias,
    getNumOfPlayers,
    handleBoardCellClickEvent,
    resetGame,
  };
})();
//GameController Tests
{
}
