import sample from "lodash/sample";
import { nanoid } from "nanoid";
import { WINNING_CONDITIONS } from "../../constants";
import { isNotNullable } from "../../utils";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece } from "../Piece";
import { Player } from "../Player";
import { PlayerKey, Players } from "../Players";

export type GameState =
    | { state: "PLAYING" }
    | { state: "DRAW" }
    | { state: "ENDED"; winnerId: string; winningCellsIds: string[] };
export type Game = {
    id: string;
    board: Board;
    players: Players;
    playerTurn: PlayerKey;
    state: GameState;
};

export const Game = {
    create: (
        players: Players,
        board: Board = Board.create(),
        initialPlayerTurn?: PlayerKey,
        id: string = nanoid(),
    ): Game => ({
        id,
        state: { state: "PLAYING" },
        board,
        players,
        playerTurn: initialPlayerTurn || Players.getInitialPlayerTurn(players),
    }),
    makeMove: (game: Game, piece: Piece, target: Cell): Game | never => {
        const player = Game.getCurrentTurnPlayer(game);
        const isGameInProgress = game.state.state === "PLAYING";
        const isPlayerPieceOwner = Player.isPieceOwner(player, piece);
        const canPlace = Cell.canPlacePiece(target, piece);
        if (!isGameInProgress || !isPlayerPieceOwner || !canPlace) throw new Error("Illegal move");

        return Game.evaluateGameState({
            ...game,
            board: Board.placePiece(game.board, target, piece),
            players: Players.usePiece(game.players, game.playerTurn, piece),
        });
    },
    getRandomMove: (game: Game): { cell: Cell; piece: Piece } | null => {
        const player = Game.getCurrentTurnPlayer(game);
        const availablePieces = player.pieces.filter(piece => !piece.used);
        const piecesWithRandomTargetCell = availablePieces
            .map(piece => {
                const cells = game.board.cells.filter(cell => Cell.canPlacePiece(cell, piece));
                const target = sample(cells);
                if (cells.length === 0 || !target) return null;
                return {
                    piece,
                    cell: target,
                };
            })
            .filter(isNotNullable);
        return sample(piecesWithRandomTargetCell) || null;
    },
    evaluateGameState: (game: Game): Game => {
        for (const [condA, condB, condC] of WINNING_CONDITIONS) {
            const cellA = game.board.cells[condA];
            const cellB = game.board.cells[condB];
            const cellC = game.board.cells[condC];

            const cellAOwner = cellA?.dominantPiece?.ownerId;
            const cellBOwner = cellB?.dominantPiece?.ownerId;
            const cellCOwner = cellC?.dominantPiece?.ownerId;
            if (!cellAOwner || !cellBOwner || !cellCOwner) continue;

            // end of the game
            if (cellAOwner === cellBOwner && cellBOwner === cellCOwner) {
                return {
                    ...game,
                    state: {
                        state: "ENDED",
                        winnerId: cellAOwner,
                        winningCellsIds: [cellA.id, cellB.id, cellC.id],
                    },
                };
            }
        }
        //check for draw
        const nextTurnPlayerKey = Game.getNextTurnPlayerKey(game);
        const nextTurnPlayer = game.players[nextTurnPlayerKey];
        const isDraw = !Player.canMakeAnyMove(nextTurnPlayer, game.board);
        if (isDraw) {
            return { ...game, state: { state: "DRAW" } };
        }
        //toggle turn
        return { ...game, playerTurn: nextTurnPlayerKey };
    },
    getNextTurnPlayerKey: (game: Game): PlayerKey => (game.playerTurn === "one" ? "two" : "one"),
    getCurrentTurnPlayer: (game: Game): Player => game.players[game.playerTurn],
};
