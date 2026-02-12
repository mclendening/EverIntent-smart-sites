/**
 * @fileoverview Admin Playground — Section Separator Showcase
 * Award-winning section divider patterns for premium page layouts.
 * All styles use theme design tokens exclusively.
 */

import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// ─── SHOWCASE CARD ────────────────────────────────────────────

function SeparatorShowcaseCard({
  number,
  name,
  description,
  inspiration,
  children,
}: {
  number: number;
  name: string;
  description: string;
  inspiration: string;
  children: React.ReactNode;
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

// ─── STYLE 1: Gradient Fade Line ─────────────────────────────

function GradientFadeSeparator() {
  return (
    <div className="relative py-4">
      <div
        className="h-[1px] w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.6), transparent)',
        }}
      />
    </div>
  );
}

// ─── STYLE 2: Center Diamond ─────────────────────────────────

function CenterDiamondSeparator() {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex-1 h-[1px] bg-border" />
      <div
        className="w-3 h-3 rotate-45 shrink-0"
        style={{ background: 'var(--gradient-text)' }}
      />
      <div className="flex-1 h-[1px] bg-border" />
    </div>
  );
}

// ─── STYLE 3: Triple Dot ─────────────────────────────────────

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

// ─── STYLE 4: Gradient Glow Bar ──────────────────────────────

function GradientGlowBarSeparator() {
  return (
    <div className="relative py-6">
      <div
        className="h-[2px] w-3/4 mx-auto rounded-full"
        style={{
          background: 'var(--gradient-text)',
          boxShadow: '0 0 20px hsl(var(--accent-glow) / 0.3), 0 0 60px hsl(var(--accent-glow) / 0.1)',
        }}
      />
    </div>
  );
}

// ─── STYLE 5: Wave SVG ───────────────────────────────────────

function WaveSVGSeparator() {
  return (
    <div className="relative -mx-8 overflow-hidden">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30"
          fill="none"
          stroke="hsl(var(--accent) / 0.25)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

// ─── STYLE 6: Stacked Lines ──────────────────────────────────

function StackedLinesSeparator() {
  return (
    <div className="flex flex-col items-center gap-1.5 py-4">
      <div className="h-[1px] w-1/2 bg-accent/10" />
      <div className="h-[1px] w-1/3" style={{ background: 'var(--gradient-text)' }} />
      <div className="h-[1px] w-1/2 bg-accent/10" />
    </div>
  );
}

// ─── STYLE 7: Animated Shimmer Line ──────────────────────────

function ShimmerLineSeparator() {
  return (
    <div className="relative py-4 overflow-hidden">
      <div className="h-[1px] w-full bg-border" />
      <motion.div
        className="absolute top-4 left-0 h-[1px] w-1/4"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.8), transparent)',
        }}
        animate={{ x: ['-25%', '125%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── STYLE 8: Bracket Ornament ───────────────────────────────

function BracketOrnamentSeparator() {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <span className="text-2xl text-accent/30 font-light select-none">⟨</span>
      <div
        className="h-[1px] w-16"
        style={{ background: 'var(--gradient-text)' }}
      />
      <div className="w-2 h-2 rounded-full bg-accent/40" />
      <div
        className="h-[1px] w-16"
        style={{ background: 'var(--gradient-text)' }}
      />
      <span className="text-2xl text-accent/30 font-light select-none">⟩</span>
    </div>
  );
}

// ─── STYLE 9: Dash Pattern ───────────────────────────────────

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

// ─── STYLE 10: Breathing Pulse ───────────────────────────────

function BreathingPulseSeparator() {
  return (
    <div className="relative py-6 flex items-center justify-center">
      <div className="h-[1px] flex-1 bg-border" />
      <motion.div
        className="mx-4 w-3 h-3 rounded-full"
        style={{ background: 'var(--gradient-text)' }}
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

// ─── STYLE 11: Angled Cut ────────────────────────────────────

function AngledCutSeparator() {
  return (
    <div className="relative h-12 -mx-8 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0 0, 100% 40%, 100% 60%, 0 100%)',
          background: 'hsl(var(--accent) / 0.06)',
        }}
      />
      <div
        className="absolute top-1/2 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.3), transparent)',
          transform: 'rotate(-1deg)',
        }}
      />
    </div>
  );
}

// ─── STYLE 12: Text Divider ──────────────────────────────────

function TextDividerSeparator({ text = '§' }: { text?: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div
        className="flex-1 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--border)))' }}
      />
      <span className="text-sm font-mono text-accent/40 select-none">{text}</span>
      <div
        className="flex-1 h-[1px]"
        style={{ background: 'linear-gradient(90deg, hsl(var(--border)), transparent)' }}
      />
    </div>
  );
}

// ─── STYLE 13: Particle Trail ────────────────────────────────

