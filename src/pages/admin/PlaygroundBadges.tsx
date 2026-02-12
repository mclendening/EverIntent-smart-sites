/**
 * @fileoverview Admin Playground — Callout Style Showcase
 * Premium callout/label alternatives to replace pill-shaped badges.
 * All styles use theme design tokens exclusively.
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, TrendingUp, HelpCircle, Star, Sparkles } from 'lucide-react';


// ─── STYLE VARIANTS ───────────────────────────────────────────

/**
 * Style 1: Gradient Text — No container, just the gradient text utility.
 * Ultra-minimal. The text IS the decoration.
 */
function GradientTextCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-gradient">{text}</span>
    </span>
  );
}

/**
 * Style 2: Left Border Accent — Vertical bar with subtle background.
 * Editorial magazine feel. Strong hierarchy signal.
 */
function LeftBorderCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 border-l-2 border-accent pl-3 py-1 text-sm font-medium text-foreground/80">
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

/**
 * Style 3: Underline Accent — Text with a gradient underline stroke.
 * Sophisticated typographic approach. No background, no border.
 */
function UnderlineAccentCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
      <Icon className="w-4 h-4 text-accent" />
      <span className="relative">
        {text}
        <span
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-sm"
          style={{ background: 'var(--gradient-text)' }}
        />
      </span>
    </span>
  );
}

/**
 * Style 4: Ghost Chip — Very subtle tinted background, sharp corners.
 * Clean and modern. Reads as a label without screaming "badge".
 */
function GhostChipCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/8 text-accent text-sm font-medium tracking-wide rounded-md">
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}

/**
 * Style 5: Floating Label — Hairline border, frosted glass effect.
 * Premium SaaS aesthetic. Subtle but unmistakable.
 */
function FloatingLabelCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/5 backdrop-blur-sm text-sm font-medium text-foreground/80 rounded-lg shadow-sm">
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

/**
 * Style 6: Gradient Border — Transparent fill with gradient outline.
 * Award-winning aesthetic. The border itself is the hero.
 */
function GradientBorderCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 rounded-lg">
      {/* Gradient border via pseudo-element */}
      <span
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          padding: '1px',
          background: 'var(--gradient-text)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

/**
 * Style 7: Glow Whisper — Extremely subtle glow halo behind text.
 * Feels like the text is emitting light. Ethereal luxury.
 */
function GlowWhisperCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="relative inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-accent">
      <span className="absolute inset-0 blur-xl bg-accent/15 rounded-lg" />
      <Icon className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{text}</span>
    </span>
  );
}

/**
 * Style 8: Split Tone — Icon in accent circle, text in muted background.
 * Two-part composition. Structured and intentional.
 */
function SplitToneCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-0 text-sm font-medium">
      <span className="flex items-center justify-center w-8 h-8 bg-accent text-accent-foreground rounded-md">
        <Icon className="w-4 h-4" />
      </span>
      <span className="px-3 py-1.5 bg-muted text-muted-foreground rounded-r-md border border-l-0 border-border">
        {text}
      </span>
    </div>
  );
}

/**
 * Style 9: Typographic Mono — All-caps monospace with letter spacing.
 * Brutalist editorial. The anti-badge.
 */
function TypographicMonoCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
}

/**
 * Style 10: Bottom Glow Bar — Text with a luminous accent line below.
 * Architectural feel. Like a museum label.
 */
function BottomGlowBarCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex flex-col items-start gap-1.5">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
        <Icon className="w-4 h-4 text-accent" />
        {text}
      </span>
      <span
        className="h-[2px] w-full rounded-sm"
        style={{
          background: 'var(--gradient-text)',
          boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.4)',
        }}
      />
    </div>
  );
}

// ─── SHOWCASE CARD ────────────────────────────────────────────

