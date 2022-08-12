import { Board as GameBoard } from "@components/Board";
import { EndGameModal } from "@components/EndGameModal/EndGameModal";
import { Pieces } from "@components/Pieces";
import { Center, Stack } from "@mantine/core";
import { getPieceType } from "common/utils";
import { useState } from "react";
import { Board, Cell, Game, Piece, Player, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";
const initGame = () =>
    Game.create(Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO)));

export const Local1v1: React.FC = () => {
    const [game, setGame] = useState(initGame);
    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);

    const { playerTurn, state } = game;
    const isGameActive = game.state.state === "PLAYING";
    const selectedPiece: Piece | null = selectedPieceId
        ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
        : null;
    const cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][] =
        state.state === "PLAYING" && selectedPiece
            ? Board.getAllCellIdsThatPieceCanBePlacedIn(game.board, selectedPiece)
            : [];
    const winnerName =
        state.state === "ENDED" ? Players.playerIdToPlayerKey(game.players, state.winnerId) : null;

    const makeMove = (cellId: string) => {
        const currentTurnPlayer = Game.getCurrentTurnPlayer(game);
        const cell = Board.getCellById(game.board, cellId);
        if (!selectedPiece || !cell) return;
        try {
            setGame(Game.makeMove(game, currentTurnPlayer, selectedPiece, cell));
            setSelectedPieceId(null);
        } catch (err) {
            console.log("couldn't make a move");
        }
    };

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
                onRestart={() => setGame(initGame())}
            />
        </>
    );
};
