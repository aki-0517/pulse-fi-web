import { Link } from 'react-router-dom';

const StablecoinsSection = () => {
  const supportedCoins = [
    {
      symbol: 'USDC',
      name: 'USD Coin',
      logoUrl: 'https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3c-lor0igW6k_zmXiOhn5gK3hrz8ylzf0Jw&s'
    },
    {
      symbol: 'USDS',
      name: 'USDS',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/33039.png'
    },
  ];

  return (
    <section id="stablecoins" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-white mb-8">
            Supported <span className="text-blue-600">Stablecoins</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {supportedCoins.map((coin, index) => (
            <Link to={`/strategy/${coin.symbol.toLowerCase()}`} key={index}>
              <div
                className="bg-white/10 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full relative hover:ring-2 hover:ring-blue-500"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <img src={coin.logoUrl} alt={`${coin.symbol} logo`} className="w-16 h-16 rounded-full" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{coin.symbol}</h3>
                <p className="text-gray-200">{coin.name}</p>
                <div className="absolute bottom-4 right-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-200 text-lg">More coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default StablecoinsSection;