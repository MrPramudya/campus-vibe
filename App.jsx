import React, { useState, useMemo } from 'react';
import { 
  Wifi, Battery, MapPin, Navigation, Sun, Moon, 
  ChevronLeft, Heart, Coffee, Laptop, Globe, LogOut, 
  List, Map as MapIcon, Compass, Mail, Lock, User, 
  ArrowRight, Sparkles, Star, Search
} from 'lucide-react';

// --- KONFIGURASI DATA ---
const CAMPUSES = [
  { id: 'undip-pleburan', name: "UNDIP Pleburan", lat: -6.992, lng: 110.422 },
  { id: 'undip-tembalang', name: "UNDIP Tembalang", lat: -7.048, lng: 110.439 },
  { id: 'unika', name: "UNIKA Bendan", lat: -7.021, lng: 110.408 },
  { id: 'udinus', name: "UDINUS (Tugu Muda)", lat: -6.982, lng: 110.409 },
  { id: 'unnes', name: "UNNES Sekaran", lat: -7.048, lng: 110.392 }
];

const CAFE_DATA = [
  {
    id: 1,
    name: "Rakdjat Coffee",
    location: "Gajahmungkur, Semarang",
    wifi: "45 Mbps",
    outlets: "Sangat Banyak",
    category: "WFC",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1497933321188-91189e462fbf?auto=format&fit=crop&q=80&w=600",
    lat: -7.0126, 
    lng: 110.4158,
    avgPrice: "Rp 20k - 45k",
    description: "Spot favorit di Karangrejo yang direkomendasikan Marcellus. Parkir sangat luas dan colokan tersedia di hampir setiap meja. Sangat cocok untuk nugas lama."
  },
  {
    id: 2,
    name: "Spiegel Bar & Bistro",
    location: "Kota Lama, Semarang",
    wifi: "40 Mbps",
    outlets: "Cukup",
    category: "Hangout",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
    lat: -6.968, 
    lng: 110.427,
    avgPrice: "Rp 50k - 150k",
    description: "Gedung bersejarah di Kota Lama. Vibe klasik yang sangat kuat untuk hangout premium bersama teman-teman."
  }
];

