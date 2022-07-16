import sample from "lodash/sample";
import { nanoid } from "nanoid";
import { WINNING_CONDITIONS } from "../../constants";
import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece } from "../Piece";
import { Player } from "../Player";

export type Game = {
    id: string;
    board: Board;
    players: {
        one: Player;
        two: Player;
    };
    playerTurn: PlayerKey;
    /**playerId*/
    winnerId: null | string;
    isDraw: boolean;
    /**game result*/
    winningCellsIds: null | string[];
};
export type Players = Game["players"];
export type PlayerKey = keyof Players;

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
        playerTurn: initialPlayerTurn || Game.getInitialPlayerTurn(players),
        winnerId: null,
        winningCellsIds: null,
    }),
    initPlayers: (players: Record<PlayerKey, string>): Players => ({
        one: Player.create(players.one),
        two: Player.create(players.two),
    }),
    getInitialPlayerTurn: (players: Players): PlayerKey =>
        sample(Object.keys(players) as PlayerKey[])!,
    makeMove: (game: Game, player: Player, piece: Piece, target: Cell): Game | null => {
        const isGameFinished = !!game.winnerId;
        const isPlayerInGame = game.id !== player.gameId;
        const isPlayersTurn = game.players[game.playerTurn].id === player.id;
        const isPlayerPieceOwner = Player.isPieceOwner(player, piece);
        const canPlace = Cell.canPlace(target, piece);
        if (isGameFinished || !isPlayerInGame || !isPlayersTurn || !isPlayerPieceOwner || !canPlace)
            return null;

        return Game.evaluateGameState({
            ...game,
            board: Board.placePiece(game.board, target, piece),
        });
    },
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
        const nextTurnPlayer = game.players[nextTurnPlayerKey];
        const isDraw = !nextTurnPlayer.pieces.some(piece =>
            game.board.cells.some(cell => Cell.canPlace(cell, piece)),
        );
        if (isDraw) {
            return { ...game, isDraw };
        }
        //toggle turn
        return { ...game, playerTurn: nextTurnPlayerKey };
    },
    getNextTurnPlayerKey: (game: Game): PlayerKey => (game.playerTurn === "one" ? "two" : "one"),
};
