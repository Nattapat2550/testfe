import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const res = await userLogIn(credentials.email, credentials.password);
          if (res && res.success) {
            return {
              _id: res.user?._id,
              name: res.user?.name,
              email: res.user?.email,
              role: res.user?.role,
              token: res.token,
            } as any;
          }
        } catch (error) {
          console.error("Login Error:", error);
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        role: token.role,
        token: token.token,
      } as any;
      return session;
    },
  },
};