import { Board as GameBoard } from "@components/Board";
import { EndGameModal } from "@components/EndGameModal/EndGameModal";
import { Pieces } from "@components/Pieces";
import { Center, Stack } from "@mantine/core";
import { getPieceType } from "common/utils";
import { useGame } from "contexts/GameContext";
import { useEffect } from "react";
import { Game } from "tic-tac-shared";

export const PlayerVsAi: React.FC = () => {
    const {
        game,
        setGame,
        selectedPieceId,
        setSelectedPieceId,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        isGameActive,
        makeMove,
        winnerName,
        restartGame,
    } = useGame();

    useEffect(() => {
        restartGame();
    }, [restartGame]);

    useEffect(() => {
        if (game.playerTurn === "one") return;
        const move = Game.getRandomMove(game);
        if (!move) return;
        setGame(Game.makeMove(game, Game.getCurrentTurnPlayer(game), move.piece, move.cell));
    }, [game, setGame]);

    const { playerTurn } = game;

    return (
        <>
            <Center
                sx={{
                    minHeight: "100vh",
                }}
            >
                <Stack
                    sx={{
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: 660,
                        gap: 0,
                    }}
                >
                    <Pieces
                        pieces={game.players.two.pieces}
                        turnActive={isGameActive && playerTurn === "two"}
                        piecesType="enemy"
                        selectedPieceId={selectedPieceId}
                        selectPiece={setSelectedPieceId}
                    />
                    <GameBoard
                        board={game.board}
                        canPlaceIn={cellIdsThatSelectedPieceCanBePlacedIn}
                        makeMove={makeMove}
                        getPieceType={piece => getPieceType(game.players, piece)}
                        selectedPiece={selectedPiece}
                    />
                    <Pieces
                        pieces={[...game.players.one.pieces].reverse()}
                        turnActive={isGameActive && playerTurn === "one"}
                        piecesType="ally"
                        selectedPieceId={selectedPieceId}
                        selectPiece={setSelectedPieceId}
                    />
                </Stack>
            </Center>
            <EndGameModal
                gameState={game.state.state}
                winnerName={winnerName || ""}
                onRestart={restartGame}
            />
        </>
    );
};
