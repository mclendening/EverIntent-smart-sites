/**
 * MiniSite - Reusable prototype mini-site for a palette option.
 * Renders Home, Product, Compare, Checkout as one SPA-style page with
 * internal section nav. ALL styling inline; no design tokens.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

export interface PaletteSpec {
  slug: string;
  name: string;
  bg: string;          // page background
  surface: string;     // raised surface / cards
  surfaceDark: string; // contrast band background
  fg: string;          // primary text
  muted: string;       // secondary text
  accent: string;      // CTA / brand accent
  accentInk: string;   // text on accent
  hairline: string;    // divider color
  fontHead: string;
  fontBody: string;
  logoSplit: 'solid' | 'split'; // wordmark style
}

type View = 'home' | 'product' | 'compare' | 'checkout';

export default function MiniSite({ p }: { p: PaletteSpec }) {
  const [view, setView] = useState<View>('home');

  return (
    <div style={{
      minHeight: '100vh',
      background: p.bg,
      color: p.fg,
      fontFamily: p.fontBody,
      WebkitFontSmoothing: 'antialiased',
    }}>
      <SandboxBar slug={p.slug} name={p.name} />
      <Header p={p} view={view} setView={setView} />
      {view === 'home' && <Home p={p} go={setView} />}
      {view === 'product' && <Product p={p} go={setView} />}
      {view === 'compare' && <Compare p={p} go={setView} />}
      {view === 'checkout' && <Checkout p={p} />}
      <Footer p={p} />
    </div>
  );
}

/* ---------- Sandbox bar (always on) ---------- */
function SandboxBar({ slug, name }: { slug: string; name: string }) {
  return (
    <div style={{
      background: '#111',
      color: '#fff',
      fontSize: '12px',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'system-ui, sans-serif',
      letterSpacing: '0.05em',
    }}>
      <span>SANDBOX · {slug.toUpperCase()} · noindex</span>
      <Link to="/sandbox" style={{ color: '#fff', textDecoration: 'underline' }}>← All palettes</Link>
    </div>
  );
}

/* ---------- Logo ---------- */
function Logo({ p, onLight = true }: { p: PaletteSpec; onLight?: boolean }) {
  const ink = onLight ? p.fg : p.bg;
  const accent = p.accent;
  return (
    <span style={{ fontFamily: p.fontHead, fontWeight: 600, fontSize: '20px', letterSpacing: '-0.01em' }}>
      <span style={{ color: ink }}>Ever</span>
      <span style={{ color: p.logoSplit === 'split' ? accent : ink }}>Intent</span>
    </span>
  );
}

/* ---------- Header ---------- */
function Header({ p, view, setView }: { p: PaletteSpec; view: View; setView: (v: View) => void }) {
  const navItem = (label: string, v: View): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: p.fontBody,
    fontSize: '14px',
    color: view === v ? p.fg : p.muted,
    fontWeight: view === v ? 600 : 400,
    padding: '8px 0',
    borderBottom: view === v ? `2px solid ${p.accent}` : '2px solid transparent',
  });
  return (
    <header style={{
      background: p.bg,
      borderBottom: `1px solid ${p.hairline}`,
      padding: '20px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '32px',
    }}>
      <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <Logo p={p} />
      </button>
      <nav style={{ display: 'flex', gap: '28px' }}>
        <button style={navItem('Home', 'home')} onClick={() => setView('home')}>Home</button>
        <button style={navItem('Product', 'product')} onClick={() => setView('product')}>Smart Websites</button>
        <button style={navItem('Compare', 'compare')} onClick={() => setView('compare')}>Compare</button>
      </nav>
      <button
        onClick={() => setView('checkout')}
        style={{
          background: p.accent,
          color: p.accentInk,
          border: 'none',
          padding: '12px 22px',
          fontFamily: p.fontBody,
          fontWeight: 600,
          fontSize: '14px',
          cursor: 'pointer',
          borderRadius: '2px',
        }}
      >
        Get started
      </button>
    </header>
  );
}

/* ---------- Sections shared ---------- */
const Section: React.FC<React.PropsWithChildren<{ bg?: string; color?: string; py?: string }>> = ({ children, bg, color, py = 'clamp(64px, 10vw, 120px)' }) => (
  <section style={{ background: bg, color, paddingTop: py, paddingBottom: py }}>
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px' }}>{children}</div>
  </section>
);

