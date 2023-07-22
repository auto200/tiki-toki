import { GameRoomsService } from "@services/GameRoomsService";
import { PairingQueueService } from "@services/PairingQueueService";
import { PlayersRegistryService } from "@services/PlayersRegistryService";

export const createRootService = () => {
    const playersRegistryService = new PlayersRegistryService();
    const gameRoomsService = new GameRoomsService();
    const pairingQueueService = new PairingQueueService();

    return {
        playersRegistryService,
        gameRoomsService,
        pairingQueueService,
    };
};

export type RootService = ReturnType<typeof createRootService>;
