import React from 'react';
import { Wallet, ArrowRightLeft, Target, BarChart } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Wallet,
      title: 'Deposit',
      description: 'You deposit USDC, USDT, etc.'
    },
    {
      icon: ArrowRightLeft,
      title: 'Cross-Chain Transfer',
      description: 'Secure token transfers via Chainlink CCIP.'
    },
    {
      icon: Target,
      title: 'Protocol Allocation',
      description: 'Automatic fund allocation based on optimal APY.'
    },
    {
      icon: BarChart,
      title: 'Dashboard Monitoring',
      description: 'Track your portfolio\'s performance at a glance.'
    }
  ];

  return (
    <section id="how-it-works" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-white mb-8">
            How It <span className="text-blue-600">Works</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center mb-8 mx-auto">
                <step.icon size={32} className="text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              
              <p className="text-gray-200 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;