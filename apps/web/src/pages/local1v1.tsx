import { Board } from "@components/Board";
import { Pieces } from "@components/Pieces";
import { Center, Stack } from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";
import { Game, Player, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

const Home: NextPage = () => {
    const [game, setGame] = useState(() =>
        Game.create(Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO))),
    );
    const { state: state } = game;

    return (
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
            <Stack
                sx={{
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: 600,
                }}
            >
                <Pieces pieces={game.players.two.pieces} />
                <Board board={game.board} />
                <Pieces pieces={[...game.players.one.pieces].reverse()} />
            </Stack>
        </Center>
    );
};

export default Home;
