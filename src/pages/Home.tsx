import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import StablecoinsSection from '../components/StablecoinsSection';
import GetYieldFromSection from "../components/GetYieldFromSection"

function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <GetYieldFromSection />
      <StablecoinsSection />
    </>
  );
}

export default HomePage; 