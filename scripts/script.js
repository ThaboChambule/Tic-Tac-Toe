const Gameboard = (() => {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameBoard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    gameBoard[index] = value;
    render();
  };

  const getGameboard = () => gameBoard;

  return {
    render,
    update,
    getGameboard
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id.split("-")[1]);
    if (Gameboard.getGameboard()[index] !== "") { // Check if the square is empty before updating
      return;
    }
    Gameboard.update(index, players[currentPlayerIndex].mark);

    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
      gameOver = true;
      alert(`${players[currentPlayerIndex].name} won!`);
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0; // Switch player
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  return {
    start,
    restart,
    handleClick
  };
})();

function checkForWin(board, mark) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningCombination.length; i++) {
    const [a, b, c] = winningCombination[i];
    if (board[a] === mark && board[b] === mark && board[c] === mark) {
      return true;
    }
  }
  return false;
}

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.start();
});

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Game.restart();
});
