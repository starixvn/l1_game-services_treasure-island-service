import GameApp from "./game-app";
import { SlotGameData, SlotGameDefinition } from "sc-slot-game-base";
import appConfigs from "./app-configs";
import TreasureIslandContainerRegistry from "./treasure-island-container-registry";
import gameSettings from "./game-settings";
import trace from "./trace";

class App extends GameApp {
    async configureServices(app) {
        await super.configureServices(app);
    }
}

const run = async () => {
    trace.start();

    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings);
    const container = new TreasureIslandContainerRegistry().register(appConfigs, definition, gameData);
    const app = new App("Treasure Island", appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
