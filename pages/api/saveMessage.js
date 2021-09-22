//import setValue from '../../middleware/redisClientAsync'
import apiPageHandler from '../../middleware/api-page-handler'

const saveMessage = async (req, res) => {
    const message = req.message
    const expire = req.expire || 10000
    //const key = await setValue(message, expire)
    res.status(200).json(key);
}

export default apiPageHandler(saveMessage)
