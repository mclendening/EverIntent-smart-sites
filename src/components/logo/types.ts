// Logo element configuration types matching database schema

export interface TextElementConfig {
  size: number;
  weight: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
  verticalOffset: number;
}

export interface StreakConfig {
  length: number;
  leftThick: number;
  rightThick: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
}

export interface TaglineConfig {
  size: number;
  weight: number;
  solidColor: string;
  useGradient: boolean;
  gradientFrom: string;
  gradientTo: string;
  gradientAngle: number;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
}

export interface LogoVersionConfig {
  id?: string;
  name: string;
  taglineText: string;
  everConfig: TextElementConfig;
  intentConfig: TextElementConfig;
  streakConfig: StreakConfig;
  taglineConfig: TaglineConfig;
}

// Default configurations matching current brand
export const defaultEverConfig: TextElementConfig = {
  size: 72,
  weight: 700,
  solidColor: '#FFFFFF',
  useGradient: false,
  gradientFrom: '#FFFFFF',
  gradientTo: '#A855F7',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  verticalOffset: 0,
};

export const defaultIntentConfig: TextElementConfig = {
  size: 72,
  weight: 700,
  solidColor: '#A855F7',
  useGradient: false,
  gradientFrom: '#A855F7',
  gradientTo: '#FFFFFF',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  verticalOffset: 1,
};

export const defaultStreakConfig: StreakConfig = {
  length: 373,
  leftThick: 4,
  rightThick: 1,
  solidColor: '#A855F7',
  useGradient: true,
  gradientFrom: '#A855F7',
  gradientTo: '#FBF9F9',
  gradientAngle: 90,
  marginLeft: 0,
  marginRight: 0,
};

export const defaultTaglineConfig: TaglineConfig = {
  size: 29,
  weight: 400,
  solidColor: '#FFFFFF',
  useGradient: false,
  gradientFrom: '#FFFFFF',
  gradientTo: '#A855F7',
  gradientAngle: 135,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 5,
};

export const defaultLogoConfig: LogoVersionConfig = {
  name: 'Default Logo',
  taglineText: 'Web Design & Automation',
  everConfig: defaultEverConfig,
  intentConfig: defaultIntentConfig,
  streakConfig: defaultStreakConfig,
  taglineConfig: defaultTaglineConfig,
};
