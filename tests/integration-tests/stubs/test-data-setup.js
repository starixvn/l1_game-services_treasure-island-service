import mongoose from "mongoose";
import { middlewares } from "sc-common";
import {
    createDummyCurrency,
    createDummyUsers,
    createExchangeRate,
    createGameConfig,
    createPartnerConfig,
} from "sc-game-service-integration-utils";
import { createCurrencyGroupGames } from "./currency-group-games-stub";
import { stubHistoryData } from "./history-query-stubs";
import { createDummyUsers as createCascadingSlotDummyUsers } from "./user-stub";

import configs from "../../../src/app-configs.IGT";
import { TreasureIslandFreeSpins, TreasureIslandRounds, TreasureIslandTotalMultipliers } from "../../../src/models";
import { currencyData, game, gameConfig, playerFreeSpins, playerMultipliers, rounds } from "./test-data";

const connectDatabase = async () => {
    await middlewares.database.configureDatabase(mongoose, configs.database);
    await clearAllData();
};

const clearAllData = async () => {
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.deleteMany();
    }
};

const createTestData = async () => {
    await connectDatabase();
    await createExchangeRate();
    await createGameConfig(gameConfig);
    const partnerConfig = await createPartnerConfig(game.id);
    const currency = await createDummyCurrency(partnerConfig.partnerId, currencyData.code, currencyData.name);
    await createCurrencyGroupGames(currency.groupId, game.id, gameConfig);
    await createDummyUsers(currency);
    await createCascadingSlotDummyUsers(currency);
    await createRounds();
    await createPlayerFreeSpins();
    await createPlayerMultipliers();
    await stubHistoryData(currency);

    console.log("Create game config & dummy user for testing successfully!");

    process.exit(0);
};

const createRounds = async () => {
    return TreasureIslandRounds.insertMany(rounds);
};

const createPlayerFreeSpins = async () => {
    return TreasureIslandFreeSpins.insertMany(playerFreeSpins);
};

const createPlayerMultipliers = async () => {
    return TreasureIslandTotalMultipliers.insertMany(playerMultipliers);
};

createTestData();
