import React from 'react';
import { Link, Zap, ArrowUpRight } from 'lucide-react';

const ChainsSection = () => {
  const activeChains = [
    {
      name: 'Ethereum',
      description: 'The foundational layer for DeFi',
      tvl: '$28.5B',
      protocols: 4,
      avgApy: '9.2%',
      color: 'blue',
      status: 'Live'
    },
    {
      name: 'Base',
      description: 'Coinbase\'s L2 solution',
      tvl: '$2.1B',
      protocols: 3,
      avgApy: '12.8%',
      color: 'blue',
      status: 'Live'
    },
    {
      name: 'Arbitrum',
      description: 'Leading Ethereum L2',
      tvl: '$15.3B',
      protocols: 4,
      avgApy: '10.5%',
      color: 'blue',
      status: 'Live'
    }
  ];

  const comingSoonChains = [
    { name: 'Polygon', description: 'Ethereum scaling solution' },
    { name: 'Optimism', description: 'Optimistic rollup L2' },
    { name: 'Avalanche', description: 'High-performance blockchain' }
  ];

  return (
    <section id="chains" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supported <span className="text-blue-600">Chains</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access the best yields across multiple blockchain networks with seamless cross-chain functionality.
          </p>
        </div>

        {/* Active Chains */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Currently Supported</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {activeChains.map((chain, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Link size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{chain.name}</h4>
                      <p className="text-sm text-gray-600">{chain.description}</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {chain.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Total Value Locked</span>
                    <span className="font-semibold text-gray-900">{chain.tvl}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Protocols</span>
                    <span className="font-semibold text-gray-900">{chain.protocols}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-600">Average APY</span>
                    <span className="font-semibold text-green-600">{chain.avgApy}</span>
                  </div>
                </div>

                {/* Action */}
                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Deposit on {chain.name}</span>
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Chains */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {comingSoonChains.map((chain, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Zap size={20} className="text-gray-400" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">{chain.name}</h4>
                    <p className="text-sm text-gray-600">{chain.description}</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Chain Benefits */}
        <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-blue-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cross-Chain Advantages</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our cross-chain infrastructure powered by Chainlink CCIP ensures secure and efficient fund transfers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap size={28} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Transfers</h4>
              <p className="text-gray-600 text-sm">Cross-chain transfers complete in minutes, not hours.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Link size={28} className="text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Bridge</h4>
              <p className="text-gray-600 text-sm">Chainlink CCIP provides enterprise-grade security.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowUpRight size={28} className="text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Optimal Yields</h4>
              <p className="text-gray-600 text-sm">Access the highest APYs across all supported chains.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChainsSection;