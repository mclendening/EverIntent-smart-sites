/**
 * @fileoverview Admin Playground — Callout Style Showcase
 * Premium callout/label alternatives to replace pill-shaped badges.
 * All styles use theme design tokens exclusively.
 * Now with accent color picker for previewing different accent palettes.
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, TrendingUp, HelpCircle, Star, Sparkles, Diamond, Hexagon, Award, Crown, Shield, Flame, Target, Triangle, Bookmark, CircleDot, ArrowRight, Layers, Eye, Fingerprint, Radio, Aperture, Gem, Scan, Wifi, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { AccentPickerBar, AccentWrapper, useAccentState } from '@/components/admin/AccentPicker';


// ─── STYLE VARIANTS ───────────────────────────────────────────

function GradientTextCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
      <Icon className="w-4 h-4 text-accent" />
      <span className="text-gradient">{text}</span>
    </span>
  );
}

function LeftBorderCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 border-l-2 border-accent pl-3 py-1 text-sm font-medium text-foreground/80">
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

function UnderlineAccentCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
      <Icon className="w-4 h-4 text-accent" />
      <span className="relative">
        {text}
        <span
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-sm"
          style={{ background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))' }}
        />
      </span>
    </span>
  );
}

function GhostChipCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/8 text-accent text-sm font-medium tracking-wide rounded-md">
      <Icon className="w-3.5 h-3.5" />
      {text}
    </div>
  );
}

function FloatingLabelCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 border border-accent/20 bg-accent/5 backdrop-blur-sm text-sm font-medium text-foreground/80 rounded-lg shadow-sm">
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

function GradientBorderCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 rounded-lg">
      <span
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          padding: '1px',
          background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))',
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

function GlowWhisperCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="relative inline-flex items-center gap-2 text-sm font-semibold tracking-wide uppercase text-accent">
      <span className="absolute inset-0 blur-xl bg-accent/15 rounded-lg" />
      <Icon className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{text}</span>
    </span>
  );
}

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

function TypographicMonoCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
      <Icon className="w-3.5 h-3.5" />
      {text}
    </span>
  );
}

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
          background: 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent) / 0.3))',
          boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.4)',
        }}
      />
    </div>
  );
}

function CornerRibbonCallout({ text }: { text: string }) {
  return (
    <div className="relative w-32 h-32 bg-card border border-border rounded-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div
          className="absolute top-[12px] right-[-32px] w-[140px] text-center rotate-45 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-md"
          style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.7))' }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

function DiamondStageCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative">
        <div
          className="w-10 h-10 rotate-45 rounded-sm flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.6))' }}
        >
          <Icon className="w-5 h-5 text-accent-foreground -rotate-45" />
        </div>
      </div>
      <span className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{text}</span>
    </div>
  );
}

function HexBadgeCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <Hexagon className="w-10 h-10 text-accent fill-accent/15" strokeWidth={1.5} />
        <Icon className="w-4 h-4 text-accent absolute" />
      </div>
      <span className="text-sm font-semibold text-foreground/80">{text}</span>
    </div>
  );
}

function ShimmerSlideCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-lg overflow-hidden">
      <Icon className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.15) 50%, transparent 100%)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function NotchTabCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 text-accent-foreground rounded-t-lg border-b-2 border-accent"
        style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.7))' }}
      >
        <Icon className="w-3.5 h-3.5" />
        {text}
      </div>
    </div>
  );
}

function AnimatedGradientBorderCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 rounded-lg">
      <motion.span
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          padding: '1.5px',
          background: 'conic-gradient(from var(--angle, 0deg), hsl(var(--accent)), transparent 40%, hsl(var(--accent)))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        animate={{ '--angle': ['0deg', '360deg'] } as any}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

function StampSealCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative w-11 h-11">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30" />
        <div
          className="absolute inset-1 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent) / 0.6))' }}
        >
          <Icon className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground/80">{text}</span>
    </div>
  );
}

function NeonOutlineCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg border border-accent/60 text-accent"
      style={{
        boxShadow: '0 0 8px hsl(var(--accent-glow) / 0.3), inset 0 0 8px hsl(var(--accent-glow) / 0.1)',
        textShadow: '0 0 10px hsl(var(--accent-glow) / 0.5)',
      }}
    >
      <Icon className="w-4 h-4" />
      {text}
    </div>
  );
}

function FoldedCornerCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-md overflow-hidden">
      <Icon className="w-4 h-4" />
      {text}
      <div
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderTop: '12px solid hsl(var(--accent) / 0.3)',
          borderLeft: '12px solid transparent',
        }}
      />
    </div>
  );
}

function LayeredShadowCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex">
      <div className="absolute inset-0 translate-x-1 translate-y-1 bg-accent/10 rounded-md" />
      <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-accent/5 rounded-md" />
      <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-card border border-accent/20 text-sm font-semibold text-foreground/80 rounded-md">
        <Icon className="w-4 h-4 text-accent" />
        {text}
      </div>
    </div>
  );
}

function ProgressIndicatorCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative w-9 h-9">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="hsl(var(--accent) / 0.1)" strokeWidth="3" />
          <motion.circle
            cx="18" cy="18" r="15" fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="94.25"
            initial={{ strokeDashoffset: 94.25 }}
            animate={{ strokeDashoffset: 23.56 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-accent" />
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground/80">{text}</span>
    </div>
  );
}

function TypewriterCallout({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-sm text-accent">
      <span className="text-accent/40">$</span>
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: 'auto' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="overflow-hidden whitespace-nowrap inline-block"
      >
        {text}
      </motion.span>
      <motion.span
        className="inline-block w-[2px] h-4 bg-accent"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

// ─── NEW STYLES 23-28 ─────────────────────────────────────────

/**
 * Style 23: Radar Ping — Concentric pulse rings emanating from an icon.
 * Inspired by: Vercel real-time indicators, Datadog monitors, PagerDuty alerts
 */
function RadarPingCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/30"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/20"
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />
        <div className="relative w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent" />
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground/80">{text}</span>
    </div>
  );
}

/**
 * Style 24: Scanline — Horizontal scan line sweeps across the label.
 * Inspired by: Sci-fi UIs, Minority Report, retro CRT screens
 */
function ScanlineCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-accent/5 text-accent text-sm font-semibold rounded-lg overflow-hidden border border-accent/10">
      <Icon className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{text}</span>
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-accent/40"
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

/**
 * Style 25: Dot Matrix — Text label with dot-grid pattern background.
 * Inspired by: Teenage Engineering, LED matrix displays, retro tech
 */
function DotMatrixCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-accent rounded-md border border-accent/15"
      style={{
        backgroundImage: 'radial-gradient(hsl(var(--accent) / 0.08) 1px, transparent 1px)',
        backgroundSize: '6px 6px',
      }}
    >
      <Icon className="w-4 h-4" />
      {text}
    </div>
  );
}

/**
 * Style 26: Frosted Glass Pill — NOT a pill. A rounded-lg label with heavy blur + glass reflection.
 * Inspired by: Apple Vision Pro, iOS notifications, glassmorphism trend
 */
function FrostedGlassCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/90 rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 bg-accent/8 backdrop-blur-xl border border-accent/10 rounded-lg"
      />
      {/* Glass reflection */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 rounded-t-lg"
        style={{ background: 'linear-gradient(180deg, hsl(var(--accent) / 0.06), transparent)' }}
      />
      <Icon className="w-4 h-4 text-accent relative z-10" />
      <span className="relative z-10">{text}</span>
    </div>
  );
}

/**
 * Style 27: Wire Frame — Minimalist outlined label with accent corners.
 * Inspired by: Wireframe tools, architectural blueprints, Figma frames
 */
function WireFrameCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-foreground/80">
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/50 rounded-tl-sm" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent/50 rounded-tr-sm" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent/50 rounded-bl-sm" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/50 rounded-br-sm" />
      <Icon className="w-4 h-4 text-accent" />
      {text}
    </div>
  );
}

/**
 * Style 28: Dual Tone Gradient — Split background with two accent tones.
 * Inspired by: Instagram gradient icons, Figma auto-layout chips, Spotify Wrapped
 */
function DualToneCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg text-accent-foreground"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--accent)), hsl(var(--accent-glow) / 0.6))',
      }}
    >
      <Icon className="w-4 h-4" />
      {text}
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
        <div className="bg-card border border-border rounded-lg p-6 mb-3">
          <div className="space-y-4">
            {children}
          </div>
        </div>
        <div className="bg-background border border-border/30 rounded-lg p-6">
          <div className="space-y-3">
            {children}
            <p className="text-sm text-muted-foreground mt-4">
              Section header context preview
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── CONTEXTUAL PREVIEW ──────────────────────────────────────

function ContextualPreview() {
  return (
    <Card className="lg:col-span-2 border-accent/20 bg-card">
      <CardHeader>
        <CardTitle>Contextual Preview</CardTitle>
        <p className="text-sm text-muted-foreground">
          How selected styles look in a real page section header
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="bg-background rounded-xl p-8 border border-border/30">
          <GradientTextCallout icon={Clock} text="5-Day Delivery" />
          <h2 className="text-2xl font-bold text-foreground mt-3">From Kickoff to Launch in 5 Days</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Our streamlined process gets your premium website live faster than anyone else.
          </p>
        </div>
        <div className="bg-background rounded-xl p-8 border border-border/30">
          <WireFrameCallout icon={Sparkles} text="AI-Powered" />
          <h2 className="text-2xl font-bold text-foreground mt-3">Built with Intelligence</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            Every feature is designed with AI readiness from the ground up.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────

export default function PlaygroundBadges() {
  useAdminAuth();
  const { accent, setAccent } = useAccentState();

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
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Badge Replacements</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              28 premium callout styles to replace pill-shaped badges. Each uses the theme's design tokens
              and gradient system. Preview any accent color using the picker below.
            </p>
            <AccentPickerBar selected={accent} onChange={setAccent} />
          </div>

          <AccentWrapper accent={accent}>
            <div className="grid gap-6 lg:grid-cols-2">
              <StyleCard number={1} name="Gradient Text" description="No container at all. The gradient IS the decoration. Ultra-minimal." inspiration="Apple product pages, Stripe headers">
                <GradientTextCallout icon={Clock} text="5-Day Delivery" />
                <GradientTextCallout icon={Zap} text="AI-Ready" />
              </StyleCard>

              <StyleCard number={2} name="Left Border Accent" description="Vertical accent bar with clean text. Magazine editorial feel." inspiration="The New York Times, Monocle, linear.app">
                <LeftBorderCallout icon={Clock} text="5-Day Delivery" />
                <LeftBorderCallout icon={TrendingUp} text="Warmy Booster Add-On" />
              </StyleCard>

              <StyleCard number={3} name="Underline Accent" description="Gradient underline stroke beneath text. Typographic sophistication." inspiration="Pentagram, Rapha cycling">
                <UnderlineAccentCallout icon={Clock} text="5-Day Delivery" />
                <UnderlineAccentCallout icon={HelpCircle} text="FAQ" />
              </StyleCard>

              <StyleCard number={4} name="Ghost Chip" description="Barely-there tinted background with sharp corners. Not a pill." inspiration="Vercel dashboard, Linear, Raycast">
                <GhostChipCallout icon={Clock} text="5-Day Delivery" />
                <GhostChipCallout icon={Star} text="Most Popular" />
              </StyleCard>

              <StyleCard number={5} name="Floating Label" description="Frosted glass border with subtle shadow. Premium SaaS." inspiration="Craft.do, Notion, Arc browser">
                <FloatingLabelCallout icon={Clock} text="5-Day Delivery" />
                <FloatingLabelCallout icon={Zap} text="Add AI When Ready" />
              </StyleCard>

              <StyleCard number={6} name="Gradient Border" description="Transparent fill, gradient outline. The border is the hero." inspiration="GitHub Copilot, Figma, Framer">
                <GradientBorderCallout icon={Clock} text="5-Day Delivery" />
                <GradientBorderCallout icon={Sparkles} text="Warmy Booster Add-On" />
              </StyleCard>

              <StyleCard number={7} name="Glow Whisper" description="Text with an ethereal glow halo. Feels like light emission." inspiration="Luma AI, Nothing Phone, Rivian">
                <GlowWhisperCallout icon={Clock} text="5-Day Delivery" />
                <GlowWhisperCallout icon={Zap} text="AI-Ready" />
              </StyleCard>

              <StyleCard number={8} name="Split Tone" description="Icon block + text strip. Two-part composition, structured." inspiration="Monzo bank, Wise, Klarna">
                <SplitToneCallout icon={Clock} text="5-Day Delivery" />
                <SplitToneCallout icon={TrendingUp} text="Warmy Booster" />
              </StyleCard>

              <StyleCard number={9} name="Typographic Mono" description="All-caps monospace with wide tracking. The anti-badge. Pure typography." inspiration="Balenciaga, Acne Studios, Ssense">
                <TypographicMonoCallout icon={Clock} text="5-Day Delivery" />
                <TypographicMonoCallout icon={HelpCircle} text="FAQ" />
              </StyleCard>

              <StyleCard number={10} name="Bottom Glow Bar" description="Text above a luminous gradient line. Architectural, museum-grade." inspiration="Aesop, Byredo, museum exhibition labels">
                <BottomGlowBarCallout icon={Clock} text="5-Day Delivery" />
                <BottomGlowBarCallout icon={Zap} text="Add AI When Ready" />
              </StyleCard>

              <StyleCard number={11} name="Corner Ribbon" description="Diagonal gradient ribbon anchored to a card corner. Classic e-commerce elevated." inspiration="Shopify themes, Creative Tim, SaaS pricing cards">
                <div className="flex gap-4">
                  <CornerRibbonCallout text="Popular" />
                  <CornerRibbonCallout text="New" />
                </div>
              </StyleCard>

              <StyleCard number={12} name="Diamond Stage" description="Icon inside a rotated diamond with gradient fill. Conference award energy." inspiration="AWS re:Invent, TEDx, conference stage badges">
                <DiamondStageCallout icon={Crown} text="Premium Tier" />
                <DiamondStageCallout icon={Flame} text="5-Day Delivery" />
              </StyleCard>

              <StyleCard number={13} name="Hexagon Badge" description="Icon centered in a hex outline. Achievement-unlock, aspirational feel." inspiration="Xbox achievements, Duolingo, HackerRank">
                <HexBadgeCallout icon={Award} text="Most Popular" />
                <HexBadgeCallout icon={Shield} text="Enterprise Ready" />
              </StyleCard>

              <StyleCard number={14} name="Shimmer Slide" description="Animated light sweep across a tinted label. Eye-catching launch energy." inspiration="Apple Store 'New' labels, Stripe product launches">
                <ShimmerSlideCallout icon={Sparkles} text="Just Launched" />
                <ShimmerSlideCallout icon={Target} text="5-Day Delivery" />
              </StyleCard>

              <StyleCard number={15} name="Notch Tab" description="Physical tab shape with gradient fill. Feels attached to the surface." inspiration="Material Design chips, physical product tags, file tabs">
                <NotchTabCallout icon={Clock} text="5-Day Delivery" />
                <NotchTabCallout icon={Star} text="Recommended" />
              </StyleCard>

              {/* ═══════ MOTION-RICH SECTION ═══════ */}
              <div className="lg:col-span-2 pt-6 border-t border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-1">Motion-Rich & Layered Variants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Framer Motion powered — animated borders, progress rings, and layered depth.
                </p>
              </div>

              <StyleCard number={16} name="Animated Gradient Border" description="Continuously rotating conic gradient border. Mesmerizing and premium." inspiration="GitHub Copilot, Vercel AI SDK, OpenAI">
                <AnimatedGradientBorderCallout icon={Sparkles} text="AI-Powered" />
                <AnimatedGradientBorderCallout icon={Zap} text="5-Day Delivery" />
              </StyleCard>

              <StyleCard number={17} name="Stamp Seal" description="Circular emblem with dashed outer ring. Certification/approval energy." inspiration="Michelin stars, Dribbble certifications, product seals">
                <StampSealCallout icon={Award} text="Certified Partner" />
                <StampSealCallout icon={Crown} text="Premium Tier" />
              </StyleCard>

              <StyleCard number={18} name="Neon Outline" description="Glowing neon-sign border with double shadow. Retro-futuristic energy." inspiration="Cyberpunk 2077, neon signs, Tron: Legacy">
                <NeonOutlineCallout icon={Zap} text="Live Now" />
                <NeonOutlineCallout icon={Flame} text="Hot Feature" />
              </StyleCard>

              <StyleCard number={19} name="Folded Corner" description="Label with a paper-fold triangle corner. Physical craft aesthetic." inspiration="Paper price tags, Figma community, craft UIs">
                <FoldedCornerCallout icon={Bookmark} text="Saved Plan" />
                <FoldedCornerCallout icon={Star} text="Recommended" />
              </StyleCard>

              <StyleCard number={20} name="Layered Shadow" description="Stacked card shadows creating depth illusion. Material elevation." inspiration="Dribbble shots, Material Design 3, CSS.Design Awards">
                <LayeredShadowCallout icon={Layers} text="Multi-Layer" />
                <LayeredShadowCallout icon={Clock} text="5-Day Delivery" />
              </StyleCard>

              <StyleCard number={21} name="Progress Indicator" description="SVG ring progress animation with center icon. Achievement-unlock feel." inspiration="Duolingo XP, Apple Fitness rings, Strava">
                <ProgressIndicatorCallout icon={TrendingUp} text="75% Complete" />
                <ProgressIndicatorCallout icon={Target} text="Goal Reached" />
              </StyleCard>

              <StyleCard number={22} name="Typewriter Reveal" description="Terminal-style text reveal with blinking cursor. Developer aesthetic." inspiration="VS Code, Vercel CLI, Warp terminal">
                <TypewriterCallout text="5-day-delivery" />
                <TypewriterCallout text="ai-ready" />
              </StyleCard>

              {/* ═══════ NEW STYLES 23-28 ═══════ */}
              <div className="lg:col-span-2 pt-6 border-t border-border/50">
                <h3 className="text-xl font-bold text-foreground mb-1">Ambient & Technical Variants</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Radar pings, scanlines, dot matrices, and architectural frames.
                </p>
              </div>

              <StyleCard number={23} name="Radar Ping" description="Concentric pulse rings emanating outward from an accent circle. Status-aware." inspiration="Vercel real-time, Datadog monitors, PagerDuty">
                <RadarPingCallout icon={Radio} text="Live Now" />
                <RadarPingCallout icon={Wifi} text="Connected" />
              </StyleCard>

              <StyleCard number={24} name="Scanline" description="Horizontal scan beam sweeps across the label. Sci-fi interface energy." inspiration="Minority Report, Alien UI, retro CRT screens">
                <ScanlineCallout icon={Scan} text="Scanning..." />
                <ScanlineCallout icon={Eye} text="Monitoring" />
              </StyleCard>

              <StyleCard number={25} name="Dot Matrix" description="Dotted grid pattern background with accent text. Retro-technical." inspiration="Teenage Engineering, LED matrix, calculator displays">
                <DotMatrixCallout icon={Activity} text="Active" />
                <DotMatrixCallout icon={Aperture} text="Processing" />
              </StyleCard>

              <StyleCard number={26} name="Frosted Glass" description="Heavy blur with glass reflection. Modern depth without a pill shape." inspiration="Apple Vision Pro, iOS notifications, glassmorphism">
                <FrostedGlassCallout icon={Sparkles} text="Premium" />
                <FrostedGlassCallout icon={Gem} text="Pro Plan" />
              </StyleCard>

              <StyleCard number={27} name="Wire Frame" description="Corner accent brackets. Minimalist architectural blueprint feel." inspiration="Wireframe tools, architectural plans, Figma frames">
                <WireFrameCallout icon={Fingerprint} text="Verified" />
                <WireFrameCallout icon={Shield} text="Secure" />
              </StyleCard>

              <StyleCard number={28} name="Dual Tone Gradient" description="Solid accent gradient fill with two-tone blend. Bold and confident." inspiration="Instagram icons, Spotify Wrapped, Figma chips">
                <DualToneCallout icon={Flame} text="Hot Feature" />
                <DualToneCallout icon={Zap} text="Instant Setup" />
              </StyleCard>

              {/* Contextual */}
              <ContextualPreview />
            </div>
          </AccentWrapper>
        </div>
      </main>
    </div>
  );
}
