function gameBoard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  //This creates a 2d array that will represent the state of the game board
  for (let i = 0; i < rows; i++) board[i] = [];
  for (let j = 0; j < columns; j++) {
    board[i].push(Cell());
  }
}
const getBoard = () => board;

