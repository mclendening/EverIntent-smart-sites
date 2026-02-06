/**
 * @fileoverview Interactive SMS Demo Component
 * @module components/ai-employee/SMSDemo
 * 
 * Simulates a missed call → AI text conversation with:
 * - Typing indicators
 * - Message delays (1.5s between messages)
 * - Checkmark animations (gray → blue)
 * - Realistic iOS styling
 */

import { useState, useEffect, useCallback } from 'react';
import { Phone } from 'lucide-react';

interface Message {
  id: number;
  type: 'system' | 'incoming' | 'outgoing';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

const conversationScript: Omit<Message, 'status'>[] = [
  { id: 1, type: 'system', text: '📞 Missed call from (555) 123-4567', time: '11:47 PM' },
  { id: 2, type: 'incoming', text: "Hi! Sorry we missed your call. I'm Mike's AI assistant at Rodriguez Plumbing. How can I help?", time: '11:47 PM' },
  { id: 3, type: 'outgoing', text: "I have a water heater emergency! It's leaking everywhere", time: '11:48 PM' },
  { id: 4, type: 'incoming', text: "I'm so sorry to hear that! We offer 24/7 emergency service. I can have someone there first thing at 7am. Would that work?", time: '11:48 PM' },
  { id: 5, type: 'outgoing', text: 'Yes please!', time: '11:48 PM' },
  { id: 6, type: 'incoming', text: "✅ You're confirmed for tomorrow at 7:00 AM.\n\n📍 What's your address?", time: '11:49 PM' },
];

/**
 * Interactive SMS demo showing AI missed call recovery.
 * Messages appear one by one with typing indicators.
 */
export function SMSDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const addMessage = useCallback((msg: Omit<Message, 'status'>) => {
    const status = msg.type === 'outgoing' ? 'sent' : undefined;
    setMessages(prev => [...prev, { ...msg, status }]);
    
    // Animate checkmarks for outgoing messages
    if (msg.type === 'outgoing') {
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === msg.id ? { ...m, status: 'delivered' as const } : m)
        );
      }, 300);
      setTimeout(() => {
        setMessages(prev => 
          prev.map(m => m.id === msg.id ? { ...m, status: 'read' as const } : m)
        );
      }, 800);
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || currentIndex >= conversationScript.length) {
      if (currentIndex >= conversationScript.length) {
        // Reset after 3 seconds
        setTimeout(() => {
          setMessages([]);
          setCurrentIndex(0);
        }, 3000);
      }
      return;
    }

    const msg = conversationScript[currentIndex];
    const delay = currentIndex === 0 ? 500 : 1500;

    const timer = setTimeout(() => {
      if (msg.type === 'incoming') {
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
  }, [currentIndex, isPlaying, addMessage]);

  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      {/* Phone Frame */}
      <div className="relative bg-[#1c1c1e] rounded-[2.5rem] p-2 shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1c1c1e] rounded-b-2xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-[#000] rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-white text-xs">
            <span>11:47 PM</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-2.5 bg-white rounded-sm" />
                <div className="w-1 h-3 bg-white rounded-sm" />
                <div className="w-1 h-3.5 bg-white rounded-sm" />
                <div className="w-1 h-4 bg-white/40 rounded-sm" />
              </div>
              <span className="ml-1">100%</span>
            </div>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <button className="text-[#007AFF] text-sm">◀</button>
            <div className="text-center">
              <div className="text-white text-sm font-semibold">AI Assistant</div>
              <div className="text-white/50 text-xs">Rodriguez Plumbing</div>
            </div>
            <button className="text-[#007AFF]">
              <Phone className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto px-3 py-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.type === 'system' ? (
                  <div className="flex justify-center">
                    <div className="bg-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full">
                      {msg.text}
                    </div>
                  </div>
                ) : msg.type === 'incoming' ? (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-[#3a3a3c] text-white text-sm px-3 py-2 rounded-2xl rounded-bl-md">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className="block text-right text-[10px] text-white/40 mt-1">{msg.time}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-[#007AFF] text-white text-sm px-3 py-2 rounded-2xl rounded-br-md">
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] text-white/70">{msg.time}</span>
                        {/* Checkmarks */}
                        <span className={`text-[10px] transition-colors duration-300 ${
                          msg.status === 'read' ? 'text-[#34C759]' : 
                          msg.status === 'delivered' ? 'text-white/70' : 'text-white/40'
                        }`}>
                          ✓✓
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#3a3a3c] px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10">
            <button className="text-[#007AFF] text-xl">+</button>
            <div className="flex-1 bg-[#1c1c1e] rounded-full px-4 py-2 text-white/40 text-sm">
              Message…
            </div>
            <button className="w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center">
              <span className="text-white text-sm">↑</span>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="flex justify-center py-2">
            <div className="w-32 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* Subtle tilt effect */}
      <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-[3rem] -z-10 blur-2xl" />
    </div>
  );
}
