const decryptMessage = async (encryptedMessage) => {
  try {
    const iv = "dhhdhd";
    const key = "dhddh";
    const encryptedData = Uint8Array.from(atob(encryptedMessage), (c) =>
      c.charCodeAt(0)
    );
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encryptedData
    );
    const decryptedMessage = new TextDecoder().decode(decryptedData);
    return decryptedMessage;
  } catch (err) {
    console.log(err);
  }
};

export default decryptMessage;
