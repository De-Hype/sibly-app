require("dotenv").config();
const crypto = require("crypto");

async function encryptMessage(message) {
  const key = Buffer.from(process.env.KEY, "hex"); //Random key
  const iv = Buffer.from(process.env.IV, "hex"); //Random iv
console.log("The key is", key);
console.log("The iv is", iv)

  const cipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  let encryptedMessage = cipher.update(message, "utf8", "base64");
  encryptedMessage += cipher.final("base64");
  console.log("This is the encryption", encryptedMessage)
  return encryptedMessage;
}

module.exports = encryptMessage;
