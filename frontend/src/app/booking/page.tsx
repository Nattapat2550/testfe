import DateReserve from '../../components/DateReserve';
import { TextField, Select, MenuItem } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import getUserProfile from '@/libs/getUserProfile';

export default async function Page() {
  // ดึง Session ฝั่ง Server ตามที่ Test Case กำหนด
  const session = await getServerSession(authOptions);
  let profile = null;

  // ถ้ามี Session ให้ไปดึง Profile
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
      
      {/* ส่วนแสดง Profile ถ้ามีการ Log-in และได้ข้อมูลแล้ว */}
      {profile && (
        <div className="w-full max-w-150 bg-gray-200 p-6 rounded-lg shadow-sm flex flex-col space-y-2 mb-8 text-gray-800">
          <h2 className="text-xl font-bold mb-2">User Profile</h2>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Tel.:</strong> {profile.tel}</p>
          <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <form className="w-full max-w-150 bg-white p-8 rounded-lg shadow-md flex flex-col space-y-6">
        <TextField 
          variant="standard" 
          name="Name-Lastname" 
          label="Name-Lastname" 
          fullWidth
        />
        
        <TextField 
          variant="standard" 
          name="Contact-Number" 
          label="Contact-Number" 
          fullWidth
        />
        
        <Select 
          variant="standard" 
          id="venue" 
          name="venue"
          defaultValue="Bloom"
          fullWidth
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
        
        <div className="pt-2">
          <DateReserve />
        </div>
        
        <button 
          type="submit" 
          name="Book Venue"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors"
        >
          Book Venue
        </button>
      </form>
    </main>
  );
}