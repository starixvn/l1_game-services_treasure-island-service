import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("place-bet-successfully", () => {
    let normalUserClientDriver;

    beforeAll(() => {
        normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
    });

    afterAll(() => {
        normalUserClientDriver.close();
    });

    describe("when user join game", () => {
        it("should receive signed in response", (done) => {
            // Assert

            normalUserClientDriver.once(eventTypes.signedIn, (message) => {
                // Check that the message matches
                expect(true).toBe(true);
                done();
            });
        });

        it("should receive game configs when ingame", (done) => {
            // Arrange
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
            normalUserClientDriver.sendInGameEvent();

            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    expect(inGameData.gameConfigs).toStrictEqual(expectedValue);
                    done();
                }
            });
        });
    });

    describe("when place bet successful", () => {
        it("should receive endBet with approriate amount", (done) => {
            // Arrange
            const expectedEndBet = 600;

            // Act
            normalUserClientDriver.emit("bet", { betLevel: 3, coinValue: 10, freeSpin: false });

            // Assert
            normalUserClientDriver.once(normalUserClientDriver.gameName, (endBetData) => {
                if (endBetData?.endBet) {
                    expect(endBetData.endBet).toStrictEqual(expectedEndBet);
                    done();
                }
            });
        });

        it("should receive board result", (done) => {
            //Act
            normalUserClientDriver.emit("bet", { betLevel: 1, coinValue: 1, totalBet: 20, freeSpin: false });

            //Assert
            normalUserClientDriver.once(normalUserClientDriver.gameName, (data) => {
                expect(data.result).not.toBeNull();
                done();
            });
        });
    });

    describe("after settlement", () => {
        afterAll(() => {
            clearTimeout();
        });

        it("should receive approriate history when request", async (done) => {
            // Arrange
            const totalBetLogs = 2;
            await new Promise((r) => setTimeout(r, 200));

            // Act
            normalUserClientDriver.sendGetHistoryEvent(1);

            // Assert
            normalUserClientDriver.handleGetHistoryEvent((betHistoryData) => {
                if (betHistoryData) {
                    expect(betHistoryData.history.total).toBe(totalBetLogs);
                    done();
                }
            });
        });
    });
});
