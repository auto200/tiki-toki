import { nanoid } from "nanoid";
import { Piece, PieceSize } from "../Piece";

export type Player = {
    id: string;
    pieces: Piece[];
};

export const Player = {
    create: (id: string = nanoid(), pieces?: Player["pieces"]): Player => ({
        id,
        pieces: pieces || Player.initPlayerPieces(id),
    }),
    isPieceOwner: (player: Player, piece: Piece): boolean =>
        player.pieces.some(playerPiece => playerPiece.id === piece.id),
    initPlayerPieces: (playerId: string): Player["pieces"] => [
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.small),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.medium),
        Piece.create(playerId, PieceSize.big),
        Piece.create(playerId, PieceSize.big),
    ],
    usePiece: (player: Player, piece: Piece): Player => ({
        ...player,
        pieces: player.pieces.map(playerPiece =>
            playerPiece.id === piece.id ? { ...playerPiece, used: true } : playerPiece,
        ),
    }),
};
