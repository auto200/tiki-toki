import { Button, Center, Container, Modal, Stack, Title } from "@mantine/core";
import { GameState } from "tic-tac-shared";

type EndGameModalProps = {
    gameState: GameState["state"];
    winnerName: string;
    onRestart: () => void;
};

export const EndGameModal: React.FC<EndGameModalProps> = ({ gameState, winnerName, onRestart }) => {
    return (
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
                        {gameState === "ENDED" && `Player ${winnerName} won!`}
                        {gameState === "DRAW" && `Draw!`}
                    </Title>
                    <Container>
                        <Button color="grape" onClick={onRestart} data-cy="restart-game">
                            Restart
                        </Button>
                    </Container>
                </Stack>
            </Center>
        </Modal>
    );
};
