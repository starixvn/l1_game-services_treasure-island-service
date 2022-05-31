import { asValue, asClass } from "awilix";
import * as Slot from "sc-cascading-slot-base";
import TreasureIslandGameCron from "./crons/treasure-island-game-cron";
import { TreasureIslandFreeSpins, TreasureIslandTotalMultipliers, TreasureIslandRounds } from "./models";
import { TreasureIslandTrialMode, TrialModeBoardGenerator, TrialModeRoundCalculator } from "./trial-mode";

export default class TreasureIslandContainerRegistry extends Slot.CascadingSlotContainerRegistry {
    register(appConfigs, definition, gameData) {
        this.registerTrialMode();

        super.register(appConfigs, definition, gameData);

        return this.container;
    }

    registerTrialMode() {
        this.container.register({
            trialModeRoundCalculator: asClass(TrialModeRoundCalculator).proxy(),
            trialModeBoardGenerator: asClass(TrialModeBoardGenerator).singleton(),
            treasureIslandTrialMode: asClass(TreasureIslandTrialMode).singleton(),
        });
    }

    registerModels() {
        super.registerModels();
        this.container.register({
            roundsRepository: asValue(TreasureIslandRounds),
            freeSpinsRepository: asValue(TreasureIslandFreeSpins),
            totalMultiplierRepository: asValue(TreasureIslandTotalMultipliers),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(TreasureIslandGameCron).singleton().proxy(),
        });
    }
}
