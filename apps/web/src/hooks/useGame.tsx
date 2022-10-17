import { useState } from "react";
import { Board, Cell, Game, Piece, Player } from "tic-tac-shared";
import { useEndGameModal } from "./useEndGameModal";

export const useGame = (game: Game) => {
    const [selectedPieceId, setSelectedPieceId] = useState<Piece["id"] | null>(null);
    const { isEndGameModalOpen } = useEndGameModal(game);

    const isGameActive = game.state.state === "PLAYING";
    const allPlayersPieces = Game.getAllPlayersPieces(game);
    const selectedPiece: Piece | null = selectedPieceId
        ? Player.getPieceById(Game.getCurrentTurnPlayer(game), selectedPieceId)
        : null;
    const cellIdsThatSelectedPieceCanBePlacedIn: Cell["id"][] =
        game.state.state === "PLAYING" && selectedPiece
            ? Board.getAllCellIdsThatPieceCanBePlacedIn(game.board, selectedPiece, allPlayersPieces)
            : [];
    const winnerName = Game.getWinnerKey(game);

    return {
        selectedPieceId,
        setSelectedPieceId,
        isGameActive,
        selectedPiece,
        cellIdsThatSelectedPieceCanBePlacedIn,
        winnerName,
        allPlayersPieces,
        isEndGameModalOpen,
    };
};
