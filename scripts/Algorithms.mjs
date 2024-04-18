const utilities = {
  'x': [0, 0, 1],
  'o': [0, 0,-1],
  '.': [0, 0, 0],
};

// Chack if all values are equal
function areEqual(values) {
  for (let i = 1; i < values.length; ++i) {
    if (values[i] !== values[i - 1]) return false;
  }
  return true;
}

// Check if the move is valid or not
export function isValidMove(row, col, boardState) {
  return row >= 0 && row <= 2 && col >= 0 && col <= 2 && boardState[row][col] === '.';
}

// Function to check if the game ended, if yes it will return the winner
export function isGameEnded(boardState) {
  for (let i = 0; i < 3; ++i) { 
    if (boardState[i][0] !== '.' && areEqual([boardState[i][0], boardState[i][1], boardState[i][2]])) {
      return boardState[i][0];
    }
  }
  for (let i = 0; i < 3; ++i) {
    if (boardState[0][i] !== '.' && areEqual([boardState[0][i], boardState[1][i], boardState[2][i]])) {
      return boardState[0][i];
    }
  }
  if (boardState[0][0] !== '.' && areEqual([boardState[0][0], boardState[1][1], boardState[2][2]])) return boardState[1][1];
  if (boardState[0][2] !== '.' && areEqual([boardState[0][2], boardState[1][1], boardState[2][0]])) return boardState[1][1];
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (boardState[i][j] === '.') {
        return false;
      }
    }
  }
  return '.';
}

// Max players move (minimax algorithm)
export function maxMove(boardState) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let utility = -2, row = 0, col = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = 'x';
        const minUtility = minMove(boardState)[2];
        if (minUtility > utility) {
          utility = minUtility;
          [row, col] = [i, j];
        }
        boardState[i][j] = '.';
      }
    }
  }
  return [row, col, utility];
}

// Min players move (minimax algorithm)
export function minMove(boardState) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let utility = 2, row = 0, col = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = 'o';
        const maxUtility = maxMove(boardState)[2];
        if (maxUtility < utility) {
          [row, col, utility] = [i, j, maxUtility];
        }
        boardState[i][j] = '.';
      }
    }
  }
  return [row, col, utility];
}

// Max player move with alpha-beta prunning
export function maxAlphaBetaMove(boardState, alpha = -2, beta = 2) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let utility = -2, row = 0, col = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = 'x';
        const minUtility = minAlphaBetaMove(boardState, alpha, beta)[2];
        if (minUtility > utility) {
          [row, col, utility] = [i, j, minUtility];
        }
        boardState[i][j] = '.';
        if (utility >= beta) {
          return [row, col, utility];
        }
        alpha = Math.max(utility, alpha);
      }
    }
  }
  return [row, col, utility];
}

// Min players move with alpha-beta prunning
export function minAlphaBetaMove(boardState, alpha = -2, beta = 2) {
  const result = isGameEnded(boardState);
  if (result !== false) return utilities[result];

  let utility = 2, row = 0, col = 0;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (isValidMove(i, j, boardState)) {
        boardState[i][j] = 'o';
        const maxUtility = maxAlphaBetaMove(boardState, alpha, beta)[2];
        if (maxUtility < utility) {
          [row, col, utility] = [i, j, maxUtility];
        }
        boardState[i][j] = '.';
        if (utility <= alpha) {
          return [row, col, utility];
        }
        beta = Math.min(utility, beta);
      }
    }
  }
  return [row, col, utility];
}
