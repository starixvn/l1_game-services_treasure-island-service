import { TreasureIslandTrialMode, TrialModeRoundCalculator } from "../../../src/trial-mode";
import { stub } from "jest-micro-auto-stub";
import { logger } from "sc-common";

jest.mock("sc-trial-mode");

describe("trialMode", () => {
    let treasureIslandTrialMode;

    const trialModeRoundCalculator = stub(TrialModeRoundCalculator);
    const logService = stub(logger);

    beforeEach(() => {
        treasureIslandTrialMode = new TreasureIslandTrialMode(trialModeRoundCalculator, logService);
    });

    describe("init", () => {
        it("should call trialMode.init", () => {
            // Arrange
            const config = {};

            // Act
            treasureIslandTrialMode.init(config);

            // Assert
            expect(treasureIslandTrialMode.trialMode.init).toBeCalledWith(config);
        });
    });

    describe("registerSocketEvent", () => {
        it("should call trialMode.registerSocketEvent", () => {
            // Arrange
            const socketClient = {};

            // Act
            treasureIslandTrialMode.registerSocketEvent(socketClient);

            // Assert
            expect(treasureIslandTrialMode.trialMode.registerSocketHandler).toBeCalledWith(socketClient);
        });
    });
});
