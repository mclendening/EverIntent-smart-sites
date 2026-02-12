/**
 * @fileoverview Admin Playground — Timeline & Stage Indicator Showcase
 * Premium progress/timeline alternatives for checkout flows and delivery processes.
 * All styles use theme design tokens exclusively with hover + two-tone + gradient support.
 */

import React, { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, User, FileText, CreditCard, Rocket, Palette, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── SHARED TYPES ─────────────────────────────────────────────

interface StepData {
  label: string;
  icon: React.ElementType;
}

const checkoutSteps: StepData[] = [
  { label: 'Selection', icon: ShoppingCart },
  { label: 'Details', icon: User },
  { label: 'Review', icon: FileText },
  { label: 'Payment', icon: CreditCard },
];

const deliverySteps: StepData[] = [
  { label: 'Kickoff', icon: Rocket },
  { label: 'Design', icon: Palette },
  { label: 'Build', icon: Code },
  { label: 'Launch', icon: Globe },
];

// ─── STYLE 1: Gradient Connector Line ─────────────────────────

function GradientConnectorTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <React.Fragment key={i}>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={cn(
                  'w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300',
                  isComplete && 'text-accent-foreground shadow-md',
                  isActive && 'text-accent-foreground shadow-lg scale-110',
                  !isComplete && !isActive && 'bg-muted text-muted-foreground',
                  isHovered && !isComplete && !isActive && 'bg-accent/20 text-accent',
                )}
                style={
                  isComplete || isActive
                    ? { background: 'var(--gradient-cta)' }
                    : undefined
                }
              >
                {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span className={cn(
                'text-xs font-medium transition-colors',
                isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
                isHovered && 'text-accent',
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: isComplete ? '100%' : '0%',
                    background: 'var(--gradient-text)',
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 2: Two-Tone Split Blocks ──────────────────────────

function TwoToneSplitTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-stretch gap-1 w-full">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className={cn(
              'flex-1 flex items-center gap-2 px-3 py-3 rounded-lg cursor-pointer transition-all duration-300',
              isComplete && 'bg-accent/15 text-accent',
              isActive && 'text-accent-foreground shadow-lg',
              !isComplete && !isActive && 'bg-muted/50 text-muted-foreground',
              isHovered && !isActive && 'ring-1 ring-accent/30 scale-[1.02]',
            )}
            style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={cn(
              'w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors',
              isComplete && 'bg-accent/20',
              isActive && 'bg-accent-foreground/20',
              !isComplete && !isActive && 'bg-muted',
            )}>
              {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <span className={cn(
                'text-[10px] font-mono uppercase tracking-wider',
                isActive ? 'text-accent-foreground/60' : 'text-muted-foreground',
              )}>
                Step {i + 1}
              </span>
              <p className="text-xs font-semibold truncate">{step.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── STYLE 3: Numbered Circles with Glow ─────────────────────

function GlowCircleTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <React.Fragment key={i}>
            <div
              className="flex flex-col items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative">
                {/* Glow halo */}
                {(isActive || isHovered) && (
                  <span className="absolute inset-0 rounded-lg blur-xl bg-accent/30 animate-pulse" />
                )}
                <div
                  className={cn(
                    'relative w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300',
                    isComplete && 'bg-accent text-accent-foreground',
                    isActive && 'text-accent-foreground shadow-xl',
                    !isComplete && !isActive && 'bg-card border-2 border-border text-muted-foreground',
                    isHovered && !isComplete && !isActive && 'border-accent/50 text-accent',
                  )}
                  style={isActive ? { background: 'var(--gradient-text)' } : undefined}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : i + 1}
                </div>
              </div>
              <span className={cn(
                'text-xs font-medium transition-colors',
                isActive ? 'text-accent font-semibold' : isComplete ? 'text-foreground' : 'text-muted-foreground',
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'flex-1 mx-3 transition-colors',
                isComplete ? 'border-t-2 border-accent' : 'border-t-2 border-dashed border-border',
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 4: Vertical Timeline with Gradient Rail ───────────

function VerticalGradientRailTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative pl-8">
      {/* Gradient rail */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-border" />
      <div
        className="absolute left-3 top-0 w-[2px] transition-all duration-500"
        style={{
          height: `${(activeStep / (steps.length - 1)) * 100}%`,
          background: 'var(--gradient-text)',
        }}
      />

      <div className="space-y-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isComplete = i < activeStep;
          const isHovered = hovered === i;

          return (
            <div
              key={i}
              className="relative flex items-start gap-4 cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Node */}
              <div
                className={cn(
                  'absolute -left-5 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 z-10',
                  isComplete && 'bg-accent text-accent-foreground',
                  isActive && 'text-accent-foreground scale-125',
                  !isComplete && !isActive && 'bg-card border-2 border-border text-muted-foreground',
                  isHovered && !isComplete && !isActive && 'border-accent/60 text-accent scale-110',
                )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
              >
                {isComplete ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
              </div>

              {/* Content */}
              <div className={cn(
                'pl-3 pb-2 transition-all duration-300',
                isHovered && 'translate-x-1',
              )}>
                <p className={cn(
                  'text-sm font-semibold transition-colors',
                  isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
                )}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isComplete ? 'Completed' : isActive ? 'In progress' : 'Upcoming'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STYLE 5: Pill-Free Progress Bar with Icon Markers ───────

function MarkerBarTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const progress = (activeStep / (steps.length - 1)) * 100;

  return (
    <div className="space-y-3">
      {/* Bar */}
      <div className="relative h-2 bg-muted rounded-sm overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-sm transition-all duration-500"
          style={{
            width: `${progress}%`,
            background: 'var(--gradient-text)',
            boxShadow: '0 0 16px hsl(var(--accent-glow) / 0.4)',
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isComplete = i < activeStep;
          const isHovered = hovered === i;

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={cn(
                'w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300',
                isComplete && 'bg-accent/15 text-accent',
                isActive && 'text-accent-foreground',
                !isComplete && !isActive && 'bg-muted text-muted-foreground',
                isHovered && 'scale-110 shadow-md',
              )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
              >
                {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={cn(
                'text-[10px] font-semibold uppercase tracking-wide transition-colors',
                isActive ? 'text-accent' : isComplete ? 'text-foreground/80' : 'text-muted-foreground',
                isHovered && 'text-accent',
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STYLE 6: Chevron Steps (Breadcrumb-style) ──────────────

function ChevronStepsTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-stretch">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2 px-5 py-3 text-xs font-semibold cursor-pointer transition-all duration-300 relative',
              i === 0 && 'rounded-l-lg',
              i === steps.length - 1 && 'rounded-r-lg',
              isComplete && 'bg-accent/10 text-accent',
              isActive && 'text-accent-foreground z-10',
              !isComplete && !isActive && 'bg-muted/40 text-muted-foreground',
              isHovered && !isActive && 'bg-accent/15 text-accent',
            )}
            style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {isComplete ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{step.label}</span>
            {/* Chevron separator */}
            {i < steps.length - 1 && (
              <div className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-0 h-0',
                'border-y-[18px] border-y-transparent border-l-[10px]',
                isComplete || isActive ? 'border-l-accent/30' : 'border-l-border',
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STYLE 7: Stacked Cards (Delivery Process) ──────────────

function StackedCardTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className={cn(
              'relative p-4 rounded-lg border cursor-pointer transition-all duration-300 text-center',
              isComplete && 'border-accent/30 bg-accent/5',
              isActive && 'border-transparent shadow-xl text-accent-foreground',
              !isComplete && !isActive && 'border-border bg-card',
              isHovered && !isActive && 'border-accent/40 -translate-y-1 shadow-lg',
            )}
            style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Day label */}
            <span className={cn(
              'text-[10px] font-mono uppercase tracking-widest',
              isActive ? 'text-accent-foreground/60' : 'text-muted-foreground',
            )}>
              Day {i + 1}
            </span>

            <div className={cn(
              'w-10 h-10 mx-auto my-3 rounded-lg flex items-center justify-center transition-all',
              isComplete && 'bg-accent/15 text-accent',
              isActive && 'bg-accent-foreground/20 text-accent-foreground',
              !isComplete && !isActive && 'bg-muted text-muted-foreground',
              isHovered && !isComplete && !isActive && 'bg-accent/10 text-accent',
            )}>
              {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>

            <p className={cn(
              'text-xs font-semibold',
              isActive ? 'text-accent-foreground' : isComplete ? 'text-foreground' : 'text-muted-foreground',
            )}>
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── STYLE 8: Gradient Underline Tabs ────────────────────────

function GradientUnderlineTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex border-b border-border">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isHovered = hovered === i;

        return (
          <div
            key={i}
            className={cn(
              'flex-1 flex flex-col items-center gap-2 py-4 cursor-pointer relative transition-all duration-300',
              isActive && 'text-accent',
              isComplete && 'text-foreground/70',
              !isComplete && !isActive && 'text-muted-foreground',
              isHovered && 'text-accent',
            )}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className={cn(
              'w-8 h-8 rounded-md flex items-center justify-center transition-all',
              isHovered && 'scale-110',
            )}>
              {isComplete ? <Check className="w-4 h-4 text-accent" /> : <Icon className="w-4 h-4" />}
            </div>
            <span className="text-xs font-medium">{step.label}</span>

            {/* Gradient underline */}
            {(isActive || isComplete) && (
              <span
                className="absolute bottom-0 left-2 right-2 h-[3px] rounded-t-sm"
                style={{
                  background: isActive ? 'var(--gradient-text)' : 'hsl(var(--accent) / 0.3)',
                  boxShadow: isActive ? '0 0 12px hsl(var(--accent-glow) / 0.4)' : 'none',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── SHOWCASE CARD ────────────────────────────────────────────

function TimelineShowcaseCard({
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
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

// ─── INTERACTIVE STEP CONTROL ────────────────────────────────

function StepControl({ steps, activeStep, onChange }: { steps: StepData[]; activeStep: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="font-mono">Active step:</span>
      {steps.map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={cn(
            'w-6 h-6 rounded-md text-xs font-bold transition-all',
            i === activeStep ? 'bg-accent text-accent-foreground' : 'bg-muted hover:bg-accent/20',
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────

export default function PlaygroundTimelines() {
  useAdminAuth();
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [deliveryStep, setDeliveryStep] = useState(2);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-14 sm:h-16 items-center gap-4 px-4">
          <Link to="/admin/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-base sm:text-xl font-bold">Playground</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Timeline & stage indicator alternatives</p>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Timeline & Stage Indicators</h2>
            <p className="text-muted-foreground max-w-2xl">
              8 premium timeline/progress styles for checkout flows and delivery processes.
              All support hover states, two-tone color schemes, and gradient accents.
              Click the step buttons to preview different states.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Style 1 */}
            <TimelineShowcaseCard
              number={1}
              name="Gradient Connector Line"
              description="Animated gradient fills the connector as steps complete. Clean horizontal flow."
              inspiration="Stripe checkout, Linear progress, Shopify"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <GradientConnectorTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
              <div className="bg-background border border-border/30 rounded-lg p-6">
                <GradientConnectorTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 2 */}
            <TimelineShowcaseCard
              number={2}
              name="Two-Tone Split Blocks"
              description="Full-width segmented blocks with darker icon containers. Active step gets gradient fill."
              inspiration="Vercel deployment steps, Notion onboarding"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <TwoToneSplitTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
              <div className="bg-background border border-border/30 rounded-lg p-6">
                <TwoToneSplitTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 3 */}
            <TimelineShowcaseCard
              number={3}
              name="Numbered Circles with Glow"
              description="Classic numbered circles enhanced with blur glow halos on active/hover. Dashed connectors for pending."
              inspiration="Apple order tracking, Figma versioning"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <GlowCircleTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 4 */}
            <TimelineShowcaseCard
              number={4}
              name="Vertical Gradient Rail"
              description="Vertical layout with a gradient-filled rail that grows downward. Perfect for delivery process."
              inspiration="GitHub Actions, Vercel build logs"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <VerticalGradientRailTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 5 */}
            <TimelineShowcaseCard
              number={5}
              name="Marker Bar"
              description="Single gradient progress bar with icon markers below. Compact and glowing."
              inspiration="Spotify progress, YouTube upload, AWS deploy"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <MarkerBarTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 6 */}
            <TimelineShowcaseCard
              number={6}
              name="Chevron Steps"
              description="Breadcrumb-style chevron flow. Active step highlighted with gradient fill."
              inspiration="AWS console wizards, Salesforce setup flows"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6 overflow-x-auto">
                <ChevronStepsTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 7 */}
            <TimelineShowcaseCard
              number={7}
              name="Stacked Cards"
              description="Card-per-step with day labels. Active card gets gradient background. Hover lifts card."
              inspiration="Asana project boards, Monday.com, Trello"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <StackedCardTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 8 */}
            <TimelineShowcaseCard
              number={8}
              name="Gradient Underline Tabs"
              description="Tab-style layout with gradient underline on active + muted underline on complete. Glow effect."
              inspiration="Material Design tabs, Tailwind UI, Radix Tabs"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <GradientUnderlineTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>
          </div>
        </div>
      </main>
    </div>
  );
}
