import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const pools = [
    {
      name: 'USDC Pool',
      chains: ['Ethereum', 'Base', 'Arbitrum', 'Unichain', 'Avalanche'],
      apy: '+9.52%',
      tvl: '$12.5K',
      logoUrl: 'https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png',
      bgColor: 'bg-blue-50',
      estimatedApy: '9.52%',
    },
    {
      name: 'USDT Pool',
      chains: ['Ethereum', 'Base', 'Arbitrum', 'Polygon'],
      apy: '+7.63%',
      tvl: '$8.3K',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3c-lor0igW6k_zmXiOhn5gK3hrz8ylzf0Jw&s',
      bgColor: 'bg-green-50',
      estimatedApy: '7.63%',
    },
    {
      name: 'USDS Pool',
      chains: ['Ethereum', 'Base'],
      apy: '+1.73%',
      tvl: '$15.2K',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/33039.png', // Placeholder
      bgColor: 'bg-purple-50',
      estimatedApy: '1.73%',
    }
  ];

  const chainLogos: { [key: string]: string } = {
    Ethereum: 'https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png',
    Base: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08Z3uISD3td6WwIXPMKrpC7auP-LECoHOXA&s',
    Arbitrum: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdvncrIV74_kXqcACD8doVBeG5aDHHXRDDqw&s',
    Unichain: 'https://icons.llamao.fi/icons/chains/rsz_unichain?w=48&h=48',
    Avalanche: 'https://icons.llamao.fi/icons/chains/rsz_avalanche?w=48&h=48',
    Polygon: 'https://icons.llamao.fi/icons/chains/rsz_polygon?w=48&h=48',
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
              Earn Cross-Chain
              <span className="text-blue-600 block">Yield with Stablecoins</span>
            </h1>
            
            <Link to="/earn" className="bg-blue-600 text-white px-12 py-5 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3 mx-auto lg:mx-0 text-lg font-medium shadow-xl">
              <span>Earn</span>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-blue-100">
              <div className="space-y-8">
                {pools.map((pool, index) => (
                  <Link to={`/strategy/${pool.name.split(' ')[0].toLowerCase()}`} key={index}>
                    <div className={`flex items-center justify-between p-6 ${pool.bgColor} rounded-2xl transition-transform duration-300 ease-in-out hover:scale-[1.03]`}>
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
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">{pool.apy}</div>
                          <div className="text-sm text-gray-600">{pool.tvl}</div>
                        </div>
                        <ArrowRight className="text-gray-400" />
                      </div>
                    </div>
                  </Link>
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