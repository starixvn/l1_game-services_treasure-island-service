import { asClass, asValue } from "awilix";
import * as Slot from "sc-cascading-slot-base";
import InGameConsumer from "./consumers/in-game-consumer";
import TreasureIslandGameCron from "./crons/treasure-island-game-cron";
import { TreasureIslandFreeSpins, TreasureIslandRounds, TreasureIslandTotalMultipliers, currencyGroupGames } from "./models";
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
            currencyGroupGamesRepository: asValue(currencyGroupGames()),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(TreasureIslandGameCron).singleton().proxy(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            inGameConsumer: asClass(InGameConsumer).singleton().proxy(),
        });
    }
}
