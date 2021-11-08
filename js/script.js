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
  let _GRID_SIZE = 3;
  let _cells = [];

  const getGridSize = () => _GRID_SIZE;

  const setGridSize = (newSize) => (_GRID_SIZE = newSize);

  const _initCellArray = () => {
    for (let rowIndex = 0; rowIndex < _GRID_SIZE; rowIndex++)
      for (let columnIndex = 0; columnIndex < _GRID_SIZE; ++columnIndex)
        _cells.push(BoardCell(rowIndex, columnIndex));
  };
  _initCellArray();

  const reInitCellArray = () => {
    deleteCellArray();
    _initCellArray();
    function deleteCellArray() {
      _cells.length = 0;
    }
  };

  const getCell = (rowIndex, columnIndex) =>
    _cells.filter(
      (cell) =>
        cell.getRowIndex() === rowIndex && cell.getColumnIndex() === columnIndex
    )[0];

  const isCellInBackDiagonal = (rowIndex, columnIndex) =>
    rowIndex === columnIndex;

  const isCellInForwardDiagonal = (rowIndex, columnIndex) =>
    rowIndex + columnIndex === _GRID_SIZE - 1;

  const GetNeighbors = (() => {
    const getColumnContent = (columnIndex) =>
      _getCellsWithProp("column", columnIndex).map((cell) => cell.getContent());

    const getRowContent = (rowIndex) =>
      _getCellsWithProp("row", rowIndex).map((cell) => cell.getContent());

    const getForwardDiagonalContent = () =>
      _getCellsWithProp("forwardDiagonal").map((cell) => cell.getContent());

    const getBackDiagonalContent = () =>
      _getCellsWithProp("backDiagonal").map((cell) => cell.getContent());

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
          return isCellInBackDiagonal(
            cell.getRowIndex(),
            cell.getColumnIndex()
          );
      });

    return {
      getColumnContent,
      getRowContent,
      getForwardDiagonalContent,
      getBackDiagonalContent,
    };
  })();

  const reset = () => {
    _cells.forEach((cell) => cell.resetCell());
  };

  const areAllCellsPlayed = () => _cells.every((cell) => cell.getIsPlayed());
  return {
    getGridSize,
    setGridSize,
    getCell,
    isCellInBackDiagonal,
    isCellInForwardDiagonal,
    GetNeighbors,
    areAllCellsPlayed,
    reInitCellArray,
    reset,
  };
})();
// GameBoard Tests
{
  /*
  console.log("reset() tests");
  GameBoard.getCell(0, 1).setContent("X");
  GameBoard.getCell(1, 1).setContent("O");
  GameBoard.getCell(2, 1).setContent("X");
  console.log(
    GameBoard.getCell(0, 1).getContent(),
    GameBoard.getCell(1, 1).getContent(),
    GameBoard.getCell(2, 1).getContent()
  );
  GameBoard.reset();
  console.log(
    GameBoard.getCell(0, 1).getContent(),
    GameBoard.getCell(1, 1).getContent(),
    GameBoard.getCell(2, 1).getContent()
  );
  //*/
  /*
  console.log("getRowContent tests");
  GameBoard.getCell(1, 0).setContent("X");
  GameBoard.getCell(1, 1).setContent("O");
  GameBoard.getCell(1, 2).setContent("X");
  console.log(GameBoard.GetNeighbors.getRowContent(1));
  console.log(GameBoard.GetNeighbors.getRowContent(2));
  GameBoard.reset();
  //*/
  /*
  console.log("getColumnContent tests");
  GameBoard.getCell(0, 1).setContent("X");
  GameBoard.getCell(1, 1).setContent("O");
  GameBoard.getCell(2, 1).setContent("X");
  console.log(GameBoard.GetNeighbors.getColumnContent(1));
  console.log(GameBoard.GetNeighbors.getColumnContent(2));
  GameBoard.reset();
  //*/
  /*
  console.log("getForwardDiagonalContent tests");
  GameBoard.getCell(2, 0).setContent("X");
  GameBoard.getCell(1, 1).setContent("O");
  GameBoard.getCell(0, 2).setContent("X");
  console.log(GameBoard.GetNeighbors.getForwardDiagonalContent());
  console.log(GameBoard.GetNeighbors.getBackDiagonalContent());
  GameBoard.reset();
  //*/
  /*
  console.log("getBackDiagonalContent tests");
  GameBoard.getCell(0, 0).setContent("X");
  GameBoard.getCell(1, 1).setContent("O");
  GameBoard.getCell(2, 2).setContent("X");
  console.log(GameBoard.GetNeighbors.getBackDiagonalContent());
  console.log(GameBoard.GetNeighbors.getForwardDiagonalContent());
  GameBoard.reset();
  //*/
  /*
  console.log("isCellInForwardDiagonal tests");
  console.log(GameBoard.isCellInForwardDiagonal(0, 2));
  console.log(GameBoard.isCellInForwardDiagonal(1, 1));
  console.log(GameBoard.isCellInForwardDiagonal(2, 0));
  console.log(GameBoard.isCellInForwardDiagonal(2, 1));
  GameBoard.reset();
  //*/
  /*
  console.log("isCellInBackDiagonal tests");
  console.log(GameBoard.isCellInBackDiagonal(0, 0));
  console.log(GameBoard.isCellInBackDiagonal(1, 1));
  console.log(GameBoard.isCellInBackDiagonal(2, 2));
  console.log(GameBoard.isCellInBackDiagonal(1, 2));
  GameBoard.reset();
  //*/
  /*
  console.log("get/setCellContent tests");
  GameBoard.setCellContent(1, 1, "X");
  console.log(GameBoard.getCellContent(1, 1));
  console.log(GameBoard.getCellContent(1, 0));
  //*/
  /*
  console.log("areAllCellsPlayed test");
  console.log(GameBoard.areAllCellsPlayed() === false ? "Passed" : "Failed");
  for (let row = 0; row < GameBoard.getGridSize(); row++)
    for (let column = 0; column < GameBoard.getGridSize(); column++)
      GameBoard.getCell(row, column).setContent("X");
  console.log(GameBoard.areAllCellsPlayed() === true ? "Passed" : "Failed");
  //*/
}

