import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // เปิดใช้งานให้โหลด Image จาก external url ได้ (เผื่ออนาคตคุณใส่รูปภาพร้านอาหาร)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ปิด x-powered-by เพื่อความปลอดภัย (Best Practice)
  poweredByHeader: false,
};

export default nextConfig;