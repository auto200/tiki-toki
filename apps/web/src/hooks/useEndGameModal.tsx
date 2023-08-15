import { END_GAME_ANIMATION_DURATION_MS } from "common/constants";
import { useEffect, useState } from "react";
import { Game } from "tic-tac-shared/game-core";

export const useEndGameModal = (game: Game) => {
    const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false);

    useEffect(() => {
        if (game.state.state === "ENDED" || game.state.state === "DRAW") {
            setTimeout(() => {
                setIsEndGameModalOpen(true);
                //giving it a little bit of extra idle time at the end to feel
                //more natural
            }, END_GAME_ANIMATION_DURATION_MS + 200);
            return;
        }

        setIsEndGameModalOpen(false);
    }, [game]);

    return { isEndGameModalOpen };
};
