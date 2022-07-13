import { GameClientDriver } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";
import { queryHistoryUser, playerMultipliers } from "./stubs/history-query-stubs";

describe("event get history", () => {
    describe("when page = 0", () => {
        it("should return empty details", async (done) => {
            // Arrange
            let gameClientDriver = new GameClientDriver(socketOptions, initUserSession(queryHistoryUser));
            const expectedValue = {};

            // Act
            gameClientDriver.handleSignedInEvent(() => {
                gameClientDriver.sendGetHistoryEvent(0);
            });

            // Assert
            gameClientDriver.handleGetHistoryEvent((betHistoryData) => {
                if (betHistoryData) {
                    expect(betHistoryData).toStrictEqual(expectedValue);
                    done();
                }
            });
        });
    });

    describe("when page > 0 and real player", () => {
        it("should return details", async (done) => {
            // Arrange
            let gameClientDriver = new GameClientDriver(socketOptions, initUserSession(queryHistoryUser));

            const expectedValue = {
                history: {
                    betLogs: [
                        {
                            betLevel: 1,
                            betwin: 0,
                            coinValue: 1,
                            currency: "$US",
                            freeSpin: true,
                            id: 6,
                            multiplier: 0,
                            reachMaxWin: false,
                            time: "2022-06-03T07:32:21.142Z",
                            settlementResult: {
                                freeSpins: {
                                    count: 0,
                                    odds: 0,
                                },
                                tumbles: [
                                    {
                                        multipliers: [],
                                        newBoard: "1,0,1,2,4,8,1,6,4,4,3,1,1,4,6,6,4,2,7,2,0,6,0,5,3,3,0,6,1,0",
                                        originalBoard: "1,0,1,2,4,8,1,6,4,4,3,1,1,4,6,6,4,2,7,2,0,6,0,5,3,3,0,6,1,0",
                                        win: 0,
                                    },
                                ],
                            },
                            totalAmount: 20,
                            totalMultiplier: 0,

                            totalTumbleWin: 0,
                        },
                        {
                            betLevel: 1,
                            betwin: 0,
                            coinValue: 1,
                            currency: "$US",
                            freeSpin: false,
                            id: 5,
                            multiplier: 0,
                            reachMaxWin: false,
                            time: "2022-06-03T07:32:21.142Z",
                            settlementResult: {
                                freeSpins: {
                                    count: 0,
                                    odds: 0,
                                },
                                tumbles: [
                                    {
                                        multipliers: [],
                                        newBoard: "1,0,1,2,4,8,1,6,4,4,3,1,1,4,6,6,4,2,7,2,0,6,0,5,3,3,0,6,1,0",
                                        originalBoard: "1,0,1,2,4,8,1,6,4,4,3,1,1,4,6,6,4,2,7,2,0,6,0,5,3,3,0,6,1,0",
                                        win: 0,
                                    },
                                ],
                            },
                            totalAmount: 20,
                            totalMultiplier: 0,

                            totalTumbleWin: 0,
                        },
                    ],
                    page: 1,
                    pageSize: 10,
                    total: 2,
                },
            };

            // Act
            gameClientDriver.handleSignedInEvent(() => {
                gameClientDriver.sendGetHistoryEvent(1);
            });

            // Assert
            gameClientDriver.handleGetHistoryEvent((betHistoryData) => {
                if (betHistoryData?.history) {
                    expect(betHistoryData).toStrictEqual(expectedValue);
                    done();
                }
            });
        });
    });
});
