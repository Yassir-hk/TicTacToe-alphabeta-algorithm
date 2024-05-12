import { isGameEnded, isValidMove, alphabeta, minimax } from './algorithms.mjs';

const boardElement = document.getElementById('board');
const popupElement = document.getElementById('popup');
const messgElement = document.getElementById('messg');
const boardState = [
  ['.', '.', '.'],
  ['.', '.', '.'],
  ['.', '.', '.'],
];
let turn = 'x';
let playerTurn;

function gameResult(result) {
  if (result === 'x') {
    messgElement.innerHTML = "Result: Player 'x' wins the game"
  } else if (result === 'o') {
    messgElement.innerHTML = "Result: Player 'o' wins the game";
  } else if (result === '.') {
    messgElement.innerHTML = "Result: Tie";
  }
  popupElement.style.display = "block";
}

function play() {
  const result = isGameEnded(boardState);
  if (result !== false) return gameResult(result);

  if (turn === 'o' && playerTurn === 'x') {
    const [row, col, utility] = alphabeta(boardState, -2, 2, 'min');
    if (isValidMove(row, col, boardState)) {
      boardState[row][col] = 'o';
      turn = 'x';
      updateBoard();
      play();
    } else {
      alert('Invalid move');
    }
  } else if (turn === 'x' && playerTurn === 'o') {
    const [row, col, utility] = alphabeta(boardState, -2, 2, 'max');
    if (isValidMove(row, col, boardState)) {
      boardState[row][col] = 'x';
      turn = 'o';
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

function clearBoard() {
  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      const squareElement = document.getElementById(`${row}-${col}`);
      squareElement.innerHTML = '';
      boardState[row][col] = '.';
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
    if (turn !== playerTurn || squareElement.textContent.length) return;
    boardState[row][col] = playerTurn;
    updateBoard();
    turn = playerTurn === 'x' ? 'o' : 'x';
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

document.querySelectorAll('.button').forEach(buttonElement => {
  buttonElement.addEventListener('click', () => {
    playerTurn = buttonElement.innerHTML;
    if (isGameEnded(boardState)) clearBoard();
    turn = 'x';
    popupElement.style.display = 'none';
    if (playerTurn === 'o') play();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  popupElement.style.display = 'block';
});
