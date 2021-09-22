import AESEncrypter from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

// needs to go somewhere in config/ env var
const appKey = 'E6A7D2BE6C84D98259197252D37E3';

export const encryptSecret = (content) => {
    // comment is optional
    if(content == null) {
        throw new Error(`Invalid data. Comment: ${comment} | Message: ${message}`);
    }

    return AESEncrypter.encrypt(JSON.stringify(content), appKey).toString();
};

export const decryptSecret = (cipherText) => {
    if(!cipherText) {
        throw new Error(`Invalid cypher text: ${cipherText}`);
    }

    const bytes = AESEncrypter.decrypt(cipherText, appKey);
    return JSON.parse(bytes.toString(Utf8));
};
