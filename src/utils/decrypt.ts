import { createDecipheriv } from "crypto";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";

export const decrypt = (encryptedText: string): string => {
  try {
    const [ivBase64, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivBase64, "base64");

    const decipher = createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "utf8"),
      iv
    );

    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
};
