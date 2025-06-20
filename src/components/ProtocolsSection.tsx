import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Shield, Zap, Users } from 'lucide-react';

const ProtocolsSection = () => {
  const [hoveredProtocol, setHoveredProtocol] = useState<number | null>(null);

  const protocols = [
    {
      name: 'Morpho',
      description: 'Vaults optimized by professional risk profiles.',
      details: 'Advanced lending optimization with institutional-grade risk management and automated rebalancing.',
      apy: '12.5%',
      tvl: '$2.1B',
      icon: TrendingUp,
      color: 'blue',
      status: 'Active'
    },
    {
      name: 'Aave',
      description: 'The leading decentralized lending market.',
      details: 'Battle-tested protocol with deep liquidity and comprehensive risk parameters across multiple assets.',
      apy: '8.7%',
      tvl: '$5.8B',
      icon: Shield,
      color: 'purple',
      status: 'Active'
    },
    {
      name: 'Fluid',
      description: 'Hybrid AMM + lending architecture.',
      details: 'Innovative protocol combining automated market making with lending for enhanced capital efficiency.',
      apy: '15.2%',
      tvl: '$890M',
      icon: Zap,
      color: 'green',
      status: 'Active'
    },
    {
      name: 'Euler',
      description: 'Deep liquidity and integrated lending.',
      details: 'Permissionless lending protocol with advanced risk management and capital efficiency features.',
      apy: '10.3%',
      tvl: '$1.4B',
      icon: Users,
      color: 'orange',
      status: 'Active'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:border-blue-400'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:border-purple-400'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:border-green-400'
      },
      orange: {
        bg: 'bg-orange-100',
        text: 'text-orange-600',
        border: 'border-orange-200',
        hover: 'hover:border-orange-400'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="protocols" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Supported <span className="text-blue-600">Protocols</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We integrate with the most trusted and highest-yielding DeFi protocols to maximize your returns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((protocol, index) => {
            const colorClasses = getColorClasses(protocol.color);
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-6 border-2 ${colorClasses.border} ${colorClasses.hover} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer`}
                onMouseEnter={() => setHoveredProtocol(index)}
                onMouseLeave={() => setHoveredProtocol(null)}
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    {protocol.status}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${colorClasses.bg} rounded-xl flex items-center justify-center mb-6`}>
                  <protocol.icon size={28} className={colorClasses.text} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {protocol.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {protocol.description}
                </p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">APY</span>
                    <span className="font-semibold text-green-600">{protocol.apy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">TVL</span>
                    <span className="font-semibold text-gray-900">{protocol.tvl}</span>
                  </div>
                </div>

                {/* Hover details */}
                {hoveredProtocol === index && (
                  <div className="absolute inset-0 bg-white rounded-2xl p-6 border-2 border-blue-400 shadow-xl z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{protocol.name}</h3>
                      <ExternalLink size={20} className="text-blue-600" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {protocol.details}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Current APY</span>
                        <span className="font-semibold text-green-600">{protocol.apy}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total Value Locked</span>
                        <span className="font-semibold text-gray-900">{protocol.tvl}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">More Protocols Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're constantly expanding our protocol integrations to bring you even more yield opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white px-4 py-2 rounded-lg text-sm text-gray-600 border">Compound V3</span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm text-gray-600 border">Yearn Finance</span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm text-gray-600 border">Convex</span>
              <span className="bg-white px-4 py-2 rounded-lg text-sm text-gray-600 border">Curve</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProtocolsSection;