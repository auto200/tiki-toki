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
    used: boolean;
};

export const Piece = {
    create: (
        ownerId: string,
        size: PieceSize,
        id: string = nanoid(),
        used: boolean = false,
    ): Piece => ({
        id,
        ownerId,
        size,
        used,
    }),
};
