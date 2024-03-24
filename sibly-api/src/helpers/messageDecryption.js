require("dotenv").config();
const crypto = require("crypto");


async function decryptMessage(encryptedMessage) {
    const key = process.env.KEY; //Random key
    const iv = process.env.IV; //Random iv
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    let decryptedMessage = decipher.update(encryptedMessage, "utf8", "base64");
    decryptedMessage += decipher.final("base64");
    console.log("This is the decryption", decryptedMessage)
    return encryptedMessage;
  }
  

module.exports = decryptMessage