const Eyebrow = ({ p, n, label }: { p: PaletteSpec; n: string; label: string }) => (
  <p style={{ fontFamily: p.fontBody, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: p.accent, margin: 0, fontWeight: 600 }}>
    <span style={{ color: p.muted, marginRight: '12px' }}>{n}</span>{label}
  </p>
);

/* ---------- HOME ---------- */
function Home({ p, go }: { p: PaletteSpec; go: (v: View) => void }) {
  return (
    <>
      {/* Hero */}
      <Section py="clamp(80px, 12vw, 160px)">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <Eyebrow p={p} n="01" label="Smart Websites · Built on GHL" />
            <h1 style={{ fontFamily: p.fontHead, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05, margin: '20px 0 24px', fontWeight: 600, letterSpacing: '-0.02em', textWrap: 'balance' as React.CSSProperties['textWrap'] }}>
              Stop losing $48k a year to missed calls.
            </h1>
            <p style={{ fontSize: '19px', lineHeight: 1.6, color: p.muted, maxWidth: '60ch', margin: '0 0 32px' }}>
              EverIntent installs an AI front office on your existing site — answering, qualifying, and
              booking 24/7. No new platform. No team retraining.
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <button onClick={() => go('checkout')} style={ctaPrimary(p)}>Start free trial</button>
              <button onClick={() => go('product')} style={ctaSecondary(p)}>How it works →</button>
            </div>
            <p style={{ fontSize: '13px', color: p.muted, marginTop: '20px' }}>
              No credit card · Cancel anytime · Setup in 48 hours
            </p>
          </div>
          <div style={{ background: p.surfaceDark, color: p.bg, padding: '40px', borderRadius: '4px', position: 'relative' }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7, margin: 0 }}>Live conversation</p>
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Bubble side="them" bg={p.bg} fg={p.fg}>Hi, do you do same-day AC repair?</Bubble>
              <Bubble side="us" bg={p.accent} fg={p.accentInk}>Yes — earliest slot today is 2:30 PM. Book it?</Bubble>
              <Bubble side="them" bg={p.bg} fg={p.fg}>Yes please.</Bubble>
              <Bubble side="us" bg={p.accent} fg={p.accentInk}>Booked. Confirmation sent to your phone.</Bubble>
            </div>
          </div>
        </div>
      </Section>

      <Hairline color={p.hairline} />

      {/* Three problems */}
      <Section>
        <Eyebrow p={p} n="02" label="The three problems we solve" />
        <h2 style={h2(p)}>Most service businesses bleed revenue in three places.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '48px' }}>
          {[
            { t: 'Missed calls after hours', d: 'Every unanswered call is a competitor\u2019s booked job. AI answers, qualifies, and books while you sleep.' },
            { t: 'Front-office burnout', d: 'Your receptionist is fielding the same six questions 80 times a day. AI handles them; she does the work that matters.' },
            { t: 'No follow-up', d: 'Quotes sent. Silence. AI nurtures every lead with SMS + email until they book or unsubscribe.' },
          ].map((c, i) => (
            <div key={i} style={{ borderTop: `2px solid ${p.accent}`, paddingTop: '20px' }}>
              <p style={{ fontSize: '13px', color: p.muted, margin: 0 }}>0{i+1}</p>
              <h3 style={{ fontFamily: p.fontHead, fontSize: '22px', margin: '8px 0 12px', fontWeight: 600 }}>{c.t}</h3>
              <p style={{ color: p.muted, lineHeight: 1.6, margin: 0 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA band */}
      <Section bg={p.surfaceDark} color={p.bg}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '48px', alignItems: 'center' }}>
          <h2 style={{ fontFamily: p.fontHead, fontSize: 'clamp(32px, 4vw, 48px)', margin: 0, lineHeight: 1.1, fontWeight: 600 }}>
            See it work on a real site in 90 seconds.
          </h2>
          <div style={{ textAlign: 'right' }}>
            <button onClick={() => go('product')} style={ctaPrimary(p)}>Watch the demo</button>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ---------- PRODUCT ---------- */
function Product({ p, go }: { p: PaletteSpec; go: (v: View) => void }) {
  return (
    <>
      <Section py="clamp(64px, 9vw, 120px)">
        <Eyebrow p={p} n="01" label="Smart Websites · Convert tier" />
        <h1 style={{ fontFamily: p.fontHead, fontSize: 'clamp(36px, 5vw, 60px)', margin: '20px 0 20px', fontWeight: 600, lineHeight: 1.1, maxWidth: '20ch', letterSpacing: '-0.02em' }}>
          A website that closes deals while you\u2019re on the truck.
        </h1>
        <p style={{ fontSize: '19px', color: p.muted, lineHeight: 1.6, maxWidth: '60ch' }}>
          Convert is our most-picked tier. Includes the AI receptionist, two-way SMS, calendar
          integration, and a 24/7 chat widget tuned to your service area.
        </p>
      </Section>

      <Hairline color={p.hairline} />

      <Section>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
          <div style={{ background: p.surface, padding: '40px', borderRadius: '4px', border: `1px solid ${p.hairline}` }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: p.muted, margin: 0 }}>Monthly</p>
            <p style={{ fontFamily: p.fontHead, fontSize: '56px', margin: '8px 0 0', fontWeight: 600 }}>$197<span style={{ fontSize: '18px', color: p.muted, fontWeight: 400 }}>/mo</span></p>
            <p style={{ color: p.muted, fontSize: '14px', margin: '4px 0 24px' }}>+ $497 one-time AI training</p>
            <button onClick={() => go('checkout')} style={{ ...ctaPrimary(p), width: '100%' }}>Start with Convert</button>
            <p style={{ fontSize: '13px', color: p.muted, margin: '16px 0 0', textAlign: 'center' }}>14-day money-back guarantee</p>
          </div>
          <div>
            <h3 style={{ fontFamily: p.fontHead, fontSize: '24px', fontWeight: 600, marginTop: 0 }}>What\u2019s included</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'AI front-office trained on your services',
                '24/7 web chat widget',
                'Two-way SMS with leads',
                'Calendar booking + reminders',
                'Lead nurture sequences (SMS + email)',
                'Reputation: review requests on autopilot',
                'Unified inbox: chat, SMS, email, FB, IG',
                'Mobile app for your team',
              ].map((f) => (
                <li key={f} style={{ padding: '10px 0', borderBottom: `1px solid ${p.hairline}`, display: 'flex', gap: '12px' }}>
                  <span style={{ color: p.accent, fontWeight: 700 }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bg={p.surface}>
        <Eyebrow p={p} n="02" label="Why teams pick Convert" />
        <h2 style={h2(p)}>Built for the moment a stranger lands on your site at 9pm.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '40px' }}>
          {[
            ['8 sec', 'Median first response from the AI'],
            ['62%', 'Of after-hours chats end in a booked appointment'],
            ['$48k', 'Average annual revenue recovered per location'],
          ].map(([n, l]) => (
            <div key={n}>
              <p style={{ fontFamily: p.fontHead, fontSize: '48px', margin: 0, fontWeight: 600, color: p.accent }}>{n}</p>
              <p style={{ color: p.muted, margin: '8px 0 0' }}>{l}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ---------- COMPARE ---------- */
function Compare({ p, go }: { p: PaletteSpec; go: (v: View) => void }) {
  const tiers = [
    { name: 'Launch', price: '$97', best: 'New businesses', features: ['AI chat widget', 'Lead capture form', 'Email notifications'] },
    { name: 'Capture', price: '$147', best: 'Growing teams', features: ['Everything in Launch', 'Two-way SMS', 'Review requests'] },
    { name: 'Convert', price: '$197', best: 'Most picked', features: ['Everything in Capture', 'Calendar booking', 'Nurture sequences'], highlight: true },
    { name: 'Scale', price: '$397', best: 'Multi-location', features: ['Everything in Convert', 'Voice AI', 'Omnichannel inbox'] },
  ];
  return (
    <>
      <Section py="clamp(64px, 9vw, 120px)">
        <Eyebrow p={p} n="01" label="Compare smart website tiers" />
        <h1 style={{ fontFamily: p.fontHead, fontSize: 'clamp(36px, 5vw, 60px)', margin: '20px 0 16px', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Pick the tier that matches your bleeding wound.
        </h1>
        <p style={{ fontSize: '18px', color: p.muted, maxWidth: '60ch', lineHeight: 1.6 }}>
          Every tier includes setup, training, and the EverIntent guarantee.
        </p>
      </Section>

      <Section py="clamp(0px, 2vw, 32px)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {tiers.map((t) => (
            <div
              key={t.name}
              style={{
                background: t.highlight ? p.surfaceDark : p.surface,
                color: t.highlight ? p.bg : p.fg,
                padding: '28px 24px',
                borderRadius: '4px',
                border: t.highlight ? 'none' : `1px solid ${p.hairline}`,
                position: 'relative',
              }}
            >
              {t.highlight && (
                <span style={{ position: 'absolute', top: '-10px', left: '24px', background: p.accent, color: p.accentInk, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', fontWeight: 600 }}>Most picked</span>
              )}
              <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, opacity: 0.7 }}>{t.best}</p>
              <h3 style={{ fontFamily: p.fontHead, fontSize: '24px', fontWeight: 600, margin: '8px 0 4px' }}>{t.name}</h3>
              <p style={{ fontFamily: p.fontHead, fontSize: '32px', fontWeight: 600, margin: '0 0 16px' }}>{t.price}<span style={{ fontSize: '14px', opacity: 0.7, fontWeight: 400 }}>/mo</span></p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: '14px', lineHeight: 1.7 }}>
                {t.features.map((f) => <li key={f}>· {f}</li>)}
              </ul>
              <button
                onClick={() => go('checkout')}
                style={t.highlight
                  ? { ...ctaPrimary(p), width: '100%' }
                  : { ...ctaSecondaryFilled(p), width: '100%' }
                }
              >
                Choose {t.name}
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section bg={p.surface}>
        <h2 style={h2(p)}>Frequently asked</h2>
        <div style={{ marginTop: '32px', display: 'grid', gap: '20px' }}>
          {[
            ['Do I need to switch off my current site?', 'No. EverIntent layers onto your existing site or replaces it — your call.'],
            ['How long until it\u2019s live?', '48 hours from kickoff. We do the AI training; you do the approving.'],
            ['What if it doesn\u2019t work for us?', '14-day full refund. Keep the AI training assets either way.'],
          ].map(([q, a]) => (
            <div key={q} style={{ borderBottom: `1px solid ${p.hairline}`, paddingBottom: '20px' }}>
              <p style={{ fontFamily: p.fontHead, fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }}>{q}</p>
              <p style={{ color: p.muted, margin: 0, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ---------- CHECKOUT ---------- */
function Checkout({ p }: { p: PaletteSpec }) {
  return (
    <Section py="clamp(48px, 7vw, 96px)">
      <Eyebrow p={p} n="01" label="Step 1 of 3 · Your details" />
      <h1 style={{ fontFamily: p.fontHead, fontSize: 'clamp(32px, 4.5vw, 48px)', margin: '16px 0 8px', fontWeight: 600, letterSpacing: '-0.02em' }}>
        Start your Convert plan
      </h1>
      <p style={{ color: p.muted, margin: '0 0 40px', fontSize: '17px' }}>
        $197/mo + $497 one-time AI training · 14-day money-back guarantee
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '48px', alignItems: 'start' }}>
        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gap: '20px' }}>
          <Field p={p} label="Business name" placeholder="Acme Plumbing" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <Field p={p} label="First name" placeholder="Jane" />
            <Field p={p} label="Last name" placeholder="Doe" />
          </div>
          <Field p={p} label="Work email" placeholder="jane@acme.com" type="email" />
          <Field p={p} label="Mobile" placeholder="(555) 555-0100" />
          <Field p={p} label="Service area (zip)" placeholder="78704" />
          <button type="submit" style={{ ...ctaPrimary(p), width: '100%', padding: '18px', fontSize: '16px' }}>
            Continue to payment →
          </button>
          <p style={{ fontSize: '13px', color: p.muted, textAlign: 'center', margin: 0 }}>
            🔒 Secure checkout · No card required for trial · Cancel anytime
          </p>
        </form>

        {/* Order summary */}
        <aside style={{ background: p.surface, padding: '32px', borderRadius: '4px', border: `1px solid ${p.hairline}`, position: 'sticky', top: '32px' }}>
          <h2 style={{ fontFamily: p.fontHead, fontSize: '18px', margin: '0 0 20px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Order summary</h2>
          <Row p={p} label="Convert plan" value="$197/mo" />
          <Row p={p} label="AI training (one-time)" value="$497" />
          <Row p={p} label="Setup fee" value="Included" muted />
          <div style={{ borderTop: `1px solid ${p.hairline}`, margin: '16px 0' }} />
          <Row p={p} label={<strong>Due today</strong>} value={<strong>$497</strong>} large />
          <Row p={p} label="Then monthly" value="$197/mo" muted />

          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', fontSize: '13px', color: p.muted, lineHeight: 1.8 }}>
            <li>✓ 14-day money-back guarantee</li>
            <li>✓ Cancel anytime, no contract</li>
            <li>✓ Live in 48 hours</li>
            <li>✓ US-based onboarding team</li>
          </ul>
        </aside>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer({ p }: { p: PaletteSpec }) {
  return (
    <footer style={{ background: p.surfaceDark, color: p.bg, padding: '48px 32px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <Logo p={p} onLight={false} />
          <p style={{ fontSize: '13px', opacity: 0.7, margin: '12px 0 0' }}>Smart websites for service businesses.</p>
        </div>
        <p style={{ fontSize: '12px', opacity: 0.6, margin: 0 }}>Sandbox prototype · noindex · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

/* ---------- Tiny helpers ---------- */
const h2 = (p: PaletteSpec): React.CSSProperties => ({
  fontFamily: p.fontHead,
  fontSize: 'clamp(28px, 3.5vw, 44px)',
  fontWeight: 600,
  margin: '20px 0 0',
  lineHeight: 1.15,
  letterSpacing: '-0.015em',
  maxWidth: '24ch',
});
const ctaPrimary = (p: PaletteSpec): React.CSSProperties => ({
  background: p.accent, color: p.accentInk, border: 'none',
  padding: '14px 26px', fontFamily: p.fontBody, fontWeight: 600,
  fontSize: '15px', cursor: 'pointer', borderRadius: '2px',
});
const ctaSecondary = (p: PaletteSpec): React.CSSProperties => ({
  background: 'transparent', color: p.fg, border: `1px solid ${p.fg}`,
  padding: '14px 26px', fontFamily: p.fontBody, fontWeight: 500,
  fontSize: '15px', cursor: 'pointer', borderRadius: '2px',
});
const ctaSecondaryFilled = (p: PaletteSpec): React.CSSProperties => ({
  background: p.fg, color: p.bg, border: 'none',
  padding: '14px 26px', fontFamily: p.fontBody, fontWeight: 600,
  fontSize: '15px', cursor: 'pointer', borderRadius: '2px',
});
function Bubble({ side, bg, fg, children }: { side: 'us' | 'them'; bg: string; fg: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: side === 'us' ? 'flex-end' : 'flex-start' }}>
      <div style={{ background: bg, color: fg, padding: '10px 14px', borderRadius: '14px', maxWidth: '80%', fontSize: '14px', lineHeight: 1.4 }}>
        {children}
      </div>
    </div>
  );
}
function Hairline({ color }: { color: string }) {
  return <div style={{ height: '1px', background: color, maxWidth: '1100px', margin: '0 auto' }} />;
}
function Field({ p, label, placeholder, type = 'text' }: { p: PaletteSpec; label: string; placeholder: string; type?: string }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: p.fg, marginBottom: '6px', letterSpacing: '0.02em' }}>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '14px 16px', fontSize: '15px',
          fontFamily: p.fontBody, color: p.fg, background: p.surface,
          border: `1px solid ${p.hairline}`, borderRadius: '2px', outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </label>
  );
}
function Row({ p, label, value, muted, large }: { p: PaletteSpec; label: React.ReactNode; value: React.ReactNode; muted?: boolean; large?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: large ? '17px' : '14px', color: muted ? p.muted : p.fg }}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}