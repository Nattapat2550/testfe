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
          const user = await userLogIn(credentials.email, credentials.password);
          if (user && user.success) {
            // ส่งข้อมูลกลับไปพร้อม token
            return {
              id: user.user?._id,
              name: user.user?.name,
              email: user.user?.email,
              role: user.user?.role,
              token: user.token, // สำคัญมาก: ต้องมี token เพื่อใช้ยิง API อื่นๆ
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
        token: token.token, // นำ token ไปใช้ต่อใน Client/Server
      } as any;
      return session;
    },
  },
};