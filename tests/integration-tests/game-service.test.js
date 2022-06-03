import { endGameErrorUser, errorUser, GameClientDriver, internalServerErrorUser, normalUser } from "sc-game-service-integration-utils";

import { currencyData, socketOptions } from "./stubs/test-data";
import { startServiceProcess, startSetupDataProcess } from "./stubs/test-jobs";

startSetupDataProcess();
let processStartService;

const JEST_ASSERT_WAITING_RESPONSE_TIMEOUT = 70000;

let normalUserClientDriver;
let errorUserClientDriver;
let internalServerErrorUserClientDriver;
let endGameErrorUserClientDriver;

beforeAll(async (done) => {
    jest.setTimeout(JEST_ASSERT_WAITING_RESPONSE_TIMEOUT);

    processStartService = startServiceProcess(() => {
        console.log("Start service job done!");
        normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));

        errorUserClientDriver = new GameClientDriver(socketOptions, initUserSession(errorUser));
        errorUserClientDriver.handleSignedInEvent(() => {
            errorUserClientDriver.sendInGameEvent();
        });

        internalServerErrorUserClientDriver = new GameClientDriver(socketOptions, initUserSession(internalServerErrorUser));
        internalServerErrorUserClientDriver.handleSignedInEvent(() => {
            internalServerErrorUserClientDriver.sendInGameEvent();
        });

        endGameErrorUserClientDriver = new GameClientDriver(socketOptions, initUserSession(endGameErrorUser));
        endGameErrorUserClientDriver.handleSignedInEvent(() => {
            endGameErrorUserClientDriver.sendInGameEvent();
        });

        done();
    });
});

afterAll(() => {
    normalUserClientDriver.close();
    errorUserClientDriver.close();
    internalServerErrorUserClientDriver.close();
    endGameErrorUserClientDriver.close();

    processStartService.stdin.pause();
    processStartService.kill();
});

describe("SeDie Service", () => {
    describe("when sign in successful", () => {
        it("should receive signed in response", (done) => {
            // Assert
            normalUserClientDriver.handleSignedInEvent(() => {
                done();
            });
        });
    });

    describe("when user joins game", () => {
        // Arrange
        const expectedGameConfigs = {
            type: 3,
            name: "treasureisland",
            enabled: true,
            botenabled: false,
            minbet: 0,
            maxbet: 0,
            disabledround: null,
            bot_maxbet: 10,
            hour_maxbot: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            disabled_message: "Game đang được bảo trì, vui lòng quay lại sau 10 phút.",
            choices_maxbet: null,
            odds: null,
            delayStartTime: 0,
            enableFreeBet: false,
            slotsConfig: null,
            siteExclusions: [],
            smartBotEnabled: false,
            smartBotGroupRatio: 0,
            isBeta: true,
            gameId: 47,
            randomMode: 0,
            cascadingSlotsConfig: {
                mode: 1,
                bigWinRatio: 2.5,
                multiplierBonus: { min: 2, max: 28 },
                betLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                betMultiplier: 20,
                maxWinPerRound: 500000,
                oddsByCounts: {
                    0: [
                        { from: 8, to: 9, odds: 2 },
                        { from: 10, to: 11, odds: 15 },
                        { from: 12, to: 30, odds: 40 },
                    ],
                    1: [
                        { from: 8, to: 9, odds: 8 },
                        { from: 10, to: 11, odds: 18 },
                        { from: 12, to: 30, odds: 80 },
                    ],
                    2: [
                        { from: 8, to: 9, odds: 10 },
                        { from: 10, to: 11, odds: 20 },
                        { from: 12, to: 30, odds: 100 },
                    ],
                    3: [
                        { from: 8, to: 9, odds: 16 },
                        { from: 10, to: 11, odds: 24 },
                        { from: 12, to: 30, odds: 160 },
                    ],
                    4: [
                        { from: 8, to: 9, odds: 20 },
                        { from: 10, to: 11, odds: 30 },
                        { from: 12, to: 30, odds: 200 },
                    ],
                    5: [
                        { from: 8, to: 9, odds: 30 },
                        { from: 10, to: 11, odds: 40 },
                        { from: 12, to: 30, odds: 240 },
                    ],
                    6: [
                        { from: 8, to: 9, odds: 40 },
                        { from: 10, to: 11, odds: 100 },
                        { from: 12, to: 30, odds: 300 },
                    ],
                    7: [
                        { from: 8, to: 9, odds: 50 },
                        { from: 10, to: 11, odds: 200 },
                        { from: 12, to: 30, odds: 500 },
                    ],
                    8: [
                        { from: 8, to: 9, odds: 200 },
                        { from: 10, to: 11, odds: 500 },
                        { from: 12, to: 30, odds: 1000 },
                    ],
                },
                freeSpins: {
                    initialOdds: [
                        { count: 4, odds: 3 },
                        { count: 5, odds: 6 },
                        { count: 6, odds: 18 },
                    ],
                    additionalOdds: [{ count: 4, odds: 3 }],
                },
            },
        };
        const expectedUser = {
            UID: 1,
            avatarId: 1,
            currency: "$US",
            name: "NormalUser",
            rate: 1,
            red: 25000,
        };

        const expectedRoundHistory = [
            {
                roundId: 1190117,
                result: { red1: true, red2: false, red3: false, red4: true },
                settlementResult: { odd: false, even: true, red2: true, red3: false, red4: false, white3: false, white4: false },
            },
            {
                roundId: 1190118,
                result: { red1: false, red2: true, red3: true, red4: false },
                settlementResult: { odd: false, even: true, red2: true, red3: false, red4: false, white3: false, white4: false },
            },
            {
                roundId: 1190119,
                result: { red1: false, red2: false, red3: true, red4: true },
                settlementResult: { odd: false, even: true, red2: true, red3: false, red4: false, white3: false, white4: false },
            },
        ];

        beforeAll((done) => {
            normalUserClientDriver.sendInGameEvent();
            done();
        });

        it("should return game configuration (odds, min bet, max bet)", (done) => {
            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.gameConfigs) {
                    if (inGameData.gameConfigs) {
                        expect(inGameData.gameConfigs.minbet).toEqual(expectedGameConfigs.minbet);
                        expect(inGameData.gameConfigs.maxbet).toEqual(expectedGameConfigs.maxbet);
                        expect(inGameData.gameConfigs.cascadingSlotsConfig).toStrictEqual(expectedGameConfigs.cascadingSlotsConfig);

                        done();
                    }
                }
            });
        });

        it("should return user information", () => {
            // Assert
            normalUserClientDriver.handleInGameEvent((inGameData) => {
                if (inGameData?.user?.UID) {
                    expect(inGameData.user).toStrictEqual(expectedUser);

                    done();
                }
            });
        });
    });

 
});

const initUserSession = (user) => {
    return {
        session: `${user.memberId}-session-id`,
        ss: `${user.memberId}-session-id`,
        currency: currencyData.name,
        username: `${user.memberId}_${user.memberName}`,
        browserUserAgent: "browser-user-agent",
    };
};
