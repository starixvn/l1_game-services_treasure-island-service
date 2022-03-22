import { Core } from "sc-game-base";

export default class DemoSocketRouter extends Core.Routers.BaseSocketRouter {
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
