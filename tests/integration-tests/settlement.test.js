import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./helpers";

export default function settlementTest() {
    describe("when client sends place bet request", () => {
        let driver;
        beforeAll((done) => {
            driver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            driver.handleSignedInEvent(() => {
                driver.sendInGameEvent();
                done();
            });
        });

        afterAll(() => {
            driver.close();
        });

        it("should return finish", (done) => {
            driver.emit("bet", { betLevel: 1, coinValue: 1, totalBet: 20, freeSpin: false });
            driver.on(driver.gameName, (data) => {
                expect(data.finish).not.toBeNull();
                done();
            });
        });
    });
}
