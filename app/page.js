'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Memanggil kunci rahasia yang sudah disuntikkan Vercel secara otomatis
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

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
  const [view, setView] = useState('locked');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthId, setCurrentMonthId] = useState('');
  const [proofs, setProofs] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const fileInputRef = useRef(null);

  // State untuk Custom Numpad PIN
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);

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

    const fetchProofs = async () => {
      if (!supabase) {
        setIsSyncing(false);
        return;
      }
      const { data, error } = await supabase.from('angsuran_rumah').select('*');
      if (error) {
        console.error("Gagal menarik data cloud:", error);
      } else if (data) {
        const loadedProofs = {};
        data.forEach(item => {
          loadedProofs[item.no_angsuran] = item.link_bukti;
        });
        setProofs(loadedProofs);
      }
      setIsSyncing(false);
    };

    fetchProofs();
  }, []);

  // --- LOGIKA CUSTOM NUMPAD PIN ---
  const handleNumClick = (num) => {
    if (pinCode.length < 6) {
      setPinCode(prev => prev + num);
      setPinError(false);
    }
  };

  const handleDelete = () => {
    setPinCode(prev => prev.slice(0, -1));
    setPinError(false);
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      if (pinCode === '010525') {
        setTimeout(() => {
          setView('home');
          setPinCode('');
        }, 150);
      } else {
        setPinError(true);
        setTimeout(() => {
          setPinCode('');
          setPinError(false);
        }, 600);
      }
    }
  }, [pinCode]);
  // --------------------------------

  const handleSaveProof = async (no) => {
    const currentLink = proofs[no] || '';
    const input = prompt("Masukkan URL Lightshot / Bukti Transaksi:", currentLink);
    
    if (input !== null) {
      const newLink = input.trim();
      setProofs({ ...proofs, [no]: newLink });

      if (supabase) {
        const { error } = await supabase
          .from('angsuran_rumah')
          .upsert({ no_angsuran: no, link_bukti: newLink });
          
        if (error) {
          alert("Gagal sinkronisasi ke awan: " + error.message);
        }
      }
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

  const handleExportData = () => {
    const dataStr = JSON.stringify(proofs);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'Backup_Angsuran_Ned.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedProofs = JSON.parse(event.target.result);
        setProofs(importedProofs);
        
        if (supabase) {
          const upsertData = Object.keys(importedProofs).map(key => ({
            no_angsuran: parseInt(key),
            link_bukti: importedProofs[key]
          }));
          await supabase.from('angsuran_rumah').upsert(upsertData);
        }
        alert("Data berhasil dipulihkan!");
      } catch (err) {
        alert("Gagal membaca file backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  // 0. TAMPILAN LOCK SCREEN (Benar-benar Center / Di Tengah Layar)
  if (view === 'locked') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 px-4 overflow-hidden">
        <div className="flex flex-col items-center w-full max-w-sm my-auto">

          {/* Ikon Gembok Kecil di Atas */}
          <div className="mb-3 text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
            </svg>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1 tracking-tight">Ned Private Hub</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 text-center font-medium">Your PIN contains 6 digits.</p>
          
          {/* PIN Display Area (Bulatan Titik / Dots) */}
          <div className="flex gap-4 mb-8 h-5 items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                  pinError 
                    ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' 
                    : i < pinCode.length 
                      ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' 
                      : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>

          {/* Custom Numpad (Bulat sempurna, tanpa border, ada alphabet text) */}
          <div className="grid grid-cols-3 gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-4 w-full max-w-[260px] sm:max-w-[290px] justify-items-center">
             {[
               { num: '1', alpha: '' }, { num: '2', alpha: 'ABC' }, { num: '3', alpha: 'DEF' },
               { num: '4', alpha: 'GHI' }, { num: '5', alpha: 'JKL' }, { num: '6', alpha: 'MNO' },
               { num: '7', alpha: 'PQRS' }, { num: '8', alpha: 'TUV' }, { num: '9', alpha: 'WXYZ' }
             ].map(item => (
                <button 
                  key={item.num} 
                  onClick={() => handleNumClick(item.num)} 
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex flex-col items-center justify-center transition-all border-none"
                >
                  <span className="text-2xl sm:text-3xl font-medium text-slate-200 leading-none">{item.num}</span>
                  {item.alpha && <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 mt-1 leading-none">{item.alpha}</span>}
                </button>
             ))}
             
             {/* Tombol Hapus (Backspace) di Kiri */}
             <button 
               onClick={handleDelete} 
               className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-slate-400 hover:text-slate-200 transition-all active:scale-95 border-none"
             >
               <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
               </svg>
             </button>
             
             {/* Angka 0 di Tengah */}
             <button 
               onClick={() => handleNumClick('0')} 
               className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex flex-col items-center justify-center transition-all border-none"
             >
               <span className="text-2xl sm:text-3xl font-medium text-slate-200 leading-none">0</span>
             </button>
             
             {/* Tombol Clear di Kanan */}
             <button 
               onClick={() => { setPinCode(''); setPinError(false); }}
               className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all active:scale-95 uppercase tracking-widest border-none"
             >
               Clear
             </button>
          </div>
          
        </div>
      </div>
    );
  }

  // 1. TAMPILAN HOME
  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
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
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 relative">
        <button 
          onClick={() => setView('home')} 
          className="absolute top-6 left-4 sm:top-12 sm:left-12 flex items-center text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50"
        >
          <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm sm:text-base">Kembali</span>
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
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
        
        <header className="shrink-0 py-6 sm:py-8 px-4 sm:px-0 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button 
            onClick={() => setView('finansial')} 
            className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center mt-1 sm:mt-0">Jadwal Angsuran Rumah</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Monitoring progres cicilan jangka panjang</p>
          
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2 bg-emerald-900/20 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-800/50">
                 <span className="text-[10px] sm:text-xs text-emerald-500/70 uppercase tracking-wider">Klien</span>
                 <div className="h-3 w-px bg-emerald-800/50"></div>
                 <span className="text-xs sm:text-sm font-semibold text-emerald-400">NED DEAN BARUS</span>
              </div>
              
              {currentDate && (
                <button 
                  onClick={scrollToCurrentMonth}
                  className="flex items-center space-x-1.5 sm:space-x-2 bg-indigo-900/20 hover:bg-indigo-900/40 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-indigo-800/50 transition-colors cursor-pointer"
                  title="Klik untuk melompat ke cicilan bulan ini"
                >
                   <span className="text-[10px] sm:text-xs text-indigo-400/70 uppercase tracking-wider">Hari Ini</span>
                   <div className="h-3 w-px bg-indigo-800/50"></div>
                   <span className="text-xs sm:text-sm font-semibold text-indigo-300">{currentDate}</span>
                </button>
              )}
            </div>

            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={handleExportData} title="Backup Data (Download)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </button>
              <button onClick={() => fileInputRef.current.click()} title="Restore Data (Upload)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <input type="file" accept=".json" ref={fileInputRef} onChange={handleImportData} className="hidden" />
            </div>
          </div>
        </header>

        <div className="flex-1 p-3 sm:p-12 overflow-hidden flex flex-col w-full">
          <div className="w-full max-w-4xl mx-auto flex-1 bg-[#111827] rounded-xl sm:rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            
            <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar relative">
              <table className="w-full text-left border-collapse min-w-[300px]">
                <thead className="bg-[#111827] sticky top-0 z-20 shadow-[0_1px_0_0_rgba(30,41,59,0.6)]">
                  <tr>
                    <th scope="col" className="py-3 sm:py-5 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider w-8 sm:w-20 bg-[#111827]">No.</th>
                    <th scope="col" className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider bg-[#111827]">Tanggal</th>
                    <th scope="col" className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider text-right bg-[#111827]">Total (Rp)</th>
                    <th scope="col" className="py-3 sm:py-5 px-1 sm:px-4 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider text-center w-20 sm:w-40 bg-[#111827]">Bukti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {ang
