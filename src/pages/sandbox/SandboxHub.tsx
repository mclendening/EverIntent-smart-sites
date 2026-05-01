/**
 * SandboxHub - Index page linking to the three palette prototypes.
 * Uses inline styles only. No design tokens. Noindex.
 */
import { Link } from 'react-router-dom';

const card: React.CSSProperties = {
  display: 'block',
  padding: '32px',
  borderRadius: '4px',
  textDecoration: 'none',
  border: '1px solid #e5e5e5',
  transition: 'transform 200ms ease, box-shadow 200ms ease',
};

const palettes = [
  {
    slug: 'concierge',
    name: 'Option A — Concierge',
    sub: 'Warm bone · Espresso · Burnt sienna',
    bg: '#FAF7F2',
    fg: '#231C16',
    accent: '#DC5A1F',
  },
  {
    slug: 'quiet-authority',
    name: 'Option B — Quiet Authority',
    sub: 'Off-white · Slate · Crimson',
    bg: '#F4F4F2',
    fg: '#0F1115',
    accent: '#B91C1C',
  },
  {
    slug: 'atelier-cobalt',
    name: 'Option C — Atelier Cobalt',
    sub: 'Warm cream · Cobalt · Sienna',
    bg: '#F5F1E8',
    fg: '#0B1B4A',
    accent: '#C2410C',
  },
];

export default function SandboxHub() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#111' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888', margin: 0 }}>
          Internal · Noindex
        </p>
        <h1 style={{ fontSize: '40px', lineHeight: 1.1, margin: '12px 0 8px', fontWeight: 600 }}>
          Design Sandbox
        </h1>
        <p style={{ maxWidth: '60ch', color: '#555', fontSize: '17px', lineHeight: 1.6 }}>
          Three full mini-site prototypes — Home, Product, Compare, Checkout — built with hardcoded
          inline styles (no design tokens). Use these to evaluate the palette + logo treatment before
          we commit to a system-wide migration.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '40px' }}>
          {palettes.map((p) => (
            <Link key={p.slug} to={`/sandbox/${p.slug}`} style={{ ...card, background: p.bg, color: p.fg }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '2px', background: p.bg, border: '1px solid rgba(0,0,0,0.1)' }} />
                <span style={{ width: '28px', height: '28px', borderRadius: '2px', background: p.fg }} />
                <span style={{ width: '28px', height: '28px', borderRadius: '2px', background: p.accent }} />
              </div>
              <h2 style={{ fontSize: '22px', margin: '0 0 4px', fontWeight: 600 }}>{p.name}</h2>
              <p style={{ fontSize: '14px', margin: 0, opacity: 0.75 }}>{p.sub}</p>
              <p style={{ fontSize: '13px', margin: '24px 0 0', color: p.accent, fontWeight: 600 }}>
                Open prototype →
              </p>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: '64px', padding: '24px', background: '#fff', border: '1px solid #eee', borderRadius: '4px', fontSize: '14px', color: '#555', lineHeight: 1.7 }}>
          <strong style={{ color: '#111' }}>How to evaluate:</strong> Each prototype has Home →
          Product → Compare → Checkout. Walk through the same flow on all three. Notice spacing
          rhythm, CTA prominence, headline weight, and how the logo wordmark sits on light
          surfaces. None of these pages affect the live site — they are isolated from theme
          tokens and excluded from sitemap/SSG.
        </div>
      </div>
    </div>
  );
}