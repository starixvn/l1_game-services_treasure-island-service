import { Core } from "sc-game-base";
import * as oneTumble from "../data/win-1-tumble.json";
import * as twoTumbles from "../data/win-2-tumble.json";
import Chance from "chance";

export default class DemoBetConsumer extends Core.BaseEventConsumers.PlaceBetConsumer {
    consume(player, payload) {
        Object.assign(payload, {
            amount: payload.amount >> 0,
        });

        const samples = [oneTumble, twoTumbles];
        const chance = new Chance();

        this.publisher.publishToUser(player.UID, { endBet: payload.amount });
        this.publisher.publishToUser(player.UID, { finish: chance.pickone(samples) });
    }
}
