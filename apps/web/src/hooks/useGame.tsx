import { EndGameComposition } from "common/models";
import { useMemo, useState } from "react";
import { Board, Cell, Game, Piece, Player } from "tic-tac-shared";
import { useEndGameModal } from "./useEndGameModal";

export const useGame = (game: Game) => {
    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);
    const { isEndGameModalOpen } = useEndGameModal(game);

    const isGameActive = useMemo(() => game.state.state === "PLAYING", [game.state.state]);
    const allPlayersPieces = useMemo(() => Game.getAllPlayersPieces(game), [game]);
    const selectedPiece = useMemo<Piece | null>(
        () =>
            selectedPieceId
                ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
                : null,
        [game, selectedPieceId],
    );
    const cellIdsThatSelectedPieceCanBePlacedIn = useMemo<Cell["id"][]>(
        () =>
            game.state.state === "PLAYING" && selectedPiece
                ? Board.getAllCellIdsThatPieceCanBePlacedIn(
                      game.board,
                      selectedPiece,
                      allPlayersPieces,
                  )
                : [],
        [game.state.state, game.board, selectedPiece, allPlayersPieces],
    );
    const winnerName = useMemo(() => Game.getWinnerKey(game), [game]);
    const endGameComposition = useMemo<EndGameComposition>(() => {
        if (game.state.state === "DRAW") return "DRAW";
        if (game.state.state === "ENDED") return game.state.composition;
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [game.state.state]);

    return {
        selectedPieceId,
        setSelectedPieceId,
        isGameActive,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        winnerName,
        allPlayersPieces,
        isEndGameModalOpen,
        endGameComposition,
    };
};
