import { getClient } from './redisProvider';
import { v4 as uuidv4 } from 'uuid';
import isUuid from 'validator/lib/isUUID';

const keyPrefix = 'Shared-Secret-Key'

// default timeout 24 hours
export const setSecret = async (secretItem, timeout=86400) => {
    if(!secretItem) {
        throw new Error(`Invalid entry: ${secretItem}`)
    }

    const client = getClient();
    const key = `${keyPrefix}|${uuidv4()}`;
    try {
        await client.setex(key, timeout, secretItem);
    } catch(error) {
        console.log(error);
        throw error;
    }

    return key;
};

export const getSecret = async (key) => {
    const client = getClient();
    const secretKey = `${keyPrefix}|${key}`;
    try {
        return await client.get(secretKey);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const removeSecret = async(key) => {
    const secretKey = `${keyPrefix}|${key}`;
    const client = getClient();
    try {
        return await client.del(secretKey);
    } catch(error) {
        console.log(error);
        return error;
    }
}
