require("dotenv").config();
const crypto = require("crypto");

async function encryptMessage(message) {
  const key = process.env.KEY; //Random key
  const iv = process.env.IV; //Random iv
  const cipher = crypto.createCipher("aes-256-gcm", key, iv);
  let encryptedMessage = cipher.update(message, "utf8", "base64");
  encryptedMessage += cipher.final("base64");
  return encryptedMessage;
}

module.exports = encryptMessage;
