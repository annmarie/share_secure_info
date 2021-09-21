import apiPageHandler from 'middleware/api-page-handler'
import setValue from 'middleware/redisClientAsync'

async const saveMessage = (req, res) => {
    const message = req.message
    const expire = req.expire || 10000
    return await setValue(message, expire)
}

export default apiPageHandler(saveMessage)
