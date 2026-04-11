/**
 * @fileoverview Animated No-Show Save Demo
 * @module components/smart-websites/NoShowSaveDemo
 * 
 * SMS mockup showing AI preventing a no-show via automated reminder + reschedule.
 * Follows SMSDemo.tsx architecture.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';

interface SmsMessage {
  id: number;
  type: 'system' | 'incoming' | 'outgoing';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

const smsScript: Omit<SmsMessage, 'status'>[] = [
  { id: 1, type: 'system', text: '📅 Monday, 7:14 PM', time: '7:14 PM' },
  { id: 2, type: 'outgoing', text: "Reminder: Your appointment with Rodriguez Plumbing is tomorrow at 2:00 PM.\n\nReply C to confirm or R to reschedule.", time: '7:14 PM' },
  { id: 3, type: 'incoming', text: 'R — can we do Wednesday instead?', time: '7:22 PM' },
  { id: 4, type: 'outgoing', text: "No problem! I've moved you to Wednesday at 2:00 PM. See you then! 👍", time: '7:22 PM' },
  { id: 5, type: 'system', text: '✅ Appointment rescheduled — no-show prevented', time: '7:22 PM' },
];

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span key={i} className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
}

function StaticView() {
  return (
    <div className="space-y-3">
      {smsScript.map(msg => (
        <div key={msg.id}>
          {msg.type === 'system' ? (
            <div className="flex justify-center">
              <div className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full">{msg.text}</div>
            </div>
          ) : msg.type === 'outgoing' ? (
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-accent text-accent-foreground text-sm px-3 py-2 rounded-2xl rounded-br-md">
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-accent-foreground/70">{msg.time}</span>
                  <span className="text-[10px] text-accent">✓✓</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-md">
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-right text-[10px] text-muted-foreground mt-1">{msg.time}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function NoShowSaveDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<SmsMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addMessage = useCallback((msg: Omit<SmsMessage, 'status'>) => {
    const status = msg.type === 'outgoing' ? 'sent' as const : undefined;
    setMessages(prev => [...prev, { ...msg, status }]);

    if (msg.type === 'outgoing') {
      setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'delivered' as const } : m)), 300);
      setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' as const } : m)), 800);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (currentIndex >= smsScript.length) {
      const timer = setTimeout(() => { setMessages([]); setCurrentIndex(0); }, 4000);
      return () => clearTimeout(timer);
    }

    const msg = smsScript[currentIndex];
    const delay = currentIndex === 0 ? 800 : 1500;

    const timer = setTimeout(() => {
      if (msg.type === 'outgoing') {
        setIsTyping(true);
        setTimeout(() => { setIsTyping(false); addMessage(msg); setCurrentIndex(prev => prev + 1); }, 1200);
      } else {
        addMessage(msg);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, prefersReducedMotion, addMessage]);

  return (
    <section className="py-16 lg:py-24 bg-card/30" aria-label="No-show prevention demo">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <div className="order-1">
            <div className="relative mx-auto w-full max-w-[320px]">
              <div className="relative bg-card rounded-[2.5rem] p-2 shadow-2xl border border-border">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-card rounded-b-2xl z-10" />
                <div className="relative bg-background rounded-[2rem] overflow-hidden">
                  <div className="flex items-center justify-between px-6 pt-3 pb-1 text-foreground text-xs">
                    <span>7:14 PM</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-2.5 bg-foreground rounded-sm" />
                        <div className="w-1 h-3 bg-foreground rounded-sm" />
                        <div className="w-1 h-3.5 bg-foreground rounded-sm" />
                        <div className="w-1 h-4 bg-foreground/40 rounded-sm" />
                      </div>
                      <span className="ml-1">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border">
                    <button className="text-accent text-sm">◀</button>
                    <div className="text-center">
                      <div className="text-foreground text-sm font-semibold">AI Assistant</div>
                      <div className="text-muted-foreground text-xs">Rodriguez Plumbing</div>
                    </div>
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div className="h-[400px] overflow-y-auto px-3 py-4 space-y-3">
                    {prefersReducedMotion ? (
                      <StaticView />
                    ) : (
                      <>
                        <AnimatePresence>
                          {messages.map(msg => (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                              {msg.type === 'system' ? (
                                <div className="flex justify-center">
                                  <div className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full">{msg.text}</div>
                                </div>
                              ) : msg.type === 'outgoing' ? (
                                <div className="flex justify-end">
                                  <div className="max-w-[80%] bg-accent text-accent-foreground text-sm px-3 py-2 rounded-2xl rounded-br-md">
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                      <span className="text-[10px] text-accent-foreground/70">{msg.time}</span>
                                      <span className={`text-[10px] transition-colors duration-300 ${msg.status === 'read' ? 'text-accent' : msg.status === 'delivered' ? 'text-accent-foreground/70' : 'text-accent-foreground/40'}`}>✓✓</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-start">
                                  <div className="max-w-[80%] bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-md">
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                    <span className="block text-right text-[10px] text-muted-foreground mt-1">{msg.time}</span>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        {isTyping && (
                          <div className="flex justify-end">
                            <div className="bg-accent rounded-2xl rounded-br-md"><TypingDots /></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 border-t border-border">
                    <div className="flex-1 bg-muted rounded-full px-4 py-2 text-muted-foreground text-sm">Message…</div>
                    <button className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-accent-foreground text-sm">↑</span>
                    </button>
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
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Watch a No-Show Get Saved</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              No-Shows Cost You Money Every Month.
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Automated reminders. Instant rescheduling. Zero no-shows. Zero effort from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="/checkout/convert" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity">
                Stop Losing Appointments
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
