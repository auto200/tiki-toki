import { Piece } from "@components/Piece/Piece";
import { Container, SimpleGrid } from "@mantine/core";
import { PieceType } from "common/models";
import { Board as GameBoard, Cell, GRID_SIZE, Piece as GamePiece } from "tic-tac-shared";

type BoardProps = {
    board: GameBoard;
    makeMove: (cellId: Cell["id"]) => void;
    canPlaceIn: Cell["id"][];
    getPieceType: (piece: GamePiece) => PieceType;
};

export const Board: React.FC<BoardProps> = ({ board, makeMove, canPlaceIn, getPieceType }) => {
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
                {board.cells.map(cell => {
                    const canPlace = canPlaceIn.includes(cell.id);
                    return (
                        <Container
                            key={cell.id}
                            onClick={() => canPlace && makeMove(cell.id)}
                            sx={({ colors }) => ({
                                backgroundColor: colors.dark[8],
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: canPlace ? "pointer" : "auto",
                                ...(canPlaceIn.includes(cell.id) && {
                                    "&:hover": {
                                        backgroundColor: colors.dark[7],
                                    },
                                }),
                            })}
                        >
                            {cell.dominantPiece && (
                                <Piece
                                    piece={cell.dominantPiece}
                                    type={getPieceType(cell.dominantPiece)}
                                />
                            )}
                        </Container>
                    );
                })}
            </SimpleGrid>
        </Container>
    );
};
