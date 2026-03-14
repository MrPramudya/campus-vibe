import React, { useState, useMemo } from 'react';
import { 
  Wifi, Battery, MapPin, Navigation, Sun, Moon, 
  ChevronLeft, Heart
} from 'lucide-react';

// Data Kampus Semarang
const CAMPUSES = [
  { id: 'undip-pleburan', name: "UNDIP Pleburan", lat: -6.992, lng: 110.422 },
  { id: 'undip-tembalang', name: "UNDIP Tembalang", lat: -7.048, lng: 110.439 },
  { id: 'unika', name: "UNIKA Bendan", lat: -7.021, lng: 110.408 },
  { id: 'udinus', name: "UDINUS (Tugu Muda)", lat: -6.982, lng: 110.409 },
  { id: 'unnes', name: "UNNES Sekaran", lat: -7.048, lng: 110.392 }
];

// Data Kafe (Rakdjat, Spiegel, dll)
const CAFE_DATA = [
  {
    id: 1,
    name: "Rakdjat Coffee",
    location: "Gajahmungkur, Semarang",
    wifi: "45 Mbps",
    outlets: "Sangat Banyak",
    category: "WFC",
    image: "https://images.unsplash.com/photo-1497933321188-91189e462fbf?auto=format&fit=crop&q=80&w=600",
    lat: -7.0126, 
    lng: 110.4158,
    avgPrice: "Rp 20k - 45k",
    description: "Spot favorit di Karangrejo. Parkir sangat luas dan colokan tersedia di hampir setiap meja."
  },
  {
    id: 2,
    name: "Spiegel Bar & Bistro",
    location: "Kota Lama, Semarang",
    wifi: "40 Mbps",
    outlets: "Cukup",
    category: "Hangout",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    lat: -6.968, 
    lng: 110.427,
    avgPrice: "Rp 50k - 150k",
    description: "Gedung bersejarah di Kota Lama. Vibe klasik yang sangat kuat untuk hangout premium."
  }
];

export default function App() {
  const [selectedCampus, setSelectedCampus] = useState(CAMPUSES[0]);
  const [mainCategory, setMainCategory] = useState('WFC');
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Hitung jarak otomatis
  const calculateDistance = (lat, lng) => {
    return (Math.sqrt(Math.pow(lat - selectedCampus.lat, 2) + Math.pow(lng - selectedCampus.lng, 2)) * 111).toFixed(1);
  };

  const filteredCafes = useMemo(() => {
    return CAFE_DATA
      .filter(c => c.category === mainCategory)
      .map(c => ({ ...c, distance: calculateDistance(c.lat, c.lng) }))
      .sort((a, b) => a.distance - b.distance);
  }, [mainCategory, selectedCampus]);

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col bg-inherit overflow-hidden">
        
        {/* Halaman Detail */}
        {selectedCafe && (
          <div className="absolute inset-0 z-50 bg-inherit flex flex-col animate-in slide-in-from-right duration-300">
             <div className="relative h-64 shrink-0">
                <img src={selectedCafe.image} className="w-full h-full object-cover" alt={selectedCafe.name} />
                <button onClick={() => setSelectedCafe(null)} className="absolute top-6 left-6 p-3 bg-black/50 text-white rounded-2xl"><ChevronLeft /></button>
             </div>
             <div className="p-8">
                <h2 className="text-3xl font-black mb-2">{selectedCafe.name}</h2>
                <p className="opacity-70 mb-6">{selectedCafe.location}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl flex items-center gap-3">
                    <Wifi className="text-indigo-500" /> <span className="text-xs font-bold">{selectedCafe.wifi}</span>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-2xl flex items-center gap-3">
                    <Battery className="text-green-500" /> <span className="text-xs font-bold">{selectedCafe.outlets}</span>
                  </div>
                </div>
                <p className="leading-relaxed opacity-80 text-sm">{selectedCafe.description}</p>
             </div>
          </div>
        )}

        {/* Header Utama */}
        <header className="px-8 pt-12 pb-14 bg-slate-800 text-white rounded-b-[3.5rem] shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Patokan Kampus</span>
              <select 
                className="bg-transparent font-black text-sm outline-none"
                value={selectedCampus.id}
                onChange={(e) => setSelectedCampus(CAMPUSES.find(c => c.id === e.target.value))}
              >
                {CAMPUSES.map(c => <option key={c.id} value={c.id} className="text-black font-bold">{c.name}</option>)}
              </select>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
              {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
            </button>
          </div>
          <h1 className="text-4xl font-black italic mb-6">CampusVibe</h1>
          <div className="flex bg-white/5 p-1 rounded-2xl">
            <button onClick={() => setMainCategory('WFC')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${mainCategory === 'WFC' ? 'bg-indigo-600' : ''}`}>WFC</button>
            <button onClick={() => setMainCategory('Hangout')} className={`flex-1 py-3 rounded-xl font-bold text-xs ${mainCategory === 'Hangout' ? 'bg-indigo-600' : ''}`}>HANGOUT</button>
          </div>
        </header>

        {/* Daftar Kafe */}
        <main className="flex-1 p-8 pb-32 overflow-y-auto">
          <h2 className="text-xl font-black mb-6">Spot Terdekat</h2>
          <div className="space-y-6">
            {filteredCafes.map(cafe => (
              <div key={cafe.id} onClick={() => setSelectedCafe(cafe)} className="relative h-48 rounded-[2rem] overflow-hidden shadow-lg group cursor-pointer border-4 border-white/5">
                <img src={cafe.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={cafe.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[10px] font-bold bg-indigo-600 px-2 py-1 rounded-lg mb-2 inline-block">{cafe.distance} KM</span>
                  <h3 className="text-xl font-black">{cafe.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Navigasi Bawah */}
        <nav className={`absolute bottom-8 left-8 right-8 h-20 border border-white/10 rounded-[2.5rem] flex justify-between items-center px-12 z-40 backdrop-blur-3xl shadow-2xl ${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
          <Navigation size={22} className="text-indigo-600" />
          <Heart size={22} className="text-slate-400" />
          <div className="w-10 h-10 rounded-2xl bg-slate-900 border-2 border-white overflow-hidden shadow-lg">
             <img src={`https://ui-avatars.com/api/?name=Marcellus&background=0f172a&color=fff&bold=true`} alt="Profile" />
          </div>
        </nav>
      </div>
    </div>
  );
}