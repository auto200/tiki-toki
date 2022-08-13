import React, { createContext, useCallback, useContext, useState } from "react";
import { Board, Cell, Game, Piece, Player, Players } from "tic-tac-shared";

type GameContextValue = {
    game: Game;
    setGame: React.Dispatch<React.SetStateAction<Game>>;
    selectedPieceId: string | null;
    setSelectedPieceId: React.Dispatch<React.SetStateAction<Piece["id"] | null>>;
    isGameActive: boolean;
    selectedPiece: Piece | null;
    cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][];
    winnerName: keyof Players | null;
    makeMove: (cellId: Cell["id"]) => void;
    restartGame: () => void;
};

const GameContext = createContext<GameContextValue>({} as any);

const PLAYER_ONE = "PLAYER_ONE";
const PLAYER_TWO = "PLAYER_TWO";

const initGame = () =>
    Game.create(Players.create(Player.create(PLAYER_ONE), Player.create(PLAYER_TWO)));

export const GameContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [game, setGame] = useState(initGame);
    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);

    const isGameActive = game.state.state === "PLAYING";
    const selectedPiece: Piece | null = selectedPieceId
        ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
        : null;
    const cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][] =
        game.state.state === "PLAYING" && selectedPiece
            ? Board.getAllCellIdsThatPieceCanBePlacedIn(game.board, selectedPiece)
            : [];
    const winnerName =
        game.state.state === "ENDED"
            ? Players.playerIdToPlayerKey(game.players, game.state.winnerId)
            : null;

    const makeMove = (cellId: Cell["id"]) => {
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
    const restartGame = useCallback(() => setGame(initGame()), []);

    return (
        <GameContext.Provider
            value={{
                game,
                setGame,
                selectedPieceId,
                setSelectedPieceId,
                isGameActive,
                selectedPiece,
                cellIdsThatSelectedPieceCanBePlacedIn,
                winnerName,
                makeMove,
                restartGame,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);
