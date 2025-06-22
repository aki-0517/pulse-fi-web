import React, { useEffect, useState } from 'react';

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

const GRAPHQL_ENDPOINT = 'https://api.morpho.org/graphql';
const PAGE_SIZE = 100;

const MorphoUSDCMarkets: React.FC = () => {
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllVaults = async () => {
      setLoading(true);
      setError(null);
      let allVaults: VaultItem[] = [];
      let skip = 0;

      const query = `
        query FetchWhitelisted($skip: Int!) {
          vaults(
            first: ${PAGE_SIZE},
            skip: $skip,
            where: { whitelisted: true },
            orderBy: TotalAssetsUsd,
            orderDirection: Desc
          ) {
            items {
              address
              symbol
              name
              whitelisted
              chain { id network }
              state { apy netApy totalAssetsUsd }
              dailyApy
              weeklyApy
              monthlyApy
              riskAnalysis { score }
            }
            pageInfo { count countTotal skip limit }
          }
        }
      `;

      try {
        let fetched: number;
        let total: number;
        do {
          const res = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { skip } }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          if (json.errors) throw new Error(json.errors.map((e: any) => e.message).join(', '));

          const data: VaultsResponse = json.data;
          allVaults = allVaults.concat(data.vaults.items);
          fetched = data.vaults.pageInfo.count;
          total = data.vaults.pageInfo.countTotal;
          skip += fetched;
        } while (skip < total);

        // Filter USDC symbols and non-zero assets
        const filtered = allVaults.filter(
          v =>
            v.state.totalAssetsUsd &&
            v.state.totalAssetsUsd > 0 &&
            v.symbol.includes('USDC')
        );
        setVaults(filtered);
      } catch (e: any) {
        console.error(e);
        setError('Failed to retrieve data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllVaults();
  }, []);

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
        <table className="min-w-full table-auto">
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
              const network = v.chain.network.toLowerCase();
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
      )}
    </div>
  );
};

export default MorphoUSDCMarkets;
