import { Box, Button, Center, Modal, Stack, Title } from "@mantine/core";
import React from "react";
import { assertNotReachable, ClientStatus, Game, Players } from "tic-tac-shared";
import { GameView } from "./components/GameView";
import { useOnlineGame } from "./hooks/useOnlineGame";

export const OnlineGame: React.FC = () => {
    const { state, joinQueue, leaveQueue, makeMove } = useOnlineGame();

    switch (state.status) {
        case ClientStatus.IDLE: {
            return (
                <Box>
                    <Button disabled>Create Lobby</Button>
                    <Button onClick={joinQueue}>Find Game</Button>
                </Box>
            );
        }
        case ClientStatus.IN_QUEUE: {
            return (
                <Stack>
                    <Center>in Queue</Center>
                    <Box>
                        <Button onClick={leaveQueue}>Leave Queue</Button>
                    </Box>
                </Stack>
            );
        }
        case ClientStatus.IN_GAME: {
            const gameState = state.game.state.state;
            return (
                <>
                    <GameView
                        game={state.game}
                        makeMove={makeMove}
                        allyPlayerKey={state.playerKey}
                        enemyPlayerKey={Players.getOtherPlayerKey(state.playerKey)}
                    />
                    <Modal
                        opened={gameState === "ENDED" || gameState === "DRAW"}
                        centered
                        closeOnEscape={false}
                        withCloseButton={false}
                        closeOnClickOutside={false}
                        onClose={() => {}}
                    >
                        <Center data-cy="end-game-modal">
                            <Stack>
                                <Title align="center">
                                    {gameState === "ENDED" &&
                                        `Player ${Game.getWinnerKey(state.game)} won!`}
                                    {gameState === "DRAW" && `Draw!`}
                                </Title>
                            </Stack>
                        </Center>
                    </Modal>
                </>
            );
        }
        default: {
            assertNotReachable(state);
        }
    }
};
