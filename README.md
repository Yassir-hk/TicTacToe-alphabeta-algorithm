# Tic Tac Toe with AI-Minimax and Alpha Beta Pruning

## Introduction
This repository represents my implementation of Tic Tac Toe in competitive mode (Player vs Machine) with an AI algorithm using the Minimax with Alpha Beta Pruning algorithm. This small project is built using HTML, CSS, and JavaScript.

### What is the Minimax algorithm?
The Minimax algorithm is a game-playing algorithm used for games that require two players competing against each other. This algorithm searches the game tree for the move that maximizes or minimizes the utility for a corresponding player. The time complexity of this algorithm is O(b^m), where:
- b is the maximum number of legal moves that the player can make.
- m is the maximum number of moves that can be played in the whole game.

### What is Alpha Beta Pruning?
Alpha Beta Pruning is an extension of the Minimax algorithm that eliminates some game tree branches that are useless to search. This improvement optimizes and prunes the Minimax algorithm, reducing the time complexity to O(sqrt(b^m)).

## Getting Started
1. Clone the project to your machine.
2. Install the requirements by running the command: `npm install`.
3. Run the application with the command: `npm start`.
4. Go to the link localhost:3000 and enjoy the game!
