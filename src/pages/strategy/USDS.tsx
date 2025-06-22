import React from 'react';
import MorphoUSDSMarkets from '../../components/MorphoUSDSMarkets';

const USDSPage: React.FC = () => {
  return (
    <>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24`}>
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-2">
            <h1 className="text-5xl font-bold text-white">USDS Strategy</h1>
            <img src="https://pbs.twimg.com/profile_images/1828469202753122304/i8YRkB4A_400x400.jpg" alt="USDS" className="w-12 h-12 ml-4" />
          </div>
          <p className="text-xl text-gray-400">Analytics of Stablecoin Yields</p>
        </div>
        <MorphoUSDSMarkets />
      </div>
    </>
  );
};

export default USDSPage; 