const PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const createPlayer = (name, symbol) => {
  return { name, symbol };
};

const GameBoard = (function () {
  let gamePrinted = "";

  let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function setPosition(position, player) {
    //If the position is selected by the other player,
    //the current player must select other position with a blank space
    if (
      typeof gameBoard[position] == "number" &&
      position >= 0 &&
      position <= 8
    ) {
      gameBoard[position] = player.symbol;
      return true;
    } else {
      return false;
    }
  }

  function printGame() {
    gamePrinted = "";
    gameBoard.forEach((position, index) => {
      if (index == 2 || index == 5 || index == 8) {
        gamePrinted += `${position ?? " | "} \n`;
      } else {
        gamePrinted += `${position ?? " | "} `;
      }
    });

    console.log(gamePrinted + "\n");
  }

  return { gameBoard, setPosition, printGame };
})();

const Game = (function () {
  const player_1 = createPlayer("player1", "X");
  const player_2 = createPlayer("player2", "O");

  let currentMovement = 0;
  let endGame = false;

  let currentPlayer = player_1;

  function init() {
    //If the game is not finished and the movement are not nine then
    while (!endGame && currentMovement != 9) {
      let isSetted = false;

      //If the position is not selected then
      while (!isSetted) {
        const positionSelected = askPlayerPosition();
        isSetted = GameBoard.setPosition(positionSelected, currentPlayer);
      }

      GameBoard.printGame();

      const response = checkWinner();

      if (response) {
        alert(currentPlayer.name + "won the game");
      } else {
        changeCurrentPlayer();
        currentMovement++;
      }
    }
  }

  function checkWinner() {
    let response = false;
    PATTERNS.forEach((pattern) => {
      if (
        GameBoard.gameBoard[pattern[0]] == GameBoard.gameBoard[pattern[1]] &&
        GameBoard.gameBoard[pattern[1]] == GameBoard.gameBoard[pattern[2]]
      ) {
        endGame = true;
        response = true;
      }
    });

    return response;
  }

  function changeCurrentPlayer() {
    if (currentPlayer == player_1) {
      currentPlayer = player_2;
    } else {
      currentPlayer = player_1;
    }
  }

  function askPlayerPosition() {
    let position = prompt(`Choose your position ${currentPlayer.name}`);
    return position;
  }

  init();
})();
