import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Search, RotateCcw, Layers } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { useCompanies } from '../../context/CompanyContext';

// Custom multi-select dropdown with plain checkboxes
function MultiSelectDropdown({ label, options, selected, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const toggle = (val) => {
        if (selected.includes(val)) onChange(selected.filter(v => v !== val));
        else onChange([...selected, val]);
    };

    const displayLabel = selected.length === 0
        ? label
        : selected.length === 1
            ? selected[0]
            : `${selected.length} selected`;

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="flex items-center gap-2 bg-white border-l border-slate-100 px-4 py-2 text-xs font-bold text-slate-500 outline-none cursor-pointer hover:text-blue-600 transition-colors whitespace-nowrap"
            >
                <span className={selected.length > 0 ? 'text-blue-600' : ''}>{displayLabel}</span>
                <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 min-w-[180px] max-h-64 overflow-y-auto">
                    {options.map((opt) => {
                        const checked = selected.includes(opt);
                        return (
                            <label
                                key={opt}
                                className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-colors"
                                onClick={() => toggle(opt)}
                            >
                                <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all ${checked ? 'border-blue-500 bg-blue-500' : 'border-slate-200 bg-white'}`}>
                                    {checked && (
                                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                                    {opt}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const MainLayout = () => {
    const {
        searchTerm, setSearchTerm,
        setIndustryFilter, setLocationFilter,
        industries, locations
    } = useCompanies();

    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const handleIndustryChange = (vals) => {
        setSelectedIndustries(vals);
        setIndustryFilter(vals);
    };

    const handleLocationChange = (vals) => {
        setSelectedLocations(vals);
        setLocationFilter(vals);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedIndustries([]);
        setSelectedLocations([]);
        setIndustryFilter([]);
        setLocationFilter([]);
    };

    return (
        /* overflow-x-hidden here is the top-level fix — nothing can bleed past the viewport */
        <div className="min-h-screen bg-[#F5F7FA] overflow-x-hidden w-full">
            <header className="bg-[#0F172A] pt-7 pb-20 px-4 sm:px-8 text-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl"><Layers size={20} /></div>
                        <div>
                            <div className="flex items-center gap-2">
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

            {/* px-4 on mobile, px-8 on sm+ — prevents filter bar from overflowing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8">
                <div className="bg-white p-2.5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col sm:flex-row sm:flex-wrap gap-2 items-stretch sm:items-center">
                    {/* Search — always full width on mobile */}
                    <div className="relative w-full sm:flex-1 sm:min-w-[280px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search companies..."
                            className="w-full pl-11 pr-4 py-2.5 bg-[#F9FAFB] border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-500 outline-none transition-all text-xs font-semibold text-slate-600"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Dropdowns + Reset in a row on mobile */}
                    <div className="flex items-center gap-0 border-t sm:border-t-0 border-slate-100 pt-1.5 sm:pt-0 sm:contents">
                        <MultiSelectDropdown
                            label="All Industries"
                            options={industries}
                            selected={selectedIndustries}
                            onChange={handleIndustryChange}
                        />
                        <MultiSelectDropdown
                            label="Location"
                            options={locations}
                            selected={selectedLocations}
                            onChange={handleLocationChange}
                        />
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors px-3 py-2 text-[10px] font-black uppercase ml-auto sm:ml-0"
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* px-4 on mobile, px-8 on sm+ */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10"><Outlet /></main>
        </div>
    );
};

export default MainLayout;