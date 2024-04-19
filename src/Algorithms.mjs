const utilities = {
  'x': [0, 0, 1],
  'o': [0, 0,-1],
  '.': [0, 0, 0],
};

// Helper function to check if all values are equal
function areEqual(values) {
  for (let i = 1; i < values.length; ++i) {
    if (values[i] !== values[i - 1]) return false;
  }
  return true;
}

// Helper function to initialize some variables that will be used in the minimax algorithm
function initialize(player) {
  const value = player === 'max' ? 'x' : 'o';
  const opponent = player === 'max' ? 'min' : 'max';
  let bestUtility = player === 'max' ? -2 : 2;
  return [value, opponent, bestUtility];
}

export function isValidMove(row, col, boardState) {
  return row >= 0 && row < 3 && col >= 0 && col < 3 && boardState[row][col] === '.';
}

// Function to check if the game ended, if yes it will return the winner
export function isGameEnded(boardState) {
  for (let i = 0; i < 3; ++i) {
    if (boardState[i][0] !== '.' && areEqual([boardState[i][0], boardState[i][1], boardState[i][2]])) return boardState[i][0];
    if (boardState[0][i] !== '.' && areEqual([boardState[0][i], boardState[1][i], boardState[2][i]])) return boardState[0][i];
  }
  const diagonalOne = areEqual([boardState[0][0], boardState[1][1], boardState[2][2]]);
  const diagonalTwo = areEqual([boardState[0][2], boardState[1][1], boardState[2][0]]);
  if (boardState[1][1] !== '.' && (diagonalOne || diagonalTwo)) return boardState[1][1];
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (boardState[i][j] === '.') return false;
    }
  }
  return '.';
}

// Implementation of minimax algorithm, this function return the best move for the corresponding player
export function minimax(boardState, player) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let [value, opponent, bestUtility] = initialize(player);
  let row = 0, col = 0;
  
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = value;
        const utility = minimax(boardState, opponent)[2];
        boardState[i][j] = '.';

        if ((player === 'max' && utility > bestUtility) || (player === 'min' && utility < bestUtility)) {
          [row, col, bestUtility] = [i, j, utility];
        }
      }
    }
  }
  return [row, col, bestUtility];
}

// Alpha beta implementation to prun the minimax algorithm
export function alphabeta(boardState, alpha, beta, player) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let [value, opponent, bestUtility] = initialize(player);
  let row = 0, col = 0;
  
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = value;
        const utility = alphabeta(boardState, alpha, beta, opponent)[2];
        boardState[i][j] = '.';
        
        if ((player === 'max' && utility > bestUtility) || (player === 'min' && utility < bestUtility)) {
          [row, col, bestUtility] = [i, j, utility];
        }
        if ((player === 'max' && bestUtility >= beta) || (player === 'min' && bestUtility <= alpha)) {
          return [row, col, bestUtility];
        }
        if (player === 'min') beta = Math.min(beta, bestUtility);
        if (player === 'max') alpha = Math.max(alpha, bestUtility);
      }
    }
  }
  return [row, col, bestUtility];
}
