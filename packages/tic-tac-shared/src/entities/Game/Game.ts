import { nanoid } from "nanoid";
import { WINNING_CONDITIONS } from "../../constants";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece } from "../Piece";
import { Player } from "../Player";
import { PlayerKey, Players } from "../Players";

export type Game = {
    id: string;
    board: Board;
    players: Players;
    playerTurn: PlayerKey;
    /**playerId*/
    winnerId: null | string;
    isDraw: boolean;
    /**game result*/
    winningCellsIds: null | string[];
};

export const Game = {
    create: (
        players: Players,
        board: Board = Board.create(),
        initialPlayerTurn?: PlayerKey,
        id: string = nanoid(),
    ): Game => ({
        id,
        board,
        isDraw: false,
        players,
        playerTurn: initialPlayerTurn || Players.getInitialPlayerTurn(players),
        winnerId: null,
        winningCellsIds: null,
    }),

    makeMove: (game: Game, player: Player, piece: Piece, target: Cell): Game | null => {
        const isGameFinished = !!game.winnerId;
        const isPlayerInGame = Game.isPlayerInTheGame(game, player);
        const isPlayersTurn = game.players[game.playerTurn].id === player.id;
        const isPlayerPieceOwner = Player.isPieceOwner(player, piece);
        const canPlace = Cell.canPlacePiece(target, piece);
        if (isGameFinished || !isPlayerInGame || !isPlayersTurn || !isPlayerPieceOwner || !canPlace)
            return null;

        return Game.evaluateGameState({
            ...game,
            board: Board.placePiece(game.board, target, piece),
            players: Players.usePiece(game.players, game.playerTurn, piece),
        });
    },
    isPlayerInTheGame: (game: Game, player: Player): boolean =>
        Object.values(game.players).some(gamePlayer => gamePlayer.id === player.id),
    evaluateGameState: (game: Game): Game => {
        for (const [condA, condB, condC] of WINNING_CONDITIONS) {
            const cellA = game.board.cells[condA];
            const cellB = game.board.cells[condB];
            const cellC = game.board.cells[condC];

            const cellAOwner = cellA?.dominantPiece?.ownerId;
            const cellBOwner = cellB?.dominantPiece?.ownerId;
            const cellCOwner = cellC?.dominantPiece?.ownerId;
            if (!cellAOwner || !cellBOwner || !cellCOwner) {
                continue;
            }
            // end of the game
            if (cellAOwner === cellBOwner && cellBOwner === cellCOwner) {
                return {
                    ...game,
                    winnerId: cellAOwner,
                    winningCellsIds: [cellA.id, cellB.id, cellC.id],
                };
            }
        }
        //check for draw
        const nextTurnPlayerKey = Game.getNextTurnPlayerKey(game);
        // const nextTurnPlayer = game.players[nextTurnPlayerKey];
        // const isDraw = !nextTurnPlayer.pieces.some(piece =>
        //     game.board.cells.some(cell => Cell.canPlacePiece(cell, piece)),
        // );
        // if (isDraw) {
        //     return { ...game, isDraw };
        // }
        //toggle turn
        return { ...game, playerTurn: nextTurnPlayerKey };
    },
    getNextTurnPlayerKey: (game: Game): PlayerKey => (game.playerTurn === "one" ? "two" : "one"),
};
