import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VaultInfo {
  vault: string;
  underlyingAsset: string;
  apy: number;
  chainId: number;
  fee: number;
  maxAvailableSupply: string;
}

interface VaultsResponse {
  vaultInfo: VaultInfo[];
}

const AAVE_GRAPHQL_ENDPOINT = '/subgraphs/api/subgraphs/id/Cd2gEDVeqnjBn1hSeqFMitw8Q1iiyV9FYUZkLNRcL87g';
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

const chainIdToNetwork: { [key: number]: string } = {
  1: 'ethereum',
  42161: 'arbitrum',
  137: 'polygon',
  10: 'optimism',
};

const AaveUSDCMarkets: React.FC = () => {
  const [vaults, setVaults] = useState<VaultInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAaveVaults = async () => {
      setLoading(true);
      setError(null);
      
      const query = `
        query VaultInfo {
          vaultInfo {
            vault
            underlyingAsset
            apy
            chainId
            fee
            maxAvailableSupply
          }
        }
      `;

      try {
        const res = await fetch(AAVE_GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_THEGRAPH_API_KEY}`
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        if (json.errors) {
          throw new Error(json.errors.map((e: any) => e.message).join(', '));
        }
        
        const data: VaultsResponse = json.data;
        // This is a placeholder for USDC asset addresses on different chains
        const usdcAddresses = [
          '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // Ethereum
          '0xaf88d065e77c8cc2239327c5edb3a6643240835'  // Arbitrum
        ];

        const filtered = data.vaultInfo.filter(v => 
          usdcAddresses.includes(v.underlyingAsset.toLowerCase()) && parseFloat(v.maxAvailableSupply) > 0
        );

        setVaults(filtered);
      } catch (e: any) {
        console.error(e);
        setError('Failed to retrieve data');
      } finally {
        setLoading(false);
      }
    };

    fetchAaveVaults();
  }, []);

  const { allocationData, expectedApy } = useMemo(() => {
    if (!vaults.length) return { allocationData: [], expectedApy: 0 };

    const top4 = vaults
      .sort((a, b) => b.apy - a.apy)
      .slice(0, 4);

    const totalApy = top4.reduce((sum, v) => sum + v.apy, 0);
    if (totalApy === 0) return { allocationData: [], expectedApy: 0 };


    let expApy = 0;
    const data = top4.map(vault => {
      const weight = vault.apy / totalApy;
      expApy += weight * vault.apy;
      return {
        name: `Aave Vault ${chainIdToNetwork[vault.chainId] || 'Unknown'}`,
        value: parseFloat((weight * 100).toFixed(2)),
        apy: vault.apy * 100,
        chain: chainIdToNetwork[vault.chainId] || 'Unknown',
      };
    });

    return { allocationData: data, expectedApy: expApy * 100 };
  }, [vaults]);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-10">
          <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2" style={{ height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/2 p-4">
            <h3 className="text-lg font-semibold mb-2">Portfolio Summary</h3>
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <p className="text-sm mb-1">Estimated APY</p>
              <p className="text-3xl font-bold">{expectedApy.toFixed(2)}%</p>
            </div>
            <ul className="space-y-2">
              {allocationData.map((d, i) => {
                const network = d.chain.toLowerCase();
                const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${network}?w=20&h=20`;
                return (
                  <li key={i} className="flex justify-between items-center">
                    <span className="flex items-center">
                      <img 
                        src={iconUrl} 
                        alt={network} 
                        width={20} 
                        height={20} 
                        className="mr-2" 
                      />
                      {d.name}
                    </span>
                    <span>
                      {d.value}% @ {d.apy.toFixed(2)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr>
            <th className="px-4 py-2">Vault</th>
            <th className="px-4 py-2">Chain</th>
            <th className="px-4 py-2">APY</th>
            <th className="px-4 py-2">Fee</th>
            <th className="px-4 py-2">Max Available Supply</th>
          </tr>
        </thead>
        <tbody>
          {vaults.map(v => {
            const network = chainIdToNetwork[v.chainId]?.toLowerCase() || 'unknown';
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${network}?w=24&h=24`;
            return (
              <tr key={v.vault} className="text-center">
                <td className="border px-4 py-2">
                   <div className="flex items-center justify-center">
                    <img
                      src="https://aave.com/favicon.ico"
                      alt="Aave"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    {v.vault.substring(0, 6)}...{v.vault.substring(v.vault.length - 4)}
                  </div>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex items-center justify-center capitalize">
                    <img src={iconUrl} alt={network} width={24} height={24} className="mr-2" />
                    {network}
                  </div>
                </td>
                <td className="border px-4 py-2">{(v.apy * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">{(v.fee * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">{parseFloat(v.maxAvailableSupply).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AaveUSDCMarkets;
