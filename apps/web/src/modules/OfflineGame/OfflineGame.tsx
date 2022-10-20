import { EndGameModal } from "@components/EndGameModal";
import { GameComponent, GameComponentProps } from "@components/GameComponent";
import { useRouter } from "next/router";
import { PlayerKey } from "tic-tac-shared";
import { OfflineGameMode, useOfflineGame } from "./hooks/useOfflineGame";

export type OfflineGameProps = {
    mode: OfflineGameMode;
};

export const OfflineGame: React.FC<OfflineGameProps> = ({ mode }) => {
    const startingPlayer = useRouter().query.startingPlayer as PlayerKey | undefined;
    const {
        game,
        selectedPieceId,
        setSelectedPieceId,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        isGameActive,
        makeMove,
        winnerName,
        restartGame,
        allPlayersPieces,
        isEndGameModalOpen,
        endGameComposition,
    } = useOfflineGame(mode, startingPlayer);

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
        endGameComposition,
    };

    return (
        <>
            <GameComponent {...gameComponentProps} />
            <EndGameModal
                show={isEndGameModalOpen}
                gameState={game.state.state}
                winnerName={winnerName || ""}
                onRestart={restartGame}
            />
        </>
    );
};
