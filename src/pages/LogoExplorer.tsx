import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface LogoVariation {
  id: number;
  everColor: string;
  intentColor: string;
  streakStyle: string;
  taglineStyle: string;
  description: string;
}

const LogoExplorer = () => {
  const variations: LogoVariation[] = [
    // Classic Dual Color with different Intent blues
    { id: 1, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Current: Cyan + Gold gradient" },
    { id: 2, everColor: "text-white", intentColor: "text-[hsl(220,80%,35%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Deep Navy + Gold gradient" },
    { id: 3, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Teal + Gold gradient" },
    { id: 4, everColor: "text-white", intentColor: "text-[hsl(225,85%,55%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Electric Cobalt + Gold gradient" },
    { id: 5, everColor: "text-white", intentColor: "text-[hsl(210,100%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Ocean Blue + Gold gradient" },
    
    // Solid streaks instead of gradients
    { id: 6, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Cyan + Solid gold streak" },
    { id: 7, everColor: "text-white", intentColor: "text-[hsl(220,80%,35%)]", streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Deep Navy + Solid gold streak" },
    { id: 8, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-amber-500", taglineStyle: "text-gray-400", description: "Teal + Solid gold streak" },
    
    // Blue/Teal streaks matching Intent color
    { id: 9, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Cyan + Matching cyan streak" },
    { id: 10, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(175,70%,45%)] to-[hsl(175,70%,45%)]/30", taglineStyle: "text-gray-400", description: "Teal + Matching teal streak" },
    { id: 11, everColor: "text-white", intentColor: "text-[hsl(225,85%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(225,85%,55%)] to-[hsl(225,85%,55%)]/30", taglineStyle: "text-gray-400", description: "Cobalt + Matching cobalt streak" },
    
    // Single color EverIntent (all white)
    { id: 12, everColor: "text-white", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All white + Gold gradient streak" },
    { id: 13, everColor: "text-white", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "All white + Cyan gradient streak" },
    { id: 14, everColor: "text-white", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-[hsl(175,70%,45%)] to-[hsl(175,70%,45%)]/30", taglineStyle: "text-gray-400", description: "All white + Teal gradient streak" },
    
    // Single color EverIntent (all colored)
    { id: 15, everColor: "text-[hsl(200,100%,50%)]", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All Cyan + Gold gradient streak" },
    { id: 16, everColor: "text-[hsl(175,70%,45%)]", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "All Teal + Gold gradient streak" },
    { id: 17, everColor: "text-amber-500", intentColor: "text-amber-500", streakStyle: "bg-gradient-to-r from-white to-white/30", taglineStyle: "text-gray-400", description: "All Gold + White gradient streak" },
    
    // Gradient text on Intent
    { id: 18, everColor: "text-white", intentColor: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(175,70%,45%)] bg-clip-text text-transparent", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "White + Cyan→Teal gradient Intent" },
    { id: 19, everColor: "text-white", intentColor: "bg-gradient-to-r from-[hsl(225,85%,55%)] to-[hsl(200,100%,50%)] bg-clip-text text-transparent", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "White + Cobalt→Cyan gradient Intent" },
    { id: 20, everColor: "text-white", intentColor: "bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "White + Gold gradient Intent + Cyan streak" },
    
    // Colored taglines
    { id: 21, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-[hsl(200,100%,50%)]/60", description: "Cyan Intent + Cyan tinted tagline" },
    { id: 22, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-[hsl(175,70%,45%)]/60", description: "Teal Intent + Teal tinted tagline" },
    { id: 23, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-amber-500/60", description: "Cyan Intent + Gold tinted tagline" },
    
    // Premium darker blues
    { id: 24, everColor: "text-white", intentColor: "text-[hsl(215,70%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Steel Blue + Gold gradient" },
    { id: 25, everColor: "text-white", intentColor: "text-[hsl(230,70%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Royal Blue + Gold gradient" },
    { id: 26, everColor: "text-white", intentColor: "text-[hsl(240,60%,55%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Indigo + Gold gradient" },
    
    // Green/Emerald variations (trust/growth)
    { id: 27, everColor: "text-white", intentColor: "text-[hsl(160,70%,45%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Emerald + Gold gradient" },
    { id: 28, everColor: "text-white", intentColor: "text-[hsl(150,60%,50%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Mint + Gold gradient" },
    
    // No streak variations
    { id: 29, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "hidden", taglineStyle: "text-gray-400 border-t border-gray-600 pt-1", description: "Cyan, no streak, line tagline" },
    { id: 30, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "hidden", taglineStyle: "text-gray-400", description: "Teal, no streak" },
    
    // Purple/Violet (creative/innovation)
    { id: 31, everColor: "text-white", intentColor: "text-[hsl(270,70%,60%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Violet + Gold gradient" },
    { id: 32, everColor: "text-white", intentColor: "text-[hsl(280,60%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(280,60%,55%)] to-amber-500", taglineStyle: "text-gray-400", description: "Purple + Purple→Gold streak" },
    
    // Inverted: Colored Ever, White Intent
    { id: 33, everColor: "text-[hsl(200,100%,50%)]", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Cyan Ever + White Intent" },
    { id: 34, everColor: "text-[hsl(175,70%,45%)]", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Teal Ever + White Intent" },
    { id: 35, everColor: "text-amber-500", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] to-[hsl(200,100%,50%)]/30", taglineStyle: "text-gray-400", description: "Gold Ever + White Intent + Cyan streak" },
    
    // Multi-color streaks
    { id: 36, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] via-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Cyan + Cyan→Gold streak" },
    { id: 37, everColor: "text-white", intentColor: "text-[hsl(175,70%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(175,70%,45%)] via-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Teal + Teal→Gold streak" },
    { id: 38, everColor: "text-white", intentColor: "text-[hsl(225,85%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(225,85%,55%)] via-[hsl(200,100%,50%)] to-amber-500", taglineStyle: "text-gray-400", description: "Cobalt + Rainbow streak" },
    
    // Lighter/brighter variations
    { id: 39, everColor: "text-white", intentColor: "text-[hsl(190,100%,60%)]", streakStyle: "bg-gradient-to-r from-amber-400 to-amber-400/30", taglineStyle: "text-gray-400", description: "Bright Cyan + Light gold" },
    { id: 40, everColor: "text-white", intentColor: "text-[hsl(185,80%,55%)]", streakStyle: "bg-gradient-to-r from-amber-500 to-amber-500/30", taglineStyle: "text-gray-400", description: "Aqua + Gold gradient" },
    
    // ===== NEW: EverIntent.com Inspired Teal Family =====
    // Dark Teal from everintent.com (~170 45% 35%)
    { id: 41, everColor: "text-white", intentColor: "text-[hsl(170,45%,40%)]", streakStyle: "bg-gradient-to-r from-[hsl(170,45%,40%)] to-[hsl(170,45%,40%)]/30", taglineStyle: "text-gray-400", description: "EverIntent Teal + Matching streak" },
    { id: 42, everColor: "text-white", intentColor: "text-[hsl(170,45%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(165,50%,50%)] to-[hsl(175,40%,35%)]", taglineStyle: "text-gray-400", description: "EverIntent Teal + Teal family gradient" },
    { id: 43, everColor: "text-white", intentColor: "text-[hsl(165,50%,45%)]", streakStyle: "bg-[hsl(170,45%,40%)]", taglineStyle: "text-[hsl(170,45%,40%)]/60", description: "EverIntent Teal + Solid streak + Teal tagline" },
    
    // Teal-only family streaks (no mixing)
    { id: 44, everColor: "text-white", intentColor: "text-[hsl(175,60%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(180,55%,50%)] to-[hsl(170,50%,35%)]", taglineStyle: "text-gray-400", description: "Teal + Teal→Dark Teal gradient" },
    { id: 45, everColor: "text-white", intentColor: "text-[hsl(180,50%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(185,55%,55%)] to-[hsl(175,45%,40%)]", taglineStyle: "text-gray-400", description: "Light Teal + Teal family streak" },
    { id: 46, everColor: "text-[hsl(170,45%,45%)]", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-[hsl(170,45%,45%)] to-[hsl(175,40%,35%)]", taglineStyle: "text-gray-400", description: "Teal Ever + White Intent (inverted)" },
    
    // Blue-only family streaks
    { id: 47, everColor: "text-white", intentColor: "text-[hsl(210,80%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(220,75%,60%)] to-[hsl(200,85%,45%)]", taglineStyle: "text-gray-400", description: "Blue + Blue family gradient streak" },
    { id: 48, everColor: "text-white", intentColor: "text-[hsl(215,85%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(225,80%,55%)] to-[hsl(205,80%,40%)]", taglineStyle: "text-gray-400", description: "Azure + Navy→Sky gradient" },
    { id: 49, everColor: "text-white", intentColor: "text-[hsl(220,75%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(210,80%,60%)] to-[hsl(230,70%,40%)]", taglineStyle: "text-[hsl(220,75%,50%)]/60", description: "Royal Blue + Blue streak + Blue tagline" },
    
    // Gold-only family streaks
    { id: 50, everColor: "text-white", intentColor: "text-amber-400", streakStyle: "bg-gradient-to-r from-amber-300 to-amber-600", taglineStyle: "text-gray-400", description: "Gold Intent + Gold family streak" },
    { id: 51, everColor: "text-white", intentColor: "text-[hsl(40,90%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(45,95%,60%)] to-[hsl(35,85%,45%)]", taglineStyle: "text-amber-500/60", description: "Bright Gold + Gold gradient + Gold tagline" },
    { id: 52, everColor: "text-amber-400", intentColor: "text-amber-500", streakStyle: "bg-gradient-to-r from-amber-400 to-amber-600", taglineStyle: "text-gray-400", description: "All Gold family - Light→Dark" },
    
    // Cyan-only family streaks
    { id: 53, everColor: "text-white", intentColor: "text-[hsl(190,90%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(195,85%,55%)] to-[hsl(185,80%,40%)]", taglineStyle: "text-gray-400", description: "Cyan + Cyan family streak" },
    { id: 54, everColor: "text-white", intentColor: "text-[hsl(195,85%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(200,90%,60%)] to-[hsl(190,80%,45%)]", taglineStyle: "text-[hsl(195,85%,55%)]/60", description: "Light Cyan + Cyan streak + Cyan tagline" },
    { id: 55, everColor: "text-[hsl(190,85%,50%)]", intentColor: "text-[hsl(195,90%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(195,85%,55%)] to-[hsl(185,80%,40%)]", taglineStyle: "text-gray-400", description: "All Cyan family" },
    
    // Purple-only family streaks
    { id: 56, everColor: "text-white", intentColor: "text-[hsl(270,65%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(280,60%,60%)] to-[hsl(260,70%,45%)]", taglineStyle: "text-gray-400", description: "Violet + Purple family streak" },
    { id: 57, everColor: "text-white", intentColor: "text-[hsl(265,70%,60%)]", streakStyle: "bg-gradient-to-r from-[hsl(275,65%,65%)] to-[hsl(255,75%,50%)]", taglineStyle: "text-[hsl(265,70%,60%)]/60", description: "Lavender + Purple streak + Purple tagline" },
    
    // Emerald/Green-only family streaks
    { id: 58, everColor: "text-white", intentColor: "text-[hsl(155,65%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(160,60%,50%)] to-[hsl(150,70%,35%)]", taglineStyle: "text-gray-400", description: "Emerald + Green family streak" },
    { id: 59, everColor: "text-white", intentColor: "text-[hsl(150,60%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(155,55%,55%)] to-[hsl(145,65%,40%)]", taglineStyle: "text-[hsl(150,60%,50%)]/60", description: "Mint + Green streak + Green tagline" },
    
    // White text with colored taglines (clean look)
    { id: 60, everColor: "text-white", intentColor: "text-white", streakStyle: "bg-gradient-to-r from-[hsl(170,45%,45%)] to-[hsl(175,40%,35%)]", taglineStyle: "text-[hsl(170,45%,45%)]", description: "All white + EverIntent teal streak + Teal tagline" },
    
    // ===== NEW: Color→Fade streaks (tapered) with matching taglines =====
    // EverIntent Teal → Fade out
    { id: 61, everColor: "text-white", intentColor: "text-[hsl(170,45%,45%)]", streakStyle: "bg-gradient-to-r from-[hsl(170,45%,45%)] via-[hsl(170,35%,65%)] to-transparent", taglineStyle: "text-[hsl(170,25%,75%)]", description: "EverIntent Teal → Fade taper" },
    { id: 62, everColor: "text-white", intentColor: "text-[hsl(175,50%,40%)]", streakStyle: "bg-gradient-to-r from-[hsl(175,50%,40%)] via-[hsl(175,40%,60%)] to-transparent", taglineStyle: "text-[hsl(175,30%,70%)]", description: "Deep Teal → Fade taper" },
    
    // Cyan → Fade out
    { id: 63, everColor: "text-white", intentColor: "text-[hsl(190,90%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(190,90%,50%)] via-[hsl(190,60%,70%)] to-transparent", taglineStyle: "text-[hsl(190,40%,75%)]", description: "Cyan → Fade taper" },
    { id: 64, everColor: "text-white", intentColor: "text-[hsl(195,85%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(195,85%,50%)] via-[hsl(195,55%,68%)] to-transparent", taglineStyle: "text-[hsl(195,35%,73%)]", description: "Light Cyan → Fade taper" },
    
    // Ocean Blue → Fade out
    { id: 65, everColor: "text-white", intentColor: "text-[hsl(200,100%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(200,100%,50%)] via-[hsl(200,65%,70%)] to-transparent", taglineStyle: "text-[hsl(200,40%,75%)]", description: "Ocean Blue → Fade taper" },
    
    // Azure → Fade out
    { id: 66, everColor: "text-white", intentColor: "text-[hsl(210,80%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(210,80%,55%)] via-[hsl(210,50%,72%)] to-transparent", taglineStyle: "text-[hsl(210,35%,76%)]", description: "Azure → Fade taper" },
    
    // Steel Blue → Fade out
    { id: 67, everColor: "text-white", intentColor: "text-[hsl(215,70%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(215,70%,50%)] via-[hsl(215,45%,68%)] to-transparent", taglineStyle: "text-[hsl(215,30%,74%)]", description: "Steel Blue → Fade taper" },
    
    // Royal Blue → Fade out
    { id: 68, everColor: "text-white", intentColor: "text-[hsl(220,75%,50%)]", streakStyle: "bg-gradient-to-r from-[hsl(220,75%,50%)] via-[hsl(220,48%,70%)] to-transparent", taglineStyle: "text-[hsl(220,32%,75%)]", description: "Royal Blue → Fade taper" },
    
    // Cobalt → Fade out
    { id: 69, everColor: "text-white", intentColor: "text-[hsl(225,85%,55%)]", streakStyle: "bg-gradient-to-r from-[hsl(225,85%,55%)] via-[hsl(225,55%,72%)] to-transparent", taglineStyle: "text-[hsl(225,38%,76%)]", description: "Cobalt → Fade taper" },
    
    // Deep Navy → Fade out
    { id: 70, everColor: "text-white", intentColor: "text-[hsl(220,80%,35%)]", streakStyle: "bg-gradient-to-r from-[hsl(220,80%,35%)] via-[hsl(220,50%,58%)] to-transparent", taglineStyle: "text-[hsl(220,35%,68%)]", description: "Deep Navy → Fade taper" },
  ];

  return (
    <div className="min-h-screen bg-[hsl(222,47%,7%)] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-2">Logo Color Explorer</h1>
        <p className="text-gray-400 mb-8">Click on any variation you like and let me know the number!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {variations.map((v) => (
            <div 
              key={v.id}
              className="bg-[hsl(222,47%,10%)] rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl font-bold text-gray-500 group-hover:text-amber-500 transition-colors">
                  #{v.id}
                </span>
              </div>
              
              {/* Logo Preview */}
              <div className="flex flex-col items-start mb-4">
                <p className="text-2xl font-display font-bold tracking-tight leading-none m-0 p-0">
                  <span className={`${v.everColor}`} style={{ lineHeight: 1 }}>Ever</span><span className={`${v.intentColor}`} style={{ lineHeight: 1 }}>Intent</span>
                </p>
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
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-[hsl(222,47%,10%)] rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Color Theory Notes:</h2>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>• <strong className="text-amber-500">Gold/Amber</strong> = Premium, Success, Warmth, Trust</li>
            <li>• <strong className="text-[hsl(200,100%,50%)]">Cyan/Aqua</strong> = Modern Tech, Digital, Fresh</li>
            <li>• <strong className="text-[hsl(175,70%,45%)]">Teal</strong> = Professional, Calm, Sophisticated</li>
            <li>• <strong className="text-[hsl(170,45%,45%)]">EverIntent Teal</strong> = Brand colors from everintent.com</li>
            <li>• <strong className="text-[hsl(225,85%,55%)]">Cobalt</strong> = Bold, Innovative, Trustworthy</li>
            <li>• <strong className="text-[hsl(220,80%,35%)]">Navy</strong> = Premium, Corporate, Established</li>
            <li>• <strong className="text-[hsl(270,70%,60%)]">Violet</strong> = Creative, Unique, Visionary</li>
            <li>• <strong className="text-[hsl(155,65%,45%)]">Emerald</strong> = Growth, Success, Balance</li>
          </ul>
          
          <h3 className="text-lg font-bold mt-6 mb-2 text-amber-500">Design Rule Applied:</h3>
          <p className="text-gray-400 text-sm">
            #41-60 keep colors in the same family for gradients (no blue+gold, green+gold mixing). 
            Each streak uses shades within its color family for harmonious design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoExplorer;
