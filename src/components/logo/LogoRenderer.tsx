import React, { useMemo } from 'react';
import {
  LogoVersionConfig,
  TextElementConfig,
  StreakConfig,
  TaglineConfig,
  defaultLogoConfig,
} from './types';

interface LogoRendererProps {
  config?: LogoVersionConfig;
  scale?: number;
  showTagline?: boolean;
  className?: string;
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
}) => {
  const { everConfig, intentConfig, streakConfig, taglineConfig, taglineText } = config;

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
