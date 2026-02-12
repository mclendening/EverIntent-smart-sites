import React, { useMemo } from 'react';
import {
  LogoVersionConfig,
  TextElementConfig,
  StreakConfig,
  TaglineConfig,
  defaultLogoConfig,
} from './types';

// Database format uses snake_case, this interface supports both
interface DatabaseLogoConfig {
  ever_config?: unknown;
  intent_config?: unknown;
  streak_config?: unknown;
  tagline_config?: unknown;
  tagline_text?: string | null;
}

// Partial config for themes.ts format (camelCase with optional fields)
interface PartialLogoConfig {
  name?: string;
  taglineText?: string;
  everConfig?: Partial<TextElementConfig>;
  intentConfig?: Partial<TextElementConfig>;
  streakConfig?: Partial<StreakConfig>;
  taglineConfig?: Partial<TaglineConfig>;
}

interface LogoRendererProps {
  config?: LogoVersionConfig | DatabaseLogoConfig | PartialLogoConfig;
  scale?: number;
  showTagline?: boolean;
  className?: string;
  accentHsl?: string; // Optional HSL accent color override (e.g., "38 92% 50%")
}

// Type guard to check if config is database format (snake_case)
function isDbConfig(config: unknown): config is DatabaseLogoConfig {
  return typeof config === 'object' && config !== null && ('ever_config' in config || 'intent_config' in config);
}

// Type guard to check if config is full LogoVersionConfig
function isFullConfig(config: unknown): config is LogoVersionConfig {
  return typeof config === 'object' && config !== null && 'name' in config && 'everConfig' in config && 'taglineText' in config;
}

// Helper to merge partial config with defaults
function mergeWithDefaults<T extends object>(partial: Partial<T> | undefined, defaults: T): T {
  if (!partial) return defaults;
  return { ...defaults, ...partial };
}

// Convert any config format to internal LogoVersionConfig
function normalizeConfig(config: LogoVersionConfig | DatabaseLogoConfig | PartialLogoConfig): LogoVersionConfig {
  if (isFullConfig(config)) {
    return config;
  }
  
  if (isDbConfig(config)) {
    return {
      name: 'Database Logo',
      taglineText: config.tagline_text || '',
      everConfig: mergeWithDefaults(config.ever_config as Partial<TextElementConfig>, defaultLogoConfig.everConfig),
      intentConfig: mergeWithDefaults(config.intent_config as Partial<TextElementConfig>, defaultLogoConfig.intentConfig),
      streakConfig: mergeWithDefaults(config.streak_config as Partial<StreakConfig>, defaultLogoConfig.streakConfig),
      taglineConfig: mergeWithDefaults(config.tagline_config as Partial<TaglineConfig>, defaultLogoConfig.taglineConfig),
    };
  }
  
  // PartialLogoConfig (camelCase with optional fields from themes.ts)
  const partial = config as PartialLogoConfig;
  return {
    name: partial.name || 'Theme Logo',
    taglineText: partial.taglineText || '',
    everConfig: mergeWithDefaults(partial.everConfig, defaultLogoConfig.everConfig),
    intentConfig: mergeWithDefaults(partial.intentConfig, defaultLogoConfig.intentConfig),
    streakConfig: mergeWithDefaults(partial.streakConfig, defaultLogoConfig.streakConfig),
    taglineConfig: mergeWithDefaults(partial.taglineConfig, defaultLogoConfig.taglineConfig),
  };
}

/**
 * Reusable logo renderer that displays the EverIntent logo
 * based on configuration from database or defaults.
 */
