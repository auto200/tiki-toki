import { useGame } from "hooks/useGame";
import { useCallback, useState } from "react";
import { Cell, Game, Player, PlayerKey, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

const initGame = (startingPlayer?: PlayerKey) =>
    Game.create(
        Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO)),
        undefined,
        startingPlayer,
    );

export const useGameOfflineGame = () => {
    const [game, setGame] = useState(initGame);
    const {
        isGameActive,
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
        winnerName,
    } = useGame(game);

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
