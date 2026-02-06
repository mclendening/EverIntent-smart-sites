/**
 * @fileoverview Dark-mode Dashboard Mockup
 * @module components/ai-employee/DashboardPreview
 * 
 * Award-winning dashboard preview with animated stat counters.
 * Inspired by Warmy.io aesthetic.
 */

import { useState, useEffect, useRef } from 'react';
import { Phone, Users, Calendar, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

interface Stat {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface Conversation {
  type: 'call' | 'text' | 'chat';
  preview: string;
  time: string;
  status: 'Booked' | 'Qualified' | 'Answered' | 'Recovered';
}

const stats: Stat[] = [
  { icon: Phone, value: 147, label: 'Calls This Week' },
  { icon: Users, value: 23, label: 'Leads Captured' },
  { icon: Calendar, value: 12, label: 'Bookings Made' },
  { icon: Clock, value: 45, label: 'Avg Response', suffix: 's', prefix: '<' },
];

const recentConversations: Conversation[] = [
  { type: 'call', preview: 'Emergency plumber call', time: '11:47 PM', status: 'Booked' },
  { type: 'text', preview: 'Missed call recovery', time: '10:23 AM', status: 'Recovered' },
  { type: 'call', preview: 'Pricing question', time: '9:15 AM', status: 'Answered' },
  { type: 'chat', preview: 'Website inquiry', time: '8:42 AM', status: 'Qualified' },
];

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(target);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, duration, hasStarted]);

  return { count, ref };
}

function StatCard({ stat }: { stat: Stat }) {
  const { count, ref } = useCountUp(stat.value);
  const Icon = stat.icon;

  return (
    <div 
      ref={ref}
      className="bg-[#1a1a1c] rounded-xl p-4 border border-white/5"
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-accent" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</span>
      </div>
      <div className="text-3xl font-bold text-white">
        {stat.prefix}{count}{stat.suffix}
      </div>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Browser Chrome */}
      <div className="bg-[#2a2a2c] rounded-t-xl px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#1a1a1c] rounded-md px-4 py-1.5 text-sm text-gray-400">
            app.everintent.com/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-[#0f0f10] rounded-b-xl border-x border-b border-white/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">E</span>
            </div>
            <span className="text-white font-semibold">EverIntent</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#1a1a1c] flex items-center justify-center">
                <span className="text-gray-400">🔔</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                3
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Recent Conversations */}
          <div className="bg-[#1a1a1c] rounded-xl border border-white/5">
            <div className="px-4 py-3 border-b border-white/5">
              <h3 className="text-sm font-medium text-white">Recent Conversations</h3>
            </div>
            <div className="divide-y divide-white/5">
              {recentConversations.map((conv, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#252527] flex items-center justify-center">
                    {conv.type === 'call' ? (
                      <Phone className="w-4 h-4 text-blue-400" />
                    ) : conv.type === 'text' ? (
                      <MessageSquare className="w-4 h-4 text-green-400" />
                    ) : (
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{conv.preview}</p>
                    <p className="text-xs text-gray-500">{conv.time}</p>
                  </div>
                  <div className={`
                    px-2 py-1 rounded-md text-xs font-medium
                    ${conv.status === 'Booked' ? 'bg-green-500/20 text-green-400' :
                      conv.status === 'Recovered' ? 'bg-accent/20 text-accent' :
                      conv.status === 'Qualified' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'}
                  `}>
                    {conv.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
