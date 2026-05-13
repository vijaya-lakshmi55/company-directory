import React from 'react';
import { Bell, ChevronDown, Search, RotateCcw, Layers } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useCompanies } from '../../context/CompanyContext';

const MainLayout = () => {
    const {
        searchTerm, setSearchTerm,
        setIndustryFilter, setLocationFilter,
        industries, locations
    } = useCompanies();

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            <header className="bg-[#0F172A] pt-7 pb-20 px-8 text-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl"><Layers size={20} /></div>
                        <div>
                            <div className="flex items-center gap-2">
                                {/* <span className="bg-blue-600 text-[8px] font-black px-1.5 py-0.5 rounded tracking-tighter uppercase">PRO</span> */}
                                <h1 className="text-xl font-extrabold uppercase tracking-widest leading-none">FLM Directory</h1>
                            </div>
                            <p className="text-slate-400 text-[10px] font-medium tracking-tight mt-1 opacity-100 italic">Frontlines Edutech Industry Index</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="text-slate-500 hover:text-white transition-all"><Bell size={18} /></button>
                        <div className="flex items-center gap-2.5 bg-slate-800/40 p-1 pr-3 rounded-full border border-slate-700/50 cursor-pointer">
                            <img src="/logo/flm.jpg" className="w-7 h-7 rounded-full object-cover" alt="Admin" />
                            <span className="text-[11px] font-bold">Admin</span>
                            <ChevronDown size={12} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-8 -mt-8">
                <div className="bg-white p-2.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-wrap gap-2 items-center">
                    <div className="flex-1 relative min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 outline-none transition-all text-xs font-semibold text-slate-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        onChange={(e) => setIndustryFilter(e.target.value)}
                        className="bg-white border-l border-slate-100 px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer"
                    >
                        <option value="">All Industries</option>
                        {industries.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>

                    <select
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="bg-white border-l border-slate-100 px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer"
                    >
                        <option value="">Location</option>
                        {locations.map(item => <option key={item} value={item}>{item}</option>)}
                    </select>

                    <button onClick={() => window.location.reload()} className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors px-3 py-2 text-[10px] font-black uppercase">
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>
            </div>
            <main className="max-w-7xl mx-auto py-10"><Outlet /></main>
        </div>
    );
};

export default MainLayout;