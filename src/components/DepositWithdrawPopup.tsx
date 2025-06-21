import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';

interface DepositWithdrawPopupProps {
  asset: {
    icon: string;
    name: string;
    balance: string;
    balanceUSD: string;
    apr: string;
  };
  onClose: () => void;
}

// ProtocolsSectionのprotocolsデータをここにも定義（本来は共通化推奨）
const protocols = [
  {
    name: 'Morpho Blue',
    tvl: 2100000000, // $2.1B
    logoUrl: 'https://icons.llamao.fi/icons/protocols/morpho?w=48&h=48',
    color: '#3B82F6',
    chainLogoUrl: 'https://icons.llamao.fi/icons/chains/rsz_base?w=48&h=48', // Base
  },
  {
    name: 'Aave v3',
    tvl: 5800000000, // $5.8B
    logoUrl: 'https://icons.llamao.fi/icons/protocols/aave?w=48&h=48',
    color: '#8B5CF6',
    chainLogoUrl: 'https://icons.llamao.fi/icons/chains/rsz_arbitrum?w=48&h=48', // Arbitrum
  },
];

const DepositWithdrawPopup: React.FC<DepositWithdrawPopupProps> = ({ asset, onClose }) => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const { isConnected } = useAccount();
  const { open } = useAppKit();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-[#1c1c24] text-white rounded-3xl p-8 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
          <X size={24} />
        </button>

        <div className="flex items-center space-x-4 mb-8">
          <img src={asset.icon} alt={asset.name} className="h-12 w-12 rounded-full" />
          <h2 className="text-3xl font-bold">{asset.name}</h2>
        </div>
        
        <div className="mb-6">
            <div className="flex bg-gray-900/50 rounded-full p-1">
                <button
                    className={`w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${activeTab === 'deposit' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('deposit')}
                >
                    Deposit
                </button>
                <button
                    className={`w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${activeTab === 'withdraw' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                    onClick={() => setActiveTab('withdraw')}
                >
                    Withdraw
                </button>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
          <div>
            <p className="text-sm text-gray-400">Your Assets</p>
            <p className="text-xl font-bold">{asset.balanceUSD}</p>
            <p className="text-xs text-gray-500">{asset.balance} {asset.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">APR</p>
            <p className="text-xl font-bold text-green-400">{asset.apr}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
                <p className="text-sm text-gray-400">Vault Total</p>
                <Info size={12} className="text-gray-500" />
            </div>
            <p className="text-xl font-bold">$15,359,299</p>
            <p className="text-xs text-gray-500">15,362,388 {asset.name}</p>
          </div>
          <div>
            <div className="flex items-center space-x-1">
                <p className="text-sm text-gray-400">Layer Total</p>
                <Info size={12} className="text-gray-500" />
            </div>
            <p className="text-xl font-bold">$15,489,962</p>
            <p className="text-xs text-gray-500">15,493,513 {asset.name}</p>
          </div>
        </div>

        {/* Protocols円グラフ */}
        <div className="mb-4">
          <div className="text-center mb-2 text-lg font-bold text-white">Capital Allocation (by TVL)</div>
          <div className="flex justify-center items-center gap-6" style={{ position: 'relative', minHeight: 160 }}>
            <div>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={protocols}
                    dataKey="tvl"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    label={false}
                    isAnimationActive={false}
                  >
                    {protocols.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-start gap-2 mt-2 flex-wrap">
              {(() => {
                // TVL合計を計算
                const totalTVL = protocols.reduce((sum, p) => sum + p.tvl, 0);
                return protocols.map((p) => {
                  const percent = ((p.tvl / totalTVL) * 100).toFixed(1);
                  return (
                    <div key={p.name} className="flex items-center justify-between w-full mb-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span style={{ display: 'inline-block', width: 12, height: 12, background: p.color, borderRadius: '50%' }}></span>
                        <span className="relative inline-block w-9 h-9 ml-1">
                          <img src={p.chainLogoUrl} alt={p.name + ' chain'} className="w-9 h-9 rounded-full" />
                          <img src={p.logoUrl} alt={p.name} className="w-5 h-5 rounded-full absolute right-0 bottom-0 border-2 border-[#1c1c24] bg-white" />
                        </span>
                        <span className="text-base font-bold text-white ml-2" style={{fontSize: '1.1rem'}}>{p.name}</span>
                      </div>
                      <span className="text-base font-bold text-white ml-3">{percent}%</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        <div className="mb-6">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-2 px-2">
                <p>{activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}</p>
                <button className="hover:text-white">57.735 {asset.name} MAX</button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="bg-transparent text-2xl font-bold w-full focus:outline-none"
                />
                <span className="text-gray-400 text-xl font-bold">$0.00</span>
            </div>
        </div>

        {isConnected ? (
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg uppercase">
            {activeTab}
          </button>
        ) : (
          <button 
            onClick={() => open()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg uppercase"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default DepositWithdrawPopup; 