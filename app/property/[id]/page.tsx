import GoogleMapComponent from '@/app/components/GoogleMap';
import Image from 'next/image';

export default function PropertyDetailsPage() {
  return (
    <div className="bg-[#EEF6F6] text-[#19322F] selection:bg-[#006655]/20 min-h-screen">
      <nav className="sticky top-0 z-50 bg-[#EEF6F6] border-b border-[#006655]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006655] text-3xl font-bold">villa</span>
              <span className="font-bold text-xl tracking-tight text-[#19322F]">LuxeEstate</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a className="relative text-sm font-semibold text-[#19322F] hover:text-[#006655] transition-colors py-2" href="#">
                Buy
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#006655]"></span>
              </a>
              <a className="text-sm font-semibold text-[#19322F]/70 hover:text-[#006655] transition-colors py-2" href="#">Rent</a>
              <a className="text-sm font-semibold text-[#19322F]/70 hover:text-[#006655] transition-colors py-2" href="#">Sell</a>
              <a className="text-sm font-semibold text-[#19322F]/70 hover:text-[#006655] transition-colors py-2" href="#">Saved Homes</a>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#19322F] hover:text-[#006655] transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
              <button className="p-2 text-[#19322F] hover:text-[#006655] transition-colors relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#006655] rounded-full"></span>
              </button>
              <button className="ml-2 flex items-center gap-2 p-1 rounded-full hover:bg-[#006655]/5 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#006655]/10 overflow-hidden border border-[#006655]/20">
                  <Image
                    alt="User Profile"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhLuM9qNltZNxgIWPtC3dVxQ_JLFKXYB9d_klGFux_2JVOGtRlbV4GvpvdT4wqpsueZnXFQhKJe9MGGvM6rXQX15iv80mbEKxjmy4X14AZRqvp573ZlKYDN9bAb0ka7B-g5mkOCP6nRuKC9QsO02JVq6gqZeAo3-7dUurVhhgPJGeuL0Gk2Cp3Wnu5mVlUtpajB2wtx8uMoytbh78i9RmHYtJg52ZELl9XdIC9f5Kix_lFMFoi6Ru61ARrEGIrvgvz4ViiKhufTns"
                    width={36}
                    height={36}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
              <Image
                alt="Modern luxury home exterior"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjNDU9iE4zwPuWeg-CjIrLI-87GF24_LgOggcXT0vmUYfMx2q1dJAheiqWqVN-39uiwyLKEfP18FsG1vtUyAPX902OhGEfM4clcQiDsJW7MBbc_BoMtZXtqIeFKIfkHnkIPwmFbQg8Eaan6ULV99T8AUVUuKsro0HoTMrIaxw5pp1uSuQlF8X5Dait4US1W4vmyZnVioXbFnCoaOOZ0LPorb0rVGAIQd9reWcpqq27C0oO4ltnsCTHIcjIm0xp-2qVbRJSIZzWPv0"
                width={800}
                height={500}
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#006655] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Premium</span>
                <span className="bg-white/90 backdrop-blur text-[#19322F] text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">New</span>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#19322F] px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                <span className="material-icons text-sm">grid_view</span>
                View All Photos
              </button>
            </div>
            {/* Gallery Placeholders */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
              <div className="flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer ring-2 ring-[#006655] ring-offset-2 ring-offset-[#EEF6F6] snap-start">
                <Image
                  alt="Exterior"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvpJBMaiXUL25hHYwLa_0R6dPhLLM1EuhEt-AVtOy8qSnEi9IcA_RzD5s5ThawY3XG2qw8h4kPqvfP18EY1E5vgA8fs6v7RefCMJ1gY8Gt4uyXGJ85-lcIvL18v8Nlc-U-VOwn1h54yjjg4-KXHt1N5DfuTkQUBdldSELRZeJ6zuZ087NCJ7dDIDaXKJpPgulmd6JC6zD1-Kq00Sb4VXIhVR3IQ1Hd8S6xZkd17QvMHSNqbtKG849PRqHZX3nKLHEWYWWPvbL5_Gs"
                  width={192}
                  height={144}
                />
              </div>
              {/* More images... */}
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#006655]/5">
                <div className="mb-4">
                  <h1 className="text-4xl font-display font-light text-[#19322F] mb-2">$1,250,000</h1>
                  <p className="text-[#19322F]/60 font-medium flex items-center gap-1">
                    <span className="material-icons text-[#006655] text-sm">location_on</span>
                    1234 Serenity Lane, Palo Alto, CA
                  </p>
                </div>
                <div className="h-px bg-slate-100 my-6"></div>
                {/* Agent Profile... */}
                <div className="space-y-3">
                  <button className="w-full bg-[#006655] hover:bg-[#005544] text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-[#006655]/20 flex items-center justify-center gap-2 group">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                    Schedule Visit
                  </button>
                </div>
              </div>
              
              {/* INTERACTIVE MAP COMPONENT */}
              <div className="bg-white p-2 rounded-xl shadow-sm border border-[#006655]/5 overflow-hidden">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                  <GoogleMapComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Remaining content... */}
        <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#006655]/5">
                <h2 className="text-lg font-semibold mb-6 text-[#19322F]">Property Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10">
                        <span className="material-icons text-[#006655] text-2xl mb-2">square_foot</span>
                        <span className="text-xl font-bold text-[#19322F]">240</span>
                        <span className="text-xs uppercase tracking-wider text-[#19322F]/50">Square Meters</span>
                    </div>
                    {/* More features... */}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
