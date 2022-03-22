import awilix from "awilix";
import * as Slot from "sc-slot-game-base";
import DemoCron from "./crons/demo-cron";
import DemoBetConsumer from "./event-consumers/demo-bet-consumer";

import { TreasureIslandFames, TreasureIslandFreeSpins, TreasureIslandRounds } from "./models";
import DemoSocketRouter from "./routers/demo-socket-router";

const { asClass, asValue } = awilix;

export default class TreasureIslandContainerRegistry extends Slot.SlotContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(TreasureIslandRounds),
            famesRepository: asValue(TreasureIslandFames),
            freeSpinsRepository: asValue(TreasureIslandFreeSpins),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(DemoBetConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(DemoCron).singleton().proxy(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            socketRouter: asClass(DemoSocketRouter).proxy(),
        });
    }
}
