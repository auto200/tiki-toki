export const GRID_SIZE = 3;

// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
export const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
] as const;
