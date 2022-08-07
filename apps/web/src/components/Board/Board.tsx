import { Piece } from "@components/Piece/Piece";
import { Center, SimpleGrid } from "@mantine/core";
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
        <SimpleGrid
            cols={GRID_SIZE}
            spacing="sm"
            sx={({ colors }) => ({
                aspectRatio: "1",
                backgroundColor: colors.gray[4],
            })}
        >
            {board.cells.map(cell => {
                const canPlace = canPlaceIn.includes(cell.id);
                return (
                    <Center
                        key={cell.id}
                        onClick={() => canPlace && makeMove(cell.id)}
                        sx={({ colors }) => ({
                            backgroundColor: colors.dark[8],
                            width: "100%",
                            aspectRatio: "1",
                            cursor: canPlace ? "pointer" : "auto",
                            ...(canPlace && {
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
                    </Center>
                );
            })}
        </SimpleGrid>
    );
};
