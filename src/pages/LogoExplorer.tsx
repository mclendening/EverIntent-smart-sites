import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LogoVariation {
  id: number;
  everColor: string; // actual CSS color value
  intentColor: string; // actual CSS color value
  streakStyle: string;
  taglineStyle: string;
  description: string;
}

// Helper to convert Tailwind-style colors to actual values
const colors = {
  white: "#ffffff",
  cyan: "hsl(200,100%,50%)",
  deepNavy: "hsl(220,80%,35%)",
  teal: "hsl(175,70%,45%)",
  cobalt: "hsl(225,85%,55%)",
  oceanBlue: "hsl(210,100%,50%)",
  gold: "#f59e0b",
  cyanTealBlend: "hsl(188,85%,48%)",
  cobaltCyanBlend: "hsl(212,90%,53%)",
  steelBlue: "hsl(215,70%,50%)",
  royalBlue: "hsl(230,70%,50%)",
  indigo: "hsl(240,60%,55%)",
  emerald: "hsl(160,70%,45%)",
  mint: "hsl(150,60%,50%)",
  coral: "hsl(15,80%,55%)",
  rose: "hsl(350,70%,55%)",
  purple: "hsl(270,70%,55%)",
  violet: "hsl(280,60%,50%)",
  lavender: "hsl(260,50%,60%)",
  sky: "hsl(195,90%,55%)",
  aqua: "hsl(185,80%,50%)",
  lime: "hsl(80,70%,45%)",
  warmGray: "hsl(30,10%,70%)",
  coolGray: "hsl(210,10%,70%)",
  silver: "hsl(0,0%,75%)",
  bronze: "hsl(30,50%,45%)",
  copper: "hsl(20,60%,50%)",
  crimson: "hsl(345,80%,45%)",
  sapphire: "hsl(220,90%,45%)",
  turquoise: "hsl(175,80%,50%)",
  azure: "hsl(210,100%,60%)",
  electric: "hsl(190,100%,50%)",
};

