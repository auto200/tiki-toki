import { GameComponent, GameComponentProps } from "@components/GameComponent";
import { Center, Modal, Stack, Title } from "@mantine/core";
import { useEndGameModal } from "hooks/useEndGameModal";
import { useGame } from "hooks/useGame";
import React from "react";
import { Cell, Game, Piece, PlayerKey } from "tic-tac-shared";

type GameViewProps = {
    game: Game;
    makeMove: (selectedPieceId: Piece["id"], cellId: Cell["id"]) => void;
    allyPlayerKey: PlayerKey;
    enemyPlayerKey: PlayerKey;
};

export const GameView: React.FC<GameViewProps> = ({
    game,
    makeMove,
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
    } = useGame(game);
    const { showEndGameModal } = useEndGameModal(game);

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
    };

    return (
        <>
            <GameComponent {...gameComponentProps} />
            <Modal
                opened={showEndGameModal}
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
            </Modal>
        </>
    );
};
