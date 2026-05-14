import React, { useState, useEffect } from 'react';
import {
    LayoutGrid, List, CheckCircle2, ArrowRight,
    MapPin, Users, ChevronLeft, ChevronRight, X, Globe, Calendar
} from 'lucide-react';
import { useCompanies } from '../../context/CompanyContext';

const Companies = () => {
    const { companies, loading, searchTerm, industryFilter, locationFilter } = useCompanies();

    const [view, setView] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const itemsPerPage = 8;

    const filtered = companies.filter(c => {
        const term = searchTerm.toLowerCase();
        const matchesSearch =
            c.name.toLowerCase().includes(term) ||
            (c.description && c.description.toLowerCase().includes(term)) ||
            (c.website && c.website.toLowerCase().includes(term));

        const industryArr = Array.isArray(industryFilter) ? industryFilter : (industryFilter ? [industryFilter] : []);
        const matchesIndustry = industryArr.length === 0 || industryArr.includes(c.industry);

        const locationArr = Array.isArray(locationFilter) ? locationFilter : (locationFilter ? [locationFilter] : []);
        const matchesLocation = locationArr.length === 0 || locationArr.some(loc => c.location.includes(loc));

        return matchesSearch && matchesIndustry && matchesLocation;
    });

    useEffect(() => { setCurrentPage(1); }, [searchTerm, industryFilter, locationFilter]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="text-center py-20 font-black text-slate-300 uppercase tracking-widest text-xs animate-pulse">Refining Index...</div>;

    return (
        /* w-full + overflow-x-hidden — nothing bleeds out on mobile */
        <div className="relative w-full overflow-x-hidden">

            {/* TOOLBAR */}
            <div className="flex justify-end items-center mb-8">
                <div className="flex bg-[#F1F5F9] p-1 rounded-xl shadow-inner border border-slate-100">
                    <button
                        onClick={() => setView('grid')}
                        className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${view === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500'}`}
                    >
                        <LayoutGrid size={13} /> Grid
                    </button>
                    <button
                        onClick={() => setView('table')}
                        className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-xl text-[10px] font-black transition-all whitespace-nowrap ${view === 'table' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500'}`}
                    >
                        <List size={13} /> Table
                    </button>
                </div>
            </div>

            {view === 'table' ? (
                /* TABLE VIEW — table-fixed keeps it inside container, no overflow-x-auto */
                <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                <th className="px-4 sm:px-8 py-5 w-1/2 sm:w-auto">Company</th>
                                <th className="px-4 sm:px-8 py-5 w-1/2 sm:w-auto">Industry</th>
                                <th className="px-8 py-5 hidden md:table-cell">Location</th>
                                <th className="px-8 py-5 hidden md:table-cell">Employees</th>
                                <th className="px-8 py-5 hidden lg:table-cell">Status</th>
                                <th className="px-8 py-5 text-right hidden sm:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {currentItems.map((c) => (
                                <tr
                                    key={c.id}
                                    onClick={() => setSelectedCompany(c)}
                                    className="hover:bg-blue-50/20 transition-all group cursor-pointer"
                                >
                                    <td className="px-4 sm:px-8 py-3 w-1/2 sm:w-auto overflow-hidden">
                                        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1.5 shadow-sm overflow-hidden flex-shrink-0">
                                                <img src={c.logo} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1 min-w-0">
                                                    <span className="font-bold text-slate-800 text-[12px] sm:text-[13px] tracking-tight truncate">{c.name}</span>
                                                    <CheckCircle2 size={12} className="text-blue-500 fill-blue-50 flex-shrink-0" />
                                                </div>
                                                <span className="text-[10px] text-slate-400 font-bold lowercase tracking-tight hidden sm:block truncate">{c.website}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 sm:px-8 py-3 w-1/2 sm:w-auto overflow-hidden">
                                        <span className="text-[10px] sm:text-[11px] font-black text-slate-600 uppercase tracking-widest truncate block">{c.industry}</span>
                                    </td>
                                    <td className="px-8 py-3 text-[12px] text-slate-500 font-medium hidden md:table-cell">{c.location}</td>
                                    <td className="px-8 py-3 text-[12px] text-slate-500 font-black hidden md:table-cell">{c.size}</td>
                                    <td className="px-8 py-3 hidden lg:table-cell">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${c.status === 'Active' ? 'bg-[#E6F9F0] text-[#00C48C]' : 'bg-[#FFF8E6] text-[#FFA800]'}`}>
                                            {c.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-3 text-right hidden sm:table-cell">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedCompany(c); }}
                                            className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1 ml-auto group-hover:translate-x-1 transition-transform"
                                        >
                                            View Details <ArrowRight size={13} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {currentItems.map(company => (
                        <div key={company.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm relative hover:shadow-xl hover:border-blue-100 transition-all group flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-2 border border-slate-100 shadow-sm overflow-hidden flex-shrink-0">
                                    <img src={company.logo} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt="" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <h3 className="font-bold text-slate-900 text-sm tracking-tight">{company.name}</h3>
                                        <CheckCircle2 size={13} className="text-blue-500 fill-blue-50" />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{company.website}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mb-4 text-[9px] font-black uppercase tracking-widest">
                                <span className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-600">{company.industry}</span>
                                <span className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-md flex items-center gap-1"><MapPin size={10} /> {company.location}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 mb-8 flex-grow">{company.description}</p>
                            <div className="flex justify-between items-center pt-5 border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                <span className="flex items-center gap-1.5"><Users size={16} /> {company.size}</span>
                                <button onClick={() => setSelectedCompany(company)} className="text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                    View Details <ArrowRight size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] text-center sm:text-left">
                    Showing <span className="text-[#1E293B]">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filtered.length)}</span> of <span className="text-[#1E293B]">{filtered.length}</span> Results
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                    <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-100 text-[#94A3B8] disabled:opacity-20 hover:text-blue-600 hover:bg-slate-50 transition-all shadow-sm">
                        <ChevronLeft size={14} strokeWidth={2.5} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all ${currentPage === i + 1
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                : 'bg-white text-[#475569] border border-slate-100 hover:bg-slate-50 hover:text-blue-600'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <span className="px-1 text-[#CBD5E1] font-bold text-[10px]">...</span>
                    <button className="w-8 h-8 flex items-center justify-center bg-white text-[#475569] border border-slate-100 rounded-lg font-bold text-[11px] hover:bg-slate-50 hover:text-blue-600">12</button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => paginate(currentPage + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-slate-100 text-[#94A3B8] hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm"
                    >
                        <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {selectedCompany && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                        <div className="relative p-6 sm:p-8">
                            <button onClick={() => setSelectedCompany(null)} className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex-shrink-0">
                                    <img src={selectedCompany.logo} className="w-full h-full object-contain" alt="" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">{selectedCompany.name}</h2>
                                        <CheckCircle2 size={20} className="text-blue-500 fill-blue-50" />
                                    </div>
                                    <p className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-widest">{selectedCompany.industry}</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">About Company</p>
                                    <p className="text-slate-600 leading-relaxed text-sm">{selectedCompany.description}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="text-blue-600"><MapPin size={18} /></div>
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">Location</p><p className="text-xs font-black text-slate-700">{selectedCompany.location}</p></div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="text-blue-600"><Users size={18} /></div>
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">Team Size</p><p className="text-xs font-black text-slate-700">{selectedCompany.size} Employees</p></div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="text-blue-600"><Globe size={18} /></div>
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">Website</p><p className="text-xs font-black text-slate-700">{selectedCompany.website}</p></div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                                        <div className="text-blue-600"><Calendar size={18} /></div>
                                        <div><p className="text-[9px] font-bold text-slate-400 uppercase">Founded</p><p className="text-xs font-black text-slate-700">{selectedCompany.founded || '2015'}</p></div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedCompany(null)} className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-lg">
                                Close Overview
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Companies;