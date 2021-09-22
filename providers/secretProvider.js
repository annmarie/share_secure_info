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
    // if(!key || !isUuid(key.split('|')[1])) {
    //     throw new Error(`Invalid Id: ${key}`)
    // }

    const client = getClient();
    try {
        return await client.get(key);
    } catch (error) {
        console.log(error);
        throw error;
    }
};
