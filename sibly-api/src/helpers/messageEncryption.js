//Here we will pass the function for the message hashing and then export it. Will accept the mssage body as a perimeter
const { promisify } = require('util');
const crypto = require("crypto");

async function encryptMessage (message){
    const key = await promisify(crypto.randomBytes)(32) //Random key
    const iv = crypto.randomBytes(16); //Random key
    const cipher = crypto.createCipher("aes-256-gcm", key, iv);
    let encryptedMessage = cipher.update(message, "utf8", "base64");
    encryptedMessage += cipher.final('base64');
    const tag = cipher.getAuthTag();
    return {encryptedMessage, iv:iv.toString("base64"), tag:tag.toString("base64")}
}

module.exports = encryptMessage;