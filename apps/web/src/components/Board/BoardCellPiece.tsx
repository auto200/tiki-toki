import { Piece, PieceProps } from "@components/Piece";
import React from "react";
import { Piece as GamePiece } from "tic-tac-shared";

type BoardCellPieceProps = {
    isHovering: boolean;
    canPlace: boolean;
    selectedPiece: GamePiece | null;
    getPieceColor: (piece: GamePiece) => PieceProps["color"];
    dominantPiece: GamePiece | undefined;
};

export const BoardCellPiece: React.FC<BoardCellPieceProps> = ({
    isHovering,
    canPlace,
    selectedPiece,
    getPieceColor,
    dominantPiece,
}) => {
    if (selectedPiece && isHovering && canPlace) {
        return <Piece piece={selectedPiece} color={getPieceColor(selectedPiece)} dimmed />;
    }
    if (dominantPiece) {
        return <Piece piece={dominantPiece} color={getPieceColor(dominantPiece)} animate />;
    }
    return null;
};
