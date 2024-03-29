import React from "react";

import { Box, Button, Center, Loader, Stack } from "@mantine/core";
import { BiSearchAlt } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

import { ClientStatus } from "tic-tac-shared/online";
import { assertNotReachable } from "tic-tac-shared/utils";

import { MenuContainer } from "@components/Menu";
import { MenuItem } from "@components/Menu/MenuItem";

import { GameView } from "./components/GameView";
import { useOnlineGame } from "./hooks/useOnlineGame";

export const OnlineGame = () => {
    const { state, joinQueue, leaveQueue, makeMove, leaveEndedGame, rematchProposition } =
        useOnlineGame();

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
                    onMakeMove={makeMove}
                    allyPlayerKey={state.playerKey}
                    enemyPlayerKey={state.enemyPlayerKey}
                    onLeaveEndedGame={leaveEndedGame}
                    onRematchProposition={rematchProposition}
                    roomState={state.roomState}
                />
            );
        }
        default: {
            assertNotReachable(state);

            return <></>;
        }
    }
};
