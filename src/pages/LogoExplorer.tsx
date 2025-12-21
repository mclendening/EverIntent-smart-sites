import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Preset solid colors
const presetColors = [
  '#ffffff', '#F97316', '#3B82F6', '#22C55E', '#A855F7', 
  '#EF4444', '#06B6D4', '#EAB308', '#000000', '#6B7280'
];

interface ElementControls {
  size: number;
  weight: number;
  solidColor: string;
  hsl: { h: number; s: number; l: number };
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
}

interface StreakControls {
  length: number;
  leftThickness: number;
  rightThickness: number;
  solidColor: string;
  hsl: { h: number; s: number; l: number };
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
}

interface TaglineControls extends ElementControls {
  distanceFromStreak: number;
}

const defaultElement = (): ElementControls => ({
  size: 72,
  weight: 700,
  solidColor: '#ffffff',
  hsl: { h: 0, s: 0, l: 100 },
  useGradient: false,
  gradientFrom: '#ffffff',
  gradientTo: '#F97316',
  gradientAngle: 90,
  marginLeft: 0,
  marginRight: 0,
});

const LogoExplorer = () => {
  const [ever, setEver] = useState<ElementControls>({
    ...defaultElement(),
    solidColor: '#ffffff',
    hsl: { h: 0, s: 0, l: 100 },
  });

  const [intent, setIntent] = useState<ElementControls>({
    ...defaultElement(),
    solidColor: '#F97316',
    hsl: { h: 25, s: 95, l: 53 },
  });

  const [streak, setStreak] = useState<StreakControls>({
    length: 200,
    leftThickness: 4,
    rightThickness: 4,
    solidColor: '#F97316',
    hsl: { h: 25, s: 95, l: 53 },
    useGradient: false,
    gradientFrom: '#F97316',
    gradientTo: '#EF4444',
    gradientAngle: 90,
    marginLeft: 0,
    marginRight: 0,
  });

  const [tagline, setTagline] = useState<TaglineControls>({
    ...defaultElement(),
    size: 16,
    weight: 500,
    distanceFromStreak: 12,
  });

  const hslToHex = (h: number, s: number, l: number): string => {
    const sNorm = s / 100;
    const lNorm = l / 100;
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const getColor = (ctrl: ElementControls | StreakControls) => {
    if (ctrl.useGradient) {
      return `linear-gradient(${ctrl.gradientAngle}deg, ${ctrl.gradientFrom}, ${ctrl.gradientTo})`;
    }
    return ctrl.solidColor;
  };

  const getTextStyle = (ctrl: ElementControls): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: ctrl.size,
      fontWeight: ctrl.weight,
      marginLeft: ctrl.marginLeft,
      marginRight: ctrl.marginRight,
    };
    if (ctrl.useGradient) {
      return {
        ...base,
        background: `linear-gradient(${ctrl.gradientAngle}deg, ${ctrl.gradientFrom}, ${ctrl.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }
    return { ...base, color: ctrl.solidColor };
  };

  const ColorControls = ({ 
    ctrl, 
    setCtrl 
  }: { 
    ctrl: ElementControls | StreakControls; 
    setCtrl: (c: any) => void;
  }) => (
    <Tabs defaultValue="solid" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-7">
        <TabsTrigger value="solid" className="text-xs py-1">Solid</TabsTrigger>
        <TabsTrigger value="hsl" className="text-xs py-1">HSL</TabsTrigger>
        <TabsTrigger value="gradient" className="text-xs py-1">Gradient</TabsTrigger>
      </TabsList>
      
      <TabsContent value="solid" className="mt-2 space-y-2">
        <div className="flex flex-wrap gap-1">
          {presetColors.map((c) => (
            <button
              key={c}
              className={`w-5 h-5 rounded border ${ctrl.solidColor === c ? 'ring-2 ring-orange-500' : 'border-zinc-600'}`}
              style={{ backgroundColor: c }}
              onClick={() => setCtrl({ ...ctrl, solidColor: c, useGradient: false })}
            />
          ))}
        </div>
        <Input
          type="color"
          value={ctrl.solidColor}
          onChange={(e) => setCtrl({ ...ctrl, solidColor: e.target.value, useGradient: false })}
          className="h-7 w-full"
        />
      </TabsContent>

      <TabsContent value="hsl" className="mt-2 space-y-2">
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>H</span><span>{ctrl.hsl.h}°</span>
          </div>
          <Slider value={[ctrl.hsl.h]} max={360} onValueChange={(v) => {
            const newHsl = { ...ctrl.hsl, h: v[0] };
            setCtrl({ ...ctrl, hsl: newHsl, solidColor: hslToHex(newHsl.h, newHsl.s, newHsl.l), useGradient: false });
          }} />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>S</span><span>{ctrl.hsl.s}%</span>
          </div>
          <Slider value={[ctrl.hsl.s]} max={100} onValueChange={(v) => {
            const newHsl = { ...ctrl.hsl, s: v[0] };
            setCtrl({ ...ctrl, hsl: newHsl, solidColor: hslToHex(newHsl.h, newHsl.s, newHsl.l), useGradient: false });
          }} />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>L</span><span>{ctrl.hsl.l}%</span>
          </div>
          <Slider value={[ctrl.hsl.l]} max={100} onValueChange={(v) => {
            const newHsl = { ...ctrl.hsl, l: v[0] };
            setCtrl({ ...ctrl, hsl: newHsl, solidColor: hslToHex(newHsl.h, newHsl.s, newHsl.l), useGradient: false });
          }} />
        </div>
      </TabsContent>

      <TabsContent value="gradient" className="mt-2 space-y-2">
        <div className="flex items-center gap-2">
          <Switch checked={ctrl.useGradient} onCheckedChange={(v) => setCtrl({ ...ctrl, useGradient: v })} />
          <Label className="text-xs">Enable</Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-zinc-400">From</Label>
            <Input type="color" value={ctrl.gradientFrom} onChange={(e) => setCtrl({ ...ctrl, gradientFrom: e.target.value })} className="h-6" />
          </div>
          <div>
            <Label className="text-xs text-zinc-400">To</Label>
            <Input type="color" value={ctrl.gradientTo} onChange={(e) => setCtrl({ ...ctrl, gradientTo: e.target.value })} className="h-6" />
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-400">
            <span>Angle</span><span>{ctrl.gradientAngle}°</span>
          </div>
          <Slider value={[ctrl.gradientAngle]} max={360} onValueChange={(v) => setCtrl({ ...ctrl, gradientAngle: v[0] })} />
        </div>
      </TabsContent>
    </Tabs>
  );

  const TextElementControls = ({ 
    label, 
    ctrl, 
    setCtrl 
  }: { 
    label: string; 
    ctrl: ElementControls; 
    setCtrl: (c: ElementControls) => void;
  }) => (
    <AccordionItem value={label.toLowerCase()}>
      <AccordionTrigger className="text-sm py-2">{label}</AccordionTrigger>
      <AccordionContent className="space-y-3 pb-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Size</span><span>{ctrl.size}px</span>
            </div>
            <Slider value={[ctrl.size]} min={12} max={150} onValueChange={(v) => setCtrl({ ...ctrl, size: v[0] })} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Weight</span><span>{ctrl.weight}</span>
            </div>
            <Slider value={[ctrl.weight]} min={100} max={900} step={100} onValueChange={(v) => setCtrl({ ...ctrl, weight: v[0] })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Left</span><span>{ctrl.marginLeft}px</span>
            </div>
            <Slider value={[ctrl.marginLeft]} min={-50} max={50} onValueChange={(v) => setCtrl({ ...ctrl, marginLeft: v[0] })} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Right</span><span>{ctrl.marginRight}px</span>
            </div>
            <Slider value={[ctrl.marginRight]} min={-50} max={50} onValueChange={(v) => setCtrl({ ...ctrl, marginRight: v[0] })} />
          </div>
        </div>
        <ColorControls ctrl={ctrl} setCtrl={setCtrl} />
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="h-screen bg-zinc-900 flex overflow-hidden">
      {/* Controls Panel */}
      <div className="w-72 bg-zinc-800 border-r border-zinc-700 overflow-y-auto">
        <div className="p-3">
          <h1 className="text-sm font-bold text-zinc-300 mb-2">Logo Explorer</h1>
          
          <Accordion type="multiple" defaultValue={['ever', 'intent', 'streak', 'tagline']} className="w-full">
            <TextElementControls label="Ever" ctrl={ever} setCtrl={setEver} />
            <TextElementControls label="Intent" ctrl={intent} setCtrl={setIntent} />
            
            {/* Streak */}
            <AccordionItem value="streak">
              <AccordionTrigger className="text-sm py-2">Streak</AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Length</span><span>{streak.length}px</span>
                  </div>
                  <Slider value={[streak.length]} min={50} max={400} onValueChange={(v) => setStreak({ ...streak, length: v[0] })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Left Thick</span><span>{streak.leftThickness}px</span>
                    </div>
                    <Slider value={[streak.leftThickness]} min={1} max={20} onValueChange={(v) => setStreak({ ...streak, leftThickness: v[0] })} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Right Thick</span><span>{streak.rightThickness}px</span>
                    </div>
                    <Slider value={[streak.rightThickness]} min={1} max={20} onValueChange={(v) => setStreak({ ...streak, rightThickness: v[0] })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Left</span><span>{streak.marginLeft}px</span>
                    </div>
                    <Slider value={[streak.marginLeft]} min={-50} max={100} onValueChange={(v) => setStreak({ ...streak, marginLeft: v[0] })} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Right</span><span>{streak.marginRight}px</span>
                    </div>
                    <Slider value={[streak.marginRight]} min={-50} max={100} onValueChange={(v) => setStreak({ ...streak, marginRight: v[0] })} />
                  </div>
                </div>
                <ColorControls ctrl={streak} setCtrl={setStreak} />
              </AccordionContent>
            </AccordionItem>

            {/* Tagline */}
            <AccordionItem value="tagline">
              <AccordionTrigger className="text-sm py-2">Tagline</AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Distance from Streak</span><span>{tagline.distanceFromStreak}px</span>
                  </div>
                  <Slider value={[tagline.distanceFromStreak]} min={0} max={50} onValueChange={(v) => setTagline({ ...tagline, distanceFromStreak: v[0] })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Size</span><span>{tagline.size}px</span>
                    </div>
                    <Slider value={[tagline.size]} min={10} max={36} onValueChange={(v) => setTagline({ ...tagline, size: v[0] })} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Weight</span><span>{tagline.weight}</span>
                    </div>
                    <Slider value={[tagline.weight]} min={100} max={900} step={100} onValueChange={(v) => setTagline({ ...tagline, weight: v[0] })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Left</span><span>{tagline.marginLeft}px</span>
                    </div>
                    <Slider value={[tagline.marginLeft]} min={-50} max={100} onValueChange={(v) => setTagline({ ...tagline, marginLeft: v[0] })} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Right</span><span>{tagline.marginRight}px</span>
                    </div>
                    <Slider value={[tagline.marginRight]} min={-50} max={100} onValueChange={(v) => setTagline({ ...tagline, marginRight: v[0] })} />
                  </div>
                </div>
                <ColorControls ctrl={tagline} setCtrl={setTagline} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Logo Preview */}
      <div className="flex-1 bg-zinc-950 flex items-center justify-start pl-16">
        <div className="text-left">
          {/* Main Logo Text */}
          <div className="leading-none">
            <span style={getTextStyle(ever)}>Ever</span>
            <span style={getTextStyle(intent)}>Intent</span>
          </div>

          {/* Streak */}
          <svg 
            width={streak.length} 
            height={Math.max(streak.leftThickness, streak.rightThickness)}
            style={{ 
              marginTop: 8,
              marginLeft: streak.marginLeft, 
              marginRight: streak.marginRight,
              display: 'block'
            }}
          >
            <defs>
              {streak.useGradient && (
                <linearGradient id="streakGradient" gradientTransform={`rotate(${streak.gradientAngle - 90})`}>
                  <stop offset="0%" stopColor={streak.gradientFrom} />
                  <stop offset="100%" stopColor={streak.gradientTo} />
                </linearGradient>
              )}
            </defs>
            <polygon
              points={`0,${(Math.max(streak.leftThickness, streak.rightThickness) - streak.leftThickness) / 2} ${streak.length},${(Math.max(streak.leftThickness, streak.rightThickness) - streak.rightThickness) / 2} ${streak.length},${(Math.max(streak.leftThickness, streak.rightThickness) + streak.rightThickness) / 2} 0,${(Math.max(streak.leftThickness, streak.rightThickness) + streak.leftThickness) / 2}`}
              fill={streak.useGradient ? 'url(#streakGradient)' : streak.solidColor}
            />
          </svg>

          {/* Tagline */}
          <p style={{
            ...getTextStyle(tagline),
            marginTop: tagline.distanceFromStreak,
            display: 'block',
          }}>
            Websites That Work While You Sleep
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogoExplorer;
