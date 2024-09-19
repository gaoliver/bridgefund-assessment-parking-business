import { createCipheriv, randomBytes } from "crypto";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "";
const IV_LENGTH = 16;

export const encrypt = (text: string): string => {
  try {
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY, "utf8"),
      iv
    );

    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");

    return `${iv.toString("base64")}:${encrypted}`;
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
};
