import { GameComponent, GameComponentProps } from "@components/GameComponent";
import { Button, Center, Modal, Stack, Title } from "@mantine/core";
import { useGame } from "hooks/useGame";
import React from "react";
import { Cell, Game, Piece, PlayerKey } from "tic-tac-shared";

type GameViewProps = {
    game: Game;
    makeMove: (selectedPieceId: Piece["id"], cellId: Cell["id"]) => void;
    leaveEndedGame: () => void;
    allyPlayerKey: PlayerKey;
    enemyPlayerKey: PlayerKey;
};

export const GameView: React.FC<GameViewProps> = ({
    game,
    makeMove,
    leaveEndedGame,
    allyPlayerKey,
    enemyPlayerKey,
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
        makeMove(selectedPieceId, cellId);
        setSelectedPieceId(null);
    };

    const gameState = game.state.state;

    const gameComponentProps: GameComponentProps = {
        game,
        isGameActive,
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        makeMove: handleMakeMove,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
        allyPlayerKey,
        enemyPlayerKey,
        isMyTurn: game.playerTurn === allyPlayerKey,
        endGameComposition,
    };

    return (
        <>
            <GameComponent {...gameComponentProps} />
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
                <Center mt="xl">
                    <Button onClick={leaveEndedGame}>Leave</Button>
                </Center>
            </Modal>
        </>
    );
};
