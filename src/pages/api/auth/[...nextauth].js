import { InternalRoutes } from "@/types/routes";
import { decrypt } from "@/utils/decrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXTAUTH_URL = process.env.NEXTAUTH_URL;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(`${NEXTAUTH_URL}${InternalRoutes.Login}`, {
          body: JSON.stringify({
            email: credentials.email,
            password: decrypt(credentials.password),
          }),
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const user = await response.json();
          console.log({ user });
          return { id: user.id, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
  },
  secret: NEXTAUTH_SECRET,
});
