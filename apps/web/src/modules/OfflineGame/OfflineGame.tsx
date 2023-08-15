import { EndGameModal } from "@components/EndGameModal";
import { GameComponent } from "@components/GameComponent";
import { useRouter } from "next/router";
import { PlayerKey } from "tic-tac-shared/game-core";
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

    return (
        <>
            <GameComponent
                game={game}
                isGameActive={isGameActive}
                allPlayersPieces={allPlayersPieces}
                cellIdsThatSelectedPieceCanBePlacedIn={cellIdsThatSelectedPieceCanBePlacedIn}
                makeMove={makeMove}
                selectedPiece={selectedPiece}
                selectedPieceId={selectedPieceId}
                setSelectedPieceId={setSelectedPieceId}
                allyPlayerKey="one"
                enemyPlayerKey="two"
                isMyTurn={mode === "local1v1" ? true : game.playerTurn === "one"}
                endGameComposition={endGameComposition}
            />
            <EndGameModal
                show={isEndGameModalOpen}
                gameState={game.state.state}
                winnerName={winnerName || ""}
                onRestart={restartGame}
            />
        </>
    );
};
