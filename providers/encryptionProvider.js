import AESEncrypter from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'

const SALT_LENGTH = 5;

export const encryptSecret = (content) => {
    const appKey = process.env.ENCRYPTION_APP_KEY
    const salt = generateSalt();

    if(!appKey) throw new Error('appKey not found')
    
    if(content == null) {
        throw new Error(`Invalid data. Comment: ${comment} | Message: ${message}`)
    }

    return AESEncrypter.encrypt(JSON.stringify(content), `${appKey}|salt`).toString() + '|' + salt;
}

export const decryptSecret = (cipherText) => {
    const appKey = process.env.ENCRYPTION_APP_KEY

    const key = appKey + '|' + cipherText.substr(cipherText.length - SALT_LENGTH);
    const cipher = cipherText.substr(0, cipherText.length - SALT_LENGTH - 1);

    if(!appKey) throw new Error('appKey not found')
    
    if(!cipherText) {
        throw new Error(`Invalid cipher text: ${cipherText}`)
    }

    const bytes = AESEncrypter.decrypt(cipher, key)
    return JSON.parse(bytes.toString(Utf8))
}

const generateSalt = () => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    
    for ( var i = 0; i < SALT_LENGTH; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}