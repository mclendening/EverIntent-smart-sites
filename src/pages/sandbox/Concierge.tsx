import MiniSite, { type PaletteSpec } from './MiniSite';

const concierge: PaletteSpec = {
  slug: 'concierge',
  name: 'Concierge',
  bg: '#FAF7F2',
  surface: '#FFFFFF',
  surfaceDark: '#231C16',
  fg: '#231C16',
  muted: '#6B5E50',
  accent: '#DC5A1F',
  accentInk: '#FFFFFF',
  hairline: '#E7DFD2',
  fontHead: '"Fraunces", "Cormorant Garamond", Georgia, serif',
  fontBody: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  logoSplit: 'solid',
};

export default function Concierge() {
  return <MiniSite p={concierge} />;
}