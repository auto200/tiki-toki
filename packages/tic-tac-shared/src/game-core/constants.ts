export const GRID_SIZE = 3;

// https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn
export const WINNING_CONDITIONS = [
    { combo: [0, 1, 2], composition: "row-1" },
    { combo: [3, 4, 5], composition: "row-2" },
    { combo: [6, 7, 8], composition: "row-3" },
    { combo: [0, 3, 6], composition: "col-1" },
    { combo: [1, 4, 7], composition: "col-2" },
    { combo: [2, 5, 8], composition: "col-3" },
    { combo: [0, 4, 8], composition: "dia-1" },
    { combo: [2, 4, 6], composition: "dia-2" },
] as const;

export type WinningComposition = typeof WINNING_CONDITIONS[number]["composition"];
