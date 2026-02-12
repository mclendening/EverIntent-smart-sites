/**
 * @fileoverview Admin Playground — Timeline & Stage Indicator Showcase
 * Premium progress/timeline alternatives for checkout flows and delivery processes.
 * All styles use theme design tokens exclusively with hover + two-tone + gradient support.
 */

import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingCart, User, FileText, CreditCard, Rocket, Palette, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { AccentPickerBar, AccentWrapper, useAccentState } from '@/components/admin/AccentPicker';

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

// ─── STYLE 9: Morphing Shape Timeline (Framer Motion) ───────

function MorphingShapeTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <React.Fragment key={i}>
            <motion.div
              className="flex flex-col items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="relative w-12 h-12 flex items-center justify-center"
                animate={{
                  borderRadius: isActive ? '28%' : isComplete ? '50%' : '16%',
                  rotate: isActive ? 0 : isComplete ? 0 : 45,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  background: isComplete || isActive ? 'var(--gradient-text)' : undefined,
                }}
              >
                {/* Inner glow ring on active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0"
                    style={{ borderRadius: 'inherit' }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0px hsl(var(--accent) / 0.3)',
                        '0 0 0 8px hsl(var(--accent) / 0)',
                      ],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                <motion.div
                  animate={{ rotate: isComplete ? 0 : isActive ? 0 : -45 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={cn(
                    !isComplete && !isActive && 'text-muted-foreground',
                    (isComplete || isActive) && 'text-accent-foreground',
                  )}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </motion.div>
              </motion.div>

              <motion.span
                className="text-xs font-medium"
                animate={{
                  color: isActive
                    ? 'hsl(var(--accent))'
                    : isComplete
                    ? 'hsl(var(--foreground))'
                    : 'hsl(var(--muted-foreground))',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {step.label}
              </motion.span>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-border relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'var(--gradient-text)' }}
                  initial={false}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.8 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 10: Elastic Accordion (Vertical, Spring Physics) ──

function ElasticAccordionTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="space-y-2">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <motion.div
            key={i}
            layout
            className={cn(
              'relative rounded-lg border cursor-pointer overflow-hidden',
              isActive ? 'border-accent/40' : isComplete ? 'border-accent/20' : 'border-border',
            )}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {/* Gradient side rail */}
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
              animate={{
                opacity: isComplete || isActive ? 1 : 0.15,
              }}
              style={{ background: 'var(--gradient-text)' }}
            />

            <div className="flex items-center gap-3 px-5 py-3">
              <motion.div
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
                  isComplete && 'bg-accent/15 text-accent',
                  !isComplete && !isActive && 'bg-muted text-muted-foreground',
                )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isComplete ? 'check' : 'icon'}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className={isActive ? 'text-accent-foreground' : undefined}
                  >
                    {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-semibold',
                  isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
                )}>
                  {step.label}
                </p>
              </div>

              <motion.span
                className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                animate={{ opacity: isActive ? 1 : 0.5 }}
              >
                {isComplete ? 'Done' : isActive ? 'Now' : `Step ${i + 1}`}
              </motion.span>
            </div>

            {/* Expandable detail area for active step */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-3 pt-0">
                    <div className="h-1.5 rounded-sm overflow-hidden bg-accent/10">
                      <motion.div
                        className="h-full rounded-sm"
                        style={{ background: 'var(--gradient-text)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Currently in progress…</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── STYLE 11: Staggered Reveal Cards ────────────────────────

function StaggeredRevealTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
      key={activeStep} // re-trigger stagger on step change
    >
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <motion.div
            key={i}
            variants={item}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            whileHover={{
              y: -6,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            }}
            className={cn(
              'relative p-5 rounded-lg border cursor-pointer text-center',
              isActive ? 'border-transparent shadow-2xl' : isComplete ? 'border-accent/25 bg-accent/5' : 'border-border bg-card',
            )}
            style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
          >
            {/* Floating number */}
            <motion.span
              className={cn(
                'absolute top-2 right-3 text-[40px] font-black leading-none',
                isActive ? 'text-accent-foreground/10' : 'text-muted-foreground/5',
              )}
              animate={{ scale: isActive ? 1.1 : 1 }}
            >
              {i + 1}
            </motion.span>

            <motion.div
              className={cn(
                'w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center relative z-10',
                isComplete && 'bg-accent/15 text-accent',
                isActive && 'bg-accent-foreground/20 text-accent-foreground',
                !isComplete && !isActive && 'bg-muted text-muted-foreground',
              )}
              animate={{ rotate: isActive ? [0, -5, 5, 0] : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </motion.div>

            <p className={cn(
              'text-xs font-bold relative z-10',
              isActive ? 'text-accent-foreground' : isComplete ? 'text-foreground' : 'text-muted-foreground',
            )}>
              {step.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── STYLE 12: Liquid Fill Timeline ──────────────────────────

function LiquidFillTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <React.Fragment key={i}>
            <motion.div
              className="flex flex-col items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="relative w-14 h-14">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 rounded-xl border-2"
                  animate={{
                    borderColor: isComplete || isActive
                      ? 'hsl(var(--accent))'
                      : 'hsl(var(--border))',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Liquid fill from bottom */}
                <div className="absolute inset-[2px] rounded-[10px] overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ background: 'var(--gradient-text)' }}
                    initial={false}
                    animate={{
                      height: isComplete ? '100%' : isActive ? '50%' : '0%',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 14,
                      mass: 0.8,
                    }}
                  />
                </div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isComplete ? 'check' : step.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className={cn(
                        isComplete ? 'text-accent-foreground' : isActive ? 'text-accent-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <motion.span
                className="text-xs font-medium"
                animate={{
                  color: isActive ? 'hsl(var(--accent))' : isComplete ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                }}
              >
                {step.label}
              </motion.span>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="flex-1 mx-1 relative h-[2px]">
                <div className="absolute inset-0 bg-border rounded-full" />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'var(--gradient-text)' }}
                  initial={false}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 13: Ambient Pulse Dots (Minimal, Meditative) ─────

function AmbientPulseTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <React.Fragment key={i}>
            <motion.div
              className="flex flex-col items-center gap-3 cursor-pointer"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                {/* Ambient pulse rings */}
                {isActive && (
                  <>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/20"
                      animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/15"
                      animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                    />
                  </>
                )}

                <motion.div
                  className={cn(
                    'relative w-10 h-10 rounded-full flex items-center justify-center z-10',
                    isComplete && 'bg-accent text-accent-foreground',
                    !isComplete && !isActive && 'bg-muted text-muted-foreground',
                  )}
                  style={isActive ? { background: 'var(--gradient-text)' } : undefined}
                  animate={{
                    scale: isActive ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: isActive ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isComplete ? 'done' : step.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className={isActive ? 'text-accent-foreground' : undefined}
                    >
                      {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="text-center">
                <motion.p
                  className="text-xs font-semibold"
                  animate={{
                    color: isActive ? 'hsl(var(--accent))' : isComplete ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  {step.label}
                </motion.p>
                <motion.p
                  className="text-[10px] text-muted-foreground/50 font-mono mt-0.5"
                  animate={{ opacity: isActive || isComplete ? 1 : 0.4 }}
                >
                  {isComplete ? '✓ Complete' : isActive ? 'Active' : `Step ${i + 1}`}
                </motion.p>
              </div>
            </motion.div>

            {i < steps.length - 1 && (
              <div className="flex-1 flex items-center mx-1">
                {/* Dotted connector with animated fill */}
                <div className="flex-1 flex items-center gap-1">
                  {[...Array(5)].map((_, d) => (
                    <motion.div
                      key={d}
                      className="flex-1 h-[2px] rounded-full"
                      animate={{
                        backgroundColor: isComplete
                          ? 'hsl(var(--accent))'
                          : 'hsl(var(--border))',
                      }}
                      transition={{ delay: isComplete ? d * 0.05 : 0 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 14: Layered Depth Cards (Parallax hover) ─────────

function LayeredDepthTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <motion.div
            key={i}
            className="relative cursor-pointer perspective-[600px]"
            whileHover="hover"
            initial="rest"
          >
            {/* Shadow layer */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-accent/10 blur-xl"
              variants={{
                rest: { opacity: 0, y: 0 },
                hover: { opacity: isActive ? 0.6 : 0.3, y: 8 },
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />

            {/* Card */}
            <motion.div
              className={cn(
                'relative rounded-xl border p-5 text-center overflow-hidden',
                isActive ? 'border-accent/40' : isComplete ? 'border-accent/20 bg-accent/5' : 'border-border bg-card',
              )}
              variants={{
                rest: { rotateX: 0, y: 0 },
                hover: { rotateX: -3, y: -4 },
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Gradient shimmer on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'var(--gradient-text)' }}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              <motion.div
                className="relative z-10 flex flex-col items-center gap-3"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -2 },
                }}
              >
                {/* Step number floating behind */}
                <span className={cn(
                  'absolute -top-2 text-[48px] font-black leading-none select-none',
                  isActive ? 'text-accent/10' : 'text-muted-foreground/5',
                )}>
                  {i + 1}
                </span>

                <motion.div
                  className={cn(
                    'relative w-12 h-12 rounded-xl flex items-center justify-center',
                    isComplete && 'bg-accent/15 text-accent',
                    isActive && 'text-accent-foreground',
                    !isComplete && !isActive && 'bg-muted text-muted-foreground',
                  )}
                  style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.1 },
                  }}
                >
                  {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </motion.div>

                <p className={cn(
                  'text-xs font-bold relative z-10',
                  isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
                )}>
                  {step.label}
                </p>

                {/* Micro progress bar */}
                <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--gradient-text)' }}
                    initial={false}
                    animate={{ width: isComplete ? '100%' : isActive ? '45%' : '0%' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── STYLE 15: Minimal Dot Track ─────────────────────────────

function MinimalDotTrackTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className={cn(
                  'w-4 h-4 rounded-full border-2 transition-all cursor-pointer',
                  isComplete && 'border-accent bg-accent',
                  isActive && 'border-accent bg-transparent',
                  !isComplete && !isActive && 'border-border bg-transparent',
                )}
                whileHover={{ scale: 1.3 }}
                animate={isActive ? { boxShadow: ['0 0 0 0px hsl(var(--accent) / 0.3)', '0 0 0 6px hsl(var(--accent) / 0)', '0 0 0 0px hsl(var(--accent) / 0.3)'] } : {}}
                transition={isActive ? { duration: 2, repeat: Infinity } : { type: 'spring' }}
              >
                {isComplete && <Check className="w-2.5 h-2.5 text-accent-foreground mx-auto mt-[1px]" />}
              </motion.div>
              <span className={cn(
                'text-[10px] font-medium',
                isActive ? 'text-accent' : isComplete ? 'text-foreground/70' : 'text-muted-foreground',
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-[1px] mx-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: isComplete ? 'hsl(var(--accent))' : 'hsl(var(--border))' }}
                  initial={false}
                  animate={{ scaleX: isComplete ? 1 : 0.3, opacity: isComplete ? 1 : 0.3 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── STYLE 16: Zig-Zag Path ─────────────────────────────────

function ZigZagPathTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;
        const isEven = i % 2 === 0;

        return (
          <motion.div
            key={i}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all',
              isEven ? 'flex-row' : 'flex-row-reverse',
              isActive ? 'border-accent/40 bg-accent/5' : isComplete ? 'border-accent/20' : 'border-border',
            )}
            whileHover={{ x: isEven ? 4 : -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                isComplete && 'bg-accent text-accent-foreground',
                isActive && 'text-accent-foreground',
                !isComplete && !isActive && 'bg-muted text-muted-foreground',
              )}
              style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
            >
              {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
            </div>
            <div className={isEven ? 'text-left' : 'text-right'}>
              <p className={cn(
                'text-sm font-semibold',
                isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
              )}>
                {step.label}
              </p>
              <p className="text-[10px] text-muted-foreground">Step {i + 1}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── STYLE 17: Orbit Ring ────────────────────────────────────

function OrbitRingTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="relative flex items-center justify-center py-6">
      <div className="relative w-48 h-48">
        {/* Orbit track */}
        <div className="absolute inset-0 rounded-full border border-border" />
        <motion.div
          className="absolute inset-0 rounded-full border border-accent/30"
          style={{
            clipPath: `polygon(0 0, ${((activeStep + 1) / steps.length) * 100}% 0, ${((activeStep + 1) / steps.length) * 100}% 100%, 0 100%)`,
          }}
        />

        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isComplete = i < activeStep;
          const angle = (i / steps.length) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 42 * Math.cos(rad);
          const y = 50 + 42 * Math.sin(rad);

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              whileHover={{ scale: 1.2 }}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  isComplete && 'bg-accent text-accent-foreground',
                  isActive && 'text-accent-foreground',
                  !isComplete && !isActive && 'bg-card border border-border text-muted-foreground',
                )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
              >
                {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <p className={cn(
                'text-[10px] font-medium text-center mt-1 whitespace-nowrap',
                isActive ? 'text-accent' : 'text-muted-foreground',
              )}>
                {step.label}
              </p>
            </motion.div>
          );
        })}

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{activeStep + 1}</p>
            <p className="text-[10px] text-muted-foreground">of {steps.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STYLE 18: Split Panel ───────────────────────────────────

function SplitPanelTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <motion.div
            key={i}
            className={cn(
              'relative p-4 cursor-pointer',
              isActive ? 'bg-accent/10' : 'bg-card',
            )}
            whileHover={{ backgroundColor: 'hsl(var(--accent) / 0.05)' }}
          >
            {isActive && (
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'var(--gradient-text)' }}
                layoutId="splitPanelIndicator"
              />
            )}
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-md flex items-center justify-center',
                isComplete && 'bg-accent/15 text-accent',
                isActive && 'text-accent-foreground',
                !isComplete && !isActive && 'bg-muted text-muted-foreground',
              )} style={isActive ? { background: 'var(--gradient-cta)' } : undefined}>
                {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <div>
                <p className={cn(
                  'text-xs font-bold',
                  isActive ? 'text-accent' : isComplete ? 'text-foreground' : 'text-muted-foreground',
                )}>
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground">{isComplete ? 'Done' : isActive ? 'Current' : 'Pending'}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── STYLE 19: Ribbon Flow ───────────────────────────────────

function RibbonFlowTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="flex items-stretch">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <div key={i} className="flex-1 relative">
            <div
              className={cn(
                'relative z-10 flex flex-col items-center gap-2 py-4 px-2',
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  isComplete && 'bg-accent text-accent-foreground',
                  isActive && 'text-accent-foreground shadow-lg',
                  !isComplete && !isActive && 'bg-muted text-muted-foreground',
                )}
                style={isActive ? { background: 'var(--gradient-cta)' } : undefined}
              >
                {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={cn(
                'text-[10px] font-semibold',
                isActive ? 'text-accent' : isComplete ? 'text-foreground/70' : 'text-muted-foreground',
              )}>
                {step.label}
              </span>
            </div>
            {/* Ribbon background */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1"
              style={{
                background: isComplete ? 'hsl(var(--accent) / 0.3)' : isActive ? 'var(--gradient-text)' : 'hsl(var(--border))',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── STYLE 20: Typewriter Terminal ───────────────────────────

function TypewriterTerminalTimeline({ steps, activeStep }: { steps: StepData[]; activeStep: number }) {
  return (
    <div className="font-mono text-xs space-y-1 bg-card border border-border rounded-lg p-4">
      {steps.map((step, i) => {
        const isActive = i === activeStep;
        const isComplete = i < activeStep;

        return (
          <div key={i} className="flex items-center gap-2">
            <span className="text-muted-foreground/40 w-4 text-right">{i + 1}</span>
            <span className={cn(
              'w-2',
              isComplete ? 'text-accent' : isActive ? 'text-accent' : 'text-muted-foreground/30',
            )}>
              {isComplete ? '✓' : isActive ? '›' : '·'}
            </span>
            <span className={cn(
              isActive ? 'text-accent font-bold' : isComplete ? 'text-foreground/60' : 'text-muted-foreground/40',
            )}>
              {step.label}
            </span>
            {isActive && (
              <motion.span
                className="inline-block w-[6px] h-3 bg-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            {isComplete && <span className="text-muted-foreground/30">— done</span>}
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
            <p className="text-xs text-muted-foreground hidden sm:block">Timeline & stage indicator alternatives</p>
          </div>
        </div>
      </header>

      <main className="container py-6 sm:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">Timeline & Stage Indicators</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              20 premium timeline/progress styles for checkout flows and delivery processes.
              Styles 9–14 use Framer Motion for spring physics, morphing shapes, liquid fills,
              ambient pulses, and parallax depth. Styles 15–20 add minimal dots, zig-zag paths,
              orbit rings, and terminal aesthetics. Click step buttons to preview states.
            </p>
            <AccentPickerBar selected={accent} onChange={setAccent} flipped={flipped} onFlip={toggleFlip} />
          </div>

          <AccentWrapper accent={accent} flipped={flipped}>
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

            {/* ═══════ MOTION-RICH SECTION ═══════ */}
            <div className="pt-6 border-t border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-1">Motion-Rich Variants</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Framer Motion powered — spring physics, morphing shapes, and ambient effects.
              </p>
            </div>

            {/* Style 9 */}
            <TimelineShowcaseCard
              number={9}
              name="Morphing Shape"
              description="Steps morph between square → diamond → circle as they progress. Pulsing ring on active. Spring physics throughout."
              inspiration="Lottie animations, Stripe Identity, Vercel AI"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <MorphingShapeTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
              <div className="bg-background border border-border/30 rounded-lg p-6">
                <MorphingShapeTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 10 */}
            <TimelineShowcaseCard
              number={10}
              name="Elastic Accordion"
              description="Vertical stack where the active step expands with a spring-animated progress bar. Side rail with gradient. Icons swap with rotation."
              inspiration="Apple Music Now Playing, Spotify queue, Linear issues"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <ElasticAccordionTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 11 */}
            <TimelineShowcaseCard
              number={11}
              name="Staggered Reveal Cards"
              description="Cards cascade in with staggered spring animations. Giant watermark numbers. Active icon does a playful wobble."
              inspiration="Dribbble shot cards, Awwwards SOTD, Refokus"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <StaggeredRevealTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 12 */}
            <TimelineShowcaseCard
              number={12}
              name="Liquid Fill"
              description="Steps fill from bottom up like liquid pouring in. Active at 50%, complete at 100%. Spring-based fluid physics."
              inspiration="Battery indicators, water tracking apps, Headspace"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <LiquidFillTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 13 */}
            <TimelineShowcaseCard
              number={13}
              name="Ambient Pulse"
              description="Meditative double-ring pulse radiates from the active step. Dotted connectors fill segment by segment. Breathing scale animation."
              inspiration="Calm app, Apple Watch activity rings, meditation UIs"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <AmbientPulseTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
              <div className="bg-background border border-border/30 rounded-lg p-6">
                <AmbientPulseTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 14 */}
            <TimelineShowcaseCard
              number={14}
              name="Layered Depth Cards"
              description="Cards with 3D parallax tilt on hover. Dynamic shadow layer drops below. Shimmer overlay on active. Micro progress bars per card."
              inspiration="Apple Vision Pro UI, Nike SNKRS, Nothing OS widgets"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <LayeredDepthTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* ═══════ LAYOUT & EXPERIMENTAL ═══════ */}
            <div className="pt-6 border-t border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-1">Layout & Experimental Variants</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Minimal dots, alternating paths, orbital layouts, split panels, and terminal aesthetics.
              </p>
            </div>

            {/* Style 15 */}
            <TimelineShowcaseCard
              number={15}
              name="Minimal Dot Track"
              description="Ultra-minimal dots with pulsing ring on active. Connectors scale in with spring physics."
              inspiration="Notion onboarding, Figma tutorials, Ghost CMS"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <MinimalDotTrackTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 16 */}
            <TimelineShowcaseCard
              number={16}
              name="Zig-Zag Path"
              description="Steps alternate left-right alignment creating a winding path. Slides on hover."
              inspiration="Roadmap visualizations, product timelines, Notion roadmaps"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <ZigZagPathTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 17 */}
            <TimelineShowcaseCard
              number={17}
              name="Orbit Ring"
              description="Steps arranged in a circular orbit with center counter. Gradient arc fills as progress advances."
              inspiration="Loading indicators, fitness rings, smartwatch UIs"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <OrbitRingTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 18 */}
            <TimelineShowcaseCard
              number={18}
              name="Split Panel"
              description="2×2 grid panels with animated gradient indicator bar. Clean dashboard aesthetic."
              inspiration="Vercel dashboard, Supabase UI, admin panels"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <SplitPanelTimeline steps={checkoutSteps} activeStep={checkoutStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 19 */}
            <TimelineShowcaseCard
              number={19}
              name="Ribbon Flow"
              description="Continuous ribbon running through all steps. Active step elevated with shadow."
              inspiration="Award ceremonies, finish-line ribbons, Nike campaigns"
            >
              <StepControl steps={deliverySteps} activeStep={deliveryStep} onChange={setDeliveryStep} />
              <div className="bg-card border border-border rounded-lg p-6">
                <RibbonFlowTimeline steps={deliverySteps} activeStep={deliveryStep} />
              </div>
            </TimelineShowcaseCard>

            {/* Style 20 */}
            <TimelineShowcaseCard
              number={20}
              name="Typewriter Terminal"
              description="Monospace terminal output style with line numbers and blinking cursor. Developer aesthetic."
              inspiration="VS Code, Warp terminal, Vercel CLI deploy logs"
            >
              <StepControl steps={checkoutSteps} activeStep={checkoutStep} onChange={setCheckoutStep} />
              <TypewriterTerminalTimeline steps={checkoutSteps} activeStep={checkoutStep} />
            </TimelineShowcaseCard>
          </div>
          </AccentWrapper>
        </div>
      </main>
    </div>
  );
}
