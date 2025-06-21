const GetYieldFromSection = () => {
  const yieldSources = [
    {
      name: 'Morpho',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/morpho?w=48&h=48'
    },
    {
      name: 'Aave',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/aave?w=48&h=48'
    },
    {
      name: 'Fluid',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/fluid-lending?w=48&h=48'
    },
    {
      name: 'Euler',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/euler?w=48&h=48'
    },
    {
      name: 'Spark',
      logoUrl: 'https://icons.llamao.fi/icons/protocols/spark?w=48&h=48'
    }
    // {
    //   name: 'Curve',
    //   logoUrl: 'https://icons.llamao.fi/icons/protocols/curve?w=48&h=48'
    // }
  ];

  const duplicatedYieldSources = [...yieldSources, ...yieldSources];

  return (
    <section id="get-yield-from" className="py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-8">
            Get Yield From
          </h2>
        </div>
      </div>
      <div className="relative w-full">
        <div className="flex animate-marquee">
          {duplicatedYieldSources.map((source, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4 flex flex-col items-center justify-center"
            >
              <div
                className="bg-white/10 rounded-full w-48 h-48 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <img src={source.logoUrl} alt={`${source.name} logo`} className="w-24 h-24" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">{source.name}</h3>
            </div>
          ))}
        </div>
      </div>
       <div className="text-center mt-16">
          <p className="text-gray-200 text-lg">and more...</p>
        </div>
    </section>
  );
};

export default GetYieldFromSection; 