// Player factory that stores info about player objects
const Player = () => {
  let _alias = "";
  let _mark = "";
  let _isActive = false;
  let _isWinner = false;

  const setAlias = (alias) =>
    _alias ? console.log("Error: Player name already set.") : (_alias = alias);
  const getAlias = () => _alias;

  const setMark = (mark) =>
    _mark ? console.log("Error: Player mark already set.") : (_mark = mark);
  const getMark = () => _mark;

  const setIsActiveStatus = (bool) =>
    bool === _isActive
      ? console.log(`Error: isPlayerTurn already set to ${bool}.`)
      : (_isActive = bool);
  const getIsActiveStatus = () => _isActive;

  const setIsWinner = (bool) =>
    bool === _isWinner
      ? console.log(`Error: isWinner already set to ${bool}.`)
      : (_isWinner = bool);
  const getIsWinner = () => _isWinner;

  const reset = () => {
    _alias = "";
    _mark = "";
    _isActive = false;
    _isWinner = false;
  };

  return {
    setAlias,
    getAlias,
    setMark,
    getMark,
    getIsActiveStatus,
    setIsActiveStatus,
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

const PlayerController = (() => {
  let _NUM_OF_PLAYERS = 2;
  let _players = [];
  const _initPlayers = () => {
    for (let index = 0; index < _NUM_OF_PLAYERS; index++) {
      _players.push(Player());
    }
    _players[0].setIsActiveStatus(true);
  };
  _initPlayers();

  const reInitPlayers = () => {
    deleteAllPlayers();
    _initPlayers();
    function deleteAllPlayers() {
      return (_players.length = 0);
    }
  };

  const getNumOfPlayers = () => _NUM_OF_PLAYERS;
  const setNumOfPlayers = (newAmount) => (_NUM_OF_PLAYERS = newAmount);

  const getPlayer = (playerIndex) => _players[playerIndex];

  const getActivePlayer = () =>
    _players.filter((player) => player.getIsActiveStatus())[0];

  const areAllPlayerAliasesSet = () =>
    _players.every((player) => player.getAlias() !== "");

  const reset = () => {
    _players.forEach((player) => player.reset());
    _players[0].setIsActiveStatus(true);
  };

  const getActivePlayerIndex = () => _players.indexOf(getActivePlayer());

  const cycleActivePlayerToNextPlayer = () => {
    if (getActivePlayerIndex() === _players.length - 1) {
      _players[0].setIsActiveStatus(true);
      _players[_players.length - 1].setIsActiveStatus(false);
    } else {
      const oldActiveIndex = getActivePlayerIndex();
      const newActiveIndex = oldActiveIndex + 1;
      _players[oldActiveIndex].setIsActiveStatus(false);
      _players[newActiveIndex].setIsActiveStatus(true);
    }
  };

  const getWinner = () => {
    const winner = _players.filter((player) => player.getIsWinner())[0];
    return winner;
  };

  const thereIsAWinner = () => _players.some((player) => player.getIsWinner());

  return {
    getNumOfPlayers,
    setNumOfPlayers,
    getPlayer,
    getActivePlayer,
    areAllPlayerAliasesSet,
    reInitPlayers,
    reset,
    getActivePlayerIndex,
    cycleActivePlayerToNextPlayer,
    getWinner,
    thereIsAWinner,
  };
})();
// PlayerController Tests
{
  /*
  console.log("getNumOfPlayers Tests",  PlayerController.getNumOfPlayers()===2?"Passed":"Failed");
  //*/
  /*
  console.log("getPlayer Tests");
  PlayerController.getPlayer(0).setAlias("p1");
  PlayerController.getPlayer(1).setAlias("p2");
  console.log(
    PlayerController.getPlayer(0).getAlias() === "p1" ? "Passed" : "Failed",
    PlayerController.getPlayer(1).getAlias() === "p2" ? "Passed" : "Failed"
  );
  //*/
  /*
  console.log("getActivePlayer Tests");
  PlayerController.getPlayer(0).setAlias("p1");
  PlayerController.getPlayer(1).setAlias("p2");
  console.log(PlayerController.getActivePlayer().getAlias()==="p1"?"Passed":"Failed");
  //*/
  /*
  console.log("areAllPlayerAliasesSet Tests");
  console.log(
    PlayerController.areAllPlayerAliasesSet() === false ? "Passed" : "Failed"
  );
  PlayerController.getPlayer(0).setAlias("X");
  PlayerController.getPlayer(1).setAlias("O");
  console.log(
    PlayerController.areAllPlayerAliasesSet() === true ? "Passed" : "Failed"
  );
  //*/
  /*
  console.log("reset Tests");
  PlayerController.getPlayer(0).setAlias("player1");
  PlayerController.getPlayer(1).setAlias("player2");
PlayerController.reset();
  console.log(
  PlayerController.getPlayer(0).getAlias()=== "" ? "Passed" : "Failed",
  PlayerController.getPlayer(1).getAlias()=== "" ? "Passed" : "Failed",
  PlayerController.getPlayer(0).getMark()=== "X" ? "Passed" : "Failed",
PlayerController.getActivePlayer()? "Passed" : "Failed"
)
  //*/
  /*
  console.log("getActivePlayerIndex Tests");
  console.log(
    PlayerController.getActivePlayerIndex()===0 ? "Passed" : "Failed"
  )
  PlayerController.getPlayer(0).setIsActiveStatus(false)
  PlayerController.getPlayer(1).setIsActiveStatus(true)
  console.log(
    PlayerController.getActivePlayerIndex()===1 ? "Passed" : "Failed"
  )
  //*/
  /*
  console.log("cycleActivePlayerToNextPlayer Tests");
  PlayerController.cycleActivePlayerToNextPlayer();
  console.log(
    PlayerController.getActivePlayerIndex() === 1 ? "Passed" : "Failed"
  );
  PlayerController.cycleActivePlayerToNextPlayer();
  console.log(
    PlayerController.getActivePlayerIndex() === 0 ? "Passed" : "Failed"
  );
  //*/
  /*
  console.log("getNameOfWinner Test");
  PlayerController.getPlayer(0).setAlias("player1");
  PlayerController.getPlayer(0).setIsWinner(true);
  console.log(
    PlayerController.getNameOfWinner() === "player1" ? "Passed" : "Failed"
  );
  //*/
}

// Render module handles all DOM access and initialization
const Render = (() => {
  const _body = document.querySelector("body");

  // List of possible player marks
  const _MARK_ARRAY = [
    "X",
    "O",
    "😂",
    "❤️",
    "😍",
    "🤣",
    "😊",
    "🙏",
    "💕",
    "😭",
    "😘",
    "👍",
    "😅",
    "👏",
    "😁",
    "🔥",
    "💔",
    "💖",
    "😢",
    "🤔",
    "😆",
    "🙄",
    "💪",
    "😉",
    "☺️",
    "👌",
    "🤗",
    "😔",
    "😎",
    "😇",
    "🌹",
    "🤦",
    "🎉",
    "💞",
    "✌️",
    "✨",
    "🤷",
    "😱",
    "😌",
    "🌸",
    "🙌",
    "😋",
    "😏",
    "🙂",
    "🤩",
    "😄",
    "😀",
    "😃",
    "💯",
    "🙈",
    "👇",
    "🎶",
  ];

  const GameBoardDisplay = (() => {
    const _board = document.createElement("div");
    _board.className = "flex board";
    _body.appendChild(_board);

    const _initCells = () => {
      for (let row = 0; row < GameBoard.getGridSize(); row++)
        for (let column = 0; column < GameBoard.getGridSize(); column++) {
          const cell = _buildCell(row, column);
          _addEventToCell(cell);
          _board.appendChild(cell);
        }
    };
    _initCells();

    const reInitCells = () => {
      _removeAllCells();
      _initCells();
      function _removeAllCells() {
        return (_board.textContent = "");
      }
    };

    function _buildCell(row, column) {
      const cell = document.createElement("div");
      cell.className = "flex board__cell";
      cell.style.width = `${100 / GameBoard.getGridSize()}%`;
      cell.style.height = `${100 / GameBoard.getGridSize()}%`;
      cell.style.fontSize = `${100 / GameBoard.getGridSize()}%`;
      cell.dataset.row = row;
      cell.dataset.column = column;
      return cell;
    }

    function _addEventToCell(cell) {
      cell.addEventListener("click", (e) =>
        GameController.handleBoardCellClickEvent(
          +e.target.dataset.row,
          +e.target.dataset.column
        )
      );
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
    return { displayContentToCell, reInitCells, reset };
  })();

  const _Buttons = (() => {
    function _buildButton(label) {
      const button = document.createElement("button");
      button.className = "button";
      button.textContent = label;
      return button;
    }

    const buildResetButton = () => {
      const button = _buildButton("Reset Game");
      button.addEventListener("click", () => GameController.resetAll());
      return button;
    };
    const buildCancelButton = () => {
      const button = _buildButton("Cancel");
      button.addEventListener("click", () => Windows.closeWindow());
      return button;
    };
    const buildOkButton = () => {
      const button = _buildButton("OK");
      button.addEventListener("click", () => Windows.closeWindow());
      return button;
    };
    const menuButton = () => {
      const button = _buildButton("Menu");
      button.addEventListener("click", () => Windows.displayMenu());
      return button;
    };
    const buildSubmitButton = () => {
      const button = _buildButton("Submit");
      button.addEventListener("click", () => {
        GameController.setNewSettings();
      });
      return button;
    };
    return {
      buildResetButton,
      buildOkButton,
      menuButton,
      buildCancelButton,
      buildSubmitButton,
    };
  })();

  const Windows = (() => {
    const _buildWindow = (message) => {
      const window = document.createElement("div");
      window.textContent = message;
      window.className = "flex-col window";
      return window;
    };
    function buildResetOkButtonField() {
      const buttonField = buildButtonField();
      _attachButtonsToButtonField(buttonField);
      return buttonField;
      function _attachButtonsToButtonField(buttonField) {
        const resetButton = _Buttons.buildResetButton();
        resetButton.addEventListener("click", closeWindow);
        buttonField.appendChild(resetButton);
        buttonField.appendChild(_Buttons.buildOkButton());
      }
    }
    function buildButtonField() {
      const buttonField = document.createElement("span");
      buttonField.className = "flex window__button-container";
      return buttonField;
    }
    function buildMenuButtonField() {
      const buttonField = buildButtonField();
      _attachButtonsToButtonField(buttonField);
      return buttonField;
      function _attachButtonsToButtonField(buttonField) {
        buttonField.appendChild(_Buttons.buildCancelButton());
        buttonField.appendChild(_Buttons.buildSubmitButton());
      }
    }
    const winnerMessage = () => {
      const winnersName = PlayerController.getWinner().getAlias();
      const window = _buildWindow(
        `Congratulations ${winnersName}, you have won!!!`
      );
      window.prepend(buildPlayerMarkField());
      window.appendChild(buildResetOkButtonField());
      _body.appendChild(window);
      function buildPlayerMarkField() {
        const markField = document.createElement("div");
        markField.className = "window__mark-field";
        markField.textContent = PlayerController.getWinner().getMark();
        return markField;
      }
    };
    const tieMessage = () => {
      const window = _buildWindow(
        "No more moves available. The game has ended in a tie."
      );
      window.appendChild(buildResetOkButtonField());
      _body.appendChild(window);
    };
    const closeWindow = function () {
      const window = document.querySelector(".window");
      window.remove();
    };
    const displayMenu = () => {
      const window = _buildWindow();
      window.className += " menu";
      window.append(buildTitle("Menu"));
      window.append(buildForm());

      _body.append(window);

      function buildTitle(content) {
        const title = document.createElement("div");
        title.textContent = content;
        title.className = "menu__title";
        return title;
      }
      function buildForm() {
        const formContainer = buildFormContainer();
        attachSelectors(formContainer);
        formContainer.appendChild(buildMenuButtonField());
        return formContainer;

        function buildFormContainer() {
          const container = document.createElement("form");
          container.className = "flex-col menu__form";
          container.action = "#";
          container.onsubmit = "return false";
          return container;
        }
        function attachSelectors(formContainer) {
          formContainer.appendChild(buildGridSizeSelector());
          formContainer.appendChild(buildNumOfPlayersSelector());

          function buildGridSizeSelector() {
            const id = "grid-size";
            const options = [3, 5, 7, 9];
            const labelContent = "Grid Size:";
            return buildSelectorContainer(id, options, labelContent);
          }
          function buildNumOfPlayersSelector() {
            const id = "num-players";
            const options = [2, 3, 4];
            const labelContent = "Number of Players:";
            return buildSelectorContainer(id, options, labelContent);
          }
          function buildSelectorContainer(id, options, labelContent) {
            const container = buildFormElementContainer();
            const selector = buildSelector(id);
            selector.required = true;
            attachOptionsToSelector(options, selector);
            container.appendChild(buildLabel(id, labelContent));
            container.appendChild(selector);
            return container;
            function buildLabel(id, labelContent) {
              const label = document.createElement("label");
              label.htmlFor = id;
              label.textContent = labelContent;
              return label;
            }
            function buildFormElementContainer() {
              const container = document.createElement("span");
              container.className = "menu__form-element";
              return container;
            }
            function buildSelector(id) {
              const selector = document.createElement("select");
              selector.name = id;
              selector.id = id;
              selector.appendChild(buildPlaceHolder());
              return selector;
              function buildPlaceHolder() {
                const placeHolder = document.createElement("option");
                placeHolder.value = "";
                placeHolder.disabled = true;
                placeHolder.selected = true;
                return placeHolder;
              }
            }
            function attachOptionsToSelector(optionValues, selector) {
              optionValues.forEach((value) =>
                selector.appendChild(buildOption(value))
              );

              function buildOption(value) {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = value;
                return option;
              }
            }
          }
        }
      }
    };
    return { winnerMessage, tieMessage, displayMenu, closeWindow };
  })();

  const PlayerBar = (() => {
    function playerBarContainer() {
      const container = document.createElement("div");
      container.className = "flex player-bar";
      container.appendChild(playerFieldContainer());
      container.appendChild(buttonField());
      return container;
    }
    function buttonField() {
      const container = document.createElement("span");
      container.className =
        "flex player-bar__button-field player-bar__player-form";
      container.appendChild(_Buttons.menuButton());
      container.appendChild(_Buttons.buildResetButton());
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
      for (let index = 0; index < PlayerController.getNumOfPlayers(); index++)
        formArray.push(buildPlayerForm(index));
      return formArray;
    }
    function buildPlayerForm(index) {
      const playerForm = document.createElement("form");
      playerForm.className = "flex player-bar__player-form";
      playerForm.id = "player-form" + index;
      playerForm.action = "#";
      playerForm.onsubmit = "return false";
      playerForm.appendChild(buildPlayerNameEntryBox(index));
      playerForm.appendChild(buildPlayerMarkSelector(index));
      playerForm.appendChild(buildSetPlayerButton(index));
      return playerForm;
    }
    function buildPlayerNameEntryBox(index) {
      const entryBox = document.createElement("input");
      entryBox.className = "player-bar__entry-box";
      entryBox.type = "text";
      entryBox.placeholder = `Enter name for Player ${index + 1}`;
      entryBox.required = true;
      return entryBox;
    }
    function buildPlayerMarkSelector(index) {
      const selector = document.createElement("select");
      const placeHolder = buildPlaceHolderForMarkSelector();
      selector.appendChild(placeHolder);
      _MARK_ARRAY.forEach((mark) =>
        selector.appendChild(buildOptionFromMark(mark))
      );
      selector.required = true;
      return selector;

      function buildPlaceHolderForMarkSelector() {
        const placeHolder = document.createElement("option");
        placeHolder.value = "";
        placeHolder.disabled = true;
        placeHolder.selected = true;
        placeHolder.textContent = "mark";
        return placeHolder;
      }
      function buildOptionFromMark(mark) {
        const option = document.createElement("option");
        option.value = mark;
        option.textContent = mark;
        return option;
      }
    }
    function buildSetPlayerButton(index) {
      const button = document.createElement("input");
      button.className = "button player-bar__set-name-button";
      button.type = "submit";
      button.value = "Set Player";
      button.dataset.index = index;
      button.addEventListener("click", (e) =>
        GameController.handleSetPlayerClickEvent(e)
      );
      return button;
    }
    const switchFormToNamePlate = function (textBoxValue, index) {
      const namePlate = buildPlayerNamePlate(textBoxValue, index);
      if (index == PlayerController.getActivePlayerIndex())
        namePlate.className += " player-bar__name-plate--active";
      insertPlayerNamePlate(namePlate, index);
      deletePlayerForm(index);
      function deletePlayerForm(index) {
        document.getElementById("player-form" + index).remove();
      }
      function buildPlayerNamePlate(textBoxValue, index) {
        const namePlate = document.createElement("div");
        const playerMark = PlayerController.getPlayer(index).getMark();
        namePlate.className = "player-bar__name-plate";
        namePlate.id = "player-name-plate" + index;
        namePlate.textContent = `${textBoxValue} ${playerMark}`;
        return namePlate;
      }
      function insertPlayerNamePlate(namePlate, index) {
        const playerFieldContainer = document.querySelector(
          ".player-bar__player-field"
        );
        const form = document.getElementById("player-form" + index);
        playerFieldContainer.insertBefore(namePlate, form);
      }
    };

    const highlightActiveNamePlate = () => {
      function _removeAllHighlights() {
        const namePlateList = [
          ...document.querySelectorAll(".player-bar__name-plate"),
        ];
        namePlateList.forEach((namePlate) => {
          namePlate.className = namePlate.className.replace(
            " player-bar__name-plate--active",
            ""
          );
        });
      }
      function _addHighlightToActiveNamePlate() {
        const activeNamePlate = document.getElementById(
          "player-name-plate" + PlayerController.getActivePlayerIndex()
        );
        activeNamePlate.className += " player-bar__name-plate--active";
      }
      _removeAllHighlights();
      _addHighlightToActiveNamePlate();
    };

    const reset = () => {
      const oldPlayerBarContainer = document.querySelector(".player-bar");
      oldPlayerBarContainer.remove();
      _body.appendChild(playerBarContainer());
    };

    _body.appendChild(playerBarContainer());
    return { reset, highlightActiveNamePlate, switchFormToNamePlate };
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
  /*
  console.log("winnerMessage Test");
  const winner = PlayerController.getPlayer(0);
  winner.setAlias("player one");
  winner.setIsWinner(true);
  winner.setMark()
  Render.Windows.winnerMessage();
  //*/
}

// GameController handles on click functions and interfaces with other controllers
const GameController = (() => {
  const handleBoardCellClickEvent = function (row, column) {
    isMoveInvalid(row, column)
      ? handleInvalidMoves()
      : handleValidMoves(row, column);

    function isMoveInvalid(row, column) {
      return (
        PlayerController.areAllPlayerAliasesSet() === false ||
        GameBoard.getCell(row, column).getIsPlayed() ||
        PlayerController.thereIsAWinner() ||
        GameBoard.areAllCellsPlayed()
      );
    }
    function handleInvalidMoves() {
      if (PlayerController.areAllPlayerAliasesSet() === false)
        return document
          .querySelector(".player-bar__entry-box")
          .reportValidity();
      if (PlayerController.thereIsAWinner()) return Windows.winnerMessage();
      if (GameBoard.areAllCellsPlayed()) return Render.Windows.tieMessage();
    }
    function handleValidMoves(row, column) {
      recordPlayerMark(row, column);
      handleWinningMoves(row, column);
      cycleActivePlayerAndHighlightNamePlate();
      function recordPlayerMark(row, column) {
        const mark = PlayerController.getActivePlayer().getMark();
        Render.GameBoardDisplay.displayContentToCell(row, column, mark);
        GameBoard.getCell(row, column).setContent(mark);
      }
      function cycleActivePlayerAndHighlightNamePlate() {
        PlayerController.cycleActivePlayerToNextPlayer();
        Render.PlayerBar.highlightActiveNamePlate();
      }
      function handleWinningMoves(row, column) {
        if (isMoveWinner(row, column)) {
          PlayerController.getActivePlayer().setIsWinner(true);
          Render.Windows.winnerMessage();
        } else if (GameBoard.areAllCellsPlayed())
          return Render.Windows.tieMessage();
        function isMoveWinner(row, column) {
          return isRowOrColumnWin(row, column) || isDiaganolsWin(row, column);
          function isRowOrColumnWin(row, column) {
            return isRowAWin(row) || isColumnAWin(column);
            function isRowAWin(row) {
              return isContentAMatch(GameBoard.GetNeighbors.getRowContent(row));
            }
            function isColumnAWin(column) {
              return isContentAMatch(
                GameBoard.GetNeighbors.getColumnContent(column)
              );
            }
          }
          function isDiaganolsWin(row, column) {
            if (
              GameBoard.isCellInBackDiagonal(row, column) &&
              GameBoard.isCellInForwardDiagonal(row, column)
            )
              return (
                isContentAMatch(
                  GameBoard.GetNeighbors.getForwardDiagonalContent()
                ) ||
                isContentAMatch(GameBoard.GetNeighbors.getBackDiagonalContent())
              );
            if (GameBoard.isCellInBackDiagonal(row, column))
              return isContentAMatch(
                GameBoard.GetNeighbors.getBackDiagonalContent()
              );
            if (GameBoard.isCellInForwardDiagonal(row, column))
              return isContentAMatch(
                GameBoard.GetNeighbors.getForwardDiagonalContent()
              );
          }
          function isContentAMatch(content) {
            return content.every((value, index, array) => value === array[0]);
          }
        }
      }
    }
  };
  const handleSetPlayerClickEvent = function (event) {
    const index = event.target.dataset.index;
    const form = document.getElementById("player-form" + index);
    const playerNameTextBoxValue = form[0].value;
    const mark = form[1].value;
    if (form[0].checkValidity() && form[1].checkValidity()) {
      PlayerController.getPlayer(index).setMark(mark);
      PlayerController.getPlayer(index).setAlias(playerNameTextBoxValue);
      Render.PlayerBar.switchFormToNamePlate(playerNameTextBoxValue, index);
    }
  };
  const setNewSettings = function () {
    const selectors = [...document.querySelectorAll(".menu__form select")];
    if (areSelectorsSelected(selectors)) {
      const newGridSize = selectors[0].value;
      const newNumOfPlayers = selectors[1].value;
      GameBoard.setGridSize(newGridSize);
      PlayerController.setNumOfPlayers(newNumOfPlayers);
      Render.Windows.closeWindow();
      _reInitAll();
    }

    function areSelectorsSelected() {
      return selectors.every((selector) => selector.checkValidity());
    }

    function _reInitAll() {
      GameBoard.reInitCellArray();
      Render.GameBoardDisplay.reInitCells();
      PlayerController.reInitPlayers();
      Render.PlayerBar.reset();
    }
  };

  const resetAll = function () {
    GameBoard.reset();
    PlayerController.reset();
    Render.GameBoardDisplay.reset();
    Render.PlayerBar.reset();
  };
  return {
    handleBoardCellClickEvent,
    handleSetPlayerClickEvent,
    setNewSettings,
    resetAll,
  };
})();