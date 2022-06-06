import settlementTest from "./settlement.test";
import { startServiceProcess, startSetupDataProcess } from "./stubs/test-jobs";

let processStartService;

const JEST_ASSERT_WAITING_RESPONSE_TIMEOUT = 70000;

beforeAll(async (done) => {
    jest.setTimeout(JEST_ASSERT_WAITING_RESPONSE_TIMEOUT);
    startSetupDataProcess(() => {
        processStartService = startServiceProcess(() => {
            console.log("Start service job done!");
            done();
        });
    });
});

afterAll(() => {
    processStartService.stdin.pause();
    processStartService.kill();
});

settlementTest();
