import crypto from "crypto";
const decryptMessage = async (encryptedMessage) => {
  try {
    const iv = "apsqnqcDAuSeVme58jTwrg==";
    const key = "doMuNaK02Ly8YQvFUJSAInrAnpmsEDoPO7gxhRJfTzI=";
    const decipher = crypto.createDecipher("aes-256-gcm", key, iv);
    let decryptedMessage = decipher.update(encryptedMessage, "base64", "utf8");
    decryptedMessage += decipher.final("utf8");
    return decryptedMessage;
  } catch (err) {
    console.log(err);
  }
};

export default decryptMessage;
