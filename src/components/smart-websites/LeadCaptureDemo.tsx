/**
 * @fileoverview Animated Lead Capture Demo
 * @module components/smart-websites/LeadCaptureDemo
 * 
 * Shows a chat widget conversation where AI captures a lead at 10:30 PM.
 * Follows SMSDemo.tsx architecture: framer-motion timed reveals, phone mockup,
 * prefers-reduced-motion support, ClientOnly wrapper required.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: number;
  type: 'system' | 'visitor' | 'ai';
  text: string;
  time: string;
}

const chatScript: ChatMessage[] = [
  { id: 1, type: 'system', text: 'Visitor landed on your site', time: '10:30 PM' },
  { id: 2, type: 'ai', text: 'Hi! 👋 How can we help you tonight?', time: '10:30 PM' },
  { id: 3, type: 'visitor', text: 'I have a leak under my kitchen sink', time: '10:31 PM' },
  { id: 4, type: 'ai', text: "We can help! Let me get your info so we can have someone out first thing. What's your name?", time: '10:31 PM' },
  { id: 5, type: 'visitor', text: 'Sarah Johnson', time: '10:31 PM' },
  { id: 6, type: 'ai', text: "Thanks Sarah! What's the best number to reach you?", time: '10:31 PM' },
  { id: 7, type: 'visitor', text: '555-867-5309', time: '10:32 PM' },
  { id: 8, type: 'ai', text: "✅ You're booked for tomorrow at 7:00 AM. We'll text you a confirmation!", time: '10:32 PM' },
  { id: 9, type: 'system', text: '🔔 New lead: Kitchen sink leak — booked 7am', time: '10:32 PM' },
];

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

function StaticView() {
  return (
    <div className="space-y-3">
      {chatScript.map(msg => (
        <div key={msg.id}>
          {msg.type === 'system' ? (
            <div className="flex justify-center">
              <div className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-md">{msg.text}</div>
            </div>
          ) : msg.type === 'ai' ? (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-md">
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-right text-[10px] text-muted-foreground mt-1">{msg.time}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-accent text-accent-foreground text-sm px-3 py-2 rounded-2xl rounded-br-md">
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-right text-[10px] text-accent-foreground/70 mt-1">{msg.time}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PhoneMockup({ children, containerRef }: { children: React.ReactNode; containerRef?: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div className="relative bg-card rounded-[2.5rem] p-2 shadow-2xl border border-border">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-card rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative bg-background rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-foreground text-xs">
            <span>10:30 PM</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-2.5 bg-foreground rounded-sm" />
                <div className="w-1 h-3 bg-foreground rounded-sm" />
                <div className="w-1 h-3.5 bg-foreground rounded-sm" />
                <div className="w-1 h-4 bg-foreground/40 rounded-sm" />
              </div>
              <span className="ml-1">100%</span>
            </div>
          </div>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <button className="text-accent text-sm">◀</button>
            <div className="text-center">
              <div className="text-foreground text-sm font-semibold">Website Chat</div>
              <div className="text-muted-foreground text-xs">AI Assistant</div>
            </div>
            <MessageSquare className="w-5 h-5 text-accent" />
          </div>
          {/* Messages */}
          <div ref={containerRef} className="h-[400px] overflow-y-auto px-3 py-4 space-y-3">
            {children}
          </div>
          {/* Input Bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-border">
            <div className="flex-1 bg-muted rounded-lg px-4 py-2 text-muted-foreground text-sm">Type a message…</div>
            <button className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground text-sm">↑</span>
            </button>
          </div>
          {/* Home Indicator */}
          <div className="flex justify-center py-2">
            <div className="w-32 h-1 bg-muted-foreground/30 rounded-sm" />
          </div>
        </div>
      </div>
      <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-[3rem] -z-10 blur-2xl" />
    </div>
  );
}

export function LeadCaptureDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      const el = containerRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (currentIndex >= chatScript.length) {
      const timer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const msg = chatScript[currentIndex];
    const delay = currentIndex === 0 ? 800 : 1500;

    const timer = setTimeout(() => {
      if (msg.type === 'ai') {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage(msg);
          setCurrentIndex(prev => prev + 1);
        }, 1200);
      } else {
        addMessage(msg);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, prefersReducedMotion, addMessage]);

  return (
    <section className="py-16 lg:py-24 bg-card/30" aria-label="Lead capture demo">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone Mockup */}
          <div className="order-1 lg:order-1">
            <PhoneMockup containerRef={containerRef}>
              {prefersReducedMotion ? (
                <StaticView />
              ) : (
                <>
                  <AnimatePresence>
                    {messages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {msg.type === 'system' ? (
                          <div className="flex justify-center">
                            <div className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-md">{msg.text}</div>
                          </div>
                        ) : msg.type === 'ai' ? (
                          <div className="flex justify-start">
                            <div className="max-w-[80%] bg-muted text-foreground text-sm px-3 py-2 rounded-2xl rounded-bl-md">
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              <span className="block text-right text-[10px] text-muted-foreground mt-1">{msg.time}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-end">
                            <div className="max-w-[80%] bg-accent text-accent-foreground text-sm px-3 py-2 rounded-2xl rounded-br-md">
                              <p className="whitespace-pre-wrap">{msg.text}</p>
                              <span className="block text-right text-[10px] text-accent-foreground/70 mt-1">{msg.time}</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-md">
                        <TypingDots />
                      </div>
                    </div>
                   )}
                    
                </>
              )}
            </PhoneMockup>
          </div>

          {/* Narrative */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Watch a Lead Get Captured</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              10:30 PM. A Lead Lands on Your Site.
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Without Capture, they leave. With Capture, they're booked for 7am. You never lifted a finger.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href="/checkout/capture" className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground px-6 py-3 font-semibold hover:opacity-90 transition-opacity">
                Start Capturing Leads
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
