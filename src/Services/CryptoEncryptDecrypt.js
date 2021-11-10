import CryptoJS from 'crypto-js';

export function encrypt(password) {
  let cipherText = CryptoJS.AES.encrypt(password, 'hello').toString();
  return cipherText;
}
