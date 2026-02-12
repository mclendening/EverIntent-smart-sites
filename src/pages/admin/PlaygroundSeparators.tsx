/**
 * @fileoverview Admin Playground — Section Separator Showcase
 * Award-winning section divider patterns for premium page layouts.
 * All styles use theme design tokens exclusively.
 * Now with accent color picker for previewing different accent palettes.
 */

import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { AccentPickerBar, AccentWrapper, useAccentState } from '@/components/admin/AccentPicker';

// ─── SHOWCASE CARD ────────────────────────────────────────────

function SeparatorShowcaseCard({
  number, name, description, inspiration, children,
}: {
  number: number; name: string; description: string; inspiration: string; children: React.ReactNode;
}) {
  return (
    <Card className="border-border/50 hover:border-accent/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-baseline justify-between">
          <CardTitle className="text-lg font-semibold">
            <span className="text-accent/40 mr-2 font-mono text-sm">{String(number).padStart(2, '0')}</span>
            {name}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground/60 italic">Inspired by: {inspiration}</p>
      </CardHeader>
      <CardContent>
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <p className="text-sm text-muted-foreground text-center">Content above the separator</p>
          {children}
          <p className="text-sm text-muted-foreground text-center">Content below the separator</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── STYLES 1-18 (existing) ──────────────────────────────────

function GradientFadeSeparator() {
  return (
    <div className="relative py-4">
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.6), transparent)' }} />
    </div>
  );
}

function CenterDiamondSeparator() {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-1 h-[1px] bg-border" />
      <div className="w-3 h-3 rotate-45 shrink-0 bg-accent/60" />
      <div className="flex-1 h-[1px] bg-border" />
    </div>
  );
}

function TripleDotSeparator() {
  return (
    <div className="flex items-center justify-center gap-3 py-6">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent/40"
          whileHover={{ scale: 1.8, backgroundColor: 'hsl(var(--accent))' }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        />
      ))}
    </div>
  );
}

function GradientGlowBarSeparator() {
  return (
    <div className="relative py-6">
      <div
        className="h-[2px] w-3/4 mx-auto rounded-full"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))',
          boxShadow: '0 0 20px hsl(var(--accent-glow) / 0.3), 0 0 60px hsl(var(--accent-glow) / 0.1)',
        }}
      />
    </div>
  );
}

function WaveSVGSeparator() {
  return (
    <div className="relative -mx-8 overflow-hidden">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10">
        <path d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30" fill="none" stroke="hsl(var(--accent) / 0.25)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function StackedLinesSeparator() {
  return (
    <div className="flex flex-col items-center gap-1.5 py-4">
      <div className="h-[1px] w-1/2 bg-accent/10" />
      <div className="h-[1px] w-1/3" style={{ background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))' }} />
      <div className="h-[1px] w-1/2 bg-accent/10" />
    </div>
  );
}

function ShimmerLineSeparator() {
  return (
    <div className="relative py-4 overflow-hidden">
      <div className="h-[1px] w-full bg-border" />
      <motion.div
        className="absolute top-4 left-0 h-[1px] w-1/4"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.8), transparent)' }}
        animate={{ x: ['-25%', '125%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function BracketOrnamentSeparator() {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <span className="text-2xl text-accent/30 font-light select-none">⟨</span>
      <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))' }} />
      <div className="w-2 h-2 rounded-full bg-accent/40" />
      <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, hsl(var(--accent) / 0.3), hsl(var(--accent)))' }} />
      <span className="text-2xl text-accent/30 font-light select-none">⟩</span>
    </div>
  );
}

function DashPatternSeparator() {
  return (
    <div className="flex items-center justify-center gap-1 py-4">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="h-[2px] rounded-full"
          style={{
            width: i % 3 === 0 ? '16px' : '8px',
            background: i % 3 === 0 ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--accent) / 0.15)',
          }}
        />
      ))}
    </div>
  );
}

function BreathingPulseSeparator() {
  return (
    <div className="relative py-6 flex items-center justify-center">
      <div className="h-[1px] flex-1 bg-border" />
      <motion.div
        className="mx-4 w-3 h-3 rounded-full bg-accent"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.6, 1, 0.6],
          boxShadow: [
            '0 0 0px hsl(var(--accent-glow) / 0)',
            '0 0 20px hsl(var(--accent-glow) / 0.5)',
            '0 0 0px hsl(var(--accent-glow) / 0)',
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}

function AngledCutSeparator() {
  return (
    <div className="relative h-12 -mx-8 overflow-hidden">
      <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 40%, 100% 60%, 0 100%)', background: 'hsl(var(--accent) / 0.06)' }} />
      <div className="absolute top-1/2 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3), transparent)', transform: 'rotate(-1deg)' }} />
    </div>
  );
}

