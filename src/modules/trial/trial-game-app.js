import { Core } from "sc-game-base";
import TrialGameStartup from "./trial-game-startup";
import * as awilix from "awilix";

export default class TrialGameApp extends Core.BaseGameApp {
    /**
     * @param {awilix.AwilixContainer} container
     */
    async startGame(container, socketServer) {
        container.register({ baseMetrics: awilix.asValue(this.baseMetrics) });
        const gameStartUp = new TrialGameStartup(container);
        await gameStartUp.start(this.app, socketServer);
    }
}
