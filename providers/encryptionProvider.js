import AESEncrypter from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const appKey = 'E6A7D2BE6C84D98259197252D37E3';

export const encryptSecret = async(content) => {
    // comment is optional
    if(content == null) {
        throw new Error(`Invalid data. Comment: ${comment} | Message: ${message}`);
    }

    return AESEncrypter.encrypt(JSON.stringify(content), appKey).toString();
};

export const decryptSecret = async(cipherText) => {
    if(!cipherText) {
        throw new Error(`Invalid cypher text: ${cipherText}`);
    }

    const bytes = AESEncrypter.decrypt(cipherText, appKey);
    return JSON.parse(bytes.toString(Utf8));
};