import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogIn from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await userLogIn(credentials.email, credentials.password);
          if (user) {
            return {
              id: user._id,
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: user.token,
            };
          }
          return null;
        } catch (error) {
          // เพิ่มบรรทัดนี้เพื่อปริ้นท์ Error ออกมาใน Vercel Logs เวลาพัง
          console.error("🔥 Login Error:", error); 
          return null; // NextAuth บังคับให้ return null หากพัง
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
        token: token.token as string,
      };
      return session;
    },
  },
  pages: { signIn: '/login' }
};