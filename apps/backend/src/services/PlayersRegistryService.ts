import { GamePlayer } from "../entities/GamePlayer";

export class PlayersRegistryService {
    constructor(private players: Map<string, GamePlayer> = new Map()) {}

    public addPlayer(player: GamePlayer) {
        this.players.set(player.id, player);
    }
    public removePlayer(player: GamePlayer) {
        this.players.delete(player.id);
    }
}
