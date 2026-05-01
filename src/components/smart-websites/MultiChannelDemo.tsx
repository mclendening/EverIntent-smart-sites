/**
 * @fileoverview Animated Multi-Channel AI Demo
 * @module components/smart-websites/MultiChannelDemo
 * 
 * Shows AI handling voice + SMS + chat simultaneously while owner is on a job site.
 * Sequential channel reveals with a final summary notification.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone, MessageSquare, Globe, Bell } from 'lucide-react';

type Channel = 'voice' | 'sms' | 'chat' | 'summary';

interface ChannelEvent {
  id: number;
  channel: Channel;
  icon: 'phone' | 'sms' | 'chat' | 'bell';
  label: string;
  detail: string;
  time: string;
}

const eventScript: ChannelEvent[] = [
  { id: 1, channel: 'voice', icon: 'phone', label: 'Incoming Call', detail: 'AI answered, qualified lead, booked 10am appointment', time: '9:02 AM' },
  { id: 2, channel: 'sms', icon: 'sms', label: 'SMS Received', detail: 'AI responded to FAQ, captured name + phone', time: '9:08 AM' },
  { id: 3, channel: 'chat', icon: 'chat', label: 'Website Chat', detail: 'AI engaged visitor, answered 3 questions, collected info', time: '9:15 AM' },
  { id: 4, channel: 'voice', icon: 'phone', label: 'Incoming Call', detail: 'AI qualified, booked 1pm appointment', time: '9:23 AM' },
  { id: 5, channel: 'chat', icon: 'chat', label: 'Website Chat', detail: 'AI captured emergency lead, flagged as priority', time: '9:31 AM' },
  { id: 6, channel: 'voice', icon: 'phone', label: 'Incoming Call', detail: 'AI booked 3pm appointment', time: '9:44 AM' },
  { id: 7, channel: 'summary', icon: 'bell', label: 'Your Morning Summary', detail: '3 appointments booked • 2 qualified leads • 0 interruptions', time: '10:00 AM' },
];

const iconMap = {
  phone: Phone,
  sms: MessageSquare,
  chat: Globe,
  bell: Bell,
};

const channelColors: Record<Channel, string> = {
  voice: 'bg-accent/20 text-accent border-accent/30',
  sms: 'bg-primary/20 text-primary border-primary/30',
  chat: 'bg-secondary/80 text-secondary-foreground border-secondary',
  summary: 'bg-accent/20 text-accent border-accent/40',
};

function StaticView() {
  return (
    <div className="space-y-3">
      {eventScript.map(evt => {
        const Icon = iconMap[evt.icon];
        return (
          <div key={evt.id} className={`flex items-start gap-3 p-3 rounded-xl border ${channelColors[evt.channel]}`}>
            <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{evt.label}</span>
                <span className="text-[10px] text-muted-foreground">{evt.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{evt.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MultiChannelDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [events, setEvents] = useState<ChannelEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (events.length > 0) {
      const el = containerRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [events]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (currentIndex >= eventScript.length) {
      const timer = setTimeout(() => { setEvents([]); setCurrentIndex(0); }, 8000);
      return () => clearTimeout(timer);
    }

    const delay = currentIndex === 0 ? 1000 : currentIndex === eventScript.length - 1 ? 2000 : 1500;

    const timer = setTimeout(() => {
      setEvents(prev => [...prev, eventScript[currentIndex]]);
      setCurrentIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, prefersReducedMotion]);

  return (
    <section className="py-16 lg:py-24 bg-card/30" aria-label="Multi-channel AI demo">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <div className="order-1">
            <div className="relative mx-auto w-full max-w-[320px]">
              <div className="relative bg-card rounded-[2.5rem] p-2 shadow-2xl border border-border">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-card rounded-b-2xl z-10" />
                <div className="relative bg-background rounded-[2rem] overflow-hidden">
                  <div className="flex items-center justify-between px-6 pt-3 pb-1 text-foreground text-xs">
                    <span>9:00 AM</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-2.5 bg-foreground rounded-sm" />
                        <div className="w-1 h-3 bg-foreground rounded-sm" />
                        <div className="w-1 h-3.5 bg-foreground rounded-sm" />
                        <div className="w-1 h-4 bg-foreground/40 rounded-sm" />
                      </div>
                      <span className="ml-1">94%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center px-4 py-2 border-b border-border">
                    <div className="text-center">
                      <div className="text-foreground text-sm font-semibold">AI Activity Feed</div>
                      <div className="text-muted-foreground text-xs">Tuesday Morning</div>
                    </div>
                  </div>
                  <div ref={containerRef} className="h-[400px] overflow-y-auto px-3 py-4 space-y-3">
                    {prefersReducedMotion ? (
                      <StaticView />
                    ) : (
                      <>
                        <AnimatePresence>
                          {events.map(evt => {
                            const Icon = iconMap[evt.icon];
                            return (
                              <motion.div
                                key={evt.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className={`flex items-start gap-3 p-3 rounded-xl border ${channelColors[evt.channel]}`}
                              >
                                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold">{evt.label}</span>
                                    <span className="text-[10px] text-muted-foreground">{evt.time}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">{evt.detail}</p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                        
                      </>
                    )}
                  </div>
                  <div className="flex justify-center py-2">
                    <div className="w-32 h-1 bg-muted-foreground/30 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-[3rem] -z-10 blur-2xl" />
            </div>
          </div>

          {/* Narrative */}
          <div className="order-2 text-center lg:text-left">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Watch AI Run the Front Office</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Three Channels. Zero Interruptions.
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              While you were on the job, AI handled 3 calls, 2 chats, and an SMS, and booked 3 appointments. This is what Scale looks like.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="/checkout/scale" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity">
                Unlock Full AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
