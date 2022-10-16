import { Board } from "../Board";
import { Cell } from "../Cell";
import { Piece, PieceSize } from "../Piece";
import { Player } from "../Player";
import { PlayerKey, Players } from "../Players";
import { Game, GameState } from "./Game";

const createPlayerPieces = (playerId: string): Piece[] => [
    Piece.create(playerId, PieceSize.small, `piece-${playerId}-0`),
    Piece.create(playerId, PieceSize.small, `piece-${playerId}-1`),
    Piece.create(playerId, PieceSize.medium, `piece-${playerId}-2`),
    Piece.create(playerId, PieceSize.medium, `piece-${playerId}-3`),
    Piece.create(playerId, PieceSize.big, `piece-${playerId}-4`),
    Piece.create(playerId, PieceSize.big, `piece-${playerId}-5`),
];
const createBoardCells = (): Board["cells"] => [
    Cell.create("cell-0"),
    Cell.create("cell-1"),
    Cell.create("cell-2"),
    Cell.create("cell-3"),
    Cell.create("cell-4"),
    Cell.create("cell-5"),
    Cell.create("cell-6"),
    Cell.create("cell-7"),
    Cell.create("cell-8"),
];

describe("Game", () => {
    const GAME_ID = "GAME_0";
    const PLAYER_ONE_ID = "player-one";
    const PLAYER_TWO_ID = "player-two";
    const INITIAL_PLAYER_TURN: PlayerKey = "one";

    it("should create game correctly", () => {
        const players = Players.create(
            Player.create(PLAYER_ONE_ID, createPlayerPieces(PLAYER_ONE_ID)),
            Player.create(PLAYER_TWO_ID, createPlayerPieces(PLAYER_TWO_ID)),
        );
        const board = Board.create(createBoardCells());
        const game = Game.create(players, board, INITIAL_PLAYER_TURN, GAME_ID);

        const expected: Game = {
            id: GAME_ID,
            state: { state: "PLAYING" },
            board: {
                cells: [
                    { id: "cell-0", dominantPieceId: null, pieces: [] },
                    { id: "cell-1", dominantPieceId: null, pieces: [] },
                    { id: "cell-2", dominantPieceId: null, pieces: [] },
                    { id: "cell-3", dominantPieceId: null, pieces: [] },
                    { id: "cell-4", dominantPieceId: null, pieces: [] },
                    { id: "cell-5", dominantPieceId: null, pieces: [] },
                    { id: "cell-6", dominantPieceId: null, pieces: [] },
                    { id: "cell-7", dominantPieceId: null, pieces: [] },
                    { id: "cell-8", dominantPieceId: null, pieces: [] },
                ],
            },
            players: {
                one: {
                    id: PLAYER_ONE_ID,
                    pieces: [
                        {
                            id: `piece-${PLAYER_ONE_ID}-0`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.small,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_ONE_ID}-1`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.small,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_ONE_ID}-2`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.medium,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_ONE_ID}-3`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.medium,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_ONE_ID}-4`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.big,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_ONE_ID}-5`,
                            ownerId: PLAYER_ONE_ID,
                            size: PieceSize.big,
                            used: false,
                        },
                    ],
                },
                two: {
                    id: PLAYER_TWO_ID,
                    pieces: [
                        {
                            id: `piece-${PLAYER_TWO_ID}-0`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.small,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_TWO_ID}-1`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.small,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_TWO_ID}-2`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.medium,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_TWO_ID}-3`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.medium,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_TWO_ID}-4`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.big,
                            used: false,
                        },
                        {
                            id: `piece-${PLAYER_TWO_ID}-5`,
                            ownerId: PLAYER_TWO_ID,
                            size: PieceSize.big,
                            used: false,
                        },
                    ],
                },
            },
            playerTurn: INITIAL_PLAYER_TURN,
        };

        expect(game).toEqual(expected);
    });
    it("should be able to play mock game", () => {
        const players: Players = {
            one: Player.create(PLAYER_ONE_ID, createPlayerPieces(PLAYER_ONE_ID)),
            two: Player.create(PLAYER_TWO_ID, createPlayerPieces(PLAYER_TWO_ID)),
        };
        const board = Board.create(createBoardCells());
        const game = Game.create(players, board, INITIAL_PLAYER_TURN, GAME_ID);
        // ------------
        // | x |   |   |
        // |-----------|
        // |   |   |   |
        // |-----------|
        // |   |   |   |
        // |-----------|
        const game_turn_0 = Game.makeMove(
            game,
            players.one.pieces[0]?.id!,
            game.board.cells[0]?.id!,
        );
        // ------------
        // | x |   | o |
        // |-----------|
        // |   |   |   |
        // |-----------|
        // |   |   |   |
        // |-----------|
        const game_turn_1 = Game.makeMove(
            game_turn_0!,
            players.two.pieces[0]?.id!,
            game_turn_0!.board.cells[2]?.id!,
        );

        // ------------
        // | x |   | o |
        // |-----------|
        // | x |   |   |
        // |-----------|
        // |   |   |   |
        // |-----------|
        const game_turn_2 = Game.makeMove(
            game_turn_1!,
            players.one.pieces[1]?.id!,
            game_turn_1!.board.cells[3]?.id!,
        );
        // ------------
        // | x |   | o |
        // |-----------|
        // | x |   | o |
        // |-----------|
        // |   |   |   |
        // |-----------|
        const game_turn_3 = Game.makeMove(
            game_turn_2!,
            players.two.pieces[1]?.id!,
            game_turn_2!.board.cells[5]?.id!,
        );
        // ------------
        // | x |   | o |
        // |-----------|
        // | x |   | o |
        // |-----------|
        // | x |   |   |
        // |-----------|
        const game_turn_4 = Game.makeMove(
            game_turn_3!,
            players.one.pieces[3]?.id!,
            game_turn_3!.board.cells[6]?.id!,
        );
        const expectedGameState: GameState = {
            state: "ENDED",
            winnerId: PLAYER_ONE_ID,
            winningCellIndexes: [0, 3, 6],
            composition: "col-1",
        };
        expect(game_turn_4?.state).toEqual(expectedGameState);
    });
});
