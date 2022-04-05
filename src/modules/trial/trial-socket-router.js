import { Core } from "sc-game-base";

export default class DemoSocketRouter extends Core.Routers.BaseSocketRouter {
    /**
     * @param {Socket} socketClient
     */
    init(socketClient) {
        this.socketClient = socketClient;
        this.socketClient.on("bet", this.handlePlaceBet.bind(this));
        this.socketClient.on("signin", this.handleSignIn.bind(this));
    }

    handlePlaceBet(payload) {
        try {
            if (!this.verify(payload, this.socketClient)) {
                return;
            }

            this.placeBetConsumer.consume(this.gameData.realPlayers[this.socketClient.id], payload);
        } catch (error) {
            this.logService.logError(error);
        }
    }

    verify(payload, socketClient) {
        const userData = {
            UID: socketClient.id,
            profile: { name: `demo${socketClient.id}`, minBet: 10, maxBet: 100000 },
            socketClient,
        };

        this.gameData.realPlayers[socketClient.id] = userData;

        return true;
    }
}