function ParticleTrailSeparator() {
  return (
    <div className="relative py-4 overflow-hidden">
      <div className="h-[1px] w-full bg-border" />
      <div className="absolute top-4 left-0 right-0 flex items-center justify-around">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-accent/50"
            animate={{
              y: [-2, 2, -2],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── STYLE 14: Double Gradient ───────────────────────────────

function DoubleGradientSeparator() {
  return (
    <div className="space-y-1 py-4">
      <div
        className="h-[1px] w-full"
        style={{ background: 'linear-gradient(90deg, hsl(var(--accent) / 0.4), transparent)' }}
      />
      <div
        className="h-[1px] w-full"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4))' }}
      />
    </div>
  );
}

// ─── STYLE 15: Zigzag Pattern ────────────────────────────────

function ZigzagSeparator() {
  return (
    <div className="relative -mx-8 overflow-hidden py-2">
      <svg viewBox="0 0 1200 20" preserveAspectRatio="none" className="w-full h-4">
        <path
          d="M0,10 L30,0 L60,10 L90,0 L120,10 L150,0 L180,10 L210,0 L240,10 L270,0 L300,10 L330,0 L360,10 L390,0 L420,10 L450,0 L480,10 L510,0 L540,10 L570,0 L600,10 L630,0 L660,10 L690,0 L720,10 L750,0 L780,10 L810,0 L840,10 L870,0 L900,10 L930,0 L960,10 L990,0 L1020,10 L1050,0 L1080,10 L1110,0 L1140,10 L1170,0 L1200,10"
          fill="none"
          stroke="hsl(var(--accent) / 0.15)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ─── STYLE 16: Radiant Burst ─────────────────────────────────

function RadiantBurstSeparator() {
  return (
    <div className="relative py-8 flex items-center justify-center">
      <motion.div
        className="absolute w-24 h-24 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent-glow) / 0.4), transparent 70%)',
        }}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="h-[1px] flex-1 bg-border" />
      <div className="relative mx-6">
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--gradient-text)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}

// ─── STYLE 17: Ink Bleed ─────────────────────────────────────

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

// ─── STYLE 18: Morse Code ────────────────────────────────────

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

// ─── MAIN PAGE ────────────────────────────────────────────────

export default function PlaygroundSeparators() {
  useAdminAuth();

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
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Section Separators</h2>
            <p className="text-muted-foreground max-w-2xl">
              18 award-winning section divider styles. From minimal gradient fades to animated particle
              trails. Each uses the theme's design tokens and works in both light and dark modes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <SeparatorShowcaseCard number={1} name="Gradient Fade Line" description="Horizontal line that fades from transparent through accent and back. Ultra-minimal." inspiration="Apple.com section breaks, Stripe docs">
              <GradientFadeSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={2} name="Center Diamond" description="Centered rotated square ornament flanked by hairlines. Editorial elegance." inspiration="Medium articles, Substack, The Verge">
              <CenterDiamondSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={3} name="Triple Dot" description="Three dots with spring hover. Classic typographic section break (⁂ asterism)." inspiration="Literary manuscripts, New Yorker, Kindle">
              <TripleDotSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={4} name="Gradient Glow Bar" description="Luminous gradient bar with ambient glow shadow. Dramatic emphasis." inspiration="Luma AI, Nothing Phone, Arc browser">
              <GradientGlowBarSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={5} name="Wave SVG" description="Sinusoidal wave path in accent color. Organic flow between sections." inspiration="Awwwards SOTD wave transitions, Webflow templates">
              <WaveSVGSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={6} name="Stacked Lines" description="Three lines at different widths creating depth hierarchy." inspiration="Pentagram, Swiss typography, Bauhaus posters">
              <StackedLinesSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={7} name="Animated Shimmer" description="Traveling light beam across a hairline. Subtle but alive." inspiration="Stripe dashboard loading states, Linear">
              <ShimmerLineSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={8} name="Bracket Ornament" description="Typographic angle brackets with gradient connectors and center dot." inspiration="LaTeX documents, academic papers, Notion">
              <BracketOrnamentSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={9} name="Dash Pattern" description="Mixed-length dashes creating a rhythmic pattern." inspiration="Figma canvas guides, blueprint aesthetics">
              <DashPatternSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={10} name="Breathing Pulse" description="Center dot with meditative scale + glow animation. Alive and ambient." inspiration="Apple Watch breathing app, meditation UIs">
              <BreathingPulseSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={11} name="Angled Cut" description="Diagonal slice with subtle tint. Creates visual momentum between sections." inspiration="Awwwards annual sites, Locomotive scroll sites">
              <AngledCutSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={12} name="Text Divider" description="Symbol ornament centered between fading hairlines. Customizable." inspiration="Wikipedia, classic book typography">
              <TextDividerSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={13} name="Particle Trail" description="Floating dots along a hairline with staggered vertical bounce." inspiration="Framer Awards 2024 sites, WebGL particle effects">
              <ParticleTrailSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={14} name="Double Gradient" description="Two parallel lines with opposing gradient directions. Creates visual tension." inspiration="Vercel dashboard, GitHub Copilot UI">
              <DoubleGradientSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={15} name="Zigzag Pattern" description="Continuous zigzag SVG path. Playful geometric pattern." inspiration="Mailchimp, Duolingo, creative agency sites">
              <ZigzagSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={16} name="Radiant Burst" description="Pulsing radial glow behind a center point. Ethereal and dramatic." inspiration="Luma AI, Nothing OS, sci-fi interfaces">
              <RadiantBurstSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={17} name="Ink Bleed" description="Thick soft-focused gradient bar evoking watercolor or ink on paper." inspiration="Aesop packaging, Byredo, luxury editorial">
              <InkBleedSeparator />
            </SeparatorShowcaseCard>

            <SeparatorShowcaseCard number={18} name="Morse Code" description="Dashes and dots encoding rhythm. Technical, precise aesthetic." inspiration="IBM Design Language, developer tools, terminal UIs">
              <MorseCodeSeparator />
            </SeparatorShowcaseCard>
          </div>
        </div>
      </main>
    </div>
  );
}
