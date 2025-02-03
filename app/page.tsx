import Link from "next/link";
import { ShoppingBag, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen bg-[#FAF9F6] flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-xs">You're at</span>
        </div>
        <p className="text-lg font-semibold text-black">Door No. 3</p>
      </div>

      {/* Image Grid */}
      <div className="px-6 py-4 h-[40vh] flex-grow-0">
        <div className="h-full grid grid-cols-2 gap-2">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
              alt="Burger"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid gap-2">
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536935338788-846bb9981813"
                alt="Cocktail"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b"
                alt="Drinks"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Options Section */}
      <div className="px-6 py-4 flex flex-col gap-4">
        <Link href="/order" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-orange-300 shadow-md">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-black">Online Food Ordering</h3>
            <p className="text-sm text-gray-500">Order food online for delivery</p>
          </div>
        </Link>

        <Link href="/menu" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-orange-300 shadow-md">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-black">Dine In Experience</h3>
            <p className="text-sm text-gray-500">Browse menu and dine in</p>
          </div>
        </Link>
      </div>
    </main>
  );
}

