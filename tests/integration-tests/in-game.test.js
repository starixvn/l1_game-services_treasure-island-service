import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";
import { haveTotalMultiplierUser } from "./stubs/user-stub";

const JEST_ASSERT_WAITING_RESPONSE_TIMEOUT = 70000;

describe("event ingame", () => {
    beforeAll(() => {
        jest.setTimeout(JEST_ASSERT_WAITING_RESPONSE_TIMEOUT);
    });

    describe("when not play game yet", () => {
        let userClientDriver;
        afterAll(() => {
            userClientDriver.close();
        });

        it("should return game configs", (done) => {
            // Arrange
            userClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

            const expectedValue = {
                coinValues: [1, 2, 5, 10, 20, 50, 100],
                maxWinPerRound: 50000,
                betLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                betMultiplier: 20,
                odds: {
                    freeSpins: {
                        additionalOdds: [{ count: 4, odds: 3 }],
                        initialOdds: [
                            { count: 4, odds: 3 },
                            { count: 5, odds: 6 },
                            { count: 6, odds: 18 },
                        ],
                    },
                    symbols: {
                        0: [
                            { from: 8, odds: 2, to: 9 },
                            { from: 10, odds: 15, to: 11 },
                            { from: 12, odds: 40, to: 30 },
                        ],
                        1: [
                            { from: 8, odds: 8, to: 9 },
                            { from: 10, odds: 18, to: 11 },
                            { from: 12, odds: 80, to: 30 },
                        ],
                        2: [
                            { from: 8, odds: 10, to: 9 },
                            { from: 10, odds: 20, to: 11 },
                            { from: 12, odds: 100, to: 30 },
                        ],
                        3: [
                            { from: 8, odds: 16, to: 9 },
                            { from: 10, odds: 24, to: 11 },
                            { from: 12, odds: 160, to: 30 },
                        ],
                        4: [
                            { from: 8, odds: 20, to: 9 },
                            { from: 10, odds: 30, to: 11 },
                            { from: 12, odds: 200, to: 30 },
                        ],
                        5: [
                            { from: 8, odds: 30, to: 9 },
                            { from: 10, odds: 40, to: 11 },
                            { from: 12, odds: 240, to: 30 },
                        ],
                        6: [
                            { from: 8, odds: 40, to: 9 },
                            { from: 10, odds: 100, to: 11 },
                            { from: 12, odds: 300, to: 30 },
                        ],
                        7: [
                            { from: 8, odds: 50, to: 9 },
                            { from: 10, odds: 200, to: 11 },
                            { from: 12, odds: 500, to: 30 },
                        ],
                        8: [
                            { from: 8, odds: 200, to: 9 },
                            { from: 10, odds: 500, to: 11 },
                            { from: 12, odds: 1000, to: 30 },
                        ],
                    },
                },
            };

            // Act
            userClientDriver.handleSignedInEvent(() => {
                userClientDriver.sendInGameEvent();
            });

            // Assert
            userClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs).toStrictEqual(expectedValue);
                    done();
                }
            });
        });

        it("should return totalMultiplier = 0", (done) => {
            // Arrange
            userClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            const expectedValue = 0;

            // Act
            userClientDriver.handleSignedInEvent(() => {
                userClientDriver.sendInGameEvent();
            });

            // Assert
            userClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.totalMultiplier).toBe(expectedValue);
                    done();
                }
            });
        });
    });

    describe("when already played game", () => {
        it("should return game configs", (done) => {
            // Arrange
            let userClientDriver = new GameClientDriver(socketOptions, initUserSession(haveTotalMultiplierUser));
            userClientDriver.handleSignedInEvent(() => {
                userClientDriver.emit("bet", { betLevel: 2, coinValue: 10, freeSpin: true });
            });

            userClientDriver.handleEndBetEvent((endBetData) => {
                if (endBetData?.endBet) {
                    userClientDriver.sendInGameEvent();
                }
            });

            const expectedValue = {
                coinValues: [1, 2, 5, 10, 20, 50, 100],
                maxWinPerRound: 50000,
                betLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                betMultiplier: 20,
                odds: {
                    freeSpins: {
                        additionalOdds: [{ count: 4, odds: 3 }],
                        initialOdds: [
                            { count: 4, odds: 3 },
                            { count: 5, odds: 6 },
                            { count: 6, odds: 18 },
                        ],
                    },
                    symbols: {
                        0: [
                            { from: 8, odds: 2, to: 9 },
                            { from: 10, odds: 15, to: 11 },
                            { from: 12, odds: 40, to: 30 },
                        ],
                        1: [
                            { from: 8, odds: 8, to: 9 },
                            { from: 10, odds: 18, to: 11 },
                            { from: 12, odds: 80, to: 30 },
                        ],
                        2: [
                            { from: 8, odds: 10, to: 9 },
                            { from: 10, odds: 20, to: 11 },
                            { from: 12, odds: 100, to: 30 },
                        ],
                        3: [
                            { from: 8, odds: 16, to: 9 },
                            { from: 10, odds: 24, to: 11 },
                            { from: 12, odds: 160, to: 30 },
                        ],
                        4: [
                            { from: 8, odds: 20, to: 9 },
                            { from: 10, odds: 30, to: 11 },
                            { from: 12, odds: 200, to: 30 },
                        ],
                        5: [
                            { from: 8, odds: 30, to: 9 },
                            { from: 10, odds: 40, to: 11 },
                            { from: 12, odds: 240, to: 30 },
                        ],
                        6: [
                            { from: 8, odds: 40, to: 9 },
                            { from: 10, odds: 100, to: 11 },
                            { from: 12, odds: 300, to: 30 },
                        ],
                        7: [
                            { from: 8, odds: 50, to: 9 },
                            { from: 10, odds: 200, to: 11 },
                            { from: 12, odds: 500, to: 30 },
                        ],
                        8: [
                            { from: 8, odds: 200, to: 9 },
                            { from: 10, odds: 500, to: 11 },
                            { from: 12, odds: 1000, to: 30 },
                        ],
                    },
                },
            };

            // Act & Assert
            userClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs).toStrictEqual(expectedValue);
                    done();
                }
            });
        });

        it("should return totalMultiplier = 0", (done) => {
            // Arrange
            let userClientDriver = new GameClientDriver(socketOptions, initUserSession(haveTotalMultiplierUser));
            userClientDriver.handleSignedInEvent(() => {
                userClientDriver.emit("bet", { betLevel: 2, coinValue: 10, freeSpin: true });
            });

            userClientDriver.handleEndBetEvent((endBetData) => {
                if (endBetData?.endBet) {
                    userClientDriver.sendInGameEvent();
                }
            });

            const expectedValue = 2;

            // Act & Assert
            userClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.totalMultiplier).toBe(expectedValue);
                    done();
                }
            });
        });
    });
});
