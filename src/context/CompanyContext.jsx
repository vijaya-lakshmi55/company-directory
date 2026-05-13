import React, { createContext, useState, useEffect, useContext } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/companies.json').then(res => res.json()).then(data => {
            setCompanies(data);
            setLoading(false);
        });
    }, []);

    // Get unique values for dropdowns automatically from JSON
    const industries = [...new Set(companies.map(c => c.industry))].sort();
    const locations = [...new Set(companies.map(c => c.location))].sort();

    return (
        <CompanyContext.Provider value={{
            companies, loading, industries, locations,
            searchTerm, setSearchTerm,
            industryFilter, setIndustryFilter,
            locationFilter, setLocationFilter
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanies = () => useContext(CompanyContext);