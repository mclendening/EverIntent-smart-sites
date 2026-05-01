import MiniSite, { type PaletteSpec } from './MiniSite';

const atelier: PaletteSpec = {
  slug: 'atelier-cobalt',
  name: 'Atelier Cobalt',
  bg: '#F5F1E8',
  surface: '#FFFFFF',
  surfaceDark: '#0B1B4A',
  fg: '#0B1B4A',
  muted: '#5C5A55',
  accent: '#C2410C',
  accentInk: '#FFFFFF',
  hairline: '#E5DFCE',
  fontHead: '"Canela", "Playfair Display", Georgia, serif',
  fontBody: '"Inter", system-ui, sans-serif',
  logoSplit: 'split',
};

export default function AtelierCobalt() {
  return <MiniSite p={atelier} />;
}