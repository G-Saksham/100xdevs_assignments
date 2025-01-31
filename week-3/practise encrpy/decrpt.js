const crypto = require("crypto");

// Encryption function
function encrypt(text, secretKey) {
  const cipher = crypto.createCipher("aes-256-cbc", secretKey);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function
function decrypt(encryptedText, secretKey) {
  const decipher = crypto.createDecipher("aes-256-cbc", secretKey);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

// Example usage
const secretKey = "secret_store_in_def";
const originalText = "";

// Encrypt
const encryptedText = encrypt(originalText, secretKey);
console.log("Encrypted:", encryptedText);

// Decrypt
const decryptedText = decrypt(encryptedText, secretKey);
console.log("Decrypted:", decryptedText);
