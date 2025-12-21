import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

const LogoExplorer = () => {
  // Color palettes
  const colors = [
    { name: 'White', value: '#ffffff' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#22C55E' },
    { name: 'Purple', value: '#A855F7' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Cyan', value: '#06B6D4' },
    { name: 'Yellow', value: '#EAB308' },
  ];

  const [everColorIdx, setEverColorIdx] = useState(0); // White
  const [intentColorIdx, setIntentColorIdx] = useState(1); // Orange
  const [streakColorIdx, setStreakColorIdx] = useState(1); // Orange
  const [taglineColorIdx, setTaglineColorIdx] = useState(0); // White

  const everColor = colors[everColorIdx].value;
  const intentColor = colors[intentColorIdx].value;
  const streakColor = colors[streakColorIdx].value;
  const taglineColor = colors[taglineColorIdx].value;

  return (
    <div className="min-h-screen bg-zinc-900 flex">
      {/* Controls Panel - Left */}
      <div className="w-64 p-4 bg-zinc-800 border-r border-zinc-700 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">Controls</h2>
        
        {/* Ever Color */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-400">Ever</span>
            <span className="text-xs font-mono" style={{ color: everColor }}>{colors[everColorIdx].name}</span>
          </div>
          <Slider
            value={[everColorIdx]}
            onValueChange={(v) => setEverColorIdx(v[0])}
            max={colors.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Intent Color */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-400">Intent</span>
            <span className="text-xs font-mono" style={{ color: intentColor }}>{colors[intentColorIdx].name}</span>
          </div>
          <Slider
            value={[intentColorIdx]}
            onValueChange={(v) => setIntentColorIdx(v[0])}
            max={colors.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Streak Color */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-400">Streak</span>
            <span className="text-xs font-mono" style={{ color: streakColor }}>{colors[streakColorIdx].name}</span>
          </div>
          <Slider
            value={[streakColorIdx]}
            onValueChange={(v) => setStreakColorIdx(v[0])}
            max={colors.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Tagline Color */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-400">Tagline</span>
            <span className="text-xs font-mono" style={{ color: taglineColor }}>{colors[taglineColorIdx].name}</span>
          </div>
          <Slider
            value={[taglineColorIdx]}
            onValueChange={(v) => setTaglineColorIdx(v[0])}
            max={colors.length - 1}
            step={1}
            className="w-full"
          />
        </div>

        {/* Color Swatches Reference */}
        <div className="mt-auto pt-4 border-t border-zinc-700">
          <span className="text-xs text-zinc-500 block mb-2">Color Palette</span>
          <div className="flex flex-wrap gap-1">
            {colors.map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded border border-zinc-600"
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Logo Preview - Right */}
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          {/* Main Logo */}
          <div className="mb-2">
            <span className="text-7xl font-bold tracking-tight">
              <span style={{ color: everColor }}>Ever</span>
              <span style={{ color: intentColor }}>Intent</span>
            </span>
          </div>

          {/* Streak */}
          <div className="flex justify-center mb-3">
            <div 
              className="h-1 w-48 rounded-full"
              style={{ backgroundColor: streakColor }}
            />
          </div>

          {/* Tagline */}
          <p 
            className="text-lg font-medium tracking-wide"
            style={{ color: taglineColor }}
          >
            Websites That Work While You Sleep
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoExplorer;
