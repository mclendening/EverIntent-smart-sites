/**
 * @fileoverview Admin Playground — Callout Style Showcase
 * Premium callout/label alternatives to replace pill-shaped badges.
 * All styles use theme design tokens exclusively.
 */

import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, TrendingUp, HelpCircle, Star, Sparkles, Diamond, Hexagon, Award, Crown, Shield, Flame, Target, Triangle, Bookmark, CircleDot, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';


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

/**
 * Style 11: Corner Ribbon — Diagonal ribbon anchored to a corner.
 * Classic e-commerce hero pattern, elevated with gradient.
 * Inspired by: Creative Tim ribbons, Shopify themes
 */
function CornerRibbonCallout({ text }: { text: string }) {
  return (
    <div className="relative w-32 h-32 bg-card border border-border rounded-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div
          className="absolute top-[12px] right-[-32px] w-[140px] text-center rotate-45 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-md"
          style={{ background: 'var(--gradient-text)' }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

/**
 * Style 12: Diamond Stage — Icon inside a rotated diamond shape.
 * Geometric and bold. Conference/award-stage energy.
 * Inspired by: AWS re:Invent badges, conference lanyards
 */
function DiamondStageCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative">
        <div
          className="w-10 h-10 rotate-45 rounded-sm flex items-center justify-center"
          style={{ background: 'var(--gradient-text)' }}
        >
          <Icon className="w-5 h-5 text-accent-foreground -rotate-45" />
        </div>
      </div>
      <span className="text-sm font-semibold tracking-wide uppercase text-foreground/80">{text}</span>
    </div>
  );
}

/**
 * Style 13: Hexagon Badge — Icon in a hex-shaped container with label.
 * Gaming/achievement unlock feel. Aspirational.
 * Inspired by: Xbox achievements, Duolingo, HackerRank
 */
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

/**
 * Style 14: Shimmer Slide — Animated light sweep across the label.
 * Premium product launch energy. Eye-catching without being loud.
 * Inspired by: Apple Store "New" labels, Stripe announcements
 */
function ShimmerSlideCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent text-sm font-semibold rounded-lg overflow-hidden">
      <Icon className="w-4 h-4 relative z-10" />
      <span className="relative z-10">{text}</span>
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.15) 50%, transparent 100%)',
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

/**
 * Style 15: Notch Tab — Tab-shaped callout that looks attached to a surface.
 * Architectural, like a physical label or file tab.
 * Inspired by: Material Design chips, physical product tags
 */
function NotchTabCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm font-medium">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 text-accent-foreground rounded-t-lg border-b-2 border-accent"
        style={{ background: 'var(--gradient-text)' }}
      >
        <Icon className="w-3.5 h-3.5" />
        {text}
      </div>
    </div>
  );
}

/**
 * Style 16: Animated Gradient Border — Rotating gradient border animation.
 * Inspired by: GitHub Copilot badge, Vercel AI SDK
 */
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

/**
 * Style 17: Stamp Seal — Circular emblem with icon + text arc feel.
 * Inspired by: Dribbble certifications, Michelin stars, product seals
 */
function StampSealCallout({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative w-11 h-11">
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30"
        />
        <div
          className="absolute inset-1 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-text)' }}
        >
          <Icon className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>
      <span className="text-sm font-semibold text-foreground/80">{text}</span>
    </div>
  );
}

/**
 * Style 18: Neon Outline — Glowing neon-sign aesthetic with double shadow.
 * Inspired by: Cyberpunk 2077 UI, neon sign design, retro-futurism
 */
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

/**
 * Style 19: Folded Corner — Card-like label with a folded triangle corner.
 * Inspired by: physical price tags, paper-craft UI, Figma community
 */
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

/**
 * Style 20: Layered Shadow — Stacked card illusion with offset shadow layers.
 * Inspired by: Dribbble card stacks, Material Design elevation, Awwwards SOTD
 */
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

/**
 * Style 21: Progress Indicator — Tiny progress ring next to label.
 * Inspired by: Duolingo XP, fitness apps, achievement progress
 */
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

