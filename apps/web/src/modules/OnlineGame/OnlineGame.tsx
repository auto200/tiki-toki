import { Box, Button, Center, Stack } from "@mantine/core";
import React from "react";
import { assertNotReachable, ClientStatus, Players } from "tic-tac-shared";
import { GameView } from "./components/GameView";
import { useOnlineGame } from "./hooks/useOnlineGame";

export const OnlineGame: React.FC = () => {
    const { state, joinQueue, leaveQueue, makeMove } = useOnlineGame();

    switch (state.status) {
        case ClientStatus.IDLE: {
            return (
                <MenuContainer>
                    <MenuItem icon={<BiSearchAlt />} text="Find Game" onClick={joinQueue} />
                    <MenuItem icon={<BsPeople />} text="Create Lobby" disabled />
                </MenuContainer>
            );
        }
        case ClientStatus.IN_QUEUE: {
            return (
                <Stack>
                    <Center>
                        <Loader variant="dots" />
                    </Center>
                    {/* TODO: add timer */}
                    <Center>in Queue</Center>
                    <Box>
                        <Button onClick={leaveQueue}>Leave Queue</Button>
                    </Box>
                </Stack>
            );
        }
        case ClientStatus.IN_GAME: {
            return (
                <GameView
                    game={state.game}
                    makeMove={makeMove}
                    allyPlayerKey={state.playerKey}
                    enemyPlayerKey={Players.getOtherPlayerKey(state.playerKey)}
                />
            );
        }
        default: {
            assertNotReachable(state);
        }
    }
};
