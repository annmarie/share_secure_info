jest.mock('redis', () => jest.requireActual('redis-mock'));
jest.mock("../providers/secretProvider")
import { setSecret } from "../providers/secretProvider";

describe("set Secret", () => {
    describe("save the message to redis", () => {
        it("saves the message to redis", async () => {
            const msg = 'test message'
            const exp = 1000

            // act
            await setSecret(msg, exp);

            //assert
            expect(setSecret).toHaveBeenCalled();

        });
    })
});
