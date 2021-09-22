import { getClient } from './redisProvider';
import { v4 as uuidv4 } from 'uuid';
import isUuid from 'validator/lib/isUUID';

const getLowerCaseKey = (key) => {
    return key.toLowerCase();
};

// default timeout 24 hours
export const setSecret = async (secretItem, timeout=86400) => {
    if(!secretItem) {
        throw new Error(`Invalid entry: ${secretItem}`)
    }

    const client = getClient();

    const key = getLowerCaseKey(uuidv4());
    try {
        await client.setex(key, timeout, secretItem);
    } catch(error) {
        console.log(error);
        throw error;
    }

    return key;
};

export const getSecret = async (clientId) => {
    if(!clientId || !isUuid(clientId)) {
        throw new Error(`Invalid Id: ${key}`)
    }

    const client = getClient();
    try {
        return await client.get(getLowerCaseKey(clientId));
    } catch (error) {
        console.log(error);
        throw error;
    }
};
