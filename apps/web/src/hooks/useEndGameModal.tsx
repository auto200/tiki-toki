import { END_GAME_ANIMATION_DURATION_MS } from "common/constants";
import { useEffect, useState } from "react";
import { Game } from "tic-tac-shared";

export const useEndGameModal = (game: Game) => {
    const [showEndGameModal, setShowEndGameModal] = useState(false);

    useEffect(() => {
        if (game.state.state === "ENDED" || game.state.state === "DRAW") {
            setTimeout(() => {
                setShowEndGameModal(true);
                //giving it a little bit of extra idle time at the end to feel
                //more natural
            }, END_GAME_ANIMATION_DURATION_MS + 200);
            return;
        }
        setShowEndGameModal(false);
    }, [game]);

    return { showEndGameModal };
};
