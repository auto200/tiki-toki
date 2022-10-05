import { GameComponent, GameComponentProps } from "@components/GameComponent";
import { useGame } from "hooks/useGame";
import React from "react";
import { Cell, Game, Piece, PlayerKey } from "tic-tac-shared";

type GameViewProps = {
    game: Game;
    makeMove: (selectedPieceId: Piece["id"], cellId: Cell["id"]) => void;
    allyPlayerKey: PlayerKey;
    enemyPlayerKey: PlayerKey;
};

export const GameView: React.FC<GameViewProps> = ({
    game,
    makeMove,
    allyPlayerKey,
    enemyPlayerKey,
}) => {
    const {
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        isGameActive,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
    } = useGame(game);

    const handleMakeMove = (cellId: Cell["id"]) => {
        if (!selectedPieceId) return;
        makeMove(selectedPieceId, cellId);
        setSelectedPieceId(null);
    };

    const gameComponentProps: GameComponentProps = {
        game,
        isGameActive,
        allPlayersPieces,
        cellIdsThatSelectedPieceCanBePlacedIn,
        makeMove: handleMakeMove,
        selectedPiece,
        selectedPieceId,
        setSelectedPieceId,
        allyPlayerKey,
        enemyPlayerKey,
        isMyTurn: game.playerTurn === allyPlayerKey,
    };

    return <GameComponent {...gameComponentProps} />;
};
