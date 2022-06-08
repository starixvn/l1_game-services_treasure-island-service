import { createDummyUser } from "sc-game-service-integration-utils";

export const haveTotalMultiplierUser = { memberId: 2, memberName: "HaveTotalMultiplierUser" };
export const placeBetUser = { memberId: 4, memberName: "PlaceBetUser" };

export const createDummyUsers = async (currency) => {
    await createDummyUser(haveTotalMultiplierUser.memberId, haveTotalMultiplierUser.memberName, currency);
    await createDummyUser(placeBetUser.memberId, placeBetUser.memberName, currency);
};
