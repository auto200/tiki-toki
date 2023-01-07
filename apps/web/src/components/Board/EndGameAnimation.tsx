import { EndGameComposition } from "common/models";
import React from "react";
import { WinningStrike } from "./WinningStrike";

type EndGameAnimationProps = {
    composition: NonNullable<EndGameComposition>;
};

export const EndGameAnimation: React.FC<EndGameAnimationProps> = ({ composition }) => {
    if (composition === "DRAW") {
        return (
            <>
                <WinningStrike composition={"dia-1"} />
                <WinningStrike composition={"dia-2"} />
            </>
        );
    }

    return <WinningStrike composition={composition} />;
};