function TextDividerSeparator({ text = '§' }: { text?: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)))' }} />
      <span className="text-sm font-mono text-accent/40 select-none">{text}</span>
      <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, hsl(var(--border)), transparent)' }} />
    </div>
  );
}

function ParticleTrailSeparator() {
  return (
    <div className="relative py-4 overflow-hidden">
      <div className="h-[1px] w-full bg-border" />
      <div className="absolute top-4 left-0 right-0 flex items-center justify-around">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-accent/50"
            animate={{ y: [-2, 2, -2], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

function DoubleGradientSeparator() {
  return (
    <div className="space-y-1 py-4">
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, hsl(var(--accent) / 0.4), transparent)' }} />
      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4))' }} />
    </div>
  );
}

function ZigzagSeparator() {
  return (
    <div className="relative -mx-8 overflow-hidden py-2">
      <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="w-full h-4">
        <path
          d="M0,10 L30,0 L60,10 L90,0 L120,10 L150,0 L180,10 L210,0 L240,10 L270,0 L300,10 L330,0 L360,10 L390,0 L420,10 L450,0 L480,10 L510,0 L540,10 L570,0 L600,10 L630,0 L660,10 L690,0 L720,10 L750,0 L780,10 L810,0 L840,10 L870,0 L900,10 L930,0 L960,10 L990,0 L1020,10 L1050,0 L1080,10 L1110,0 L1140,10 L1170,0 L1200,10"
          fill="none" stroke="hsl(var(--accent) / 0.15)" strokeWidth="1"
        />
      </svg>
    </div>
  );
}

function RadiantBurstSeparator() {
  return (
    <div className="relative py-8 flex items-center justify-center">
      <motion.div
        className="absolute w-24 h-24 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(var(--accent-glow) / 0.4), transparent 70%)' }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="h-[1px] flex-1 bg-border" />
      <div className="relative mx-6">
        <motion.div
          className="w-2 h-2 rounded-full bg-accent"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}

function InkBleedSeparator() {
  return (
    <div className="relative py-4">
      <div
        className="h-[3px] w-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent 5%, hsl(var(--accent) / 0.08) 20%, hsl(var(--accent) / 0.25) 40%, hsl(var(--accent) / 0.4) 50%, hsl(var(--accent) / 0.25) 60%, hsl(var(--accent) / 0.08) 80%, transparent 95%)',
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
}

function MorseCodeSeparator() {
  const pattern = [3, 1, 1, 3, 1, 3, 1, 1, 3, 1, 1, 1, 3, 1, 3];
  return (
    <div className="flex items-center justify-center gap-[3px] py-4">
      {pattern.map((w, i) => (
        <div
          key={i}
          className="h-[2px] rounded-full"
          style={{
            width: `${w * 6}px`,
            background: w === 3 ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--accent) / 0.15)',
          }}
        />
      ))}
    </div>
  );
}

// ─── NEW STYLES 19-24 ─────────────────────────────────────────

/**
 * Style 19: Helix DNA — Two sinusoidal paths intertwining.
 * Inspired by: Biotech branding, scientific journals, Nature magazine
 */
function HelixDNASeparator() {
  return (
    <div className="relative -mx-8 overflow-hidden">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-8">
        <path d="M0,20 C100,0 200,40 300,20 C400,0 500,40 600,20 C700,0 800,40 900,20 C1000,0 1100,40 1200,20" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1.5" />
        <path d="M0,20 C100,40 200,0 300,20 C400,40 500,0 600,20 C700,40 800,0 900,20 C1000,40 1100,0 1200,20" fill="none" stroke="hsl(var(--accent) / 0.15)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Style 20: Equalizer Bars — Animated vertical bars like an audio equalizer.
 * Inspired by: Spotify, SoundCloud, music apps, audio visualizers
 */
function EqualizerSeparator() {
  return (
    <div className="flex items-end justify-center gap-[3px] py-4 h-12">
      {[...Array(24)].map((_, i) => {
        const height = 4 + Math.sin(i * 0.7) * 12;
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-accent/30"
            animate={{
              height: [height, height + 8, height],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.5,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
            style={{ height }}
          />
        );
      })}
    </div>
  );
}

/**
 * Style 21: Horizon Glow — Simulated sunset/horizon glow band.
 * Inspired by: Apple gradient wallpapers, ambient light strips, aurora effects
 */
function HorizonGlowSeparator() {
  return (
    <div className="relative py-6">
      <div
        className="h-[6px] w-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.15) 15%, hsl(var(--accent) / 0.5) 50%, hsl(var(--accent) / 0.15) 85%, transparent 100%)',
          boxShadow: '0 0 30px hsl(var(--accent-glow) / 0.2), 0 0 80px hsl(var(--accent-glow) / 0.1)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
}

/**
 * Style 22: Barcode — Series of varying-width vertical lines.
 * Inspired by: Product packaging, UPC codes, industrial design
 */
function BarcodeSeparator() {
  const bars = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 2];
  return (
    <div className="flex items-center justify-center gap-[1px] py-4">
      {bars.map((w, i) => (
        <div
          key={i}
          className="h-5 rounded-[0.5px]"
          style={{
            width: `${w}px`,
            background: `hsl(var(--accent) / ${w === 3 ? 0.35 : w === 2 ? 0.25 : 0.12})`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Style 23: Crosshair — Center crosshair target with extending lines.
 * Inspired by: Camera viewfinders, FPS games, precision instruments
 */
function CrosshairSeparator() {
  return (
    <div className="relative py-6 flex items-center justify-center">
      <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3))' }} />
      <div className="relative mx-3 w-6 h-6">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-accent/40" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-accent/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-accent/50" />
      </div>
      <div className="h-[1px] flex-1" style={{ background: 'linear-gradient(90deg, hsl(var(--accent) / 0.3), transparent)' }} />
    </div>
  );
}

/**
 * Style 24: Constellation — Dots connected by faint lines like star maps.
 * Inspired by: Star charts, network topology diagrams, D3 force graphs
 */
function ConstellationSeparator() {
  const points = [
    { x: 10, y: 15 }, { x: 25, y: 5 }, { x: 40, y: 18 }, { x: 55, y: 8 },
    { x: 70, y: 20 }, { x: 85, y: 10 }, { x: 95, y: 16 },
  ];
  return (
    <div className="relative py-2 overflow-hidden">
      <svg viewBox="0 0 100 25" preserveAspectRatio="none" className="w-full h-8">
        {points.slice(0, -1).map((p, i) => (
          <line
            key={i}
            x1={p.x} y1={p.y}
            x2={points[i + 1].x} y2={points[i + 1].y}
            stroke="hsl(var(--accent) / 0.15)"
            strokeWidth="0.3"
          />
        ))}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x} cy={p.y} r="0.8"
            fill="hsl(var(--accent) / 0.5)"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── NEW STYLES 25-30 ─────────────────────────────────────────

/** Style 25: Waveform — Audio waveform pattern */
function WaveformSeparator() {
  const heights = [4, 8, 14, 20, 12, 18, 6, 16, 10, 22, 8, 14, 20, 6, 16, 12, 8, 18, 10, 14, 22, 6, 12, 18, 8, 14, 10, 20, 6, 16];
  return (
    <div className="flex items-center justify-center gap-[2px] py-4">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full"
          style={{
            height: `${h}px`,
            background: `hsl(var(--accent) / ${0.15 + (h / 22) * 0.35})`,
          }}
        />
      ))}
    </div>
  );
}

/** Style 26: Gradient Mesh — Overlapping soft radial gradients */
function GradientMeshSeparator() {
  return (
    <div className="relative py-4 h-8 overflow-hidden">
      <div
        className="absolute left-[20%] top-1/2 -translate-y-1/2 w-24 h-8 rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--accent) / 0.6), transparent 70%)' }}
      />
      <div
        className="absolute left-[50%] top-1/2 -translate-y-1/2 w-32 h-8 rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--accent) / 0.5), transparent 70%)' }}
      />
      <div
        className="absolute left-[75%] top-1/2 -translate-y-1/2 w-20 h-8 rounded-full opacity-25"
        style={{ background: 'radial-gradient(ellipse, hsl(var(--accent-glow) / 0.5), transparent 70%)' }}
      />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-accent/10" />
    </div>
  );
}

/** Style 27: Step Notches — Evenly spaced tick marks like a ruler */
function StepNotchesSeparator() {
  return (
    <div className="relative py-4">
      <div className="h-[1px] w-full bg-accent/15" />
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-8">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className="w-[1px] bg-accent/30"
            style={{ height: i % 5 === 0 ? '12px' : '6px' }}
          />
        ))}
      </div>
    </div>
  );
}

/** Style 28: Folded Paper — CSS-only origami fold illusion */
function FoldedPaperSeparator() {
  return (
    <div className="relative h-6 -mx-8 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, transparent 48%, hsl(var(--accent) / 0.08) 48%, hsl(var(--accent) / 0.04) 52%, transparent 52%)',
        }}
      />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-accent/10" />
    </div>
  );
}

/** Style 29: Scattered Stars — Random star/sparkle points */
function ScatteredStarsSeparator() {
  const stars = [
    { x: 8, y: 40, s: 0.6 }, { x: 18, y: 20, s: 0.8 }, { x: 32, y: 55, s: 0.5 },
    { x: 45, y: 30, s: 1 }, { x: 58, y: 50, s: 0.7 }, { x: 72, y: 25, s: 0.9 },
    { x: 85, y: 45, s: 0.6 }, { x: 92, y: 35, s: 0.8 },
  ];
  return (
    <div className="relative py-2 h-10">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent"
          style={{ left: `${star.x}%`, top: `${star.y}%`, opacity: star.s * 0.5 }}
          animate={{ opacity: [star.s * 0.3, star.s * 0.7, star.s * 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-accent/5" />
    </div>
  );
}

/** Style 30: Pendulum — Swinging element in the center */
function PendulumSeparator() {
  return (
    <div className="relative py-6 flex items-center justify-center">
      <div className="h-[1px] flex-1 bg-border" />
      <div className="mx-4 relative">
        <div className="w-[1px] h-6 bg-accent/30 mx-auto" />
        <motion.div
          className="w-3 h-3 rounded-full bg-accent/50 mx-auto"
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ boxShadow: '0 0 8px hsl(var(--accent-glow) / 0.3)' }}
        />
      </div>
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────

export default function PlaygroundSeparators() {
  useAdminAuth();
  const { accent, setAccent, flipped, toggleFlip } = useAccentState();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 sm:h-16 items-center gap-4 px-4">
          <Link to="/admin/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-xl font-bold">Playground</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Section separator & divider alternatives</p>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Section Separators</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              30 award-winning section divider styles. From minimal gradient fades to animated particle
              trails and pendulum swings. Each uses the theme's accent and works in both light and dark modes.
            </p>
            <AccentPickerBar selected={accent} onChange={setAccent} flipped={flipped} onFlip={toggleFlip} />
          </div>

          <AccentWrapper accent={accent} flipped={flipped}>
            <div className="grid gap-6 lg:grid-cols-2">
              <SeparatorShowcaseCard number={1} name="Gradient Fade Line" description="Horizontal line that fades from transparent through accent and back." inspiration="Apple.com section breaks, Stripe docs">
                <GradientFadeSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={2} name="Center Diamond" description="Centered rotated square ornament flanked by hairlines." inspiration="Medium articles, Substack, The Verge">
                <CenterDiamondSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={3} name="Triple Dot" description="Three dots with spring hover. Classic typographic asterism." inspiration="Literary manuscripts, New Yorker, Kindle">
                <TripleDotSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={4} name="Gradient Glow Bar" description="Luminous gradient bar with ambient glow shadow." inspiration="Luma AI, Nothing Phone, Arc browser">
                <GradientGlowBarSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={5} name="Wave SVG" description="Sinusoidal wave path in accent color." inspiration="Awwwards SOTD wave transitions, Webflow templates">
                <WaveSVGSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={6} name="Stacked Lines" description="Three lines at different widths creating depth hierarchy." inspiration="Pentagram, Swiss typography, Bauhaus posters">
                <StackedLinesSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={7} name="Animated Shimmer" description="Traveling light beam across a hairline." inspiration="Stripe dashboard loading states, Linear">
                <ShimmerLineSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={8} name="Bracket Ornament" description="Typographic angle brackets with gradient connectors." inspiration="LaTeX documents, academic papers, Notion">
                <BracketOrnamentSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={9} name="Dash Pattern" description="Mixed-length dashes creating a rhythmic pattern." inspiration="Figma canvas guides, blueprint aesthetics">
                <DashPatternSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={10} name="Breathing Pulse" description="Center dot with meditative scale + glow animation." inspiration="Apple Watch breathing app, meditation UIs">
                <BreathingPulseSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={11} name="Angled Cut" description="Diagonal slice with subtle tint. Visual momentum." inspiration="Awwwards annual sites, Locomotive scroll sites">
                <AngledCutSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={12} name="Text Divider" description="Symbol ornament centered between fading hairlines." inspiration="Wikipedia, classic book typography">
                <TextDividerSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={13} name="Particle Trail" description="Floating dots with staggered vertical bounce." inspiration="Framer Awards 2024, WebGL particle effects">
                <ParticleTrailSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={14} name="Double Gradient" description="Two parallel lines with opposing gradient directions." inspiration="Vercel dashboard, GitHub Copilot UI">
                <DoubleGradientSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={15} name="Zigzag Pattern" description="Continuous zigzag SVG path. Playful geometric." inspiration="Mailchimp, Duolingo, creative agency sites">
                <ZigzagSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={16} name="Radiant Burst" description="Pulsing radial glow behind a center point." inspiration="Luma AI, Nothing OS, sci-fi interfaces">
                <RadiantBurstSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={17} name="Ink Bleed" description="Thick soft-focused gradient bar evoking watercolor." inspiration="Aesop packaging, Byredo, luxury editorial">
                <InkBleedSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={18} name="Morse Code" description="Dashes and dots encoding rhythm." inspiration="IBM Design Language, developer tools, terminal UIs">
                <MorseCodeSeparator />
              </SeparatorShowcaseCard>

              {/* ═══════ NEW STYLES ═══════ */}
              <div className="lg:col-span-2 pt-6 border-t border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-1">Organic & Technical Variants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  DNA helices, audio equalizers, star charts, and precision crosshairs.
                </p>
              </div>

              <SeparatorShowcaseCard number={19} name="Helix DNA" description="Two sinusoidal paths intertwining like a DNA strand." inspiration="Biotech branding, Nature magazine, scientific journals">
                <HelixDNASeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={20} name="Equalizer Bars" description="Animated vertical bars like an audio spectrum visualizer." inspiration="Spotify, SoundCloud, music production tools">
                <EqualizerSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={21} name="Horizon Glow" description="Soft ambient glow band simulating a light horizon." inspiration="Apple gradient wallpapers, ambient lighting, aurora effects">
                <HorizonGlowSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={22} name="Barcode" description="Varying-width vertical lines encoding industrial rhythm." inspiration="Product packaging, UPC codes, Dieter Rams">
                <BarcodeSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={23} name="Crosshair" description="Center crosshair target with extending guide lines." inspiration="Camera viewfinders, precision instruments, FPS HUDs">
                <CrosshairSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={24} name="Constellation" description="Dots connected by faint lines like a star chart." inspiration="Star maps, D3 force graphs, network topology">
                <ConstellationSeparator />
              </SeparatorShowcaseCard>

              {/* ═══════ NEW STYLES 25-30 ═══════ */}
              <div className="lg:col-span-2 pt-6 border-t border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-1">Playful & Physical Variants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Audio waveforms, gradient meshes, ruler notches, origami folds, and pendulums.
                </p>
              </div>

              <SeparatorShowcaseCard number={25} name="Waveform" description="Audio waveform-style vertical bars at varying heights." inspiration="Podcast players, Spotify waveform, voice memo UIs">
                <WaveformSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={26} name="Gradient Mesh" description="Overlapping soft radial gradients creating an ambient mesh." inspiration="Apple mesh gradients, iOS wallpapers, Figma">
                <GradientMeshSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={27} name="Step Notches" description="Ruler-style tick marks at regular intervals along a hairline." inspiration="Measurement UIs, scientific instruments, Dieter Rams">
                <StepNotchesSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={28} name="Folded Paper" description="CSS origami fold illusion creating depth across the page." inspiration="Paper craft UIs, Material Design, greeting cards">
                <FoldedPaperSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={29} name="Scattered Stars" description="Random twinkling star points with animated opacity." inspiration="Space themes, constellation maps, night sky apps">
                <ScatteredStarsSeparator />
              </SeparatorShowcaseCard>

              <SeparatorShowcaseCard number={30} name="Pendulum" description="Swinging element hanging from a vertical line. Kinetic energy." inspiration="Physics simulations, Newton's cradle, clock pendulums">
                <PendulumSeparator />
              </SeparatorShowcaseCard>
            </div>
          </AccentWrapper>
        </div>
      </main>
    </div>
  );
}
