import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center">
      <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-6">Discover • Book • Enjoy</div>
      <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">Reserve Your <br/><span className="text-blue-600">Perfect Table</span></h1>
      <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl">Experience the best dining exactly when you want. Explore top-rated restaurants and secure your spot in seconds.</p>
      <Link href="/venue" className="bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transition duration-300">
        Explore Restaurants
      </Link>
    </main>
  );
}