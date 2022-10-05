import sample from "lodash/sample";
import { nanoid } from "nanoid";
import { isNotNullable } from "../../utils";
import { WINNING_CONDITIONS } from "../../utils/constants";
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

        const canPlace = Cell.canPlacePiece(targetCell, piece, Game.getAllPlayersPieces(game));
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
                    Cell.canPlacePiece(cell, piece, Game.getAllPlayersPieces(game)),
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
        const allPlayersPieces = Game.getAllPlayersPieces(game);
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
        const isDraw = !Player.canMakeAnyMove(
            Game.getCurrentTurnPlayer(game),
            game.board,
            Game.getAllPlayersPieces(game),
        );
        if (isDraw) {
            return { ...game, state: { state: "DRAW" } };
        }
        //toggle turn
        return { ...game, playerTurn: Game.getNextTurnPlayerKey(game) };
    },
    getNextTurnPlayerKey: (game: Game): PlayerKey => Players.getOtherPlayerKey(game.playerTurn),
    getCurrentTurnPlayer: (game: Game): Player => game.players[game.playerTurn],
    getAllPlayersPieces: (game: Game): Piece[] =>
        Object.values(game.players).flatMap(player => player.pieces),
    getWinnerKey: (game: Game): PlayerKey | null =>
        game.state.state === "ENDED"
            ? Players.playerIdToPlayerKey(game.players, game.state.winnerId)
            : null,
};
