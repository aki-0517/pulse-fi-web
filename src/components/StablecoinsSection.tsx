

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
    {
      symbol: 'EURC',
      name: 'Euro Coin',
      logoUrl: 'https://s2.coinmarketcap.com/static/img/coins/200x200/20641.png'
    }
  ];

  return (
    <section id="stablecoins" className="py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold text-gray-900 mb-8">
            Supported <span className="text-blue-600">Stablecoins</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportedCoins.map((coin, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <img src={coin.logoUrl} alt={`${coin.symbol} logo`} className="w-16 h-16 rounded-full" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{coin.symbol}</h3>
              <p className="text-gray-600">{coin.name}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 text-lg">More coming soon...</p>
        </div>
      </div>
    </section>
  );
};

export default StablecoinsSection;