import { useEffect, useRef, useState } from 'react';

// Generate mock website screenshots with varied colors
const generateScreenshots = (count: number) => {
  const colors = [
    'from-blue-600 to-blue-800',
    'from-emerald-500 to-emerald-700',
    'from-purple-500 to-purple-700',
    'from-orange-500 to-orange-700',
    'from-pink-500 to-pink-700',
    'from-cyan-500 to-cyan-700',
    'from-indigo-500 to-indigo-700',
    'from-rose-500 to-rose-700',
    'from-teal-500 to-teal-700',
    'from-amber-500 to-amber-700',
  ];

  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const radius = 300 + Math.random() * 400;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = Math.random() * 200 - 100;
    const scale = 0.3 + Math.random() * 0.5;
    const rotateX = Math.random() * 20 - 10;
    const rotateY = Math.random() * 30 - 15;

    return {
      id: i,
      x,
      y,
      z,
      scale,
      rotateX,
      rotateY,
      color: colors[i % colors.length],
      delay: Math.random() * 2,
    };
  });
};

const screenshots = generateScreenshots(100);

export function WebsiteBurstBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = (e.clientX - rect.left - centerX) / centerX;
      const y = (e.clientY - rect.top - centerY) / centerY;
      setMousePos({ x: x * 30, y: y * 30 });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY * 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Center focal point */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg) translateZ(${-scrollY}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {screenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="absolute"
            style={{
              transform: `
                translate3d(${screenshot.x + mousePos.x * (screenshot.z * 0.01)}px, 
                           ${screenshot.y + mousePos.y * (screenshot.z * 0.01)}px, 
                           ${screenshot.z - scrollY * 2}px)
                rotateX(${screenshot.rotateX}deg)
                rotateY(${screenshot.rotateY}deg)
                scale(${screenshot.scale})
              `,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Website screenshot mock */}
            <div
              className={`w-32 h-24 rounded-lg bg-gradient-to-br ${screenshot.color} shadow-lg border border-white/10 overflow-hidden`}
              style={{
                animation: `float ${3 + screenshot.delay}s ease-in-out infinite`,
                animationDelay: `${screenshot.delay}s`,
              }}
            >
              {/* Browser chrome */}
              <div className="h-3 bg-black/30 flex items-center gap-1 px-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              </div>
              {/* Content mockup */}
              <div className="p-2 space-y-1">
                <div className="h-1.5 w-3/4 bg-white/30 rounded-full" />
                <div className="h-1 w-1/2 bg-white/20 rounded-full" />
                <div className="h-4 w-full bg-white/10 rounded mt-2" />
                <div className="flex gap-1 mt-1">
                  <div className="h-3 w-1/3 bg-white/15 rounded" />
                  <div className="h-3 w-1/3 bg-white/15 rounded" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Center vignette for content readability */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
