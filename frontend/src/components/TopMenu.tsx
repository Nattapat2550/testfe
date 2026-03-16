import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-15 bg-white border-b border-gray-10000 flex justify-between items-center px-8 w-full z-50">
      
      {/* ส่วนปุ่ม Sign-In / Sign-Out ฝั่งซ้าย */}
      <div className="flex items-center">
        {session ? (
          <Link href="/api/auth/signout">
            <div className="flex items-center h-full px-2 text-cyan-600 font-semibold hover:text-cyan-800">
              Sign-Out
            </div>
          </Link>
        ) : (
          <Link href="/api/auth/signin">
            <div className="flex items-center h-full px-2 text-cyan-600 font-semibold hover:text-cyan-800">
              Sign-In
            </div>
          </Link>
        )}
      </div>

      {/* เมนูและโลโก้ฝั่งขวา */}
      <div className="flex items-center gap-8">
        <TopMenuItem title="Booking" pageRef="/booking" />
        <img src="/img/logo.png" alt="logo" className="h-10 w-auto" />
      </div>

    </div>
  );
}