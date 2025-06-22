import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import EarnPage from './pages/Earn';
import USDCPage from './pages/strategy/USDC';
import USDTPage from './pages/strategy/USDT';
import USDSPage from './pages/strategy/USDS';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue to-black text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/strategy/usdc" element={<USDCPage />} />
          <Route path="/strategy/usdt" element={<USDTPage />} />
          <Route path="/strategy/usds" element={<USDSPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;