import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import pulseLogo from "/pulse.png";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, arbitrum, base, sepolia, arbitrumSepolia, baseSepolia } from '@reown/appkit/networks';

const getChainLogo = (chainId: number | undefined) => {
  switch (chainId) {
    case mainnet.id:
      return 'https://icons.llamao.fi/icons/chains/rsz_ethereum?w=48&h=48';
    case arbitrum.id:
    case arbitrumSepolia.id:
      return 'https://icons.llamao.fi/icons/chains/rsz_arbitrum?w=48&h=48';
    case base.id:
    case baseSepolia.id:
      return 'https://icons.llamao.fi/icons/chains/rsz_base?w=48&h=48';
    case sepolia.id:
      return 'https://icons.llamao.fi/icons/chains/rsz_ethereum?w=48&h=48';
    default:
      // Return a default or transparent image if no match
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  }
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChainDropdownOpen, setChainDropdownOpen] = useState(false);
  const [isAddressDropdownOpen, setAddressDropdownOpen] = useState(false);
  const [isNetworkDropdownOpen, setNetworkDropdownOpen] = useState(false);
  const [networkMode, setNetworkMode] = useState<'mainnet' | 'testnet'>('testnet');

  const location = useLocation();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const chainDropdownRef = useRef<HTMLDivElement>(null);
  const addressDropdownRef = useRef<HTMLDivElement>(null);
  const networkDropdownRef = useRef<HTMLDivElement>(null);
  const mobileChainDropdownRef = useRef<HTMLDivElement>(null);
  const mobileAddressDropdownRef = useRef<HTMLDivElement>(null);
  const mobileNetworkDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chainDropdownRef.current && !chainDropdownRef.current.contains(event.target as Node)) {
        setChainDropdownOpen(false);
      }
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target as Node)) {
        setAddressDropdownOpen(false);
      }
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setNetworkDropdownOpen(false);
      }
      if (mobileChainDropdownRef.current && !mobileChainDropdownRef.current.contains(event.target as Node)) {
        setChainDropdownOpen(false);
      }
      if (mobileAddressDropdownRef.current && !mobileAddressDropdownRef.current.contains(event.target as Node)) {
        setAddressDropdownOpen(false);
      }
      if (mobileNetworkDropdownRef.current && !mobileNetworkDropdownRef.current.contains(event.target as Node)) {
        setNetworkDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isEarnPage = location.pathname.startsWith("/earn");
  const currentChain = chains.find(chain => chain.id === chainId);

  const displayChains = chains.filter(chain => {
    if (networkMode === 'testnet') {
      return chain.testnet === true;
    }
    return chain.testnet !== true;
  });

  const formatAddress = (addr: `0x${string}` | undefined) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }

  const EarnButton = ({ isMobile = false }) => {
    if (!isEarnPage) {
      const className = isMobile
        ? "bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium w-fit"
        : "bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium";
      return (
        <Link to="/earn" className={className} onClick={() => isMobile && setIsMenuOpen(false)}>
          Earn
        </Link>
      );
    }

    if (!isConnected) {
      const className = isMobile
        ? "bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium w-fit"
        : "bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium";
      return (
        <button
          onClick={() => { open(); if (isMobile) setIsMenuOpen(false); }}
          className={className}
        >
          Connect Wallet
        </button>
      );
    }

    if (isMobile) {
      return (
          <div className="flex flex-col items-start space-y-4">
            <div className="relative self-start" ref={mobileNetworkDropdownRef}>
              <button
                onClick={() => setNetworkDropdownOpen(!isNetworkDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium"
              >
                <span>{networkMode === 'mainnet' ? 'Mainnet' : 'Testnet'}</span>
                <ChevronDown size={20} />
              </button>
              {isNetworkDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
                  <li>
                    <button
                      onClick={() => { /* setNetworkMode('mainnet'); setNetworkDropdownOpen(false); */ }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white disabled:opacity-50"
                      disabled
                      title="Coming soon"
                    >
                      Mainnet
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { setNetworkMode('testnet'); setNetworkDropdownOpen(false); }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      Testnet
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <div className="flex items-center space-x-2 w-full">
                {/* Chain Switcher (Mobile) */}
                 <div className="relative" ref={mobileChainDropdownRef}>
                    <button
                      onClick={() => setChainDropdownOpen(!isChainDropdownOpen)}
                       className="flex items-center justify-center h-10 w-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    >
                       <img src={getChainLogo(chainId)} alt={currentChain?.name ?? 'Chain'} className="h-6 w-6 rounded-full" />
                    </button>
                    {isChainDropdownOpen && (
                       <ul className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
                        {displayChains.map((chain) => (
                          <li key={chain.id}>
                            <button
                              onClick={() => {
                                if (switchChain) {
                                  switchChain({ chainId: chain.id });
                                }
                                setChainDropdownOpen(false);
                                setIsMenuOpen(false);
                              }}
                              className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                              disabled={!switchChain || chainId === chain.id}
                            >
                              <img src={getChainLogo(chain.id)} alt={chain.name} className="h-5 w-5 rounded-full mr-2" />
                              {chain.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                {/* Address / Disconnect */}
                <div className="relative flex-grow" ref={mobileAddressDropdownRef}>
                  <button
                      onClick={() => setAddressDropdownOpen(!isAddressDropdownOpen)}
                      className="w-full bg-gray-800 text-white px-4 py-2 rounded-full font-medium text-left"
                  >
                      {formatAddress(address)}
                  </button>
                  {isAddressDropdownOpen && (
                      <ul className="absolute left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
                          <li>
                              <button
                              onClick={() => {
                                  disconnect();
                                  setAddressDropdownOpen(false);
                                  setIsMenuOpen(false);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                              >
                              Disconnect
                              </button>
                          </li>
                      </ul>
                  )}
                </div>
            </div>
          </div>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        {/* Network Mode Toggle */}
        <div className="relative" ref={networkDropdownRef}>
          <button
            onClick={() => setNetworkDropdownOpen(!isNetworkDropdownOpen)}
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium"
          >
            <span>{networkMode === 'mainnet' ? 'Mainnet' : 'Testnet'}</span>
            <ChevronDown size={20} />
          </button>
          {isNetworkDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
              <li>
                <button
                  onClick={() => { /* setNetworkMode('mainnet'); setNetworkDropdownOpen(false); */ }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-white disabled:opacity-50"
                  disabled
                  title="Coming soon"
                >
                  Mainnet
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setNetworkMode('testnet'); setNetworkDropdownOpen(false); }}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                  Testnet
                </button>
              </li>
            </ul>
          )}
        </div>
        {/* Chain Switcher */}
        <div className="relative" ref={chainDropdownRef}>
          <button
            onClick={() => setChainDropdownOpen(!isChainDropdownOpen)}
            className="flex items-center justify-center h-10 w-10 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
          >
            <img src={getChainLogo(chainId)} alt={currentChain?.name ?? 'Chain'} className="h-6 w-6 rounded-full" />
          </button>
          {isChainDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
              {displayChains.map((chain) => (
                <li key={chain.id}>
                  <button
                    onClick={() => {
                      if (switchChain) {
                        switchChain({ chainId: chain.id });
                      }
                      setChainDropdownOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    disabled={!switchChain || chainId === chain.id}
                  >
                    <img src={getChainLogo(chain.id)} alt={chain.name} className="h-5 w-5 rounded-full mr-2" />
                    {chain.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Address and Disconnect */}
        <div className="relative" ref={addressDropdownRef}>
          <button
            onClick={() => setAddressDropdownOpen(!isAddressDropdownOpen)}
            className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors font-medium"
          >
            <span>{formatAddress(address)}</span>
            <ChevronDown size={20} />
          </button>
          {isAddressDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-20">
              <li>
                <button
                  onClick={() => {
                    disconnect();
                    setAddressDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                >
                  Disconnect
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img src={pulseLogo} alt="Pulse Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold italic">Pulse</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {!isEarnPage && <a href="/#how-it-works" className="hover:text-gray-300 transition-colors">How It Works</a>}
            <EarnButton />
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black">
          <div className="container mx-auto px-4 pb-4">
            <nav className="flex flex-col space-y-4">
              {!isEarnPage && <a href="/#how-it-works" className="hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>}
              <EarnButton isMobile={true}/>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;