export const LogoRenderer: React.FC<LogoRendererProps> = ({
  config = defaultLogoConfig,
  scale = 1,
  showTagline = true,
  className = '',
  accentHsl,
}) => {
  // Normalize config to internal format
  const normalizedConfig = useMemo(() => normalizeConfig(config), [config]);
  const { everConfig, intentConfig, streakConfig, taglineConfig, taglineText } = normalizedConfig;

  // Generate unique gradient IDs to avoid SVG conflicts when multiple logos are rendered
  const gradientId = useMemo(() => `streak-gradient-${Math.random().toString(36).substr(2, 9)}`, []);

  // Convert HSL string to hex for use in styles
  const hslToHex = (hslStr: string): string => {
    const parts = hslStr.split(' ').map(p => parseFloat(p));
    const h = parts[0] || 0;
    const s = (parts[1] || 0) / 100;
    const l = (parts[2] || 0) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }
    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Get the accent color to use (override or from config)
  const accentColor = accentHsl ? hslToHex(accentHsl) : intentConfig.solidColor;

  const getTextStyle = (cfg: TextElementConfig, isAccentElement: boolean = false): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: cfg.size * scale,
      fontWeight: cfg.weight,
      marginLeft: cfg.marginLeft * scale,
      marginRight: cfg.marginRight * scale,
      position: 'relative',
      top: cfg.verticalOffset * scale,
      lineHeight: 1,
    };

    // Apply accent override for Intent element
    if (isAccentElement && accentHsl) {
      if (cfg.useGradient) {
        return {
          ...base,
          background: `linear-gradient(${cfg.gradientAngle}deg, ${accentColor}, ${cfg.gradientTo})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        };
      }
      return { ...base, color: accentColor };
    }

    if (cfg.useGradient) {
      return {
        ...base,
        background: `linear-gradient(${cfg.gradientAngle}deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }

    return { ...base, color: cfg.solidColor };
  };

  const getTaglineStyle = (cfg: TaglineConfig): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: cfg.size * scale,
      fontWeight: cfg.weight,
      marginLeft: cfg.marginLeft * scale,
      marginRight: cfg.marginRight * scale,
      marginTop: cfg.marginTop * scale,
      display: 'block',
      lineHeight: 1.2,
    };

    if (cfg.useGradient) {
      return {
        ...base,
        background: `linear-gradient(${cfg.gradientAngle}deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      };
    }

    return { ...base, color: cfg.solidColor };
  };

  const renderStreak = (cfg: StreakConfig) => {
    const width = cfg.length * scale;
    const maxThickness = Math.max(cfg.leftThick, cfg.rightThick) * scale;
    const leftThick = cfg.leftThick * scale;
    const rightThick = cfg.rightThick * scale;

    // Calculate polygon points for tapered streak
    const topLeft = (maxThickness - leftThick) / 2;
    const bottomLeft = (maxThickness + leftThick) / 2;
    const topRight = (maxThickness - rightThick) / 2;
    const bottomRight = (maxThickness + rightThick) / 2;

    const points = `0,${topLeft} ${width},${topRight} ${width},${bottomRight} 0,${bottomLeft}`;

    // Use accent override for streak gradient/solid if provided
    const streakFromColor = accentHsl ? accentColor : cfg.gradientFrom;
    const streakSolidColor = accentHsl ? accentColor : cfg.solidColor;

    return (
      <svg
        width={width}
        height={maxThickness}
        style={{
          marginTop: 8 * scale,
          marginLeft: cfg.marginLeft * scale,
          marginRight: cfg.marginRight * scale,
          display: 'block',
        }}
      >
        <defs>
          {cfg.useGradient && (
            <linearGradient
              id={gradientId}
              gradientTransform={`rotate(${cfg.gradientAngle - 90})`}
            >
              <stop offset="0%" stopColor={streakFromColor} />
              <stop offset="100%" stopColor={cfg.gradientTo} />
            </linearGradient>
          )}
        </defs>
        <polygon
          points={points}
          fill={cfg.useGradient ? `url(#${gradientId})` : streakSolidColor}
        />
      </svg>
    );
  };

  return (
    <div className={`text-left ${className}`}>
      {/* Main Logo Text */}
      <div className="leading-none whitespace-nowrap">
        {everConfig.enabled !== false && (
          <span style={getTextStyle(everConfig, false)}>{everConfig.text || 'Ever'}</span>
        )}
        {intentConfig.enabled !== false && (
          <span style={getTextStyle(intentConfig, true)}>{intentConfig.text || 'Intent'}</span>
        )}
      </div>

      {/* Streak */}
      {renderStreak(streakConfig)}

      {/* Tagline */}
      {showTagline && taglineText && (
        <p style={getTaglineStyle(taglineConfig)}>{taglineText}</p>
      )}
    </div>
  );
};

export default LogoRenderer;
