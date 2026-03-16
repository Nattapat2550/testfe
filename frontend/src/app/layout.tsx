import './globals.css';
import TopMenu from '@/components/TopMenu';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import NextAuthProvider from '@/providers/NextAuthProvider';

export const metadata = {
  title: 'Venue Booking App',
  description: 'Book your perfect venue',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>
          <TopMenu />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}