const LogoExplorer = () => {
  const variations: LogoVariation[] = [
    // Classic Dual Color with different Intent blues
    { id: 1, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Current: Cyan + Gold gradient" },
    { id: 2, everColor: colors.white, intentColor: colors.deepNavy, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Deep Navy + Gold gradient" },
    { id: 3, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Teal + Gold gradient" },
    { id: 4, everColor: colors.white, intentColor: colors.cobalt, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Electric Cobalt + Gold gradient" },
    { id: 5, everColor: colors.white, intentColor: colors.oceanBlue, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Ocean Blue + Gold gradient" },
    
    // Solid streaks instead of gradients
    { id: 6, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Cyan + Solid gold streak" },
    { id: 7, everColor: colors.white, intentColor: colors.deepNavy, streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Deep Navy + Solid gold streak" },
    { id: 8, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Teal + Solid gold streak" },
    
    // Blue/Teal streaks matching Intent color
    { id: 9, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Cyan + Matching cyan streak" },
    { id: 10, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-[hsl(175,70%,45%)] to-[hsl(175,70%,45%)]/30", taglineStyle: "text-gray-400", description: "Teal + Matching teal streak" },
    { id: 11, everColor: colors.white, intentColor: colors.cobalt, streakStyle: "bg-gradient-to-r from-[hsl(225,85%,55%)] to-[hsl(225,85%,55%)]/30", taglineStyle: "text-gray-400", description: "Cobalt + Matching cobalt streak" },
    
    // Single color EverIntent (all white)
    { id: 12, everColor: colors.white, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All white + Gold gradient streak" },
    { id: 13, everColor: colors.white, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "All white + Cyan gradient streak" },
    { id: 14, everColor: colors.white, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-[hsl(175,70%,45%)] to-[hsl(175,70%,45%)]/30", taglineStyle: "text-gray-400", description: "All white + Teal gradient streak" },
    
    // Single color EverIntent (all colored)
    { id: 15, everColor: colors.cyan, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All Cyan + Gold gradient streak" },
    { id: 16, everColor: colors.teal, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All Teal + Gold gradient streak" },
    { id: 17, everColor: colors.gold, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "All Gold + White gradient streak" },
    
    // Color blends
    { id: 18, everColor: colors.white, intentColor: colors.cyanTealBlend, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Cyan-Teal blend + Gold gradient" },
    { id: 19, everColor: colors.white, intentColor: colors.cobaltCyanBlend, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Cobalt-Cyan blend + Gold gradient" },
    { id: 20, everColor: colors.white, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Gold Intent + Cyan streak" },
    
    // Colored taglines
    { id: 21, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-[hsl(200,100%,50%)]/60", description: "Cyan Intent + Cyan tinted tagline" },
    { id: 22, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-[hsl(175,70%,45%)]/60", description: "Teal Intent + Teal tinted tagline" },
    { id: 23, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-amber-500/60", description: "Cyan Intent + Gold tinted tagline" },
    
    // Premium darker blues
    { id: 24, everColor: colors.white, intentColor: colors.steelBlue, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Steel Blue + Gold gradient" },
    { id: 25, everColor: colors.white, intentColor: colors.royalBlue, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Royal Blue + Gold gradient" },
    { id: 26, everColor: colors.white, intentColor: colors.indigo, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Indigo + Gold gradient" },
    
    // Green/Emerald variations (trust/growth)
    { id: 27, everColor: colors.white, intentColor: colors.emerald, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Emerald + Gold gradient" },
    { id: 28, everColor: colors.white, intentColor: colors.mint, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Mint + Gold gradient" },
    
    // Warm accent colors
    { id: 29, everColor: colors.white, intentColor: colors.coral, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Coral + Gold gradient" },
    { id: 30, everColor: colors.white, intentColor: colors.rose, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Rose + Gold gradient" },
    
    // Purple/Violet (creativity/innovation)
    { id: 31, everColor: colors.white, intentColor: colors.purple, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Purple + Gold gradient" },
    { id: 32, everColor: colors.white, intentColor: colors.violet, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Violet + Gold gradient" },
    { id: 33, everColor: colors.white, intentColor: colors.lavender, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Lavender + Gold gradient" },
    
    // Light blues/aquas
    { id: 34, everColor: colors.white, intentColor: colors.sky, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Sky Blue + Gold gradient" },
    { id: 35, everColor: colors.white, intentColor: colors.aqua, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Aqua + Gold gradient" },
    
    // Fresh greens
    { id: 36, everColor: colors.white, intentColor: colors.lime, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Lime + Gold gradient" },
    
    // Neutral/Metallic
    { id: 37, everColor: colors.white, intentColor: colors.warmGray, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Warm Gray + Gold gradient" },
    { id: 38, everColor: colors.white, intentColor: colors.coolGray, streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Cool Gray + Cyan gradient" },
    { id: 39, everColor: colors.white, intentColor: colors.silver, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Silver + Gold gradient" },
    { id: 40, everColor: colors.white, intentColor: colors.bronze, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Bronze + Gold gradient" },
    { id: 41, everColor: colors.white, intentColor: colors.copper, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Copper + Gold gradient" },
    
    // Monochrome variations
    { id: 42, everColor: colors.cyan, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Cyan Ever + White Intent" },
    { id: 43, everColor: colors.teal, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Teal Ever + White Intent" },
    { id: 44, everColor: colors.gold, intentColor: colors.white, streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Gold Ever + White Intent" },
    
    // High contrast combos
    { id: 45, everColor: colors.cyan, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Cyan Ever + Gold Intent + White streak" },
    { id: 46, everColor: colors.teal, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Teal Ever + Gold Intent + White streak" },
    { id: 47, everColor: colors.gold, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Gold Ever + Cyan Intent + White streak" },
    
    // Premium blues
    { id: 48, everColor: colors.white, intentColor: colors.crimson, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Crimson + Gold gradient" },
    { id: 49, everColor: colors.white, intentColor: colors.sapphire, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Sapphire + Gold gradient" },
    { id: 50, everColor: colors.white, intentColor: colors.turquoise, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Turquoise + Gold gradient" },
    
    // Electric/Bright
    { id: 51, everColor: colors.white, intentColor: colors.azure, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Azure + Gold gradient" },
    { id: 52, everColor: colors.white, intentColor: colors.electric, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Electric Blue + Gold gradient" },
    
    // Multi-streak colors
    { id: 53, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-purple-500 to-purple-500/30", taglineStyle: "text-gray-400", description: "Cyan + Purple gradient streak" },
    { id: 54, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-rose-500 to-rose-500/30", taglineStyle: "text-gray-400", description: "Cyan + Rose gradient streak" },
    { id: 55, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-emerald-500 to-emerald-500/30", taglineStyle: "text-gray-400", description: "Cyan + Emerald gradient streak" },
    
    // Duo-tone streaks
    { id: 56, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 via-rose-500 to-rose-500/30", taglineStyle: "text-gray-400", description: "Cyan + Gold→Rose gradient" },
    { id: 57, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-amber-500 via-purple-500 to-purple-500/30", taglineStyle: "text-gray-400", description: "Teal + Gold→Purple gradient" },
    { id: 58, everColor: colors.white, intentColor: colors.cobalt, streakStyle: "bg-gradient-to-r from-amber-500 via-cyan-500 to-cyan-500/30", taglineStyle: "text-gray-400", description: "Cobalt + Gold→Cyan gradient" },
    
    // Inverse tagline treatments
    { id: 59, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-white/80", description: "Cyan + Bright white tagline" },
    { id: 60, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-amber-500/80", description: "Cyan + Gold tagline" },
    
    // Extra premium combinations
    { id: 61, everColor: colors.sapphire, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Sapphire Ever + Gold Intent" },
    { id: 62, everColor: colors.emerald, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Emerald Ever + Gold Intent" },
    { id: 63, everColor: colors.purple, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Purple Ever + Gold Intent" },
    { id: 64, everColor: colors.rose, intentColor: colors.gold, streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "Rose Ever + Gold Intent" },
    
    // Subtle variations
    { id: 65, everColor: colors.white, intentColor: colors.sky, streakStyle: "bg-gradient-to-r from-sky-400 to-sky-400/30", taglineStyle: "text-gray-400", description: "Sky + Matching sky streak" },
    { id: 66, everColor: colors.white, intentColor: colors.emerald, streakStyle: "bg-gradient-to-r from-emerald-500 to-emerald-500/30", taglineStyle: "text-gray-400", description: "Emerald + Matching emerald streak" },
    { id: 67, everColor: colors.white, intentColor: colors.purple, streakStyle: "bg-gradient-to-r from-purple-500 to-purple-500/30", taglineStyle: "text-gray-400", description: "Purple + Matching purple streak" },
    { id: 68, everColor: colors.white, intentColor: colors.rose, streakStyle: "bg-gradient-to-r from-rose-500 to-rose-500/30", taglineStyle: "text-gray-400", description: "Rose + Matching rose streak" },
    
    // Accent taglines with matching streaks
    { id: 69, everColor: colors.white, intentColor: colors.cyan, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-white", description: "Cyan + White tagline" },
    { id: 70, everColor: colors.white, intentColor: colors.teal, streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-white", description: "Teal + White tagline" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <span className="text-xl font-display font-bold tracking-tight">
              <span style={{ color: colors.white }}>Ever</span>
              <span style={{ color: colors.cyan }}>Intent</span>
            </span>
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-display font-bold mb-2">Logo Color Explorer</h1>
        <p className="text-muted-foreground mb-8">Click on any variation you like and let me know the number!</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {variations.map((v) => (
            <div 
              key={v.id}
              id={`variation-${v.id}`}
              className="group relative p-6 rounded-xl bg-[hsl(220,20%,12%)] border border-border/30 hover:border-amber-500/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              {/* ID Badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl font-bold text-gray-500 group-hover:text-amber-500 transition-colors">
                  #{v.id}
                </span>
              </div>
              
              {/* Logo Preview - Using inline styles for guaranteed alignment */}
              <div className="flex flex-col items-start mb-4">
                <span className="text-2xl font-display font-bold tracking-tight">
                  <span style={{ color: v.everColor }}>Ever</span>
                  <span style={{ color: v.intentColor }}>Intent</span>
                </span>
                <div 
                  className={`h-1 w-full mt-2 ${v.streakStyle}`} 
                  style={{ clipPath: 'polygon(0 15%, 100% 40%, 100% 60%, 0 85%)' }}
                />
                <span className={`text-xs font-normal tracking-wide leading-tight mt-2 ${v.taglineStyle}`}>
                  Web Design & Automation
                </span>
              </div>
              
              {/* Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {v.description}
              </p>
              
              {/* Hover indicator */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-amber-500/0 group-hover:ring-amber-500/30 transition-all duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoExplorer;
