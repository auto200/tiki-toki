import React from "react";
import { Button, Center, Modal, Stack, Title } from "@mantine/core";

import { GameComponent } from "@components/GameComponent";

import { useGame } from "hooks/useGame";
import { Cell, Game, Piece, PlayerKey } from "tic-tac-shared/game-core";
import { OnlineRoomState } from "tic-tac-shared/online";

import { RematchButton, RematchButtonProps } from "./RematchButton";

type GameViewProps = {
    game: Game;
    onMakeMove: (selectedPieceId: Piece["id"], cellId: Cell["id"]) => void;
    onLeaveEndedGame: () => void;
    onRematchProposition: () => void;
    allyPlayerKey: PlayerKey;
    enemyPlayerKey: PlayerKey;
    roomState: OnlineRoomState;
};

export const GameView: React.FC<GameViewProps> = ({
    game,
    onMakeMove,
    onLeaveEndedGame,
    onRematchProposition,
    allyPlayerKey,
    enemyPlayerKey,
    roomState,
}) => {
    const {
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        isGameActive,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
        isEndGameModalOpen,
        endGameComposition,
    } = useGame(game);

    const handleMakeMove = (cellId: Cell["id"]) => {
        if (!selectedPieceId) return;
        onMakeMove(selectedPieceId, cellId);
        setSelectedPieceId(null);
    };

    const gameState = game.state.state;

    const getRematchStatus = (): RematchButtonProps["status"] => {
        if (roomState.playersReadyToRematch.length === 0) return "none";

        if (roomState.playersReadyToRematch.includes(game.players[allyPlayerKey].id)) {
            return "waitingForOtherPlayer";
        }

        return "otherPlayerWantsRematch";
    };

    return (
        <>
            <GameComponent
                game={game}
                isGameActive={isGameActive}
                allPlayersPieces={allPlayersPieces}
                cellIdsThatSelectedPieceCanBePlacedIn={cellIdsThatSelectedPieceCanBePlacedIn}
                makeMove={handleMakeMove}
                selectedPiece={selectedPiece}
                selectedPieceId={selectedPieceId}
                setSelectedPieceId={setSelectedPieceId}
                allyPlayerKey={allyPlayerKey}
                enemyPlayerKey={enemyPlayerKey}
                isMyTurn={game.playerTurn === allyPlayerKey}
                endGameComposition={endGameComposition}
            />
            <Modal
                opened={isEndGameModalOpen}
                centered
                closeOnEscape={false}
                withCloseButton={false}
                closeOnClickOutside={false}
                onClose={() => {}}
            >
                <Center data-cy="end-game-modal">
                    <Stack>
                        <Title align="center">
                            {gameState === "ENDED" && `Player ${Game.getWinnerKey(game)} won!`}
                            {gameState === "DRAW" && `Draw!`}
                        </Title>
                    </Stack>
                </Center>
                <Center mt="xl" sx={{ gap: "20px" }}>
                    <RematchButton onClick={onRematchProposition} status={getRematchStatus()}>
                        Rematch
                    </RematchButton>
                    <Button onClick={onLeaveEndedGame}>Leave</Button>
                </Center>
            </Modal>
        </>
    );
};
