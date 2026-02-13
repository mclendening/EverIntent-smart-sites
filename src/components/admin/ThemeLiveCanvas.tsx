/**
 * @fileoverview ThemeLiveCanvas — Live component preview that updates in real-time
 * as the user modifies theme tokens in the editor sidebar.
 *
 * Renders actual UI components (hero section, cards, buttons, forms, badges, toggles)
 * styled with the theme's current token values via inline CSS custom properties.
 * This creates a Shopify-style "what you see is what you get" editing experience.
 *
 * ## Architecture
 * - Receives resolved color/typography/motion values as props.
 * - Wraps everything in a scoped container with CSS variable overrides.
 * - Components shown are representative of production UI patterns.
 */

import type { AccentConfig, StaticColors, GradientConfig, GHLChatConfig } from '@/hooks/useThemeAdmin';
import type { EcommerceColors } from '@/components/admin/EcommerceColorEditor';
import type { TypographyConfig } from '@/components/admin/TypographyEditor';
import type { MotionConfig } from '@/components/admin/MotionEditor';
import type { DarkModeOverrides } from '@/components/admin/DarkModeOverridesEditor';
import { Phone, Mail, Star, ArrowRight, Check, Shield, Clock } from 'lucide-react';

interface ThemeLiveCanvasProps {
  accentConfig: AccentConfig;
  staticColors: StaticColors;
  gradientConfigs: GradientConfig;
  darkModeOverrides: DarkModeOverrides;
  ecommerceColors: EcommerceColors;
  typographyConfig: TypographyConfig;
  motionConfig: MotionConfig;
  defaultMode: string;
  themeName: string;
}

function hsl(val: string) { return `hsl(${val})`; }

