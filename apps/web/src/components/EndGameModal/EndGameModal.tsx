import { Button, Center, Container, Modal, Stack, Title } from "@mantine/core";
import { GameState, PlayerKey } from "tic-tac-shared";

type EndGameModalProps = {
    show: boolean;
    gameState: GameState["state"];
    winnerName: string;
    onRestart: (startingPlayer?: PlayerKey) => void;
};

export const EndGameModal: React.FC<EndGameModalProps> = ({
    gameState,
    winnerName,
    show,
    onRestart,
}) => {
    return (
        <Modal
            opened={show}
            centered
            closeOnEscape={false}
            withCloseButton={false}
            closeOnClickOutside={false}
            onClose={() => {}}
        >
            <Center data-cy="end-game-modal">
                <Stack>
                    <Title align="center">
                        {gameState === "ENDED" && `Player ${winnerName} won!`}
                        {gameState === "DRAW" && `Draw!`}
                    </Title>
                    <Container>
                        <Button color="grape" onClick={() => onRestart()} data-cy="restart-game">
                            Restart
                        </Button>
                    </Container>
                </Stack>
            </Center>
        </Modal>
    );
};
