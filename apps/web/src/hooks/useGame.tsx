import { useCallback, useState } from "react";
import { Board, Cell, Game, Piece, Player, PlayerKey, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

const initGame = (startingPlayer?: PlayerKey) =>
    Game.create(
        Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO)),
        undefined,
        startingPlayer,
    );

export const useGame = () => {
    const [game, setGame] = useState(initGame);
    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);

    const isGameActive = game.state.state === "PLAYING";
    const allPlayersPieces = Players.getAllPlayersPieces(game.players);
    const selectedPiece: Piece | null = selectedPieceId
        ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
        : null;
    const cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][] =
        game.state.state === "PLAYING" && selectedPiece
            ? Board.getAllCellIdsThatPieceCanBePlacedIn(game.board, selectedPiece, allPlayersPieces)
            : [];
    const winnerName =
        game.state.state === "ENDED"
            ? Players.playerIdToPlayerKey(game.players, game.state.winnerId)
            : null;

    const makeMove = (cellId: Cell["id"]) => {
        if (!selectedPieceId) return;
        try {
            setGame(Game.makeMove(game, selectedPieceId, cellId));
            setSelectedPieceId(null);
        } catch (err) {
            console.log("couldn't make a move");
        }
    };
    const restartGame = useCallback(
        (startingPlayer?: PlayerKey) => setGame(initGame(startingPlayer)),
        [],
    );

    return {
        game,
        setGame,
        selectedPieceId,
        setSelectedPieceId,
        isGameActive,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        winnerName,
        makeMove,
        restartGame,
        allPlayersPieces,
    };
};
