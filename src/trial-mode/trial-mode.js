import { TrialMode } from "sc-trial-mode";

export default class TreasureIslandTrialMode {
    constructor(trialModeRoundCalculator, logService) {
        this.trialModeRoundCalculator = trialModeRoundCalculator;
        this.logService = logService;

        this.trialMode = new TrialMode(this.trialModeRoundCalculator, this.logService.logError);
    }

    init(configs) {
        this.trialMode.init(configs);
    }

    registerSocketEvent(socketClient) {
        socketClient.removeAllListeners("inGame");
        socketClient.removeAllListeners("bet");
        socketClient.removeAllListeners("disconnect");

        this.trialMode.registerSocketHandler(socketClient);
    }
}
