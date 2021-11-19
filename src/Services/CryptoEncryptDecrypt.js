import CryptoJS from 'crypto-js';

export function encrypt(password) {
  let cipherText = CryptoJS.AES.encrypt(password, 'hello').toString();
  return cipherText;
}
export function decrypt(password, matchPassword) {
  console.log(password);
  let bytes = CryptoJS.AES.decrypt(password, 'hello');
  console.log(bytes.toString(CryptoJS.enc.Utf8));
  return bytes.toString(CryptoJS.enc.Utf8) === matchPassword;
}
