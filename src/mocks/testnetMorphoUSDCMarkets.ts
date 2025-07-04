export const mockVaultsResponse = {
  vaults: {
    items: [
      {
        address: '0x1234567890123456789012345678901234567890',
        symbol: 'mUSDC-sepolia',
        name: 'Morpho USDC Sepolia',
        chain: { id: 11155111, network: 'sepolia' },
        state: { apy: 0.05, netApy: 0.045, totalAssetsUsd: 1500000 },
        dailyApy: 0.0001,
        weeklyApy: 0.0007,
        monthlyApy: 0.003,
        riskAnalysis: [{ score: 85 }],
        whitelisted: true,
      },
      {
        address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
        symbol: 'mUSDC-base-sepolia',
        name: 'Morpho USDC Base Sepolia',
        chain: { id: 84532, network: 'base sepolia' },
        state: { apy: 0.08, netApy: 0.07, totalAssetsUsd: 2500000 },
        dailyApy: 0.0002,
        weeklyApy: 0.0014,
        monthlyApy: 0.006,
        riskAnalysis: [{ score: 90 }],
        whitelisted: true,
      },
      {
        address: '0x0987654321098765432109876543210987654321',
        symbol: 'oUSDC-sepolia',
        name: 'Optimized USDC Sepolia',
        chain: { id: 11155111, network: 'sepolia' },
        state: { apy: 0.06, netApy: 0.055, totalAssetsUsd: 1200000 },
        dailyApy: 0.00015,
        weeklyApy: 0.0010,
        monthlyApy: 0.004,
        riskAnalysis: [{ score: 88 }],
        whitelisted: true,
      },
      {
        address: '0xfedcba9876543210fedcba9876543210fedcba98',
        symbol: 'sUSDC-base-sepolia',
        name: 'Stable USDC Base Sepolia',
        chain: { id: 84532, network: 'base sepolia' },
        state: { apy: 0.07, netApy: 0.065, totalAssetsUsd: 3000000 },
        dailyApy: 0.00018,
        weeklyApy: 0.0012,
        monthlyApy: 0.005,
        riskAnalysis: [{ score: 92 }],
        whitelisted: true,
      },
      {
        address: '0x11223344556677889900aabbccddeeff11223344',
        symbol: 'aUSDC-sepolia',
        name: 'Advanced USDC Sepolia',
        chain: { id: 11155111, network: 'sepolia' },
        state: { apy: 0.09, netApy: 0.085, totalAssetsUsd: 500000 },
        dailyApy: 0.00025,
        weeklyApy: 0.0018,
        monthlyApy: 0.0075,
        riskAnalysis: [{ score: 95 }],
        whitelisted: false,
      },
    ],
    pageInfo: { count: 5, countTotal: 5, skip: 0, limit: 100 },
  },
}; 