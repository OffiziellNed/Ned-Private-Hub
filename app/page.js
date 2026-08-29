'use client';

import { useState, useEffect } from 'react';

// Data Generator berdasarkan Jadwal Angsuran Rumah NED DEAN BARUS
const generateAngsuranData = () => {
  const data = [];
  let startDate = new Date('2022-10-25');

  for (let i = 1; i <= 240; i++) {
    let amount = "0";
    if (i >= 1 && i <= 12) amount = "2,721,798.00";
    else if (i >= 13 && i <= 24) amount = "2,857,887.90";
    else if (i >= 25 && i <= 36) amount = "3,000,782.30";
    else if (i >= 37 && i <= 48) amount = "3,150,821.41";
    else if (i >= 49 && i <= 60) amount = "3,308,362.48";
    else if (i >= 61 && i <= 239) amount = "4,064,640.85";
    else if (i === 240) amount = "4,064,642.33";

    data.push({
      no: i,
      tanggal: startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-'),
      totalBayar: amount
    });
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return data;
};

export default function Dashboard() {
  const [view, setView] = useState('home');
  const [currentDate, setCurrentDate] = useState('');
  const angsuranData = generateAngsuranData();

  useEffect(() => {
    // Mengambil tanggal hari ini secara dinamis untuk menghindari hydration error
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setCurrentDate(today);
  }, []);

  // 1. TAMPILAN HOME
  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <span className="text-white font-bold text-3xl leading-none">N</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-12 tracking-tight">Ned Private Hub</h1>
        
        <button 
          onClick={() => setView('finansial')}
          className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group w-72 justify-center"
        >
          <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Finansial</span>
        </button>
      </div>
    );
  }

  // 2. TAMPILAN MENU FINANSIAL
  if (view === 'finansial') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 relative">
        <button 
          onClick={() => setView('home')} 
          className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>

        <div className="w-16 h-16 mb-6 rounded-2xl bg-[#111827] border border-slate-700/60 flex items-center justify-center shadow-xl shadow-indigo-500/10 text-indigo-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-12 tracking-tight">Finansial</h1>
        
        <button 
          onClick={() => setView('angsuran')}
          className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group w-80 justify-center"
        >
          <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Angsuran Rumah</span>
        </button>
      </div>
    );
  }

  // 3. TAMPILAN DATA ANGSURAN RUMAH
  if (view === 'angsuran') {
    return (
      <div className="flex flex-col h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
        
        {/* Header Data Tabel */}
        <header className="py-8 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/60 flex flex-col items-center justify-center sticky top-0 z-10 shrink-0 relative">
          
          {/* Tombol Kembali */}
          <button 
            onClick={() => setView('finansial')} 
            className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Judul & Subjudul Tengah */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 text-center">Jadwal Angsuran Rumah</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">Monitoring progres cicilan jangka panjang</p>
          
          {/* Info Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {/* Badge Klien */}
            <div className="flex items-center space-x-2 bg-emerald-900/20 px-4 py-1.5 rounded-full border border-emerald-800/50">
               <span className="text-xs text-emerald-500/70 uppercase tracking-wider">Klien</span>
               <div className="h-3 w-px bg-emerald-800/50"></div>
               <span className="text-sm font-semibold text-emerald-400">NED DEAN BARUS</span>
            </div>
            
            {/* Badge Tanggal Terkini */}
            {currentDate && (
              <div className="flex items-center space-x-2 bg-indigo-900/20 px-4 py-1.5 rounded-full border border-indigo-800/50">
                 <span className="text-xs text-indigo-400/70 uppercase tracking-wider">Hari Ini</span>
                 <div className="h-3 w-px bg-indigo-800/50"></div>
                 <span className="text-sm font-semibold text-indigo-300">{currentDate}</span>
              </div>
            )}
          </div>
        </header>

        {/* Area Tabel Dipersempit (Menggunakan max-w-3xl) */}
        <div className="flex-1 overflow-auto p-6 sm:p-12">
          <div className="max-w-3xl mx-auto bg-[#111827] rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
            
            <div className="overflow-x-auto h-[calc(100vh-16rem)] relative custom-scrollbar">
              <table className="min-w-full divide-y divide-slate-800/60 text-left border-collapse">
                <thead className="bg-[#111827]/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
                  <tr>
                    <th scope="col" className="py-5 pl-8 pr-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">No.</th>
                    <th scope="col" className="px-4 py-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal Tagihan</th>
                    <th scope="col" className="px-8 py-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total Bayar (Rp)</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {angsuranData.map((row) => (
                    <tr key={row.no} className="hover:bg-slate-800/30 transition-colors duration-150 group">
                      <td className="whitespace-nowrap py-4 pl-8 pr-3 text-sm font-medium text-slate-500 group-hover:text-slate-300">
                        {String(row.no).padStart(3, '0')}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">
                        {row.tanggal}
                      </td>
                      <td className="whitespace-nowrap px-8 py-4 text-sm font-mono text-slate-200 text-right">
                        {row.totalBayar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-900/50 border-t border-slate-800/60 px-8 py-4 flex justify-between items-center">
                <span className="text-xs text-slate-500">Menampilkan 240 bulan angsuran</span>
                <span className="text-xs font-medium text-emerald-500 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                  Data Terverifikasi
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
