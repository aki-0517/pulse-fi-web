import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import StablecoinsSection from '../components/StablecoinsSection';
import GetYieldFromSection from "../components/GetYieldFromSection"

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue to-black">
      <HeroSection />
      <HowItWorksSection />
      <GetYieldFromSection />
      <StablecoinsSection />
    </div>
  );
}

export default HomePage; 