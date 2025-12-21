import { useState } from 'react';

const LogoExplorer = () => {
  const [selected, setSelected] = useState(0);

  const variations = [
    { name: 'White / Orange', everColor: '#ffffff', intentColor: '#F97316' },
    { name: 'White / Blue', everColor: '#ffffff', intentColor: '#3B82F6' },
    { name: 'White / Green', everColor: '#ffffff', intentColor: '#22C55E' },
    { name: 'White / Purple', everColor: '#ffffff', intentColor: '#A855F7' },
    { name: 'Orange / White', everColor: '#F97316', intentColor: '#ffffff' },
    { name: 'Blue / White', everColor: '#3B82F6', intentColor: '#ffffff' },
    { name: 'All Orange', everColor: '#F97316', intentColor: '#F97316' },
    { name: 'All Blue', everColor: '#3B82F6', intentColor: '#3B82F6' },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <h1 className="text-2xl font-bold text-white mb-8 text-center">Logo Explorer</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
        {variations.map((v, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selected === i ? 'border-orange-500 bg-zinc-800' : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-500'
            }`}
          >
            <span className="text-sm text-zinc-400">{v.name}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-center items-center py-20 bg-zinc-950 rounded-2xl max-w-2xl mx-auto">
        <span className="text-6xl md:text-8xl font-bold tracking-tight">
          <span style={{ color: variations[selected].everColor }}>Ever</span>
          <span style={{ color: variations[selected].intentColor }}>Intent</span>
        </span>
      </div>
    </div>
  );
};

export default LogoExplorer;
