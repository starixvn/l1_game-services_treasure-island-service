import { gameConfigs } from "sc-base-database";
import { GameClientDriver } from "sc-game-service-integration-utils";

import mongoose from "mongoose";
import { middlewares } from "sc-common";
import configs from "../../src/app-configs.IGT";
import { initUserSession } from "./helpers";
import { socketOptions } from "./stubs/test-data";
import { placeBetUser } from "./stubs/user-stub";

const JEST_ASSERT_WAITING_RESPONSE_TIMEOUT = 80000;

describe("event place bet", () => {
    beforeAll(() => {
        jest.setTimeout(JEST_ASSERT_WAITING_RESPONSE_TIMEOUT);
    });

    describe("when game enabled", () => {
        it("should return endBet info", (done) => {
            // Arrange
            let userClientDriver = new GameClientDriver(socketOptions, initUserSession(placeBetUser));
            const expectedEndBet = 600;

            // Act
            userClientDriver.handleSignedInEvent(() => {
                userClientDriver.emit("bet", { betLevel: 3, coinValue: 10, freeSpin: false });
            });

            // Assert
            userClientDriver.handleEndBetEvent((endBetData) => {
                if (endBetData?.endBet) {
                    expect(endBetData.endBet).toStrictEqual(expectedEndBet);
                    userClientDriver.close();
                    done();
                }
            });
        });
    });

    describe("when game disabled", () => {
        it("should return endBet=-1", async (done) => {
            // Arrange
            await new Promise((r) => setTimeout(r, 10000));
            let userClientDriver = new GameClientDriver(socketOptions, initUserSession(placeBetUser));
            const expectedEndBet = -1;

            // Act
            userClientDriver.handleSignedInEvent(async () => {
                await middlewares.database.configureDatabase(mongoose, configs.database);
                await gameConfigs.updateOne({ name: "treasureisland" }, { enabled: false });
                console.log("update db");
                await new Promise((r) => setTimeout(r, 61000));
                userClientDriver.emit("bet", { betLevel: 4, coinValue: 10, freeSpin: false });

                // Assert
                userClientDriver.handleEndBetEvent(async (endBetData) => {
                    if (endBetData?.endBet) {
                        expect(endBetData.endBet).toStrictEqual(expectedEndBet);
                        await gameConfigs.updateOne({ name: "treasureisland" }, { enabled: true });
                        userClientDriver.close();
                        done();
                    }
                });
            });
        });
    });
});