export default function App() {
  // --- STATE UTAMA ---
  const [authState, setAuthState] = useState('login'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedCampus, setSelectedCampus] = useState(CAMPUSES[0]);
  const [mainCategory, setMainCategory] = useState('WFC');
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State baru untuk Fitur Profil & Love
  const [userName, setUserName] = useState('Marcellus');
  const [savedIds, setSavedIds] = useState([]);

  // --- LOGIKA ---
  const calculateDistance = (lat, lng) => {
    return (Math.sqrt(Math.pow(lat - selectedCampus.lat, 2) + Math.pow(lng - selectedCampus.lng, 2)) * 111).toFixed(1);
  };

  const filteredCafes = useMemo(() => {
    return CAFE_DATA
      .filter(c => c.category === mainCategory && c.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(c => ({ ...c, distance: calculateDistance(c.lat, c.lng) }))
      .sort((a, b) => a.distance - b.distance);
  }, [mainCategory, selectedCampus, searchQuery]);

  const toggleLove = (e, id) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // --- KOMPONEN LAYAR LOGIN ---
  const LoginScreen = () => (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-indigo-600 shadow-2xl mb-6">
            <Sparkles size={40} className="text-white animate-pulse" />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">CampusVibe</h1>
          <p className="opacity-60 text-sm font-bold tracking-widest uppercase">Semarang Community Hub</p>
        </div>

        <div className={`${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'} backdrop-blur-xl border p-8 rounded-[3rem]`}>
          <div className="flex bg-slate-800/20 p-1.5 rounded-2xl mb-8">
            <button onClick={() => setAuthState('login')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${authState === 'login' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>MASUK</button>
            <button onClick={() => setAuthState('register')} className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${authState === 'register' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>DAFTAR</button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setAuthState('authenticated'); }} className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
              <input 
                type="text" 
                placeholder="Nama Lengkap" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required 
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
              <input type="email" placeholder="Email atau Username" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" required />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
              <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none text-sm focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" required />
            </div>
            
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all mt-6 shadow-xl shadow-indigo-900/20 active:scale-[0.98]">
              {authState === 'login' ? 'MULAI JELAJAH' : 'BUAT AKUN'} <ArrowRight size={20} />
            </button>
          </form>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-yellow-400">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} className="text-slate-400" />}
          </button>
        </div>
      </div>
    </div>
  );

  // --- KOMPONEN MOCK MAP ---
  const MapView = () => (
    <div className="flex-1 p-6 animate-in fade-in duration-500 flex flex-col pb-36">
      <div className={`flex-1 rounded-[3rem] border-8 ${isDarkMode ? 'bg-slate-800 border-white/5' : 'bg-slate-100 border-white shadow-inner'} relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Titik Kampus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-2xl text-white border-2 border-white mb-2">
            <Globe size={24} className="animate-spin-slow" />
          </div>
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-xl uppercase whitespace-nowrap">{selectedCampus.name}</span>
        </div>

        {/* Titik Kafe */}
        {filteredCafes.map((cafe) => (
          <button 
            key={cafe.id} 
            onClick={() => setSelectedCafe(cafe)}
            className="absolute flex flex-col items-center animate-bounce transition-all hover:scale-125"
            style={{ 
              top: `${50 + (cafe.lat - selectedCampus.lat) * 2500}%`, 
              left: `${50 + (cafe.lng - selectedCampus.lng) * 2500}%` 
            }}
          >
            <div className={`p-1.5 rounded-xl shadow-xl border-2 ${savedIds.includes(cafe.id) ? 'bg-red-500 border-white' : 'bg-white border-indigo-500'}`}>
              <Coffee size={14} className={savedIds.includes(cafe.id) ? 'text-white' : 'text-indigo-600'} />
            </div>
            <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[8px] font-black px-2 py-0.5 rounded-lg mt-1 shadow-sm border border-slate-200">{cafe.name}</span>
          </button>
        ))}

        <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Compass size={20} className="text-indigo-400 animate-spin-slow" />
            <span className="text-xs font-bold text-white uppercase">Radar Lokasi Aktif</span>
          </div>
          <span className="text-[10px] font-black text-white/50">{selectedCampus.lat.toFixed(3)}, {selectedCampus.lng.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );

  // --- RENDER UTAMA ---
  if (authState !== 'authenticated') return <LoginScreen />;

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="w-full max-w-md min-h-screen shadow-2xl relative flex flex-col bg-inherit overflow-hidden border-x border-white/5">
        
        {/* Detail Overlay */}
        {selectedCafe && (
          <div className="absolute inset-0 z-[100] bg-inherit flex flex-col animate-in slide-in-from-right duration-300">
             <div className="relative h-72 shrink-0">
                <img src={selectedCafe.image} className="w-full h-full object-cover" alt={selectedCafe.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <button onClick={() => setSelectedCafe(null)} className="absolute top-8 left-6 p-4 bg-white/20 backdrop-blur-md rounded-[1.5rem] text-white">
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={(e) => toggleLove(e, selectedCafe.id)}
                  className="absolute top-8 right-6 p-4 bg-white/20 backdrop-blur-md rounded-[1.5rem] text-white"
                >
                  <Heart size={24} className={savedIds.includes(selectedCafe.id) ? 'fill-red-500 text-red-500' : ''} />
                </button>
                <div className="absolute bottom-8 left-10">
                  <h2 className="text-4xl font-black text-white italic leading-tight">{selectedCafe.name}</h2>
                  <p className="text-xs text-white/70 font-bold tracking-wide flex items-center gap-1 mt-1"><MapPin size={12}/> {selectedCafe.location}</p>
                </div>
             </div>
             <div className="p-10 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-5 rounded-3xl flex items-center gap-4 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <Wifi className="text-indigo-500" size={24} /> 
                    <div><p className="text-[8px] font-bold text-slate-500 uppercase">Wifi</p><p className="text-sm font-black">{selectedCafe.wifi}</p></div>
                  </div>
                  <div className={`p-5 rounded-3xl flex items-center gap-4 border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <Battery className="text-green-500" size={24} /> 
                    <div><p className="text-[8px] font-bold text-slate-500 uppercase">Power</p><p className="text-sm font-black">{selectedCafe.outlets}</p></div>
                  </div>
                </div>
                <section>
                  <h3 className="text-lg font-black mb-2 flex items-center gap-2">Tentang Spot</h3>
                  <p className="leading-relaxed opacity-70 text-sm font-medium">{selectedCafe.description}</p>
                </section>
                <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white flex justify-between items-center shadow-2xl">
                   <div>
                     <p className="text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] mb-1">Rata-rata Harga</p>
                     <p className="text-2xl font-black italic">{selectedCafe.avgPrice}</p>
                   </div>
                   <Navigation size={40} className="opacity-20" />
                </div>
             </div>
          </div>
        )}

        {/* Header App */}
        <header className={`px-8 pt-14 pb-16 rounded-b-[4.5rem] shadow-2xl relative overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-[#0f172a]' : 'bg-slate-900'} text-white`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full translate-x-20 -translate-y-20" />
          
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Semarang Student Hub</span>
              </div>
              <div className="relative group max-w-[200px]">
                <select 
                  className="bg-white/10 border border-white/10 rounded-2xl py-2 px-4 pr-10 font-black text-xs outline-none cursor-pointer appearance-none w-full"
                  value={selectedCampus.id}
                  onChange={(e) => setSelectedCampus(CAMPUSES.find(c => c.id === e.target.value))}
                >
                  {CAMPUSES.map(c => <option key={c.id} value={c.id} className="text-slate-900 font-bold">{c.name}</option>)}
                </select>
                <ChevronLeft size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-[-90deg] opacity-50 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all">
                {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>
              <button onClick={() => setAuthState('login')} className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          <h1 className="text-5xl font-black italic mb-10 tracking-tighter text-white/95 transition-all hover:scale-105 cursor-default">CampusVibe</h1>
          
          <div className="flex bg-white/5 p-1.5 rounded-[1.8rem] backdrop-blur-xl border border-white/10 mb-8">
            <button onClick={() => setMainCategory('WFC')} className={`flex-1 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${mainCategory === 'WFC' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white/60'}`}><Laptop size={14}/> WFC</button>
            <button onClick={() => setMainCategory('Hangout')} className={`flex-1 py-4 rounded-2xl font-black text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${mainCategory === 'Hangout' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white/60'}`}><Coffee size={14}/> HANGOUT</button>
          </div>

          <div className="relative group z-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              type="text" 
              placeholder={`Cari tempat terbaikmu...`}
              className="w-full bg-white/5 border border-white/10 text-white py-5 pl-14 pr-4 rounded-[1.5rem] focus:ring-2 focus:ring-indigo-500/50 outline-none placeholder:text-white/20 text-sm font-bold transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* View Switcher Controls */}
        <div className="flex px-10 -mt-8 relative z-50 gap-4">
           <button onClick={() => setViewMode('list')} className={`flex-1 py-4 rounded-2xl font-black text-[9px] tracking-widest shadow-2xl flex items-center justify-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 border-2 border-indigo-600 translate-y-[-2px]' : 'bg-slate-800 text-slate-500 border border-white/5'}`}>
              <List size={14} /> DAFTAR SPOT
           </button>
           <button onClick={() => setViewMode('map')} className={`flex-1 py-4 rounded-2xl font-black text-[9px] tracking-widest shadow-2xl flex items-center justify-center gap-2 transition-all ${viewMode === 'map' ? 'bg-white text-slate-900 border-2 border-indigo-600 translate-y-[-2px]' : 'bg-slate-800 text-slate-500 border border-white/5'}`}>
              <MapIcon size={14} /> MAP VIEW
           </button>
        </div>

        {/* Area Konten Utama */}
        {viewMode === 'list' ? (
          <main className="flex-1 p-8 pb-36 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex justify-between items-center mb-10 pt-6">
              <h2 className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Spot Sekitarmu</h2>
              <div className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {filteredCafes.length} Spots
              </div>
            </div>
            
            <div className="space-y-10">
              {filteredCafes.length > 0 ? filteredCafes.map(cafe => (
                <div key={cafe.id} onClick={() => setSelectedCafe(cafe)} className="group cursor-pointer">
                  <div className={`relative h-60 rounded-[3rem] overflow-hidden shadow-sm border-4 transition-all duration-500 group-hover:shadow-2xl ${isDarkMode ? 'border-white/5 group-hover:border-indigo-500/50' : 'border-white'}`}>
                    <img src={cafe.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={cafe.name} />
                    <div className="absolute top-5 left-5 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-[9px] font-black shadow-lg">
                      {cafe.distance} KM DARI KAMPUS
                    </div>
                    <button 
                      onClick={(e) => toggleLove(e, cafe.id)}
                      className={`absolute top-5 right-5 p-3 rounded-2xl shadow-lg transition-all ${savedIds.includes(cafe.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-400'}`}
                    >
                      <Heart size={16} className={savedIds.includes(cafe.id) ? 'fill-current' : ''} />
                    </button>
                    <div className="absolute bottom-6 left-8 right-8 text-white z-10">
                      <h3 className="text-2xl font-black leading-tight mb-1 italic">{cafe.name}</h3>
                      <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">{cafe.location}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center flex flex-col items-center opacity-30">
                  <Search size={64} className="mb-4" />
                  <p className="font-black text-sm uppercase tracking-widest">Tidak ada spot ditemukan</p>
                </div>
              )}
            </div>
          </main>
        ) : (
          <MapView />
        )}

        {/* Navigasi Bawah */}
        <nav className={`absolute bottom-8 left-8 right-8 h-20 border rounded-[2.8rem] flex justify-between items-center px-12 z-[90] backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 ${isDarkMode ? 'bg-slate-800/90 border-white/5' : 'bg-white/90 border-slate-200'}`}>
          <button className="flex flex-col items-center gap-1.5 text-indigo-500 scale-110"><Navigation size={22} className="fill-indigo-100" /><span className="text-[7px] font-black uppercase tracking-[0.2em]">Explore</span></button>
          <div className="relative group">
            <button className={`flex flex-col items-center gap-1.5 transition-all ${savedIds.length > 0 ? 'text-red-500' : 'text-slate-400 opacity-50'}`}>
              <Heart size={22} className={savedIds.length > 0 ? 'fill-current' : ''} />
              <span className="text-[7px] font-black uppercase tracking-[0.2em]">Saved</span>
            </button>
            {savedIds.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">{savedIds.length}</span>}
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 border-4 border-white shadow-xl flex items-center justify-center ring-4 ring-indigo-500/20 text-white font-black text-xs italic tracking-tighter">
              {getUserInitials(userName)}
            </div>
            <span className="text-[6px] font-black uppercase tracking-widest opacity-50">{userName.split(' ')[0]}</span>
          </div>
        </nav>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
}
