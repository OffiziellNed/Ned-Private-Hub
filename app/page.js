'use client';

import { useState } from 'react';

// Data Generator berdasarkan Jadwal Angsuran Murabahah NED DEAN BARUS[cite: 13]
const generateAngsuranData = () => {
  const data = [];
  let startDate = new Date('2022-10-25'); // Dimulai dari 25-Oct-22[cite: 13]

  for (let i = 1; i <= 240; i++) {
    let amount = "0";
    // Skema step-up angsuran sesuai dokumen[cite: 13]
    if (i >= 1 && i <= 12) amount = "2,721,798.00";
    else if (i >= 13 && i <= 24) amount = "2,857,887.90";
    else if (i >= 25 && i <= 36) amount = "3,000,782.30";
    else if (i >= 37 && i <= 48) amount = "3,150,821.41";
    else if (i >= 49 && i <= 60) amount = "3,308,362.48";
    else if (i >= 61 && i <= 239) amount = "4,064,640.85";
    else if (i === 240) amount = "4,064,642.33"; // Angsuran penutup[cite: 13]

    data.push({
      no: i,
      tanggal: startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '-'),
      totalBayar: amount
    });
    
    // Tambah 1 bulan untuk iterasi berikutnya
    startDate.setMonth(startDate.getMonth() + 1);
  }
  return data;
};

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('angsuran');
  const angsuranData = generateAngsuranData();

  return (
    <div className="flex h-screen bg-[#0B0F19] font-sans text-slate-300 selection:bg-indigo-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] border-r border-slate-800/60 flex flex-col shrink-0 transition-all">
        {/* Header Sidebar - Ned Private Hub */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-lg leading-none">N</span>
            </div>
            <h1 className="text-lg font-semibold text-slate-100 tracking-wide">Ned Private Hub</h1>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">
            {/* Menu 1: Finansial */}
            <div className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-400 cursor-default">
              <svg className="w-5 h-5 mr-3 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Finansial
            </div>
            
            {/* Sub-menu: Angsuran Rumah */}
            <div className="pl-11 space-y-1 mt-1">
              <button 
                onClick={() => setActiveMenu('angsuran')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeMenu === 'angsuran' 
                  ? 'text-indigo-400 bg-indigo-500/10 shadow-[inset_2px_0_0_0_#818cf8]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <svg className={`w-4 h-4 mr-3 shrink-0 ${activeMenu === 'angsuran' ? 'text-indigo-400' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Angsuran Rumah
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        
        {/* Top Header */}
        <header className="h-20 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center px-8 justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">Jadwal Angsuran Murabahah</h2>
            <p className="text-xs text-slate-500 mt-1">Monitoring progres cicilan jangka panjang</p>
          </div>
          <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
             <span className="text-xs text-slate-400 uppercase tracking-wider">Klien</span>
             <div className="h-4 w-px bg-slate-600"></div>
             <span className="text-sm font-semibold text-slate-200">NED DEAN BARUS</span>
          </div>
        </header>

        {/* Table Area */}
        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto bg-[#111827] rounded-xl border border-slate-800/80 shadow-2xl overflow-hidden">
            
            {/* Table Container with relative for sticky header */}
            <div className="overflow-x-auto h-[calc(100vh-12rem)] custom-scrollbar relative">
              <table className="min-w-full divide-y divide-slate-800/60 text-left border-collapse">
                
                {/* Sticky Header */}
                <thead className="bg-[#111827]/95 backdrop-blur-sm sticky top-0 z-20 shadow-sm">
                  <tr>
                    <th scope="col" className="py-4 pl-6 pr-3 text-xs font-semibold text-slate-400 uppercase tracking-wider w-24">No.</th>
                    <th scope="col" className="px-3 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Tanggal Tagihan</th>
                    <th scope="col" className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Total Bayar (Rp)</th>
                  </tr>
                </thead>
                
                {/* Table Body */}
                <tbody className="divide-y divide-slate-800/40 bg-[#111827]">
                  {angsuranData.map((row) => (
                    <tr key={row.no} className="hover:bg-slate-800/30 transition-colors duration-150 group">
                      <td className="whitespace-nowrap py-3.5 pl-6 pr-3 text-sm font-medium text-slate-500 group-hover:text-slate-300">
                        {String(row.no).padStart(3, '0')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-sm text-slate-300">
                        {row.tanggal}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3.5 text-sm font-mono text-slate-200 text-right">
                        {row.totalBayar}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Footer Summary */}
            <div className="bg-slate-900/50 border-t border-slate-800/60 px-6 py-4 flex justify-between items-center">
                <span className="text-xs text-slate-500">Menampilkan 240 bulan angsuran</span>
                <span className="text-xs font-medium text-indigo-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                  Data Sinkron
                </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
