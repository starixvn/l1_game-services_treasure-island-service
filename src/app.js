import { Core } from "sc-game-base";
import { SlotGameData, SlotGameDefinition } from "sc-slot-game-base";
import appConfigs from "./app-configs";
import ServiceContainerRegistry from "./service-container-registry";
import gameSettings from "./game-settings";

const run = async () => {
    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings);
    const container = new ServiceContainerRegistry().register(appConfigs, definition, gameData);

    const app = new Core.BaseGameApp("Treasure Island", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
