import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';
import BookingForm from '@/components/BookingForm';

export default async function Page() {
  const session = await getServerSession(authOptions);
  let profile = null;

  if (session && session.user?.token) {
    try {
      const res = await getUserProfile(session.user.token);
      profile = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Venue Booking</h1>
      
      {profile && (
        <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-sm flex flex-col space-y-2 mb-8 text-gray-800">
          <h2 className="text-xl font-bold mb-2">User Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Tel.:</strong> {profile.tel}</p>
          <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <BookingForm token={session?.user?.token} />
    </main>
  );
}