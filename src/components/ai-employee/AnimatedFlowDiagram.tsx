/**
 * @fileoverview Animated Platform Flow Diagram
 * @module components/ai-employee/AnimatedFlowDiagram
 * 
 * Award-winning animated SVG diagram showing the AI Employee workflow.
 * Icons pulse left to right, connection lines animate with dash patterns.
 */

import { useState, useEffect } from 'react';
import { Phone, Bot, Calendar, Bell, MessageSquare } from 'lucide-react';

interface FlowStep {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
}

interface AnimatedFlowDiagramProps {
  variant?: 'default' | 'after-hours' | 'front-office' | 'full';
}

const flows: Record<string, FlowStep[]> = {
  default: [
    { icon: Phone, label: 'Call Comes In', sublabel: 'After hours' },
    { icon: Bot, label: 'AI Answers', sublabel: 'Instant response' },
    { icon: Calendar, label: 'Books Job', sublabel: 'Into your calendar' },
    { icon: Bell, label: 'You\'re Notified', sublabel: 'SMS + dashboard' },
  ],
  'after-hours': [
    { icon: Phone, label: 'Missed Call', sublabel: '11:47 PM' },
    { icon: MessageSquare, label: 'AI Texts Back', sublabel: '<60 seconds' },
    { icon: Calendar, label: 'Books Appointment', sublabel: '7:00 AM slot' },
    { icon: Bell, label: 'You Wake Up', sublabel: 'Job on calendar' },
  ],
  'front-office': [
    { icon: Phone, label: 'Every Call', sublabel: 'AI answers first' },
    { icon: Bot, label: 'Screens & Qualifies', sublabel: 'Your questions' },
    { icon: Calendar, label: 'Hot Transfer', sublabel: 'Live to you' },
    { icon: Bell, label: 'Unqualified?', sublabel: 'AI handles it' },
  ],
  'full': [
    { icon: Phone, label: 'Any Channel', sublabel: 'Call, text, chat' },
    { icon: Bot, label: 'AI Handles It', sublabel: '24/7/365' },
    { icon: Calendar, label: 'Qualifies & Books', sublabel: 'Automatically' },
    { icon: Bell, label: 'You Close', sublabel: 'Only hot leads' },
  ],
};

export function AnimatedFlowDiagram({ variant = 'default' }: AnimatedFlowDiagramProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = flows[variant] || flows.default;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="w-full py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <div key={index} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center text-center min-w-[100px] md:min-w-[140px]">
                <div 
                  className={`
                    w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3
                    transition-all duration-500 ease-out
                    ${isActive 
                      ? 'bg-accent/20 border-2 border-accent scale-110 shadow-lg shadow-accent/20' 
                      : isPast
                        ? 'bg-accent/10 border border-accent/50'
                        : 'bg-card border border-border/50'
                    }
                  `}
                >
                  <Icon 
                    className={`
                      w-8 h-8 md:w-10 md:h-10 transition-all duration-500
                      ${isActive 
                        ? 'text-accent animate-pulse' 
                        : isPast 
                          ? 'text-accent/70' 
                          : 'text-muted-foreground'
                      }
                    `} 
                  />
                </div>
                <p className={`
                  text-sm font-medium transition-colors duration-300
                  ${isActive ? 'text-accent' : 'text-foreground'}
                `}>
                  {step.label}
                </p>
                {step.sublabel && (
                  <p className="text-xs text-muted-foreground mt-0.5">{step.sublabel}</p>
                )}
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block w-12 lg:w-20 h-0.5 relative mx-2">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-border/30 rounded-full" />
                  {/* Animated line */}
                  <div 
                    className={`
                      absolute inset-y-0 left-0 bg-accent rounded-full
                      transition-all duration-500 ease-out
                    `}
                    style={{
                      width: isPast ? '100%' : isActive ? '50%' : '0%',
                    }}
                  />
                  {/* Pulse dot */}
                  {isActive && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full animate-pulse"
                      style={{ left: '50%' }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Step indicators */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {steps.map((_, index) => (
          <div 
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all duration-300
              ${index === activeIndex ? 'bg-accent w-6' : 'bg-border'}
            `}
          />
        ))}
      </div>
    </div>
  );
}
