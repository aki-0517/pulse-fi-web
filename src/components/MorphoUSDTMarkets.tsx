import React, { useEffect, useState } from 'react';

interface VaultItem {
  address: string;
  symbol: string;
  name: string;
  chain: { id: number; network: string };
  state: { apy: number; netApy: number; totalAssetsUsd: number | null };
  whitelisted: boolean;
}

interface VaultsResponse {
  vaults: {
    items: VaultItem[];
    pageInfo: { count: number; countTotal: number; skip: number; limit: number };
  };
}

const GRAPHQL_ENDPOINT = 'https://api.morpho.org/graphql';

const MorphoVaultsList: React.FC = () => {
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllVaults = async () => {
      let allVaults: VaultItem[] = [];
      let skip = 0;
      const pageSize = 100;

      const query = `
        query FetchWhitelistedVaults($skip: Int!) {
          vaults(
            first: ${pageSize},
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
            }
            pageInfo { count countTotal skip limit }
          }
        }
      `;

      try {
        let fetchedCount: number;
        let totalCount: number;

        do {
          const res = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { skip } }),
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          const { data, errors }: { data: VaultsResponse; errors?: any } = await res.json();
          if (errors) throw new Error(errors.map((e: any) => e.message).join(', '));

          allVaults = allVaults.concat(data.vaults.items);
          fetchedCount = data.vaults.pageInfo.count;
          totalCount   = data.vaults.pageInfo.countTotal;
          skip += fetchedCount;
        } while (skip < totalCount);

        // totalAssetsUsd が null または 0 のものを除外し、
        // vault.name に "USDT" を含むものだけを残す
        const filtered = allVaults.filter(v =>
          v.state.totalAssetsUsd != null &&
          v.state.totalAssetsUsd > 0 &&
          v.name.includes("USDT")
        );

        setVaults(filtered);
      } catch (e: any) {
        console.error(e);
        setError('Failed to retrieve data');
      }
    };

    fetchAllVaults();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Protocol</th>
            <th className="px-4 py-2">Vault</th>
            <th className="px-4 py-2">Symbol (Chain)</th>
            <th className="px-4 py-2">APY</th>
            <th className="px-4 py-2">Net APY</th>
            <th className="px-4 py-2">Total Assets (USD)</th>
          </tr>
        </thead>
        <tbody>
          {vaults.map(v => {
            const network = v.chain.network.toLowerCase();
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${network}?w=24&h=24`;
            return (
              <tr key={v.address} className="text-center">
                <td className="border px-4 py-2 flex items-center justify-center">
                  <img 
                    src="https://icons.llamao.fi/icons/protocols/morpho?w=48&h=48" 
                    alt="Morpho" 
                    width={24} 
                    height={24} 
                    className="mr-2" 
                  />
                </td>
                <td className="border px-4 py-2">{v.name}</td>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <img src={iconUrl} alt={network} width={24} height={24} className="mr-2" />
                  {v.symbol}
                </td>
                <td className="border px-4 py-2">{(v.state.apy * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">{(v.state.netApy * 100).toFixed(2)}%</td>
                <td className="border px-4 py-2">
                  {v.state.totalAssetsUsd?.toLocaleString() ?? '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MorphoVaultsList; 