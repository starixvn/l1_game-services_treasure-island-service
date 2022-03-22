import { Core } from "sc-game-base";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { init as initApis } from "sc-base-apis";
import { logger } from "sc-common";
import DemoGameStartup from "./demo-game-startup";
import * as awilix from "awilix";

export default class DemoGameApp extends Core.BaseGameApp {
    /**
     * @param {awilix.AwilixContainer} container
     */
    async startGame(container) {
        container.register({ baseMetrics: awilix.asValue(this.baseMetrics) });
        const gameStartUp = new DemoGameStartup(container);
        await gameStartUp.start(this.app, this.socketServer);
    }

    async configureServices(app) {
        const corsOptions = {
            origin: (origin, callback) => {
                if (this.appConfigs.corsUrls.includes(origin) || !origin) {
                    callback(null, true);
                } else {
                    callback(new Error(`Not allowed by CORS ${origin}`));
                }
            },
        };

        app.use(cors(corsOptions));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan("combined"));
        app.use(helmet());
        app.set("port", process.env.PORT || this.appConfigs.hostingPort);

        if (this.appConfigs.enabledLogs) {
            logger.start(this.appConfigs.sentry);
        }

        await initApis(this.appConfigs.apiSettings);
    }
}