/**
 * Style 22: Typewriter Reveal — Text types in with cursor blink.
 * Inspired by: Terminal UIs, VS Code, developer marketing sites
 */
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
              22 premium callout styles to replace pill-shaped badges. Each uses the theme's design tokens
              and gradient system. Styles 16–22 feature motion, SVG animations, and layered depth.
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

            <StyleCard
              number={11}
              name="Corner Ribbon"
              description="Diagonal gradient ribbon anchored to a card corner. Classic e-commerce elevated."
              inspiration="Shopify themes, Creative Tim, SaaS pricing cards"
            >
              <div className="flex gap-4">
                <CornerRibbonCallout text="Popular" />
                <CornerRibbonCallout text="New" />
              </div>
            </StyleCard>

            <StyleCard
              number={12}
              name="Diamond Stage"
              description="Icon inside a rotated diamond with gradient fill. Conference award energy."
              inspiration="AWS re:Invent, TEDx, conference stage badges"
            >
              <DiamondStageCallout icon={Crown} text="Premium Tier" />
              <DiamondStageCallout icon={Flame} text="5-Day Delivery" />
            </StyleCard>

            <StyleCard
              number={13}
              name="Hexagon Badge"
              description="Icon centered in a hex outline. Achievement-unlock, aspirational feel."
              inspiration="Xbox achievements, Duolingo, HackerRank"
            >
              <HexBadgeCallout icon={Award} text="Most Popular" />
              <HexBadgeCallout icon={Shield} text="Enterprise Ready" />
            </StyleCard>

            <StyleCard
              number={14}
              name="Shimmer Slide"
              description="Animated light sweep across a tinted label. Eye-catching launch energy."
              inspiration="Apple Store 'New' labels, Stripe product launches"
            >
              <ShimmerSlideCallout icon={Sparkles} text="Just Launched" />
              <ShimmerSlideCallout icon={Target} text="5-Day Delivery" />
            </StyleCard>

            <StyleCard
              number={15}
              name="Notch Tab"
              description="Physical tab shape with gradient fill. Feels attached to the surface."
              inspiration="Material Design chips, physical product tags, file tabs"
            >
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

            <StyleCard
              number={16}
              name="Animated Gradient Border"
              description="Continuously rotating conic gradient border. Mesmerizing and premium."
              inspiration="GitHub Copilot, Vercel AI SDK, OpenAI"
            >
              <AnimatedGradientBorderCallout icon={Sparkles} text="AI-Powered" />
              <AnimatedGradientBorderCallout icon={Zap} text="5-Day Delivery" />
            </StyleCard>

            <StyleCard
              number={17}
              name="Stamp Seal"
              description="Circular emblem with dashed outer ring. Certification/approval energy."
              inspiration="Michelin stars, Dribbble certifications, product seals"
            >
              <StampSealCallout icon={Award} text="Certified Partner" />
              <StampSealCallout icon={Crown} text="Premium Tier" />
            </StyleCard>

            <StyleCard
              number={18}
              name="Neon Outline"
              description="Glowing neon-sign border with double shadow. Retro-futuristic energy."
              inspiration="Cyberpunk 2077, neon signs, Tron: Legacy"
            >
              <NeonOutlineCallout icon={Zap} text="Live Now" />
              <NeonOutlineCallout icon={Flame} text="Hot Feature" />
            </StyleCard>

            <StyleCard
              number={19}
              name="Folded Corner"
              description="Label with a paper-fold triangle corner. Physical craft aesthetic."
              inspiration="Paper price tags, Figma community, craft UIs"
            >
              <FoldedCornerCallout icon={Bookmark} text="Saved Plan" />
              <FoldedCornerCallout icon={Star} text="Recommended" />
            </StyleCard>

            <StyleCard
              number={20}
              name="Layered Shadow"
              description="Stacked card shadows creating depth illusion. Material elevation."
              inspiration="Dribbble shots, Material Design 3, CSS.Design Awards"
            >
              <LayeredShadowCallout icon={Layers} text="Multi-Layer" />
              <LayeredShadowCallout icon={Clock} text="5-Day Delivery" />
            </StyleCard>

            <StyleCard
              number={21}
              name="Progress Indicator"
              description="SVG ring progress animation with center icon. Achievement-unlock feel."
              inspiration="Duolingo XP, Apple Fitness rings, Strava"
            >
              <ProgressIndicatorCallout icon={TrendingUp} text="75% Complete" />
              <ProgressIndicatorCallout icon={Target} text="Goal Reached" />
            </StyleCard>

            <StyleCard
              number={22}
              name="Typewriter Reveal"
              description="Terminal-style text reveal with blinking cursor. Developer aesthetic."
              inspiration="VS Code, Vercel CLI, Warp terminal"
            >
              <TypewriterCallout text="5-day-delivery" />
              <TypewriterCallout text="ai-ready" />
            </StyleCard>
          </div>
        </div>
      </main>
    </div>
  );
}
