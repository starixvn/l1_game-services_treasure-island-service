import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

describe("event signin", () => {
    let normalUserClientDriver;
    beforeAll(() => {
        normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
    });

    afterAll(() => {
        normalUserClientDriver.close();
    });

    it("should receive signed in response", (done) => {
        // Assert
        normalUserClientDriver.handleSignedInEvent(() => {
            expect(true).toBe(true);
            done();
        });
    });
});
