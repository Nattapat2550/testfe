import Link from "next/link";

export default function Home() {
  return (
    // เพิ่ม Gradient พื้นหลังบางๆ เพื่อให้หน้าเว็บดูมีมิติ ไม่ขาวแบนจนเกินไป
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center bg-linear-to-b from-white to-primary-50/50">
      
      <div className="bg-primary-50 text-primary-600 border border-primary-100 px-5 py-1.5 rounded-full text-sm font-bold mb-8 shadow-sm">
        🍽️ Discover • Book • Enjoy
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
        Reserve Your <br/>
        <span className="text-primary-600 drop-shadow-sm">Perfect Table</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
        Experience the best dining exactly when you want. Explore top-rated restaurants, exquisite menus, and secure your spot in seconds.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/venue" 
          className="bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-1 transition duration-300"
        >
          Explore Restaurants
        </Link>
        <Link 
          href="/login" 
          className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 hover:shadow-md transition duration-300"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}