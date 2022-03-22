import { SlotGameData, SlotGameDefinition } from "sc-slot-game-base";

import appConfigs from "./app-configs";
import DemoGameApp from "./demo-game-app";
import TreasureIslandContainerRegistry from "./treasure-island-container-registry";
import gameSettings from "./game-settings";

const run = async () => {
    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings);
    const container = new TreasureIslandContainerRegistry().register(appConfigs, definition, gameData);
    const app = new DemoGameApp("Treasure Island", appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