function StyleCard({
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
        {/* Dark preview */}
        <div className="bg-card border border-border rounded-lg p-6 mb-3">
          <div className="space-y-4">
            {children}
          </div>
        </div>
        {/* Contextual preview — simulates section header usage */}
        <div className="bg-background border border-border/30 rounded-lg p-6">
          <div className="space-y-3">
            {children}
            <h2 className="text-2xl font-bold text-foreground">From Kickoff to Launch in 5 Days</h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Our streamlined process gets your premium website live faster than anyone else.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────

export default function PlaygroundBadges() {
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
            <p className="text-xs text-muted-foreground hidden sm:block">Callout & label style alternatives — no pills allowed</p>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Intro */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Badge Replacements</h2>
            <p className="text-muted-foreground max-w-2xl">
              10 premium callout styles to replace pill-shaped badges. Each uses the theme's design tokens
              and gradient system. Pick one or mix styles by context.
            </p>
          </div>

          {/* Grid of styles */}
          <div className="grid gap-6 lg:grid-cols-2">
            <StyleCard
              number={1}
              name="Gradient Text"
              description="No container at all. The gradient IS the decoration. Ultra-minimal."
              inspiration="Apple product pages, Stripe headers"
            >
              <GradientTextCallout icon={Clock} text="5-Day Delivery" />
              <GradientTextCallout icon={Zap} text="AI-Ready" />
            </StyleCard>

            <StyleCard
              number={2}
              name="Left Border Accent"
              description="Vertical accent bar with clean text. Magazine editorial feel."
              inspiration="The New York Times, Monocle, linear.app"
            >
              <LeftBorderCallout icon={Clock} text="5-Day Delivery" />
              <LeftBorderCallout icon={TrendingUp} text="Warmy Booster Add-On" />
            </StyleCard>

            <StyleCard
              number={3}
              name="Underline Accent"
              description="Gradient underline stroke beneath text. Typographic sophistication."
              inspiration="Pentagram, Rapha cycling"
            >
              <UnderlineAccentCallout icon={Clock} text="5-Day Delivery" />
              <UnderlineAccentCallout icon={HelpCircle} text="FAQ" />
            </StyleCard>

            <StyleCard
              number={4}
              name="Ghost Chip"
              description="Barely-there tinted background with sharp corners. Not a pill."
              inspiration="Vercel dashboard, Linear, Raycast"
            >
              <GhostChipCallout icon={Clock} text="5-Day Delivery" />
              <GhostChipCallout icon={Star} text="Most Popular" />
            </StyleCard>

            <StyleCard
              number={5}
              name="Floating Label"
              description="Frosted glass border with subtle shadow. Premium SaaS."
              inspiration="Craft.do, Notion, Arc browser"
            >
              <FloatingLabelCallout icon={Clock} text="5-Day Delivery" />
              <FloatingLabelCallout icon={Zap} text="Add AI When Ready" />
            </StyleCard>

            <StyleCard
              number={6}
              name="Gradient Border"
              description="Transparent fill, gradient outline. The border is the hero."
              inspiration="GitHub Copilot, Figma, Framer"
            >
              <GradientBorderCallout icon={Clock} text="5-Day Delivery" />
              <GradientBorderCallout icon={Sparkles} text="Warmy Booster Add-On" />
            </StyleCard>

            <StyleCard
              number={7}
              name="Glow Whisper"
              description="Text with an ethereal glow halo. Feels like light emission."
              inspiration="Luma AI, Nothing Phone, Rivian"
            >
              <GlowWhisperCallout icon={Clock} text="5-Day Delivery" />
              <GlowWhisperCallout icon={Zap} text="AI-Ready" />
            </StyleCard>

            <StyleCard
              number={8}
              name="Split Tone"
              description="Icon block + text strip. Two-part composition, structured."
              inspiration="Monzo bank, Wise, Klarna"
            >
              <SplitToneCallout icon={Clock} text="5-Day Delivery" />
              <SplitToneCallout icon={TrendingUp} text="Warmy Booster" />
            </StyleCard>

            <StyleCard
              number={9}
              name="Typographic Mono"
              description="All-caps monospace with wide tracking. The anti-badge. Pure typography."
              inspiration="Balenciaga, Acne Studios, Ssense"
            >
              <TypographicMonoCallout icon={Clock} text="5-Day Delivery" />
              <TypographicMonoCallout icon={HelpCircle} text="FAQ" />
            </StyleCard>

            <StyleCard
              number={10}
              name="Bottom Glow Bar"
              description="Text above a luminous gradient line. Architectural, museum-grade."
              inspiration="Aesop, Byredo, museum exhibition labels"
            >
              <BottomGlowBarCallout icon={Clock} text="5-Day Delivery" />
              <BottomGlowBarCallout icon={Zap} text="Add AI When Ready" />
            </StyleCard>
          </div>
        </div>
      </main>
    </div>
  );
}
