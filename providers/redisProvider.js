import { createClient } from 'async-redis';

// simpler asynchronous connection
export const getClient = () => {

    const host = process.env.REDIS_HOST || 'localhost'
    const port = process.env.REDIS_PORT || '6379'
    const username = ""
    const password = process.env.REDIS_PASSWORD
    if (password) return createClient(`redis://${username}:${password}@${host}:${port}`)

    return createClient();
}
