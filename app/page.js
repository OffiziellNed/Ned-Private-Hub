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
  const [view, setView] = useState('home');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthId, setCurrentMonthId] = useState('');
  const [proofs, setProofs] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const fileInputRef = useRef(null);

  // State untuk Fitur Keamanan PIN
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
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
      } else {
        alert("Koneksi Supabase belum terdeteksi oleh Vercel.");
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

  // Logika Klik Menu Finansial
  const handleAccessFinansial = () => {
    if (isUnlocked) {
      setView('finansial');
    } else {
      setShowPinPrompt(true);
    }
  };

  // Logika Submit PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinCode === '010525') {
      setIsUnlocked(true);
      setShowPinPrompt(false);
      setView('finansial');
      setPinCode('');
      setPinError(false);
    } else {
      setPinError(true);
      setPinCode('');
    }
  };

  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <span className="text-white font-bold text-3xl leading-none">N</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-12 tracking-tight">Ned Private Hub</h1>
        <button 
          onClick={handleAccessFinansial}
          className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group w-72 justify-center relative"
        >
          {/* Ikon Gembok Kecil kalau belum Unlock */}
          {!isUnlocked && (
            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white rounded-full p-1 shadow-lg">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
              </svg>
            </div>
          )}
          <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Finansial</span>
        </button>

        {/* Modal Prompt PIN */}
        {showPinPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 backdrop-blur-sm px-4">
            <div className="bg-[#111827] border border-slate-700/60 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-indigo-500/10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 text-indigo-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">Akses Terkunci</h3>
              <p className="text-sm text-slate-400 mb-6 text-center">Masukkan kode keamanan untuk mengakses menu Finansial.</p>
              
              <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-4">
                <input 
                  type="password" 
                  autoFocus
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full bg-[#0B0F19] border ${pinError ? 'border-red-500/50 focus:border-red-500' : 'border-slate-700 focus:border-indigo-500'} rounded-xl px-4 py-3 text-center text-2xl tracking-widest text-slate-200 outline-none transition-colors`}
                  placeholder="••••••"
                  maxLength={6}
                />
                {pinError && <span className="text-xs text-red-400 text-center mt-[-8px]">Kode salah, silakan coba lagi.</span>}
                <div className="flex gap-3 mt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowPinPrompt(false);
                      setPinCode('');
                      setPinError(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

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
                  {angsuranData.map((row) => {
                    const isCurrentMonth = row.monthYear === currentMonthId;
                    const hasProof = Boolean(proofs[row.no] && proofs[row.no].trim() !== "");
                    
                    // Logika khusus: No 1 s/d 45 dianggap sudah lewat (History)
                    const isPast = row.no <= 45;
                    const isCompleted = hasProof || isPast; 
                    
                    // Styling text khusus untuk baris 001 - 045 (Sama persis dengan warna disabled icon #475569)
                    const pastTextStyle = isPast && !isCurrentMonth ? { color: '#475569' } : {};
                    
                    return (
                      <tr 
                        key={row.no} 
                        id={`row-${row.monthYear}`} 
                        className={`transition-colors duration-300 group ${
                          isCurrentMonth 
                            ? 'bg-slate-800/80 shadow-inner border-l-2 sm:border-l-4 border-indigo-500' 
                            : (isPast ? 'bg-transparent' : 'hover:bg-slate-800/30')
                        }`}
                      >
                        {/* Kolom Nomor */}
                        <td 
                          className={`whitespace-nowrap py-3 sm:py-4 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[11px] sm:text-sm font-medium ${isCurrentMonth ? 'text-indigo-400' : (!isPast ? 'text-slate-500 group-hover:text-slate-300' : '')}`}
                          style={pastTextStyle}
                        >
                          {String(row.no).padStart(3, '0')}
                        </td>

                        {/* Kolom Tanggal */}
                        <td 
                          className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm ${isCurrentMonth ? 'text-slate-100 font-semibold' : (!isPast ? 'text-slate-300 group-hover:text-slate-200' : '')}`}
                          style={pastTextStyle}
                        >
                          {row.tanggal}
                          {isCurrentMonth && <span className="ml-1 sm:ml-2 inline-flex items-center px-1 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">CUR</span>}
                        </td>

                        {/* Kolom Total Bayar */}
                        <td 
                          className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm tracking-tighter sm:tracking-normal font-mono text-right ${isCurrentMonth ? 'text-indigo-300 font-semibold' : (!isPast ? 'text-slate-200 group-hover:text-white' : '')}`}
                          style={pastTextStyle}
                        >
                          {row.totalBayar}
                        </td>
                        
                        {/* Kolom Aksi */}
                        <td className="whitespace-nowrap py-3 sm:py-4 px-1 sm:px-4 text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            
                            {/* Tombol Upload */}
                            <button
                              onClick={() => handleSaveProof(row.no)}
                              title="Input/Edit Link Bukti"
                              className={`p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors border ${
                                isPast && !hasProof 
                                  ? 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40' 
                                  : 'bg-slate-800/50 hover:bg-slate-700 border-slate-700/50 text-slate-300'
                              }`}
                              style={isPast && !hasProof ? { color: '#475569' } : {}}
                            >
                              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                            </button>

                            {/* Tombol Mata */}
                            {hasProof ? (
                              <a
                                href={proofs[row.no]}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Lihat Bukti"
                                className="p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors hover:opacity-80"
                                style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.4)', borderWidth: '1px', color: '#818cf8' }}
                              >
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </a>
                            ) : (
                              <span 
                                className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30 cursor-not-allowed" 
                                title="Belum ada bukti"
                                style={{ color: '#475569' }}
                              >
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                              </span>
                            )}

                            {/* Tombol Checklist Terkunci Hijau Jika isCompleted */}
                            {isCompleted ? (
                              <div 
                                title={isPast && !hasProof ? "Lunas (Data Historis)" : "Lunas / Bukti Tersimpan"} 
                                className="p-1 sm:p-2 rounded-md sm:rounded-lg"
                                style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', borderWidth: '1px', color: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}
                              >
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : (
                              <div 
                                title="Menunggu" 
                                className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30"
                                style={{ color: '#475569' }}
                              >
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                <span className="text-[10px] sm:text-xs text-slate-500">240 bulan angsuran</span>
                <span className="text-[10px] sm:text-xs font-medium text-blue-400 flex items-center">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 mr-1.5 sm:mr-2 animate-pulse"></span>
                  {isSyncing ? "Menghubungkan Cloud..." : "Tersinkronisasi ke Cloud"}
                </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
