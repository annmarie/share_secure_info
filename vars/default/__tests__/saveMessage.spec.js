//const redisClientAsync = require('../../../middleware/redisClientAsync')
import saveMessage from '../../../pages/api/saveMessage'

//console.log(redisClientAsync)

// jest.mock('../../../middleware/redisClientAsync')

// describe("set value", () => {
//     describe("save the message to redis", () => {
//         it("saves the message to redis", async () => {
//             // arrange
//             const req = {
//                 message: 'test message',
//                 expire: 1000
//             };

//             // act
//             await saveMessage(req);
            
//             //assert
//             expect(setValue).toHaveBeenCalledOnce();
//         });
//     })
// });