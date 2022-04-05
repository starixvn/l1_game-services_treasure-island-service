import express from "express";
import { Server } from "socket.io";
import { Core } from "sc-game-base";

export default class TrialGameStartup extends Core.BaseStartup {
    /**
     *
     * @param {express.Express} app
     * @param {Server} socketServer
     */
    async start(app, socketServer) {
        const gameNameInSocketNamespace = this.definition.name.toLowerCase();

        socketServer.of(`/user/trial/${gameNameInSocketNamespace}`).on("connection", (socketClient) => {
            this.initSocketRouter(socketClient);
        });
    }
}
