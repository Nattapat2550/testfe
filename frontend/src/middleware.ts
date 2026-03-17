import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const pathname = req.nextUrl.pathname;

    // ถ้าไม่ใช่ Admin แต่พยายามเข้าหน้า /admin ให้เตะกลับไปหน้าแรก
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      // อนุญาตให้ผ่าน Middleware ได้ถ้ามี token (Log-in แล้ว)
      authorized: ({ token }) => !!token,
    },
    // เพิ่มบรรทัดนี้ เพื่อบอกว่าถ้าไม่มีสิทธิ์ ให้เด้งไปที่หน้า /login ของเรา
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/mybooking/:path*",
    "/admin/:path*"
  ],
};