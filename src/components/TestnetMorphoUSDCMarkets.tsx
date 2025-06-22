import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockVaultsResponse } from '../mocks/testnetMorphoUSDCMarkets';

interface VaultItem {
  address: string;
  symbol: string;
  name: string;
  chain: { id: number; network: string };
  state: { apy: number; netApy: number; totalAssetsUsd: number | null };
  dailyApy: number | null;
  weeklyApy: number | null;
  monthlyApy: number | null;
  riskAnalysis: { score: number }[];
  whitelisted: boolean;
}

interface VaultsResponse {
  vaults: {
    items: VaultItem[];
    pageInfo: { count: number; countTotal: number; skip: number; limit: number };
  };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042']; // Only 4 colors needed
const TESTNET_CHAINS = ['sepolia', 'base sepolia'];

const TestnetMorphoUSDCMarkets: React.FC = () => {
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const allVaults: VaultItem[] = mockVaultsResponse.vaults.items;

    // Filter USDC symbols and non-zero assets on testnet
    const filtered = allVaults.filter(
      v =>
        v.state.totalAssetsUsd &&
        v.state.totalAssetsUsd > 0 &&
        v.symbol.includes('USDC') &&
        TESTNET_CHAINS.includes(v.chain.network.toLowerCase())
    );
    setVaults(filtered);
  }, []);

  // Compute top 4 vaults by APY and overall expected APY
  const { allocationData, expectedApy, vaultTotalUsd, layerTotalUsd } = useMemo(() => {
    if (!vaults.length) return { allocationData: [], expectedApy: 0, vaultTotalUsd: 0, layerTotalUsd: 0 };

    // Sort by APY descending and take top 4
    const top4 = vaults
      .sort((a, b) => b.state.apy - a.state.apy)
      .slice(0, 4);
    
    const vaultTotalUsd = top4.reduce((sum, v) => sum + (v.state.totalAssetsUsd || 0), 0);
    const layerTotalUsd = vaults.reduce((sum, v) => sum + (v.state.totalAssetsUsd || 0), 0);
    
    // Build allocation and compute expected APY, weighted by TVL
    let expApy = 0;
    const data = top4.map((vault) => {
      const weight = (vault.state.totalAssetsUsd && vaultTotalUsd > 0) ? vault.state.totalAssetsUsd / vaultTotalUsd : 0;
      expApy += weight * vault.state.apy;
      return {
        name: vault.name,
        symbol: vault.symbol,
        value: vault.state.totalAssetsUsd || 0,
        tvlPercentage: parseFloat((weight * 100).toFixed(2)),
        apy: vault.state.apy * 100,
        chain: vault.chain.network,
      };
    });

    return { 
      allocationData: data, 
      expectedApy: expApy * 100,
      vaultTotalUsd,
      layerTotalUsd,
     };
  }, [vaults]);

  return (
    <div>
      <div className="p-4 bg-gray-800/50 rounded-lg mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
          <div>
            <p className="text-sm text-gray-400">Your Assets</p>
            <p className="text-xl font-semibold text-white">$24.88</p>
            <p className="text-sm text-gray-400">24.881 USDC</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">APR</p>
            <p className="text-xl font-semibold text-green-500">{expectedApy.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Vault Total</p>
            <p className="text-xl font-semibold text-white">${vaultTotalUsd.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p className="text-sm text-gray-400">{vaultTotalUsd.toLocaleString(undefined, {maximumFractionDigits: 0})} USDC</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Layer Total</p>
            <p className="text-xl font-semibold text-white">${layerTotalUsd.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
            <p className="text-sm text-gray-400">{layerTotalUsd.toLocaleString(undefined, {maximumFractionDigits: 0})} USDC</p>
          </div>
        </div>

        {/* Deposit/Withdraw UI */}
        <div className="bg-gray-900/50 p-6 rounded-2xl">
          <div className="flex mb-4 border-b border-gray-700">
            <button onClick={() => setActiveTab('deposit')} className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === 'deposit' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>
              Deposit
            </button>
            <button onClick={() => setActiveTab('withdraw')} className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === 'withdraw' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}>
              Withdraw
            </button>
          </div>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400">$</span>
            </div>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-4 pl-8 pr-32 text-white text-2xl focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <span className="text-gray-400 mr-2">USDC</span>
              <button 
                  onClick={() => setAmount("24.881")}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded-lg"
              >
                  MAX
              </button>
            </div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors font-medium capitalize">
            {activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
          {/* Chart and Legend */}
          <div className="w-full lg:w-1/2" style={{ height: 300 }}>
            <h3 className="text-lg font-semibold mb-2 text-center">Capital Allocation (by TVL)</h3>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ symbol, percent }) => `${symbol}: ${(percent * 100).toFixed(1)}%`}
                  dataKey="value"
                  nameKey="name"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'TVL']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Info Sidebar */}
          <div className="w-full lg:w-1/2 p-4">
            <ul className="space-y-3 pt-10">
              {allocationData.map((d) => {
                let network = d.chain.toLowerCase();
                if (network === 'sepolia') network = 'ethereum';
                if (network === 'base sepolia') network = 'base';
                const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${network}?w=20&h=20`;
                return (
                  <li key={d.symbol} className="flex justify-between items-center text-base">
                    <span className="flex items-center">
                      <img
                        src="https://icons.llamao.fi/icons/protocols/morpho?w=24&h=24"
                        alt="Morpho"
                        className="mr-2 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="flex items-center text-sm text-gray-500 capitalize">
                           <img src={iconUrl} alt={network} width={16} height={16} className="mr-1" />
                           {d.chain}
                        </div>
                      </div>
                    </span>
                    <span className="font-semibold">
                      {d.tvlPercentage}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      
      {/* Vaults Table */}
      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Chain</th>
            <th className="px-4 py-2">APY</th>
            <th className="px-4 py-2">Net APY</th>
            <th className="px-4 py-2">Total Assets (USD)</th>
            <th className="px-4 py-2">Daily APY</th>
            <th className="px-4 py-2">Weekly APY</th>
            <th className="px-4 py-2">Monthly APY</th>
            <th className="px-4 py-2">Risk Score</th>
          </tr>
        </thead>
        <tbody>
          {vaults.map(v => {
            let network = v.chain.network.toLowerCase();
            if (network === 'sepolia') network = 'ethereum';
            if (network === 'base sepolia') network = 'base';
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${network}?w=24&h=24`;
            return (
              <tr key={v.address} className="text-center">
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center">
                    <img
                      src="https://icons.llamao.fi/icons/protocols/morpho?w=48&h=48"
                      alt="Morpho"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {v.name}
                  </div>
                </td>
                <td className="border px-4 py-2">{v.symbol}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center capitalize">
                    <img src={iconUrl} alt={network} width={24} height={24} className="mr-2" />
                    {network}
                  </div>
                </td>
                <td className="border px-4 py-2">{(v.state.apy * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">{(v.state.netApy * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">{v.state.totalAssetsUsd?.toLocaleString() ?? '-'}</td>
                <td className="border px-4 py-2">{v.dailyApy != null ? (v.dailyApy * 100).toFixed(2) + '%' : '-'}</td>
                <td className="border px-4 py-2">{v.weeklyApy != null ? (v.weeklyApy * 100).toFixed(2) + '%' : '-'}</td>
                <td className="border px-4 py-2">{v.monthlyApy != null ? (v.monthlyApy * 100).toFixed(2) + '%' : '-'}</td>
                <td className="border px-4 py-2">{v.riskAnalysis[0]?.score?.toFixed(2) ?? '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TestnetMorphoUSDCMarkets;
