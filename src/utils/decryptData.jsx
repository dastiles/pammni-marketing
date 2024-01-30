import * as CryptoJS from "crypto-js";

export function decryptData(encryptedJson, secretKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(
    encryptedJson,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(secretKey.substring(0, 16)),
    }
  );

  const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Error parsing decrypted data:", error);
    return null;
  }
}
