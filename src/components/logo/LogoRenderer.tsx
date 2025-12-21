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

interface LogoRendererProps {
  config?: LogoVersionConfig | DatabaseLogoConfig;
  scale?: number;
  showTagline?: boolean;
  className?: string;
  accentHsl?: string; // Optional HSL accent color override (e.g., "38 92% 50%")
}

// Type guard to check if config is database format
function isDbConfig(config: LogoVersionConfig | DatabaseLogoConfig): config is DatabaseLogoConfig {
  return 'ever_config' in config || 'intent_config' in config;
}

// Convert database config to internal format
function normalizeConfig(config: LogoVersionConfig | DatabaseLogoConfig): LogoVersionConfig {
  if (!isDbConfig(config)) {
    return config;
  }
  
  return {
    name: 'Database Logo',
    taglineText: config.tagline_text || '',
    everConfig: config.ever_config as TextElementConfig || defaultLogoConfig.everConfig,
    intentConfig: config.intent_config as TextElementConfig || defaultLogoConfig.intentConfig,
    streakConfig: config.streak_config as StreakConfig || defaultLogoConfig.streakConfig,
    taglineConfig: config.tagline_config as TaglineConfig || defaultLogoConfig.taglineConfig,
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

  const getTextStyle = (cfg: TextElementConfig): React.CSSProperties => {
    const base: React.CSSProperties = {
      fontSize: cfg.size * scale,
      fontWeight: cfg.weight,
      marginLeft: cfg.marginLeft * scale,
      marginRight: cfg.marginRight * scale,
      position: 'relative',
      top: cfg.verticalOffset * scale,
      lineHeight: 1,
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
              <stop offset="0%" stopColor={cfg.gradientFrom} />
              <stop offset="100%" stopColor={cfg.gradientTo} />
            </linearGradient>
          )}
        </defs>
        <polygon
          points={points}
          fill={cfg.useGradient ? `url(#${gradientId})` : cfg.solidColor}
        />
      </svg>
    );
  };

  return (
    <div className={`text-left ${className}`}>
      {/* Main Logo Text */}
      <div className="leading-none whitespace-nowrap">
        <span style={getTextStyle(everConfig)}>Ever</span>
        <span style={getTextStyle(intentConfig)}>Intent</span>
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
