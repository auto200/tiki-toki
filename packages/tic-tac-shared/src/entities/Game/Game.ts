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
    makeMove: (game: Game, pieceId: Piece["id"], targetCellId: Cell["id"]): Game | never => {
        const isGameInProgress = game.state.state === "PLAYING";
        if (!isGameInProgress) throw new Error("Game has ended");

        const player = Game.getCurrentTurnPlayer(game);
        const piece = Player.getPieceById(player, pieceId);
        if (!piece || piece.used) throw new Error("Invalid piece id");

        const targetCell = Board.getCellById(game.board, targetCellId);
        if (!targetCell) throw new Error("Invalid cell id");

        const canPlace = Cell.canPlacePiece(
            targetCell,
            piece,
            Players.getAllPlayersPieces(game.players),
        );
        if (!canPlace) throw new Error("Illegal move");

        return Game.evaluateGameState({
            ...game,
            board: Board.placePiece(game.board, targetCellId, pieceId),
            players: Players.usePiece(game.players, game.playerTurn, piece),
        });
    },
    getRandomMove: (game: Game): { cellId: Cell["id"]; pieceId: Piece["id"] } | null => {
        const player = Game.getCurrentTurnPlayer(game);
        const availablePieces = player.pieces.filter(piece => !piece.used);
        const piecesWithRandomTargetCell = availablePieces
            .map(piece => {
                const cells = game.board.cells.filter(cell =>
                    Cell.canPlacePiece(cell, piece, Players.getAllPlayersPieces(game.players)),
                );
                const target = sample(cells);
                if (cells.length === 0 || !target) return null;
                return {
                    pieceId: piece.id,
                    cellId: target.id,
                };
            })
            .filter(isNotNullable);
        return sample(piecesWithRandomTargetCell) || null;
    },
    evaluateGameState: (game: Game): Game => {
        const allPlayersPieces = Players.getAllPlayersPieces(game.players);
        for (const [condA, condB, condC] of WINNING_CONDITIONS) {
            const cellA = game.board.cells[condA];
            const cellB = game.board.cells[condB];
            const cellC = game.board.cells[condC];
            if (!cellA || !cellB || !cellC) continue;

            const cellAOwner = allPlayersPieces.find(
                ({ id }) => id === cellA.dominantPieceId,
            )?.ownerId;
            const cellBOwner = allPlayersPieces.find(
                ({ id }) => id === cellB.dominantPieceId,
            )?.ownerId;
            const cellCOwner = allPlayersPieces.find(
                ({ id }) => id === cellC.dominantPieceId,
            )?.ownerId;
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
        const isDraw = !Player.canMakeAnyMove(
            nextTurnPlayer,
            game.board,
            Players.getAllPlayersPieces(game.players),
        );
        if (isDraw) {
            return { ...game, state: { state: "DRAW" } };
        }
        //toggle turn
        return { ...game, playerTurn: nextTurnPlayerKey };
    },
    getNextTurnPlayerKey: (game: Game): PlayerKey => (game.playerTurn === "one" ? "two" : "one"),
    getCurrentTurnPlayer: (game: Game): Player => game.players[game.playerTurn],
};
