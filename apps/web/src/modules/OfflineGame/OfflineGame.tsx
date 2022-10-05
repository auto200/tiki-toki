import { EndGameModal } from "@components/EndGameModal";
import { GameComponent, GameComponentProps } from "@components/GameComponent";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Game, PlayerKey } from "tic-tac-shared";
import { useGameOfflineGame } from "./hooks/useOfflineGame";

export type OfflineGameProps = {
    mode: "local1v1" | "playerVsAi";
};

export const OfflineGame: React.FC<OfflineGameProps> = ({ mode }) => {
    const { startingPlayer } = useRouter().query;
    const {
        game,
        setGame,
        selectedPieceId,
        setSelectedPieceId,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        isGameActive,
        makeMove,
        winnerName,
        restartGame,
        allPlayersPieces,
    } = useGameOfflineGame();

    useEffect(() => {
        if (!startingPlayer) return;
        restartGame(startingPlayer as PlayerKey);
    }, [startingPlayer, restartGame]);

    // AI moves
    useEffect(() => {
        if (mode === "local1v1") return;
        if (game.playerTurn === "one") return;
        const move = Game.getRandomMove(game);
        if (!move) return;
        setGame(Game.makeMove(game, move.pieceId, move.cellId));
    }, [game, setGame, mode]);

    const gameComponentProps: GameComponentProps = {
        game,
        isGameActive,
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        makeMove,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
        allyPlayerKey: "one",
        enemyPlayerKey: "two",
        isMyTurn: mode === "local1v1" ? true : game.playerTurn === "one",
    };

    return (
        <>
            <GameComponent {...gameComponentProps} />
            <EndGameModal
                gameState={game.state.state}
                winnerName={winnerName || ""}
                onRestart={restartGame}
            />
        </>
    );
};
