import React, { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockVaultsResponse } from '../mocks/testnetMorphoUSDCMarkets';
import { useAccount, useWalletClient, useChainId, usePublicClient } from 'wagmi';
import { erc20Abi, parseUnits, formatUnits } from 'viem';
import VaultAbi from '../abi/Vault.json';
import CCIPRouterAbi from '../abi/CCIPRouter.json';

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

// ─────────────────────────────────────────────────────────────────────────────
// 修正ポイント①: 公式ドキュメントから完全なアドレスを取得して貼り付けてください
//    ・Base Sepolia Router: 0xD3b0...8a93（0x＋40 文字） :contentReference[oaicite:0]{index=0}
//    ・Ethereum Sepolia Router: 0xd0daae2231e9cb96b94c8512223533293c3693bf :contentReference[oaicite:1]{index=1}
//    ・Arbitrum Sepolia Router: 0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165 :contentReference[oaicite:2]{index=2}
//  また、チェーンセレクターを BigInt リテラルに統一します。
// ─────────────────────────────────────────────────────────────────────────────
const CCIP_ROUTERS = new Map<number, string>([
  [84532,    '0xD3b0A9B0342a59d9cC6B1A0F602aDAB0F3C5c0a9'],  // Base Sepolia
  [11155111, '0xd0daae2231e9cb96b94c8512223533293c3693bf'],  // Ethereum Sepolia
  [421614,   '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165'],  // Arbitrum Sepolia
]);

const CHAIN_SELECTORS = new Map<number, bigint>([
  [84532,    10344971235874465080n],   // Base Sepolia selector
  [11155111, 16015286601757825753n],   // Ethereum Sepolia selector
  [421614,   3478487238524512106n],    // Arbitrum Sepolia selector
]);

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
const TESTNET_CHAINS = ['sepolia', 'base sepolia', 'arbitrum sepolia'];

