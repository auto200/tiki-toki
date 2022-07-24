import { Container, SimpleGrid } from "@mantine/core";
import { Board as GameBoard, GRID_SIZE } from "tic-tac-shared";

type BoardProps = {
    board: GameBoard;
};

export const Board: React.FC<BoardProps> = ({ board }) => {
    return (
        <Container
            sx={{
                position: "relative",
                width: "100%",
                padding: 0,
                "&:after": {
                    content: "''",
                    display: "block",
                    paddingBottom: "100%",
                },
            }}
        >
            <SimpleGrid
                cols={GRID_SIZE}
                spacing="sm"
                sx={({ colors }) => ({
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: colors.gray[4],
                })}
            >
                {board.cells.map(cell => (
                    <Container
                        key={cell.id}
                        sx={({ colors }) => ({
                            backgroundColor: colors.dark[8],
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        })}
                    >
                        {cell.dominantPiece && <Container>piece</Container>}
                    </Container>
                ))}
            </SimpleGrid>
        </Container>
    );
};
