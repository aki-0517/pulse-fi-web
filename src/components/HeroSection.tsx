import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const pools = [
    {
      name: 'USDC Pool',
      chains: ['Ethereum', 'Base', 'Arbitrum'],
      apy: '+8.2%',
      tvl: '$12.5K',
      logoUrl: 'https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'USDT Pool',
      chains: ['Ethereum', 'Base', 'Arbitrum'],
      apy: '+15.7%',
      tvl: '$8.3K',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3c-lor0igW6k_zmXiOhn5gK3hrz8ylzf0Jw&s',
      bgColor: 'bg-green-50',
    },
    {
      name: 'USDS Pool',
      chains: ['Ethereum', 'Base', 'Arbitrum'],
      apy: '+11.4%',
      tvl: '$15.2K',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/33039.png', // Placeholder
      bgColor: 'bg-purple-50',
    }
  ];

  const chainLogos: { [key: string]: string } = {
    Ethereum: 'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
    Base: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08Z3uISD3td6WwIXPMKrpC7auP-LECoHOXA&s',
    Arbitrum: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvncrIV74_kXqcACD8doVBeG5aDHHXRDDqw&s',
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-12 leading-tight">
              Earn Cross-Chain
              <span className="text-blue-600 block">Yield with Stablecoins</span>
            </h1>
            
            <button className="bg-blue-600 text-white px-12 py-5 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto lg:mx-0 text-lg font-medium shadow-xl">
              <span>Earn</span>
            </button>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
              <div className="space-y-8">
                {pools.map((pool, index) => (
                  <div key={index} className={`flex items-center justify-between p-6 ${pool.bgColor} rounded-2xl`}>
                    <div className="flex items-center space-x-4">
                      <img src={pool.logoUrl} alt={`${pool.name} logo`} className="w-12 h-12 rounded-full" />
                      <div>
                        <div className="font-semibold text-gray-900">{pool.name}</div>
                        <div className="flex -space-x-2 overflow-hidden mt-1">
                          {pool.chains.map((chain) => (
                            <img
                              key={chain}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                              src={chainLogos[chain]}
                              alt={chain}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600 text-lg">{pool.apy}</div>
                      <div className="text-sm text-gray-600">{pool.tvl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;