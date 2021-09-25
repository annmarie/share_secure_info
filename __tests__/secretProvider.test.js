jest.mock('redis', () => jest.requireActual('redis-mock'));
import { setSecret, getSecret } from "../providers/secretProvider";

describe("Secret processing", () => {
  const msg = 'test message'
  const exp = 1000
  describe("save the message to redis", () => {
    it("save the message to redis", async () => {
      // act
      const key = await setSecret(msg, exp);

      //assert
      expect(typeof key).toBe('string');
    });
  })

  describe("get the message from redis", () => {
    it("get the message from redis", async () => {
      // act
      const key = await setSecret(msg, exp);
      const secret = await getSecret(key);

      //assert
      expect(secret).toBe('test message');
    });
  })
});
