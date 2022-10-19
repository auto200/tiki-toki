import { Board } from "@components/Board";
import { PieceProps } from "@components/Piece";
import { Pieces } from "@components/Pieces";
import { Stack } from "@mantine/core";
import { EndGameComposition } from "common/models";
import React from "react";
import { Cell, Game, Piece, PlayerKey } from "tic-tac-shared";

export type GameComponentProps = {
    game: Game;
    isGameActive: boolean;
    selectedPieceId: Piece["id"] | null;
    setSelectedPieceId: (id: Piece["id"]) => void;
    cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][];
    makeMove: (cellId: Cell["id"]) => void;
    selectedPiece: Piece | null;
    allPlayersPieces: Piece[];
    allyPlayerKey: PlayerKey;
    enemyPlayerKey: PlayerKey;
    isMyTurn: boolean;
    endGameComposition: EndGameComposition;
};

export const GameComponent: React.FC<GameComponentProps> = ({
    game,
    isGameActive,
    selectedPieceId,
    setSelectedPieceId,
    cellIdsThatSelectedPieceCanBePlacedIn,
    makeMove,
    selectedPiece,
    allPlayersPieces,
    allyPlayerKey,
    enemyPlayerKey,
    isMyTurn,
    endGameComposition,
}) => {
    const enemyPieces = game.players[enemyPlayerKey].pieces;
    const allyPieces = game.players[allyPlayerKey].pieces;

    const getPieceColor = (piece: Piece): PieceProps["color"] =>
        enemyPieces[0]?.ownerId === piece.ownerId ? "red" : "green";

    return (
        <>
            <Stack
                sx={{
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: 660,
                    gap: 0,
                }}
            >
                <Pieces
                    pieces={enemyPieces}
                    turnActive={isGameActive && game.playerTurn === enemyPlayerKey}
                    canMakeMove={isMyTurn}
                    piecesColor="red"
                    selectedPieceId={selectedPieceId}
                    selectPiece={setSelectedPieceId}
                />
                <Board
                    board={game.board}
                    canPlaceIn={cellIdsThatSelectedPieceCanBePlacedIn}
                    makeMove={makeMove}
                    getPieceColor={getPieceColor}
                    selectedPiece={selectedPiece}
                    allPlayersPieces={allPlayersPieces}
                    endGameComposition={endGameComposition}
                />
                <Pieces
                    pieces={[...allyPieces].reverse()}
                    turnActive={isGameActive && game.playerTurn === allyPlayerKey}
                    canMakeMove={isMyTurn}
                    piecesColor="green"
                    selectedPieceId={selectedPieceId}
                    selectPiece={setSelectedPieceId}
                />
            </Stack>
        </>
    );
};
