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
const form = document.querySelector("form");
const resetBtn = document.querySelector("#resetBtn");
let player1;
let player2;

const createPlayer = (name, symbol) => {
  return { name, symbol };
};

const Gameboard = (() => {
  const container = document.querySelector(".Board-container");
  const gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  function setSymbolOnPosition(position, symbol) {
    gameboard[position] = symbol;
  }

  function render(endGame = false) {
    container.innerHTML = "";
    gameboard.forEach((element, index) => {
      const square = document.createElement("div");
      square.setAttribute("class", "Board-square");
      square.setAttribute("data-position", index);
      square.textContent = typeof element == "number" ? "" : element;
      if (typeof element == "number" && !endGame) {
        square.addEventListener("click", Game.handleSelection);
      }
      container.appendChild(square);
    });
  }

  function checkWinner() {
    let response = false;
    PATTERNS.forEach((pattern) => {
      if (
        gameboard[pattern[0]] == gameboard[pattern[1]] &&
        gameboard[pattern[1]] == gameboard[pattern[2]]
      ) {
        response = true;
      }
    });

    return response;
  }

  function clear() {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = i;
    }
    render();
  }

  return { setSymbolOnPosition, render, clear, checkWinner };
})();

const Game = (() => {
  const dialog = document.querySelector("dialog");
  let movement = 0;
  let currentPlayer;

  function init() {
    currentPlayer = player1;
    Gameboard.render();
  }

  function changePlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function handleSelection() {
    movement++;
    const position = parseInt(this.getAttribute("data-position"));
    Gameboard.setSymbolOnPosition(position, currentPlayer.symbol);
    checkEndGame();
    changePlayer();
  }

  function checkEndGame() {
    let isAWinner = Gameboard.checkWinner();
    let endGame = (movement == 9 && !isAWinner) || isAWinner || false;
    console.log(movement);
    if (endGame) showMessage(isAWinner);
    Gameboard.render(endGame);
  }

  function showMessage(isAWinner) {
    dialog.children[0].textContent = isAWinner
      ? `${currentPlayer.symbol} ${currentPlayer.name} won ${currentPlayer.symbol}`
      : `It's a tie`;
    dialog.showModal();
  }

  function reset() {
    Gameboard.clear();
    currentPlayer = player1;
    movement = 0;
  }

  return { handleSelection, init, reset };
})();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  player1 = createPlayer(form.elements["player1"].value, "✖️");
  player2 = createPlayer(form.elements["player2"].value, "⭕");
  Game.init();
});
resetBtn.addEventListener("click", Game.reset);
