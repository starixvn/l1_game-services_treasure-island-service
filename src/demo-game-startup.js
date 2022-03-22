import express from "express";
import { Server } from "socket.io";
import { Core } from "sc-game-base";

export default class DemoGameStartup extends Core.BaseStartup {
    /**
     *
     * @param {express.Express} app
     * @param {Server} socketServer
     */
    async start(app, socketServer) {
        const gameNameInSocketNamespace = this.definition.name.toLowerCase();
        this.initHttpRouter(app);

        socketServer.of(`/user/${gameNameInSocketNamespace}`).on("connection", (socketClient) => {
            this.initSocketRouter(socketClient);
        });

        socketServer.of(`/admin/${gameNameInSocketNamespace}`).on("connection", (socketClient) => {
            this.initAdminSocketRouter(socketClient);
        });
    }
}
