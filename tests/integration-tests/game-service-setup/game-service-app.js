import { SlotGameData, SlotGameDefinition } from "sc-slot-game-base";
import { initAPIStub } from "sc-game-service-integration-utils";

import appConfigs from "../../../src/app-configs";
import gameSettings from "../../../src/game-settings";
import TreasureIslandContainerRegistry from "../../../src/treasure-island-container-registry";
import GameApp from "../../../src/game-app";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings);
    const container = new TreasureIslandContainerRegistry().register(appConfigs, definition, gameData);

    const app = new GameApp(gameSettings.name, appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
