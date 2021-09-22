import apiPageHandler from 'middleware/api-page-handler'
import getValue from 'middleware/redisClientAsync'

async const getMessage = (req, res) => {
    const message = req.key
    return await getValue(key)
}

export default apiPageHandler(getMessage)
