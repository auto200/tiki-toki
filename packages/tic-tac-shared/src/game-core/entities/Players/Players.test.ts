import { Player } from "../Player/Player";
import { Players } from "./Players";

describe("players", () => {
    it("should return proper player key for given id", () => {
        const player1Id = "player-one";
        const player2Id = "player-two";

        const players = Players.create(Player.create(player1Id), Player.create(player2Id));

        const player1Key = Players.playerIdToPlayerKey(players, player1Id);
        const player2Key = Players.playerIdToPlayerKey(players, player2Id);

        expect(player1Key).toEqual("one");
        expect(player2Key).toEqual("two");
    });
});
