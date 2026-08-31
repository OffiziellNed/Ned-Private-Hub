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

// Fungsi Pintar untuk mengubah link Google Drive menjadi Direct Image Link
const parseImageUrl = (url) => {
  if (!url) return '';
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) match = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (!match) match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

// --- KOMPONEN KHUSUS KARTU PROMPT (Desain Slide 1 | Slide 2) ---
function PromptCard({ p, index, onDelete, copyToClipboard, copySuccess }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = [p.image1, p.image2, p.image3].filter(img => img && img.trim() !== '');

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      {/* Header Judul */}
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="font-bold text-slate-100 text-[17px] leading-tight">
          {index + 1}. {p.title}
        </h3>
        <button onClick={() => onDelete(p.id)} className="p-1 mt-0.5 text-slate-600 hover:text-red-400 transition-colors shrink-0" title="Hapus">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>

      {/* Slide Tabs (Slide 1 | Slide 2) */}
      {images.length > 0 && (
        <div className="flex gap-4 border-b border-slate-800 pb-1.5 mb-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`text-[11px] font-semibold tracking-wider pb-1.5 -mb-[7px] border-b-2 transition-all ${
                activeSlide === idx 
                  ? 'text-red-500 border-red-500' 
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              Slide {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Gambar Utama */}
      <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 mb-4 shadow-lg shrink-0">
        {images.length > 0 ? (
           <img 
             src={parseImageUrl(images[activeSlide])} 
             alt={`Slide ${activeSlide + 1}`} 
             className="w-full h-full object-cover transition-opacity duration-300" 
             onError={(e) => { e.target.src = `https://via.placeholder.com/600x800/1e293b/475569?text=Image+Error`; }} 
           />
        ) : (
           <div className="w-full h-full flex items-center justify-center text-slate-700 text-xs">No Image</div>
        )}
      </div>

      {/* Kotak Teks Prompt (Scrollable) */}
      <div className="bg-[#111827] border border-slate-800/60 rounded-xl p-4 flex-1 flex flex-col h-[220px]">
        <div className="overflow-y-auto custom-scrollbar flex-1 mb-4 pr-1">
          <p className="text-[13px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
            {p.prompt_text}
          </p>
        </div>
        
        {/* Tombol Copy */}
        <button 
          onClick={() => copyToClipboard(p.prompt_text, p.id)}
          className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shrink-0 ${
            copySuccess === p.id 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : 'bg-slate-800/50 hover:bg-slate-700 text-slate-300 border border-slate-700/50'
          }`}
        >
          {copySuccess === p.id ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [view, setView] = useState('locked');
  const [currentDate, setCurrentDate] = useState('');
  const [currentMonthId, setCurrentMonthId] = useState('');
  const [proofs, setProofs] = useState({});
  const [isSyncing, setIsSyncing] = useState(true);
  const fileInputRef = useRef(null);

  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [descInput, setDescInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [typeInput, setTypeInput] = useState('pendapatan');

  const [prompts, setPrompts] = useState([]);
  const [showPromptForm, setShowPromptForm] = useState(false);
  const [promptForm, setPromptForm] = useState({ title: '', image1: '', image2: '', image3: '', text: '' });
  const [copySuccess, setCopySuccess] = useState(null);

  const angsuranData = generateAngsuranData();

  useEffect(() => {
    const now = new Date();
    const today = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    setCurrentDate(today);
    setCurrentMonthId(now.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }).replace(/ /g, '-'));

    const fetchData = async () => {
      if (!supabase) { setIsSyncing(false); return; }
      
      const { data: proofData } = await supabase.from('angsuran_rumah').select('*');
      if (proofData) {
        const loadedProofs = {};
        proofData.forEach(item => { loadedProofs[item.no_angsuran] = item.link_bukti; });
        setProofs(loadedProofs);
      }

      const { data: trxData } = await supabase.from('transaksi_keuangan').select('*').order('id', { ascending: false });
      if (trxData) setTransactions(trxData);

      const { data: promptData } = await supabase.from('prompts_gallery').select('*').order('id', { ascending: false });
      if (promptData) setPrompts(promptData);

      setIsSyncing(false);
    };

    fetchData();
  }, []);

  const handleNumClick = (num) => {
    if (pinCode.length < 6) { setPinCode(prev => prev + num); setPinError(false); }
  };

  const handleDelete = () => {
    setPinCode(prev => prev.slice(0, -1)); setPinError(false);
  };

  useEffect(() => {
    if (pinCode.length === 6) {
      if (pinCode === '010525') {
        setTimeout(() => { setView('home'); setPinCode(''); }, 150);
      } else {
        setPinError(true);
        setTimeout(() => { setPinCode(''); setPinError(false); }, 600);
      }
    }
  }, [pinCode]);

  const handleSaveProof = async (no) => {
    const currentLink = proofs[no] || '';
    const input = prompt("Masukkan URL Lightshot / Bukti Transaksi:", currentLink);
    if (input !== null) {
      const newLink = input.trim();
      setProofs({ ...proofs, [no]: newLink });
      if (supabase) await supabase.from('angsuran_rumah').upsert({ no_angsuran: no, link_bukti: newLink });
    }
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    if (rawValue) {
      setAmountInput(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."));
    } else setAmountInput('');
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!descInput.trim() || !amountInput) return;
    const newTrx = { id: Date.now(), deskripsi: descInput.trim(), nominal: parseFloat(amountInput.replace(/\./g, '')), tipe: typeInput, status_lunas: false };
    setTransactions([newTrx, ...transactions]);
    setDescInput(''); setAmountInput('');
    if (supabase) await supabase.from('transaksi_keuangan').insert([newTrx]);
  };

  const handleDeleteTransaction = async (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    if (supabase) await supabase.from('transaksi_keuangan').delete().eq('id', id);
  };

  const handleToggleLunas = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    setTransactions(transactions.map(t => t.id === id ? { ...t, status_lunas: newStatus } : t));
    if (supabase) await supabase.from('transaksi_keuangan').update({ status_lunas: newStatus }).eq('id', id);
  };

  const handleResetCentang = async () => {
    if (!confirm("Reset semua centang pengeluaran menjadi belum dibayar?")) return;
    setTransactions(transactions.map(t => t.tipe === 'pengeluaran' ? { ...t, status_lunas: false } : t));
    if (supabase) await supabase.from('transaksi_keuangan').update({ status_lunas: false }).eq('tipe', 'pengeluaran');
  };

  const handleClearAllTransactions = async () => {
    if (!confirm("Hapus SEMUA data transaksi? (Data tidak bisa dikembalikan)")) return;
    setTransactions([]);
    if (supabase) await supabase.from('transaksi_keuangan').delete().gt('id', 0);
  };

  const totalPendapatan = transactions.filter(t => t.tipe === 'pendapatan').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const totalPengeluaran = transactions.filter(t => t.tipe === 'pengeluaran').reduce((acc, curr) => acc + Number(curr.nominal), 0);
  const sisaSaldo = totalPendapatan - totalPengeluaran;
  const formatRupiah = (num) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleExportPDF = () => {
    const generatePDF = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16); doc.text("Laporan Pendapatan & Pengeluaran", 14, 15);
      doc.setFontSize(10); doc.setTextColor(100); doc.text(`Tanggal Cetak: ${currentDate}`, 14, 22);

      const sortedTrx = [...transactions].sort((a, b) => {
        if (a.tipe === 'pendapatan' && b.tipe === 'pengeluaran') return -1;
        if (a.tipe === 'pengeluaran' && b.tipe === 'pendapatan') return 1;
        return b.id - a.id; 
      });

      const tableData = sortedTrx.map((t, index) => [
        index + 1, t.tipe.toUpperCase(), t.deskripsi,
        t.tipe === 'pendapatan' ? `+ ${formatRupiah(t.nominal)}` : `- ${formatRupiah(t.nominal)}`,
        t.tipe === 'pengeluaran' ? (t.status_lunas ? 'Lunas' : 'Belum') : '-'
      ]);

      doc.autoTable({
        startY: 28, head: [['No', 'Tipe', 'Deskripsi', 'Nominal', 'Status']], body: tableData,
        theme: 'striped', headStyles: { fillColor: [79, 70, 229] }, styles: { fontSize: 9 }, alternateRowStyles: { fillColor: [245, 247, 250] }
      });

      const finalY = doc.lastAutoTable.finalY || 28;
      doc.setFontSize(11);
      doc.setTextColor(16, 185, 129); doc.text(`Total Pendapatan: ${formatRupiah(totalPendapatan)}`, 14, finalY + 10);
      doc.setTextColor(239, 68, 68); doc.text(`Total Pengeluaran: ${formatRupiah(totalPengeluaran)}`, 14, finalY + 16);
      doc.setTextColor(99, 102, 241); doc.text(`Sisa Saldo Bersih: ${formatRupiah(sisaSaldo)}`, 14, finalY + 22);
      doc.save(`Cashflow_Ned_${currentMonthId}.pdf`);
    };

    if (window.jspdf) generatePDF();
    else {
      const script1 = document.createElement('script'); script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      const script2 = document.createElement('script'); script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js';
      script1.onload = () => document.body.appendChild(script2);
      script2.onload = () => generatePDF();
      document.body.appendChild(script1);
    }
  };

  const scrollToCurrentMonth = () => {
    if (currentMonthId) {
      const element = document.getElementById(`row-${currentMonthId}`);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleExportData = () => {
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(proofs));
    const linkElement = document.createElement('a'); linkElement.setAttribute('href', dataUri); linkElement.setAttribute('download', 'Backup_Angsuran_Ned.json'); linkElement.click();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedProofs = JSON.parse(event.target.result); setProofs(importedProofs);
        if (supabase) {
          const upsertData = Object.keys(importedProofs).map(key => ({ no_angsuran: parseInt(key), link_bukti: importedProofs[key] }));
          await supabase.from('angsuran_rumah').upsert(upsertData);
        }
        alert("Data berhasil dipulihkan!");
      } catch (err) { alert("Gagal membaca file backup."); }
    };
    reader.readAsText(file); e.target.value = null;
  };

  const handleAddPrompt = async (e) => {
    e.preventDefault();
    if (!promptForm.title.trim() || !promptForm.text.trim()) return;

    const newPromptEntry = {
      id: Date.now(), title: promptForm.title.trim(), image1: promptForm.image1.trim(), image2: promptForm.image2.trim(), image3: promptForm.image3.trim(), prompt_text: promptForm.text.trim()
    };
    setPrompts([newPromptEntry, ...prompts]);
    setPromptForm({ title: '', image1: '', image2: '', image3: '', text: '' });
    setShowPromptForm(false);

    if (supabase) await supabase.from('prompts_gallery').insert([newPromptEntry]);
  };

  const handleDeletePrompt = async (id) => {
    if (!confirm("Hapus prompt ini dari gallery?")) return;
    setPrompts(prompts.filter(p => p.id !== id));
    if (supabase) await supabase.from('prompts_gallery').delete().eq('id', id);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(id); setTimeout(() => setCopySuccess(null), 2000);
    });
  };

  // 0. LOCK SCREEN
  if (view === 'locked') {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center justify-center w-full max-w-sm px-4">
          <div className="mb-2 text-slate-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7z" /></svg>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-0.5 tracking-tight">Ned Private Hub</h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 text-center font-medium">Your PIN contains 6 digits.</p>
          <div className="flex gap-4 mb-8 h-5 items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${pinError ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : i < pinCode.length ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'bg-slate-800'}`}></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-3 sm:gap-x-7 sm:gap-y-4 w-full max-w-[260px] sm:max-w-[290px] justify-items-center">
             {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button key={num} onClick={() => handleNumClick(num)} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex items-center justify-center transition-all border-none text-2xl sm:text-3xl font-medium text-slate-200 shadow-sm">{num}</button>
             ))}
             <button onClick={handleDelete} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-slate-400 hover:text-slate-200 transition-all active:scale-95 border-none">
               <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg>
             </button>
             <button onClick={() => handleNumClick('0')} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-slate-800/40 hover:bg-slate-700/60 active:bg-slate-700 active:scale-95 flex items-center justify-center transition-all border-none text-2xl sm:text-3xl font-medium text-slate-200 shadow-sm">0</button>
             <button onClick={() => { setPinCode(''); setPinError(false); }} className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-transparent active:bg-slate-800/30 text-xs sm:text-sm font-bold text-slate-400 hover:text-slate-200 transition-all active:scale-95 uppercase tracking-widest border-none">Clear</button>
          </div>
        </div>
      </div>
    );
  }

  // 1. HOME
  if (view === 'home') {
    return (
      <div className="flex flex-col items-center justify-start pt-32 sm:pt-40 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <span className="text-white font-bold text-3xl leading-none">N</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-12 tracking-tight">Ned Private Hub</h1>
        
        <div className="flex flex-col gap-4">
          <button onClick={() => setView('finansial')} className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group w-72 justify-start">
            <svg className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Finansial</span>
          </button>

          <button onClick={() => setView('prompt_gallery')} className="flex items-center gap-4 px-8 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 group w-72 justify-start">
            <svg className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            <span className="text-xl font-medium text-slate-200 group-hover:text-white transition-colors">Prompt</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. FINANSIAL MENU
  if (view === 'finansial') {
    return (
      <div className="flex flex-col items-center justify-start pt-24 sm:pt-32 min-h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 relative px-4">
        <button onClick={() => setView('home')} className="absolute top-6 left-4 sm:top-12 sm:left-12 flex items-center text-slate-400 hover:text-slate-200 transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50">
          <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-sm sm:text-base">Kembali</span>
        </button>

        <div className="w-16 h-16 mb-6 rounded-2xl bg-[#111827] border border-slate-700/60 flex items-center justify-center shadow-xl shadow-indigo-500/10 text-indigo-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100 mb-8 sm:mb-12 tracking-tight">Finansial</h1>
        
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm">
          <button onClick={() => setView('angsuran')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group justify-start">
            <svg className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">Angsuran Rumah</span>
          </button>
          <button onClick={() => setView('transaksi')} className="flex items-center gap-4 px-6 py-5 bg-[#111827] hover:bg-slate-800 border border-slate-700/60 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 group justify-start">
            <svg className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
            <span className="text-lg font-medium text-slate-200 group-hover:text-white transition-colors">Pendapatan & Pengeluaran</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. PROMPT GALLERY (Layout Grid 4 Kolom)
  if (view === 'prompt_gallery') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-purple-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('home')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center">Prompt Gallery</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Library referensi visual & AI prompt</p>
          <button onClick={() => setShowPromptForm(!showPromptForm)} className="absolute right-4 top-6 sm:right-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:px-4 sm:py-2 rounded-full sm:rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 transition-colors border border-purple-500/50 flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            <span className="hidden sm:inline text-sm font-medium">Tambah Prompt</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar w-full">
          <div className="w-full max-w-[1600px] mx-auto">
            {showPromptForm && (
              <form onSubmit={handleAddPrompt} className="max-w-3xl mx-auto w-full bg-[#111827] border border-slate-800 rounded-2xl p-6 mb-10 shadow-xl flex flex-col animate-fadeIn">
                <input type="text" placeholder="Nama / Judul Prompt" required value={promptForm.title} onChange={(e) => setPromptForm({...promptForm, title: e.target.value})} className="w-full border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-purple-500 font-bold mb-5" style={{ backgroundColor: '#0B0F19', color: '#e2e8f0' }} />
                <div className="flex flex-col gap-3 mb-5">
                  <input type="text" placeholder="Link Gambar 1 (Google Drive / URL)" value={promptForm.image1} onChange={(e) => setPromptForm({...promptForm, image1: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                  <input type="text" placeholder="Link Gambar 2 (Google Drive / URL)" value={promptForm.image2} onChange={(e) => setPromptForm({...promptForm, image2: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                  <input type="text" placeholder="Link Gambar 3 (Google Drive / URL)" value={promptForm.image3} onChange={(e) => setPromptForm({...promptForm, image3: e.target.value})} className="w-full border border-slate-700 text-xs rounded-lg px-4 py-2.5 outline-none focus:border-purple-500" style={{ backgroundColor: '#0B0F19', color: '#94a3b8' }} />
                </div>
                <textarea placeholder="Masukkan text prompt AI di sini (bisa pakai enter / paragraf)..." required value={promptForm.text} onChange={(e) => setPromptForm({...promptForm, text: e.target.value})} className="w-full min-h-[140px] border border-slate-700 text-sm rounded-lg px-4 py-3 outline-none focus:border-purple-500 resize-none leading-relaxed mb-5" style={{ backgroundColor: '#0B0F19', color: '#cbd5e1' }}></textarea>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowPromptForm(false)} className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">Batal</button>
                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">Simpan Prompt</button>
                </div>
              </form>
            )}

            {prompts.length === 0 && !showPromptForm ? (
              <div className="text-center py-20 text-slate-500 flex flex-col items-center">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p>Belum ada prompt yang disimpan.</p>
              </div>
            ) : (
              // GRID 4 KOLOM DI SINI
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {prompts.map((p, idx) => (
                   <PromptCard key={p.id} p={p} index={idx} onDelete={handleDeletePrompt} copyToClipboard={copyToClipboard} copySuccess={copySuccess} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 4. TRANSAKSI (Sama seperti sebelumnya)
  if (view === 'transaksi') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('finansial')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-lg sm:text-2xl font-bold text-slate-100 text-center">Pendapatan & Pengeluaran</h2>
          <p className="text-[10px] sm:text-sm text-slate-500 mt-1 text-center">Kalkulator cashflow bulanan otomatis</p>
        </header>
        <div className="flex-1 p-3 sm:p-8 overflow-hidden flex flex-col w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 shrink-0">
            <div className="bg-[#111827] border border-emerald-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#34d399' }}>Total Pendapatan</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: '#10b981' }}>{formatRupiah(totalPendapatan)}</span>
            </div>
            <div className="bg-[#111827] border border-red-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#f87171' }}>Total Pengeluaran</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: '#ef4444' }}>{formatRupiah(totalPengeluaran)}</span>
            </div>
            <div className="bg-[#111827] border border-indigo-800/40 rounded-xl p-4 flex flex-col justify-between shadow-lg">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#818cf8' }}>Sisa Saldo Bersih</span>
              <span className="text-lg sm:text-xl font-bold font-mono mt-2" style={{ color: sisaSaldo >= 0 ? '#818cf8' : '#ef4444' }}>{formatRupiah(sisaSaldo)}</span>
            </div>
          </div>
          <form onSubmit={handleAddTransaction} className="bg-[#111827] border border-slate-800 rounded-xl p-4 mb-4 shrink-0 flex flex-col sm:flex-row gap-3">
            <select value={typeInput} onChange={(e) => setTypeInput(e.target.value)} className="border border-slate-700 text-sm font-semibold rounded-lg px-3 py-2.5 outline-none focus:border-indigo-500" style={{ backgroundColor: '#0B0F19', color: typeInput === 'pendapatan' ? '#10b981' : '#ef4444' }}>
              <option value="pendapatan" style={{ color: '#10b981', backgroundColor: '#0B0F19', fontWeight: 'bold' }}>Pendapatan (+)</option>
              <option value="pengeluaran" style={{ color: '#ef4444', backgroundColor: '#0B0F19', fontWeight: 'bold' }}>Pengeluaran (-)</option>
            </select>
            <input type="text" placeholder="Deskripsi (contoh: Gaji / Belanja)" value={descInput} onChange={(e) => setDescInput(e.target.value)} className="flex-1 bg-[#0B0F19] border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500" required />
            <input type="text" inputMode="numeric" placeholder="Nominal (Rp)" value={amountInput} onChange={handleAmountChange} className="w-full sm:w-44 bg-[#0B0F19] border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:border-indigo-500 font-mono" required />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors shadow-md shadow-indigo-500/20">Simpan</button>
          </form>
          <div className="flex-1 bg-[#111827] rounded-xl border border-slate-800/80 shadow-2xl flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#111827] sticky top-0 z-20 shadow-[0_1px_0_0_rgba(30,41,59,0.6)]">
                  <tr>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Tipe</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Deskripsi</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase text-right bg-[#111827]">Nominal (Rp)</th>
                    <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase text-center w-24 bg-[#111827]">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {transactions.length === 0 ? (
                    <tr><td colSpan="4" className="text-center py-12 text-slate-500 text-sm">Belum ada data.</td></tr>
                  ) : (
                    [...transactions].sort((a, b) => {
                      if (a.tipe === 'pendapatan' && b.tipe === 'pengeluaran') return -1;
                      if (a.tipe === 'pengeluaran' && b.tipe === 'pendapatan') return 1;
                      return b.id - a.id; 
                    }).map((t) => (
                      <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 text-xs">
                          <span className={`inline-flex px-2 py-0.5 rounded font-medium text-[10px] uppercase border ${t.tipe === 'pengeluaran' && t.status_lunas ? 'opacity-50' : ''}`} style={t.tipe === 'pendapatan' ? { backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' } : { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>{t.tipe}</span>
                        </td>
                        <td className={`py-3 px-4 text-sm font-medium ${t.tipe === 'pengeluaran' && t.status_lunas ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{t.deskripsi}</td>
                        <td className={`py-3 px-4 text-sm font-mono text-right font-semibold ${t.tipe === 'pengeluaran' && t.status_lunas ? 'opacity-50' : ''}`} style={{ color: t.tipe === 'pendapatan' ? '#34d399' : '#f87171' }}>{t.tipe === 'pendapatan' ? '+' : '-'} {formatRupiah(t.nominal)}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center items-center gap-2">
                            {t.tipe === 'pengeluaran' && (
                              <button onClick={() => handleToggleLunas(t.id, t.status_lunas)} className={`p-1.5 rounded-lg transition-colors border ${t.status_lunas ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-slate-800/40 text-slate-500 border-slate-700/50 hover:bg-slate-700'}`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={t.status_lunas ? 3 : 2} d="M5 13l4 4L19 7" /></svg>
                              </button>
                            )}
                            <button onClick={() => handleDeleteTransaction(t.id)} className="p-1.5 rounded-lg transition-colors border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="shrink-0 bg-slate-900/50 border-t border-slate-800/60 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <button onClick={handleExportPDF} className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> Save as PDF
              </button>
              <div className="flex gap-2 w-full sm:w-auto justify-center">
                <button onClick={handleResetCentang} className="flex-1 sm:flex-none px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] sm:text-[11px] font-medium rounded-lg border border-slate-700 transition-colors">Reset Centang</button>
                <button onClick={handleClearAllTransactions} className="flex-1 sm:flex-none px-3 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-400 text-[10px] sm:text-[11px] font-medium rounded-lg border border-red-900/50 transition-colors">Hapus Semua Data</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. ANGSURAN RUMAH
  if (view === 'angsuran') {
    return (
      <div className="flex flex-col h-[100dvh] bg-[#0B0F19] text-slate-300 font-sans selection:bg-indigo-500/30 overflow-hidden">
        <header className="shrink-0 py-6 sm:py-8 px-4 sm:px-0 bg-[#0B0F19] border-b-2 border-[#05070B] flex flex-col items-center justify-center relative z-30 shadow-md">
          <button onClick={() => setView('finansial')} className="absolute left-4 top-6 sm:left-12 sm:top-1/2 sm:-translate-y-1/2 p-2 sm:p-3 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
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
                <button onClick={scrollToCurrentMonth} className="flex items-center space-x-1.5 sm:space-x-2 bg-indigo-900/20 hover:bg-indigo-900/40 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-indigo-800/50 transition-colors cursor-pointer" title="Klik untuk melompat ke cicilan bulan ini">
                   <span className="text-[10px] sm:text-xs text-indigo-400/70 uppercase tracking-wider">Hari Ini</span>
                   <div className="h-3 w-px bg-indigo-800/50"></div>
                   <span className="text-xs sm:text-sm font-semibold text-indigo-300">{currentDate}</span>
                </button>
              )}
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <button onClick={handleExportData} title="Backup Data (Download)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg></button>
              <button onClick={() => fileInputRef.current.click()} title="Restore Data (Upload)" className="p-1 sm:p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md sm:rounded-lg border border-slate-700 transition-colors"><svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
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
                    <th className="py-3 sm:py-5 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase bg-[#111827]">No.</th>
                    <th className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase bg-[#111827]">Tanggal</th>
                    <th className="px-1 sm:px-4 py-3 sm:py-5 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase text-right bg-[#111827]">Total (Rp)</th>
                    <th className="py-3 sm:py-5 px-1 sm:px-4 text-[9px] sm:text-xs font-semibold text-slate-400 uppercase text-center bg-[#111827]">Bukti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {angsuranData.map((row) => {
                    const isCurrentMonth = row.monthYear === currentMonthId;
                    const hasProof = Boolean(proofs[row.no] && proofs[row.no].trim() !== "");
                    const isPast = row.no <= 45;
                    const pastTextStyle = isPast && !isCurrentMonth ? { color: '#475569' } : {};
                    
                    return (
                      <tr key={row.no} id={`row-${row.monthYear}`} className={`transition-colors duration-300 group ${isCurrentMonth ? 'bg-slate-800/80 shadow-inner border-l-2 sm:border-l-4 border-indigo-500' : (isPast ? 'bg-transparent' : 'hover:bg-slate-800/30')}`}>
                        <td className={`whitespace-nowrap py-3 sm:py-4 pl-2 sm:pl-6 pr-1 sm:pr-3 text-[11px] sm:text-sm font-medium ${isCurrentMonth ? 'text-indigo-400' : (!isPast ? 'text-slate-500 group-hover:text-slate-300' : '')}`} style={pastTextStyle}>{String(row.no).padStart(3, '0')}</td>
                        <td className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm ${isCurrentMonth ? 'text-slate-100 font-semibold' : (!isPast ? 'text-slate-300 group-hover:text-slate-200' : '')}`} style={pastTextStyle}>{row.tanggal}{isCurrentMonth && <span className="ml-1 sm:ml-2 inline-flex items-center px-1 sm:px-2 py-0.5 rounded text-[8px] sm:text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">CUR</span>}</td>
                        <td className={`whitespace-nowrap px-1 sm:px-4 py-3 sm:py-4 text-[11px] sm:text-sm tracking-tighter sm:tracking-normal font-mono text-right ${isCurrentMonth ? 'text-indigo-300 font-semibold' : (!isPast ? 'text-slate-200 group-hover:text-white' : '')}`} style={pastTextStyle}>{row.totalBayar}</td>
                        <td className="whitespace-nowrap py-3 sm:py-4 px-1 sm:px-4 text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <button onClick={() => handleSaveProof(row.no)} title="Input/Edit Link Bukti" className={`p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors border ${isPast && !hasProof ? 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/40' : 'bg-slate-800/50 hover:bg-slate-700 border-slate-700/50 text-slate-300'}`} style={isPast && !hasProof ? { color: '#475569' } : {}}>
                              <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </button>
                            {hasProof ? (
                              <a href={proofs[row.no]} target="_blank" rel="noopener noreferrer" title="Lihat Bukti" className="p-1 sm:p-2 rounded-md sm:rounded-lg transition-colors hover:opacity-80" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.4)', borderWidth: '1px', color: '#818cf8' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </a>
                            ) : (
                              <span className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30 cursor-not-allowed" title="Belum ada bukti" style={{ color: '#475569' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                              </span>
                            )}
                            {(hasProof || isPast) ? (
                              <div title={isPast && !hasProof ? "Lunas (Data Historis)" : "Lunas / Bukti Tersimpan"} className="p-1 sm:p-2 rounded-md sm:rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', borderWidth: '1px', color: '#10b981', boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              </div>
                            ) : (
                              <div title="Menunggu" className="p-1 sm:p-2 rounded-md sm:rounded-lg bg-slate-800/20 border border-slate-700/30" style={{ color: '#475569' }}>
                                <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
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
