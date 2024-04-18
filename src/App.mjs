import { isGameEnded, isValidMove, alphabeta, minimax } from './Algorithms.mjs';

const boardElement = document.getElementById('board');
const boardState = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.'],
];
let playerTurn = 'x';

function play() {
  const result = isGameEnded(boardState);
  if (result !== false) {
    if (result === 'x') {
      alert("Player X wins the game");
    } else if (result === 'o') {
      alert("Player O wins the game");
    } else if (result === '.') {
      alert("Tie");
    }
  } else if (playerTurn === 'o') {
    const [row, col, utility] = alphabeta(boardState, -2, 2, 'min');
    if (isValidMove(row, col, boardState)) {
      boardState[row][col] = 'o';
      playerTurn = 'x';
      updateBoard();
      play();
    } else {
      alert('Invalid move');
    }
  }
}

function updateBoard() {
  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      const squareElement = document.getElementById(`${row}-${col}`);
      const value = boardState[row][col];
      squareElement.textContent = value === '.' ? '' : value;
      squareElement.classList.toggle('x', value === 'x');
      squareElement.classList.toggle('o', value === 'o');
    }
  }
}

function createSquare(row, col) {
  const squareElement = document.createElement('div');
  squareElement.classList.add('square');
  squareElement.id = `${row}-${col}`;
  if (row === 1) squareElement.classList.add('horizontal-border');
  if (col === 1) squareElement.classList.add('vertical-border');
  squareElement.onclick = () => {
    if (playerTurn === 'o' || squareElement.textContent.length) return;
    boardState[row][col] = 'x';
    updateBoard();
    playerTurn = 'o';
    play();
  };
  return squareElement;
}

function createBoard() {
  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      const squareElement = createSquare(row, col);
      boardElement.appendChild(squareElement);
    }
  }
}

document.addEventListener('DOMContentLoaded', createBoard);