export function ThemeLiveCanvas({
  accentConfig, staticColors: sc, gradientConfigs, darkModeOverrides,
  ecommerceColors, typographyConfig, motionConfig, defaultMode, themeName,
}: ThemeLiveCanvasProps) {
  const accent = accentConfig.accent || '38 92% 50%';
  const gold = (ecommerceColors as any)?.gold || '43 96% 56%';
  const fontHeading = (typographyConfig as any)?.headingFont || 'Inter';
  const fontBody = (typographyConfig as any)?.bodyFont || 'Inter';
  const isDark = defaultMode === 'dark';

  // Resolve colors based on mode
  const bg = isDark ? (darkModeOverrides as any)?.background || sc.background : sc.background;
  const fg = isDark ? (darkModeOverrides as any)?.foreground || sc.foreground : sc.foreground;
  const card = isDark ? (darkModeOverrides as any)?.card || sc.card : sc.card;
  const cardFg = isDark ? (darkModeOverrides as any)?.cardForeground || sc.cardForeground : sc.cardForeground;
  const muted = isDark ? (darkModeOverrides as any)?.muted || sc.muted : sc.muted;
  const mutedFg = isDark ? (darkModeOverrides as any)?.mutedForeground || sc.mutedForeground : sc.mutedForeground;
  const border = isDark ? (darkModeOverrides as any)?.border || sc.border : sc.border;
  const primary = isDark ? (darkModeOverrides as any)?.primary || sc.primary : sc.primary;
  const primaryFg = isDark ? (darkModeOverrides as any)?.primaryForeground || sc.primaryForeground : sc.primaryForeground;

  return (
    <div
      className="h-full overflow-auto"
      style={{
        backgroundColor: hsl(bg),
        color: hsl(fg),
        fontFamily: `${fontBody}, system-ui, sans-serif`,
      }}
    >
      {/* ── Simulated Navigation ── */}
      <nav
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{
          backgroundColor: hsl(primary),
          borderColor: `${hsl(border)}33`,
          color: hsl(primaryFg),
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md" style={{ backgroundColor: hsl(accent) }} />
          <span className="font-semibold text-sm" style={{ fontFamily: `${fontHeading}, system-ui` }}>
            {themeName || 'Brand'}
          </span>
        </div>
        <div className="flex gap-4 text-xs opacity-80">
          <span>Home</span>
          <span>Services</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <button
          className="text-xs px-3 py-1.5 rounded-md font-medium"
          style={{ backgroundColor: hsl(accent), color: hsl(primaryFg) }}
        >
          Get Quote
        </button>
      </nav>

      {/* ── Hero Section ── */}
      <section className="px-6 py-10 text-center">
        <h1
          className="text-2xl font-bold mb-2 leading-tight"
          style={{ fontFamily: `${fontHeading}, system-ui`, color: hsl(fg) }}
        >
          Transform Your Business Today
        </h1>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: hsl(mutedFg) }}>
          Professional solutions that deliver measurable results for local businesses.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className="px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-transform hover:scale-105"
            style={{ backgroundColor: hsl(accent), color: hsl(primaryFg) }}
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </button>
          <button
            className="px-5 py-2.5 rounded-md text-sm font-medium border-2 transition-colors"
            style={{ borderColor: hsl(border), color: hsl(fg), backgroundColor: 'transparent' }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div
        className="flex items-center justify-center gap-6 py-3 text-xs border-y"
        style={{ backgroundColor: hsl(muted), borderColor: hsl(border), color: hsl(mutedFg) }}
      >
        <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> Licensed & Insured</span>
        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" style={{ color: hsl(gold) }} /> 4.9 Rating</span>
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Same-Day Service</span>
      </div>

      {/* ── Service Cards ── */}
      <section className="px-6 py-8">
        <h2
          className="text-lg font-bold mb-4 text-center"
          style={{ fontFamily: `${fontHeading}, system-ui`, color: hsl(fg) }}
        >
          Our Services
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {['Repair', 'Install', 'Maintain'].map((svc, i) => (
            <div
              key={svc}
              className="rounded-lg p-4 border transition-shadow hover:shadow-md"
              style={{
                backgroundColor: hsl(card),
                borderColor: hsl(border),
                color: hsl(cardFg),
              }}
            >
              <div
                className="w-8 h-8 rounded-md mb-2 flex items-center justify-center"
                style={{ backgroundColor: `${hsl(accent)}15` }}
              >
                <Check className="h-4 w-4" style={{ color: hsl(accent) }} />
              </div>
              <h3 className="text-sm font-semibold mb-1" style={{ fontFamily: `${fontHeading}, system-ui` }}>
                {svc} Services
              </h3>
              <p className="text-xs" style={{ color: hsl(mutedFg) }}>
                Professional {svc.toLowerCase()} solutions for your home or business.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="px-6 py-6">
        <div
          className="rounded-lg p-5 border"
          style={{ backgroundColor: hsl(card), borderColor: hsl(border) }}
        >
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" style={{ color: hsl(gold) }} />
            ))}
          </div>
          <p className="text-sm italic mb-3" style={{ color: hsl(cardFg) }}>
            "Incredible service from start to finish. The team was professional, on time, and the results exceeded our expectations."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: hsl(muted) }} />
            <div>
              <p className="text-xs font-semibold" style={{ color: hsl(cardFg) }}>Sarah Johnson</p>
              <p className="text-[10px]" style={{ color: hsl(mutedFg) }}>Austin, TX</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA / Contact Form ── */}
      <section
        className="px-6 py-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${hsl(primary)}, ${hsl(sc.primaryLight || primary)})`,
          color: hsl(primaryFg),
        }}
      >
        <h2 className="text-lg font-bold mb-2" style={{ fontFamily: `${fontHeading}, system-ui` }}>
          Ready to Get Started?
        </h2>
        <p className="text-xs opacity-80 mb-4">Schedule your free consultation today.</p>
        <div className="max-w-xs mx-auto space-y-2">
          <input
            className="w-full px-3 py-2 rounded-md text-xs border"
            placeholder="Your name"
            style={{
              backgroundColor: `${hsl(primaryFg)}15`,
              borderColor: `${hsl(primaryFg)}30`,
              color: hsl(primaryFg),
            }}
            readOnly
          />
          <input
            className="w-full px-3 py-2 rounded-md text-xs border"
            placeholder="Phone number"
            style={{
              backgroundColor: `${hsl(primaryFg)}15`,
              borderColor: `${hsl(primaryFg)}30`,
              color: hsl(primaryFg),
            }}
            readOnly
          />
          <button
            className="w-full py-2.5 rounded-md text-sm font-bold"
            style={{ backgroundColor: hsl(gold), color: hsl(primary) }}
          >
            Get Free Quote →
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-3 text-[10px] opacity-70">
          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (555) 123-4567</span>
          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> info@brand.com</span>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 py-4 text-center text-xs border-t"
        style={{ backgroundColor: hsl(primary), color: hsl(primaryFg), borderColor: `${hsl(border)}33`, opacity: 0.9 }}
      >
        © 2026 {themeName || 'Brand'}. All rights reserved.
      </footer>
    </div>
  );
}
