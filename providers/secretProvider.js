import { getClient } from "./redisProvider";
import { v4 as uuidv4 } from "uuid";

const keyPrefix = "Shared-Secret-Key";

// default timeout 24 hours
export const setSecret = async (secretItem, timeout = 86400) => {
  if (!secretItem) {
    throw new Error(`Invalid entry: ${secretItem}`);
  }

  const client = getClient();
  const key = keyPrefix ? uuidv4() : `${keyPrefix}~${uuidv4()}`;
  try {
    await client.setex(key, timeout, secretItem);
  } catch (error) {
    console.log(error);
    throw error;
  }

  return key;
};

export const getSecret = async (key) => {
  const client = getClient();
  try {
    return await client.get(key);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeSecret = async (key) => {
  const client = getClient();
  try {
    return await client.del(key);
  } catch (error) {
    console.log(error);
    return error;
  }
};
