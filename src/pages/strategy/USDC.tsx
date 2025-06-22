import React from 'react';
import MorphoUSDCMarkets from '../../components/MorphoUSDCMarkets';
// import EulerUSDCMarkets from '../../components/EulerUSDCMarkets';

const USDCPage: React.FC = () => {
  return (
    <>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24`}>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-2">
            <h1 className="text-5xl font-bold text-white">USDC Strategy</h1>
            <img src="https://cdn.rwa.xyz/images/asset-icons/128/color/usdc.png" alt="USDC" className="w-12 h-12 ml-4" />
          </div>
          <p className="text-xl text-gray-400">Analytics of Stablecoin Yields</p>
        </div>
        {/* <EulerUSDCMarkets /> */}
        <MorphoUSDCMarkets />
      </div>
    </>
  );
};

export default USDCPage; 