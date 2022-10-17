import { useGame } from "hooks/useGame";
import { useCallback, useEffect, useState } from "react";
import { Cell, Game, Player, PlayerKey, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

const initGame = (startingPlayer?: PlayerKey) =>
    Game.create(
        Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO)),
        undefined,
        startingPlayer,
    );

export type OfflineGameMode = "local1v1" | "playerVsAi";

export const useOfflineGame = (mode: OfflineGameMode, startingPlayer: PlayerKey) => {
    const [game, setGame] = useState(initGame);
    const gameInfo = useGame(game);

    const makeMove = (cellId: Cell["id"]) => {
        if (!gameInfo.selectedPieceId) return;
        try {
            setGame(Game.makeMove(game, gameInfo.selectedPieceId, cellId));
            gameInfo.setSelectedPieceId(null);
        } catch (err) {
            console.log("couldn't make a move");
        }
    };
    const restartGame = useCallback(
        (startingPlayer?: PlayerKey) => setGame(initGame(startingPlayer)),
        [],
    );

    useEffect(() => {
        if (!startingPlayer) return;
        restartGame(startingPlayer as PlayerKey);
    }, [startingPlayer, restartGame]);

    // AI moves
    useEffect(() => {
        if (mode === "local1v1" || game.state.state === "ENDED") return;
        if (game.playerTurn === "one") return;
        const move = Game.getRandomMove(game);
        if (!move) return;
        setGame(Game.makeMove(game, move.pieceId, move.cellId));
    }, [game, setGame, mode]);

    return {
        ...gameInfo,
        game,
        setGame,
        makeMove,
        restartGame,
    };
};
