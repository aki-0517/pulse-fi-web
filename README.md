# Pulse Web

A React + TypeScript application for DeFi yield farming built with Vite.

## Features

- Cross-chain yield farming
- Integration with Morpho, Aave, and Euler protocols
- Stablecoin (USDC, USDT, USDS) strategies
- Testnet support
- Wallet connection via Reown AppKit

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Web3**: Wagmi, Viem
- **3D Graphics**: Three.js, React Three Fiber
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Preview

```bash
npm run preview
```

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/providers/` - Context providers
- `src/abi/` - Smart contract ABIs
- `src/mocks/` - Mock data for testing

## Supported Networks

- Ethereum
- Avalanche Fuji (Testnet)
- Cross-chain functionality via CCIP

## License

MIT Licence