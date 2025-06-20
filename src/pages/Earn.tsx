import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AccessCodePopup from '../components/AccessCodePopup';
import DepositWithdrawPopup from '../components/DepositWithdrawPopup';

const StatCard = ({ title, value, change }: { title: string, value: string, change?: string }) => (
  <div className="bg-gray-900/50 p-6 rounded-2xl">
    <p className="text-gray-400 text-sm mb-2">{title}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
    {change && <p className="text-green-400 text-sm">{change}</p>}
  </div>
);

interface Asset {
  icon: string;
  name: string;
  balance: string;
  balanceUSD: string;
  earnings: string;
  earningsCoin: string;
  apr: string;
}

const AssetCard = ({ icon, name, balance, balanceUSD, earnings, earningsCoin, apr, onStartEarning }: { icon: string, name: string, balance: string, balanceUSD: string, earnings: string, earningsCoin: string, apr: string, onStartEarning: () => void }) => (
  <div className="bg-gray-900/50 rounded-2xl p-6 flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img src={icon} alt={name} className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-bold text-xl text-white">{balance} {name}</p>
          <p className="text-gray-400 text-sm">{balanceUSD}</p>
        </div>
      </div>
      <ArrowRight className="text-gray-500" />
    </div>
    <div className="flex-grow space-y-4 mb-6">
      <div className="flex justify-between items-baseline">
        <p className="text-gray-400 text-sm">Earnings</p>
        <p className="text-white">{earnings} {earningsCoin}</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-gray-400 text-sm">Net APR</p>
        <p className="text-green-400 font-bold text-lg">{apr}</p>
      </div>
    </div>
    <button 
      onClick={onStartEarning}
      className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
    >
      START EARNING
    </button>
  </div>
);

const DisabledAssetCard = ({ icon, name, balance, balanceUSD, earnings, earningsCoin, apr }: Asset) => (
  <div className="bg-gray-800/40 rounded-2xl p-6 flex flex-col opacity-50 cursor-not-allowed">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img src={icon} alt={name} className="h-10 w-10 rounded-full" />
        <div>
          <p className="font-bold text-xl text-white">{balance} {name}</p>
          <p className="text-gray-400 text-sm">{balanceUSD}</p>
        </div>
      </div>
      <ArrowRight className="text-gray-500" />
    </div>
    <div className="flex-grow space-y-4 mb-6">
      <div className="flex justify-between items-baseline">
        <p className="text-gray-400 text-sm">Earnings</p>
        <p className="text-white">{earnings} {earningsCoin}</p>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-gray-400 text-sm">Net APR</p>
        <p className="text-green-400 font-bold text-lg">---</p>
      </div>
    </div>
    <button 
      className="w-full bg-gray-600 text-gray-300 py-3 rounded-full font-medium cursor-not-allowed" 
      disabled
    >
      COMING SOON
    </button>
  </div>
);

const EarnPage: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const assets: Asset[] = [
    { 
      icon: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png",
      name: "USDC",
      balance: "24.881",
      balanceUSD: "$24.88",
      earnings: "1.071216",
      earningsCoin: "USDC",
      apr: "6.07%"
    },
    { 
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3c-lor0igW6k_zmXiOhn5gK3hrz8ylzf0Jw&s",
      name: "USDT",
      balance: "0",
      balanceUSD: "$0.00",
      earnings: "0",
      earningsCoin: "USDT",
      apr: "3.21%"
    },
    { 
      icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/20641.png",
      name: "EURC",
      balance: "0",
      balanceUSD: "$0.00",
      earnings: "0",
      earningsCoin: "EURC",
      apr: "3.21%"
    },
    { 
      icon: "https://s2.coinmarketcap.com/static/img/coins/200x200/33039.png",
      name: "USDS",
      balance: "0",
      balanceUSD: "$0.00",
      earnings: "0",
      earningsCoin: "USDS",
      apr: "4.5%"
    }
  ];

  const handleOpenPopup = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedAsset(null);
  };

  const activePool = assets.find(a => a.name === 'USDC');
  const inactivePools = assets.filter(a => a.name !== 'USDC');

  return (
    <>
      {!isUnlocked && <AccessCodePopup onSuccess={() => setIsUnlocked(true)} />}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 ${!isUnlocked || isPopupOpen ? 'blur-sm' : ''}`}>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 text-white">Earning</h1>
          <p className="text-xl text-gray-400">The Best Stablecoin Yields In 1-Click</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard title="Total Lendings" value="$21,462,367" change="+2.88%" />
          <StatCard title="Liquidity Total Supply" value="$54,643,079" />
        </div>

        {/* Active Pool Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Active Pool</h2>
          <div className="flex justify-center">
            {activePool && (
              <div className="w-full max-w-sm">
                <AssetCard 
                  key={activePool.name}
                  {...activePool}
                  onStartEarning={() => handleOpenPopup(activePool)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Inactive Pools Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {inactivePools.map((asset) => (
              <div key={asset.name} className="w-full max-w-sm">
                <DisabledAssetCard {...asset} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {isPopupOpen && selectedAsset && (
        <DepositWithdrawPopup asset={selectedAsset} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default EarnPage; 