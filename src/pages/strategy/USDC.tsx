import React from 'react';
import MorphoUSDCMarkets from '../../components/MorphoUSDCMarkets';

const USDCPage: React.FC = () => {
  return (
    <>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24`}>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 text-white">USDC Strategy</h1>
          <p className="text-xl text-gray-400">Analytics of Stablecoin Yields</p>
        </div>

        <MorphoUSDCMarkets />
      </div>
    </>
  );
};

export default USDCPage; 