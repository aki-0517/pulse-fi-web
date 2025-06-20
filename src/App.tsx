import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import StablecoinsSection from './components/StablecoinsSection';
import Footer from './components/Footer';
import GetYieldFromSection from "./components/GetYieldFromSection"

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <GetYieldFromSection />
      <StablecoinsSection />
      <Footer />
    </div>
  );
}

export default App;