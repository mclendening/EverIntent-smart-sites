import { useEffect, useState } from 'react';

// Pre-defined positions for screenshots scattered around edges, angled toward center
const screenshots = [
  // Top row
  { id: 1, x: 5, y: 3, width: 140, height: 100, rotate: 8, color: 'from-teal-500 to-teal-600', z: 1 },
  { id: 2, x: 18, y: 8, width: 120, height: 85, rotate: 5, color: 'from-blue-500 to-blue-600', z: 2 },
  { id: 3, x: 32, y: 2, width: 160, height: 110, rotate: -3, color: 'from-emerald-500 to-emerald-600', z: 1 },
  { id: 4, x: 48, y: 5, width: 180, height: 120, rotate: -5, color: 'from-pink-500 to-pink-600', z: 2 },
  { id: 5, x: 68, y: 3, width: 150, height: 105, rotate: 4, color: 'from-orange-500 to-orange-600', z: 1 },
  { id: 6, x: 82, y: 6, width: 130, height: 90, rotate: -8, color: 'from-violet-500 to-violet-600', z: 2 },
  
  // Upper left cluster
  { id: 7, x: 2, y: 18, width: 160, height: 110, rotate: 12, color: 'from-purple-500 to-purple-600', z: 2 },
  { id: 8, x: 8, y: 32, width: 120, height: 85, rotate: 15, color: 'from-indigo-500 to-indigo-600', z: 1 },
  { id: 9, x: 15, y: 22, width: 100, height: 70, rotate: 10, color: 'from-cyan-500 to-cyan-600', z: 3 },
  
  // Upper right cluster  
  { id: 10, x: 78, y: 15, width: 180, height: 125, rotate: -10, color: 'from-green-500 to-green-600', z: 2 },
  { id: 11, x: 85, y: 28, width: 140, height: 100, rotate: -15, color: 'from-rose-500 to-rose-600', z: 1 },
  { id: 12, x: 72, y: 24, width: 90, height: 65, rotate: -8, color: 'from-amber-500 to-amber-600', z: 3 },
  
  // Left side
  { id: 13, x: 3, y: 45, width: 170, height: 115, rotate: 18, color: 'from-emerald-400 to-emerald-500', z: 1 },
  { id: 14, x: 10, y: 58, width: 140, height: 95, rotate: 14, color: 'from-blue-400 to-blue-500', z: 2 },
  
  // Right side
  { id: 15, x: 82, y: 48, width: 160, height: 110, rotate: -16, color: 'from-purple-400 to-purple-500', z: 1 },
  { id: 16, x: 75, y: 55, width: 120, height: 85, rotate: -12, color: 'from-orange-400 to-orange-500', z: 2 },
  
  // Lower left cluster
  { id: 17, x: 5, y: 72, width: 150, height: 105, rotate: 12, color: 'from-teal-400 to-teal-500', z: 2 },
  { id: 18, x: 15, y: 80, width: 180, height: 120, rotate: 8, color: 'from-pink-400 to-pink-500', z: 1 },
  { id: 19, x: 22, y: 68, width: 100, height: 70, rotate: 6, color: 'from-indigo-400 to-indigo-500', z: 3 },
  
  // Lower right cluster
  { id: 20, x: 72, y: 70, width: 160, height: 110, rotate: -10, color: 'from-cyan-400 to-cyan-500', z: 2 },
  { id: 21, x: 80, y: 78, width: 170, height: 115, rotate: -6, color: 'from-violet-400 to-violet-500', z: 1 },
  { id: 22, x: 68, y: 82, width: 90, height: 65, rotate: -4, color: 'from-green-400 to-green-500', z: 3 },
  
  // Bottom row
  { id: 23, x: 28, y: 85, width: 130, height: 90, rotate: 3, color: 'from-rose-400 to-rose-500', z: 1 },
  { id: 24, x: 42, y: 88, width: 150, height: 100, rotate: -2, color: 'from-amber-400 to-amber-500', z: 2 },
  { id: 25, x: 56, y: 86, width: 140, height: 95, rotate: 4, color: 'from-blue-400 to-blue-500', z: 1 },
  
  // Extra depth layers (smaller, more distant)
  { id: 26, x: 25, y: 12, width: 80, height: 55, rotate: 6, color: 'from-purple-600 to-purple-700', z: 0, opacity: 0.6 },
  { id: 27, x: 60, y: 15, width: 70, height: 50, rotate: -4, color: 'from-teal-600 to-teal-700', z: 0, opacity: 0.6 },
  { id: 28, x: 88, y: 40, width: 75, height: 52, rotate: -20, color: 'from-pink-600 to-pink-700', z: 0, opacity: 0.5 },
  { id: 29, x: 1, y: 62, width: 65, height: 45, rotate: 22, color: 'from-orange-600 to-orange-700', z: 0, opacity: 0.5 },
  { id: 30, x: 35, y: 92, width: 60, height: 42, rotate: 2, color: 'from-indigo-600 to-indigo-700', z: 0, opacity: 0.4 },
];

export function WebsiteBurstBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {screenshots.map((screenshot) => {
        // Subtle parallax based on z-depth
        const parallaxOffset = scrollY * (0.05 + screenshot.z * 0.02);
        
        return (
          <div
            key={screenshot.id}
            className="absolute"
            style={{
              left: `${screenshot.x}%`,
              top: `${screenshot.y}%`,
              transform: `rotate(${screenshot.rotate}deg) translateY(${parallaxOffset}px)`,
              zIndex: screenshot.z,
              opacity: screenshot.opacity ?? 1,
            }}
          >
            {/* Browser window */}
            <div
              className={`bg-gradient-to-br ${screenshot.color} rounded-lg shadow-2xl overflow-hidden`}
              style={{
                width: screenshot.width,
                height: screenshot.height,
              }}
            >
              {/* Browser chrome */}
              <div className="h-4 bg-black/20 flex items-center gap-1 px-2">
                <div className="w-2 h-2 rounded-full bg-red-400/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <div className="w-2 h-2 rounded-full bg-green-400/70" />
                <div className="flex-1 ml-2 h-2 bg-white/10 rounded-full" />
              </div>
              {/* Content mockup */}
              <div className="p-2 space-y-1.5">
                <div className="h-2 w-3/4 bg-white/25 rounded-full" />
                <div className="h-1.5 w-1/2 bg-white/15 rounded-full" />
                <div className="h-6 w-full bg-white/10 rounded mt-2" />
                <div className="flex gap-1.5 mt-1.5">
                  <div className="h-4 w-1/3 bg-white/12 rounded" />
                  <div className="h-4 w-1/3 bg-white/12 rounded" />
                  <div className="h-4 w-1/3 bg-white/12 rounded" />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Center vignette to keep text readable */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, hsl(var(--background)) 0%, hsl(var(--background) / 0.98) 25%, hsl(var(--background) / 0.85) 45%, hsl(var(--background) / 0.4) 65%, transparent 85%)`,
        }}
      />
    </div>
  );
}
