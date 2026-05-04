import { Search, Menu, Car } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-20 border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Car className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900 tracking-tight">Smart Parking</h1>
            <p className="text-xs text-gray-500 font-medium">Find available spots nearby</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-1 max-w-lg mx-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by location, name..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors md:hidden">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
