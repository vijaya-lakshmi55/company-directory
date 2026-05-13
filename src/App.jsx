import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CompanyProvider } from './context/CompanyContext';
import MainLayout from './components/Layout/MainLayout';
import Companies from './pages/Companies/Companies';

function App() {
  return (
    <CompanyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Companies />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CompanyProvider>
  );
}

export default App;