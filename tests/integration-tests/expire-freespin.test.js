import mongoose from "mongoose";
import { gameNotifications } from "sc-base-database";
import { middlewares } from "sc-common";
import configs from "../../src/app-configs.IGT";
import GameSettings from "../../src/game-settings";
import { TreasureIslandTotalMultipliers } from "../../src/models";
import { playerFreeSpins } from "./stubs/test-data";
const JEST_ASSERT_WAITING_RESPONSE_TIMEOUT = 80000;

describe("event expire freeSpin", () => {
    const playerFreeSpin = playerFreeSpins[0];

    describe("when freeSpin expired", () => {
        beforeEach(() => {
            jest.setTimeout(JEST_ASSERT_WAITING_RESPONSE_TIMEOUT);
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it("should remove game notification", async () => {
            // Arrange
            await middlewares.database.configureDatabase(mongoose, configs.database);
            await gameNotifications.create({
                uid: playerFreeSpin.uid,
                gameId: GameSettings.id,
                gameInfo: { freeSpinExpiryTime: playerFreeSpin.expiryTime },
            });

            // Act
            await new Promise((r) => setTimeout(r, 61000));
            const actualResult = await gameNotifications.find({
                uid: playerFreeSpin.uid,
                gameId: GameSettings.id,
            });

            // Assert
            expect(actualResult.length).toBe(0);
        });

        it("should stop total multiplier chain", async () => {
            // Arrange
            await middlewares.database.configureDatabase(mongoose, configs.database);

            // Act
            await new Promise((r) => setTimeout(r, 61000));
            const actualResult = await TreasureIslandTotalMultipliers.find({
                uid: playerFreeSpin.uid,
                ended: false,
            });

            // Assert
            expect(actualResult.length).toBe(0);
        });
    });
});
