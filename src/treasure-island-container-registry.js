import awilix from "awilix";
import * as Slot from "sc-slot-game-base";

import { TreasureIslandFames, TreasureIslandFreeSpins, TreasureIslandRounds } from "./models";

const { asValue } = awilix;

export default class TreasureIslandContainerRegistry extends Slot.SlotContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(TreasureIslandRounds),
            famesRepository: asValue(TreasureIslandFames),
            freeSpinsRepository: asValue(TreasureIslandFreeSpins),
        });
    }
}
