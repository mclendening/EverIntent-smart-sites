import MiniSite, { type PaletteSpec } from './MiniSite';

const quiet: PaletteSpec = {
  slug: 'quiet-authority',
  name: 'Quiet Authority',
  bg: '#F4F4F2',
  surface: '#FFFFFF',
  surfaceDark: '#0F1115',
  fg: '#0F1115',
  muted: '#5A5E66',
  accent: '#B91C1C',
  accentInk: '#FFFFFF',
  hairline: '#E2E2DF',
  fontHead: '"GT Sectra", "Tiempos Headline", Georgia, serif',
  fontBody: '"Söhne", "Inter", system-ui, sans-serif',
  logoSplit: 'split',
};

export default function QuietAuthority() {
  return <MiniSite p={quiet} />;
}