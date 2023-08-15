import { nanoid } from "nanoid";

export enum PieceSize {
    small,
    medium,
    big,
}

export type Piece = {
    id: string;
    ownerId: string;
    size: PieceSize;
    isUsed: boolean;
};

export const Piece = {
    create: (
        ownerId: string,
        size: PieceSize,
        id: string = nanoid(),
        isUsed: boolean = false,
    ): Piece => ({
        id,
        ownerId,
        size,
        isUsed,
    }),
};
