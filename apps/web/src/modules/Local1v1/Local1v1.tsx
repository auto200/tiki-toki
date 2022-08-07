import { Board as GameBoard } from "@components/Board";
import { Pieces } from "@components/Pieces";
import { Center, Stack } from "@mantine/core";
import { getPieceType } from "common/utils";
import { useMemo, useState } from "react";
import { Board, Cell, Game, Piece, Player, Players } from "tic-tac-shared";

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

export const Local1v1: React.FC = () => {
    const [game, setGame] = useState(() =>
        Game.create(Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO))),
    );
    const { playerTurn } = game;

    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);

    const selectedPiece: Piece | null = useMemo(
        () =>
            selectedPieceId
                ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
                : null,
        [selectedPieceId, game],
    );
    const cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][] = useMemo(() => {
        return game.state.state !== "PLAYING" || !selectedPiece
            ? []
            : Board.getAllCellIdsThatPieceCanBePlacedIn(game.board, selectedPiece);
    }, [selectedPiece, game]);

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
        <Center
            sx={{
                minHeight: "100vh",
            }}
        >
            <Stack
                sx={{
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: 600,
                }}
            >
                <Pieces
                    pieces={game.players.two.pieces}
                    turnActive={playerTurn === "two"}
                    piecesType="enemy"
                    selectedPieceId={selectedPieceId}
                    selectPiece={setSelectedPieceId}
                />
                <GameBoard
                    board={game.board}
                    canPlaceIn={cellIdsThatSelectedPieceCanBePlacedIn}
                    makeMove={makeMove}
                    getPieceType={piece => getPieceType(game.players, piece)}
                />
                <Pieces
                    pieces={[...game.players.one.pieces].reverse()}
                    turnActive={playerTurn === "one"}
                    piecesType="ally"
                    selectedPieceId={selectedPieceId}
                    selectPiece={setSelectedPieceId}
                />
            </Stack>
        </Center>
    );
};
