import { asValue } from "awilix";
import * as Slot from "sc-cascading-slot-base";
import { TreasureIslandFreeSpins, TreasureIslandTotalMultipliers, TreasureIslandRounds } from "./models";

export default class TreasureIslandContainerRegistry extends Slot.CascadingSlotContainerRegistry {
    registerModels() {
        super.registerModels();
        this.container.register({
            roundsRepository: asValue(TreasureIslandRounds),
            freeSpinsRepository: asValue(TreasureIslandFreeSpins),
            totalMultiplierRepository: asValue(TreasureIslandTotalMultipliers),
        });
    }
}