const TestnetMorphoUSDCMarkets: React.FC = () => {
  const [vaults, setVaults] = useState<VaultItem[]>([]);
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txError, setTxError] = useState<string | null>(null);
  const [distributeStatus, setDistributeStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [distributeError, setDistributeError] = useState<string | null>(null);
  const [userPendingDeposit, setUserPendingDeposit] = useState<bigint>(0n);
  const [depositTxHash, setDepositTxHash] = useState<string | null>(null);
  const [distributeTxHash, setDistributeTxHash] = useState<string | null>(null);

  // Vault フィルタリング
  useEffect(() => {
    const allVaults: VaultItem[] = mockVaultsResponse.vaults.items;
    const filtered = allVaults.filter(
      v =>
        v.state.totalAssetsUsd &&
        v.state.totalAssetsUsd > 0 &&
        v.symbol.includes('USDC') &&
        TESTNET_CHAINS.includes(v.chain.network.toLowerCase())
    );
    setVaults(filtered);
  }, []);

  // 上位4 Vault の選定と期待APY 計算
  const { allocationData, expectedApy, vaultTotalUsd, layerTotalUsd } = useMemo(() => {
    if (!vaults.length) return { allocationData: [], expectedApy: 0, vaultTotalUsd: 0, layerTotalUsd: 0 };

    const top4 = [...vaults]
      .sort((a, b) => b.state.apy - a.state.apy)
      .slice(0, 4);
    
    const vaultTotalUsd = top4.reduce((sum, v) => sum + (v.state.totalAssetsUsd || 0), 0);
    const layerTotalUsd = vaults.reduce((sum, v) => sum + (v.state.totalAssetsUsd || 0), 0);
    
    let expApy = 0;
    const data = top4.map(v => {
      const weight = vaultTotalUsd > 0 ? (v.state.totalAssetsUsd! / vaultTotalUsd) : 0;
      expApy += weight * v.state.apy;
      return {
        name: v.name,
        symbol: v.symbol,
        value: v.state.totalAssetsUsd || 0,
        tvlPercentage: parseFloat((weight * 100).toFixed(2)),
        apy: v.state.apy * 100,
        chain: v.chain.network,
      };
    });

    return { allocationData: data, expectedApy: expApy * 100, vaultTotalUsd, layerTotalUsd };
  }, [vaults]);

  // pendingDeposit の取得
  useEffect(() => {
    const fetchPendingDeposit = async () => {
      if (!address || !publicClient || !chainId) {
        setUserPendingDeposit(0n);
        return;
      }
      const vaultAddr = mockVaultsResponse.vaults.items.find(v => v.chain.id === chainId)?.address;
      if (!vaultAddr) {
        setUserPendingDeposit(0n);
        return;
      }
      try {
        const code = await publicClient.getCode({ address: vaultAddr as `0x${string}` });
        if (code === '0x') {
          setUserPendingDeposit(0n);
          return;
        }
        const result = await publicClient.readContract({
          address: vaultAddr as `0x${string}`,
          abi: VaultAbi,
          functionName: 'pendingDeposit',
          args: [address as `0x${string}`],
        });
        setUserPendingDeposit(result as bigint);
      } catch {
        setUserPendingDeposit(0n);
      }
    };
    fetchPendingDeposit();
  }, [address, publicClient, chainId, txStatus, distributeStatus]);

  // Deposit 処理
  const handleDeposit = async () => {
    setTxError(null);
    setDepositTxHash(null);

    if (!isConnected || !walletClient || !publicClient) {
      setTxError('ウォレットを接続してください');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setTxError('有効な金額を入力してください');
      return;
    }
    const vaultAddr = mockVaultsResponse.vaults.items.find(v => v.chain.id === chainId)?.address;
    const usdcAddr  = mockVaultsResponse.vaults.items.find(v => v.chain.id === chainId)?.chain.id === chainId
      ? (chainId === 84532 ? '0x2B7930bE47948E058eDb8f5839f0D407c2f71de3'
        : chainId === 11155111 ? '0x7393F2Ca9A013cbcD106F882cDB59bd751982317'
        : '0x638cD4F2A8719395923AE38A3F12002fD782233e')
      : undefined;
    if (!vaultAddr || !usdcAddr) {
      setTxError('このチェーンはサポートされていません');
      return;
    }

    try {
      setTxStatus('pending');
      const parsed = parseUnits(amount, 6);
      const approveHash = await walletClient.writeContract({
        address: usdcAddr as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        args: [vaultAddr as `0x${string}`, parsed],
        account: address as `0x${string}`,
      });
      await publicClient.waitForTransactionReceipt({ hash: approveHash });

      const depositHash = await walletClient.writeContract({
        address: vaultAddr as `0x${string}`,
        abi: VaultAbi,
        functionName: 'depositOnly',
        args: [parsed, address as `0x${string}`],
        account: address as `0x${string}`,
      });
      setDepositTxHash(depositHash);
      await publicClient.waitForTransactionReceipt({ hash: depositHash });
      setTxStatus('success');
    } catch (e: any) {
      setTxStatus('error');
      setTxError(e.message ?? 'デポジットに失敗しました');
    } finally {
      setTimeout(() => setTxStatus('idle'), 4000);
    }
  };

  // 分配（Distribute）処理
  const handleDistribute = async () => {
    setDistributeError(null);
    setDistributeTxHash(null);

    if (!isConnected || !walletClient || !publicClient || !address) {
      setDistributeError('ウォレットを接続してください');
      return;
    }

    // 修正ポイント②: チェーンセレクター・ルーターアドレス存在チェック
    const routerAddr = CCIP_ROUTERS.get(chainId);
    const chainSelector = CHAIN_SELECTORS.get(chainId);
    if (!routerAddr) {
      setDistributeError(`CCIP Router が未設定のチェーンです (chainId=${chainId})`);
      return;
    }
    if (chainSelector === undefined) {
      setDistributeError(`チェーンセレクターが未登録です (chainId=${chainId})`);
      return;
    }

    // 固定配分：Base:Sepolia:Arbitrum = 2:5:3
    const defs = [
      { chain: 84532,    percentage: 2000 },
      { chain: 11155111, percentage: 5000 },
      { chain: 421614,   percentage: 3000 },
    ];
    const allocations = defs.map(a => {
      const sel = CHAIN_SELECTORS.get(a.chain);
      if (sel === undefined) throw new Error(`Unsupported destination chain ${a.chain}`);
      return {
        destinationChainSelector: sel,
        strategyIndex: 0,
        percentage: a.percentage,
      };
    });

    try {
      setDistributeStatus('pending');

      // ルーターコントラクト存在チェック
      const code = await publicClient.getCode({ address: routerAddr as `0x${string}` });
      if (code === '0x') throw new Error('CCIP Router コントラクトが見つかりません');

      // fee 計算
      let totalFee = 0n;
      for (const alloc of allocations) {
        if (alloc.destinationChainSelector === chainSelector) continue;
        const msg = {
          receiver: vaults.find(v => v.chain.id === chainId)!.address as `0x${string}`,
          data: '0x',
          tokenAmounts: [] as [],
          extraArgs: '0x',
          feeToken: '0x0000000000000000000000000000000000000000',
        };
        const fee = await publicClient.readContract({
          address: routerAddr as `0x${string}`,
          abi: CCIPRouterAbi,
          functionName: 'getFee',
          args: [alloc.destinationChainSelector, msg],
        });
        totalFee += BigInt(fee as string);
      }

      // distributePendingDeposit 呼び出し
      const distributeHash = await walletClient.writeContract({
        address: vaults.find(v => v.chain.id === chainId)!.address as `0x${string}`,
        abi: VaultAbi,
        functionName: 'distributePendingDeposit',
        args: [allocations],
        account: address as `0x${string}`,
        value: totalFee,
      });
      setDistributeTxHash(distributeHash);
      await publicClient.waitForTransactionReceipt({ hash: distributeHash });
      setDistributeStatus('success');
    } catch (e: any) {
      setDistributeStatus('error');
      setDistributeError(e.message ?? '分配に失敗しました');
    } finally {
      setTimeout(() => setDistributeStatus('idle'), 4000);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      {/* 概要情報 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
        <div>
          <p className="text-gray-400">Your Assets</p>
          <p className="text-white text-xl">${formatUnits(userPendingDeposit, 6)}</p>
          <p className="text-gray-400">{formatUnits(userPendingDeposit, 6)} USDC</p>
        </div>
        <div>
          <p className="text-gray-400">APR</p>
          <p className="text-green-500 text-xl">{expectedApy.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-gray-400">Vault Total</p>
          <p className="text-white text-xl">${vaultTotalUsd.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400">Layer Total</p>
          <p className="text-white text-xl">${layerTotalUsd.toLocaleString()}</p>
        </div>
      </div>

      {/* Deposit/Withdraw UI */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-2 text-center ${activeTab === 'deposit' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
          >Deposit</button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex-1 py-2 text-center ${activeTab === 'withdraw' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
          >Withdraw</button>
        </div>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-400">$</span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-4 pl-8 pr-32 text-white text-2xl focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
            <span className="text-gray-400 mr-2">USDC</span>
            <button
              onClick={() => setAmount(vaultTotalUsd.toString())}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded-lg"
            >MAX</button>
          </div>
        </div>
        <button
          onClick={activeTab === 'deposit' ? handleDeposit : undefined}
          disabled={txStatus === 'pending'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full transition font-medium"
        >
          {txStatus === 'pending' ? 'Processing...' : activeTab === 'deposit' ? 'Deposit' : 'Withdraw'}
        </button>
        {txError && <p className="text-red-500 mt-2 text-center">{txError}</p>}
        {txStatus === 'success' && <p className="text-green-500 mt-2 text-center">Deposit successful</p>}

        {depositTxHash && (
          <div className="mt-4">
            <button
              onClick={handleDistribute}
              disabled={distributeStatus === 'pending'}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full transition font-medium"
            >
              {distributeStatus === 'pending' ? 'Distributing...' : 'Distribute assets cross-chain'}
            </button>
            {distributeError && <p className="text-red-500 mt-2 text-center">{distributeError}</p>}
            {distributeStatus === 'success' && <p className="text-green-500 mt-2 text-center">Distribution successful</p>}
          </div>
        )}
      </div>

      {/* チャート & 配分詳細 */}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0" style={{ height: 300 }}>
          <h3 className="text-white text-lg mb-2 text-center">Capital Allocation (by TVL)</h3>
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
                {allocationData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(val: number) => [`$${val.toLocaleString()}`, 'TVL']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <ul className="space-y-3">
            {allocationData.map(d => {
              let net = d.chain.toLowerCase();
              if (net === 'sepolia') net = 'ethereum';
              if (net === 'base sepolia') net = 'base';
              const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${net}?w=20&h=20`;
              return (
                <li key={d.symbol} className="flex justify-between items-center text-white">
                  <div className="flex items-center">
                    <img src="https://icons.llamao.fi/icons/protocols/morpho?w=24&h=24" alt="Morpho" className="mr-2 rounded-full" />
                    <div>
                      <div className="font-medium">{d.name}</div>
                      <div className="text-sm text-gray-400 flex items-center capitalize">
                        <img src={iconUrl} alt={net} width={16} height={16} className="mr-1" />
                        {d.chain}
                      </div>
                    </div>
                  </div>
                  <span className="font-semibold">{d.tvlPercentage}%</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Vaults テーブル */}
      <table className="min-w-full table-auto mt-6 text-white">
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
            let net = v.chain.network.toLowerCase();
            if (net === 'sepolia') net = 'ethereum';
            if (net === 'base sepolia') net = 'base';
            const iconUrl = `https://icons.llamao.fi/icons/chains/rsz_${net}?w=24&h=24`;
            return (
              <tr key={v.address} className="text-center">
                <td className="border px-4 py-2 flex items-center justify-center">
                  <img src="https://icons.llamao.fi/icons/protocols/morpho?w=48&h=48" alt="Morpho" width={24} height={24} className="mr-2" />
                  {v.name}
                </td>
                <td className="border px-4 py-2">{v.symbol}</td>
                <td className="border px-4 py-2 flex items-center justify-center capitalize">
                  <img src={iconUrl} alt={net} width={24} height={24} className="mr-2" />
                  {net}
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
