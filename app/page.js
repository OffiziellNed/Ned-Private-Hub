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

    const fullDate = startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-');
    const monthYear = startDate.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-');

    data.push({
      no: i,
      tanggal: fullDate,
      monthYear: monthYear,
      totalBayar: amount
    });
    
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return data;
};

export default function Dashboard() {
  const [view, setView] = useState('home');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthId, setCurrentMonthId] = useState('');
  
  // State untuk menyimpan daftar link bukti transfer (tersimpan di localStorage)
  const [proofs, setProofs] = useState({});

  const angsuranData = generateAngsuranData();

  useEffect(() => {
    const now = new Date();
    
    const today = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setCurrentDate(today);

    const targetId = now.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-');
    setCurrentMonthId(targetId);

    // Load data bukti transaksi yang tersimpan di browser sebelumnya
    const savedProofs = localStorage.getItem('ned_angsuran_proofs');
    if (savedProofs) {
      try {
        setProofs(JSON.parse(savedProofs));
      } catch (e) {
        console.error("Gagal memuat data lokal");
      }
    }
  }, []);

  // Fungsi untuk menyimpan link bukti transaksi
  const handleSaveProof = (no) => {
    const currentLink = proofs[no] || '';
    const input = prompt("Masukkan URL Lightshot / Bukti Transaksi:", currentLink);
    
    if (input !== null) {
      const updatedProofs = { ...proofs, [no]: input.trim() };
      setProofs(updatedProofs);
      localStorage.setItem('ned_angsuran_proofs', JSON.stringify(updatedProofs));
    }
  };

  const scrollToCurrentMonth = () => {
    if (currentMonthId) {
      const element = document.getElementById(`row-${currentMonthId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('Data untuk bulan ini tidak ditemukan dalam jadwal angsuran.');
      }
    }
  };

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
        
        {/* Header */}
        <header className="py-8 bg-[#0B0F19]/90 backdrop-blur-md border-b-2 border-[#05070B] flex flex-col items-center justify-center sticky top-0 z-10 shrink-0 relative">
          
          <button 
            onClick={() => setView('finansial')} 
            className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 text-center">Jadwal Angsuran Rumah</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">Monitoring progres cicilan jangka panjang</p>
          
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center space-x-2 bg-emerald-900/20 px-4 py-1.5 rounded-full border border-emerald-800/50">
               <span className="text-xs text-emerald-500/70 uppercase tracking-wider">Klien</span>
               <div className="h-3 w-px bg-emerald-800/50"></div>
               <span className="text-sm font-semibold text-emerald-400">NED DEAN BARUS</span>
            </div>
            
            {currentDate && (
              <button 
                onClick={scrollToCurrentMonth}
                className="flex items-center space-x-2 bg-indigo-900/20 hover:bg-indigo-900/40 px-4 py-1.5 rounded-full border border-indigo-800/50 transition-colors cursor-pointer"
                title="Klik untuk melompat ke cicilan bulan ini"
              >
                 <span className="text-xs text-indigo-400/70 uppercase tracking-wider">Hari Ini</span>
                 <div className="h-3 w-px bg-indigo-800/50"></div>
                 <span className="text-sm font-semibold text-indigo-300">{currentDate}</span>
              </button>
            )}
          </div>
        </header>

        {/* Area Tabel */}
        <div className="flex-1 overflow-auto p-6 sm:p-12">
          <div className="max-w-4xl mx-auto bg-[#111827] rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
            
            <div className="overflow-x-auto h-[calc(100vh-16rem)] relative custom-scrollbar">
              <table className="min-w-full divide-y divide-slate-800/60 text-left border-collapse">
                <thead className="bg-[#111827]/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
                  <tr>
                    <th scope="col" className="py-5 pl-6 pr-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-20">No.</th>
                    <th scope="col" className="px-4 py-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal Tagihan</th>
                    <th scope="col" className="px-4 py-5 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total Bayar (Rp)</th>
                    <th scope="col" className="py-5 pl-4 pr-6 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center w-28">Bukti</th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {angsuranData.map((row) => {
                    const isCurrentMonth = row.monthYear === currentMonthId;
                    const hasProof = Boolean(proofs[row.no]);
                    
                    return (
                      <tr 
                        key={row.no} 
                        id={`row-${row.monthYear}`} 
                        className={`transition-colors duration-300 group ${
                          isCurrentMonth 
                            ? 'bg-slate-800/80 shadow-inner border-l-4 border-indigo-500' 
                            : 'hover:bg-slate-800/30'
                        }`}
                      >
                        <td className={`whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium ${isCurrentMonth ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                          {String(row.no).padStart(3, '0')}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${isCurrentMonth ? 'text-slate-100 font-semibold' : 'text-slate-300'}`}>
                          {row.tanggal}
                          {isCurrentMonth && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">CURRENT</span>}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm font-mono text-right ${isCurrentMonth ? 'text-indigo-300 font-semibold' : 'text-slate-200'}`}>
                          {row.totalBayar}
                        </td>
                        {/* Kolom Aksi: Icon Upload & Icon Mata */}
                        <td className="whitespace-nowrap py-4 pl-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {/* Tombol Upload / Input Link */}
                            <button
                              onClick={() => handleSaveProof(row.no)}
                              title={hasProof ? "Ubah Link Bukti" : "Input Link Bukti Transaksi"}
                              className={`p-1.5 rounded-lg transition-colors border ${
                                hasProof 
                                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50 hover:bg-emerald-900/50' 
                                  : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700 hover:text-slate-200'
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round5" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                            </button>

                            {/* Tombol Mata (Muncul jika link sudah diisi) */}
                            {hasProof ? (
                              <a
                                href={proofs[row.no]}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Lihat Bukti Transaksi"
                                className="p-1.5 rounded-lg bg-indigo-950/40 text-indigo-400 border border-indigo-800/50 hover:bg-indigo-900/50 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </a>
                            ) : (
                              <span className="p-1.5 text-slate-600 cursor-not-allowed" title="Belum ada bukti">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="bg-slate-900/50 border-t border-slate-800/60 px-8 py-4 flex justify-between items-center">
                <span className="text-xs text-slate-500">Menampilkan 240 bulan angsuran</span>
                <span className="text-xs font-medium text-emerald-500 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                  Data Tersimpan Lokal (Aman)
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
