import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import StablecoinsSection from '../components/StablecoinsSection';
import GetYieldFromSection from "../components/GetYieldFromSection"
import Dither from '../components/Dither';

function HomePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 背景を全画面固定（Headerの下に配置） */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      {/* メインコンテンツ */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <HowItWorksSection />
        <GetYieldFromSection />
        <StablecoinsSection />
      </div>
    </div>
  );
}

export default HomePage; 