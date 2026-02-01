/**
 * @fileoverview AWARD-WINNING Interactive mockup for Riverstone Plumbing
 * @module components/portfolio/case-study/RiverstoneInteractiveMockup
 * 
 * WEBSITE-WITHIN-WEBSITE - $15K+ QUALITY
 * - 5 fully interactive pages with REAL IMAGES EVERYWHERE
 * - Simulated AI chatbot with quick-reply buttons (10+ messages)
 * - Premium design: gradients, shadows, animations, polish
 * - Every card, section, and element has real photography
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Star, ChevronRight, MessageCircle, 
  Send, X, Menu, Shield, Award, Users, Wrench, Droplets, Flame,
  ThermometerSun, AlertCircle, CheckCircle2, Calendar, Play,
  ArrowRight, Zap, Home, BadgeCheck
} from 'lucide-react';

// Import all page images
import heroImage from '@/assets/portfolio/riverstone-plumbing-hero.jpg';
import servicesImage from '@/assets/portfolio/riverstone-services.jpg';
import aboutImage from '@/assets/portfolio/riverstone-about.jpg';
import contactImage from '@/assets/portfolio/riverstone-contact.jpg';

// Service images
import serviceEmergency from '@/assets/portfolio/riverstone/service-emergency.jpg';
import serviceDrain from '@/assets/portfolio/riverstone/service-drain.jpg';
import serviceWaterheater from '@/assets/portfolio/riverstone/service-waterheater.jpg';
import serviceLeak from '@/assets/portfolio/riverstone/service-leak.jpg';
import servicePipe from '@/assets/portfolio/riverstone/service-pipe.jpg';
import serviceHeating from '@/assets/portfolio/riverstone/service-heating.jpg';

// Team images
import teamMarcus from '@/assets/portfolio/riverstone/team-marcus.jpg';
import teamElena from '@/assets/portfolio/riverstone/team-elena.jpg';
import teamMike from '@/assets/portfolio/riverstone/team-mike.jpg';
import teamDave from '@/assets/portfolio/riverstone/team-dave.jpg';

// Review images
import reviewSarah from '@/assets/portfolio/riverstone/review-sarah.jpg';
import reviewJames from '@/assets/portfolio/riverstone/review-james.jpg';
import reviewLinda from '@/assets/portfolio/riverstone/review-linda.jpg';
import reviewDavid from '@/assets/portfolio/riverstone/review-david.jpg';
import reviewMichelle from '@/assets/portfolio/riverstone/review-michelle.jpg';
import reviewRobert from '@/assets/portfolio/riverstone/review-robert.jpg';

// Extra images
import testimonialHome from '@/assets/portfolio/riverstone/testimonial-home.jpg';
import bathroomModern from '@/assets/portfolio/riverstone/bathroom-modern.jpg';

type MockupPage = 'home' | 'services' | 'about' | 'reviews' | 'contact';

// ============================================
// CHATBOT TYPES AND DATA
// ============================================
type ChatStep = 
  | 'initial' 
  | 'service-type' 
  | 'water-heater-type'
  | 'day-select'
  | 'time-select'
  | 'contact-info'
  | 'confirmed'
  | 'emergency'
  | 'quote';

interface QuickReply {
  label: string;
  value: string;
  nextStep: ChatStep;
}

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
}

// ============================================
// MAIN COMPONENT
// ============================================
export const RiverstoneInteractiveMockup = () => {
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>('initial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  // Show chat prompt after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowChatPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initialize chat when opened
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      addBotMessage(
        "Hi! 👋 Welcome to Riverstone Plumbing. I'm here to help 24/7. What can I do for you?",
        [
          { label: "🚨 Emergency! Need help now", value: "emergency", nextStep: 'emergency' },
          { label: "📅 Schedule a service", value: "schedule", nextStep: 'service-type' },
          { label: "💰 Get a quote", value: "quote", nextStep: 'quote' }
        ]
      );
    }
  }, [chatOpen]);

  const addBotMessage = (text: string, quickReplies?: QuickReply[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: ChatMessage = {
        id: ++messageIdRef.current,
        sender: 'bot',
        text,
        quickReplies
      };
      setMessages(prev => [...prev, newMessage]);
    }, 1200);
  };

  const addUserMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: ++messageIdRef.current,
      sender: 'user',
      text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: QuickReply) => {
    addUserMessage(reply.label);
    setChatStep(reply.nextStep);

    setTimeout(() => {
      switch (reply.nextStep) {
        case 'emergency':
          addBotMessage(
            "I'm so sorry you're dealing with an emergency! 🚨 Let me get a technician to you FAST. Are you home right now?",
            [
              { label: "Yes, I'm home", value: "home", nextStep: 'confirmed' },
              { label: "I'll be home soon", value: "later", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "I'd be happy to help you schedule. What type of service do you need?",
            [
              { label: "🔥 Water heater", value: "water-heater", nextStep: 'water-heater-type' },
              { label: "🚿 Drain cleaning", value: "drain", nextStep: 'day-select' },
              { label: "🔧 Pipe repair", value: "pipe", nextStep: 'day-select' },
              { label: "Other service", value: "other", nextStep: 'day-select' }
            ]
          );
          break;

        case 'water-heater-type':
          addBotMessage(
            "Got it — water heater service. Is this for repair or a new installation?",
            [
              { label: "Repair needed", value: "repair", nextStep: 'day-select' },
              { label: "New installation", value: "install", nextStep: 'day-select' },
              { label: "Not sure yet", value: "unsure", nextStep: 'day-select' }
            ]
          );
          break;

        case 'day-select':
          addBotMessage(
            "Great! For this service, we typically need about 2-3 hours. What day works best for you this week?",
            [
              { label: "Monday", value: "mon", nextStep: 'time-select' },
              { label: "Tuesday", value: "tue", nextStep: 'time-select' },
              { label: "Wednesday", value: "wed", nextStep: 'time-select' },
              { label: "Thursday", value: "thu", nextStep: 'time-select' }
            ]
          );
          break;

        case 'time-select':
          addBotMessage(
            "I have morning (9-11am) or afternoon (1-3pm) available. Which works better?",
            [
              { label: "☀️ Morning (9-11am)", value: "morning", nextStep: 'contact-info' },
              { label: "🌤️ Afternoon (1-3pm)", value: "afternoon", nextStep: 'contact-info' }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Perfect! I've reserved that time slot for you. To confirm, I just need your name and phone number."
          );
          setTimeout(() => {
            addBotMessage(
              "✅ You're all set! A technician will arrive at your scheduled time. You'll get a text reminder the day before. Is there anything else I can help with?",
              [
                { label: "That's all, thanks!", value: "done", nextStep: 'confirmed' },
                { label: "I have another question", value: "another", nextStep: 'initial' }
              ]
            );
          }, 2000);
          break;

        case 'quote':
          addBotMessage(
            "I'd be happy to help you get a quote! Our diagnostic fee is $89, which gets waived if you proceed with repairs. What service are you interested in?",
            [
              { label: "Water heater", value: "water-heater", nextStep: 'confirmed' },
              { label: "Drain cleaning", value: "drain", nextStep: 'confirmed' },
              { label: "General plumbing", value: "general", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'confirmed':
          addBotMessage(
            "You're welcome! We'll take great care of you. Have a great day! 🔧💙"
          );
          break;
      }
    }, 300);
  };

  const restartChat = () => {
    setMessages([]);
    setChatStep('initial');
    messageIdRef.current = 0;
    addBotMessage(
      "Hi! 👋 Welcome to Riverstone Plumbing. I'm here to help 24/7. What can I do for you?",
      [
        { label: "🚨 Emergency! Need help now", value: "emergency", nextStep: 'emergency' },
        { label: "📅 Schedule a service", value: "schedule", nextStep: 'service-type' },
        { label: "💰 Get a quote", value: "quote", nextStep: 'quote' }
      ]
    );
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-card border border-border/50 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)]">
      {/* Browser Chrome - Premium macOS Style */}
      <div className="h-9 sm:h-11 bg-gradient-to-b from-[#3d3d3d] to-[#2a2a2a] flex items-center px-3 sm:px-4 gap-3 border-b border-[#1a1a1a]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)] hover:bg-[#ff4136] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)] hover:bg-[#ffb700] cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27CA40] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)] hover:bg-[#1db954] cursor-pointer" />
        </div>
        <div className="flex-1 mx-2 sm:mx-12">
          <div className="bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-[11px] sm:text-xs text-white/80 flex items-center gap-2 max-w-lg mx-auto shadow-inner">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="font-medium">riverstonepmh.com</span>
            <span className="text-white/40">/{currentPage === 'home' ? '' : currentPage}</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] overflow-y-auto relative bg-white">
        {/* Navigation Header - Premium */}
        <nav className="h-14 sm:h-16 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] flex items-center justify-between px-4 sm:px-8 relative z-30 border-b border-gray-100">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1E3A5F] via-[#2d5a8f] to-[#1E3A5F] flex items-center justify-center shadow-lg shadow-[#1E3A5F]/30">
              <span className="text-white text-sm sm:text-lg font-bold tracking-tight">RP</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[#1E3A5F] font-bold text-base tracking-tight">RIVERSTONE</span>
              <span className="text-[#1E3A5F]/50 font-medium text-[10px] block -mt-0.5 tracking-wide">PLUMBING & HEATING</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-xs font-semibold transition-all relative ${
                  currentPage === item.id 
                    ? 'text-[#F97316]' 
                    : 'text-gray-500 hover:text-[#1E3A5F]'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a href="tel:3035550147" className="hidden lg:flex items-center gap-2 text-[#1E3A5F] font-bold text-sm">
              <div className="w-8 h-8 rounded-full bg-[#1E3A5F]/5 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              (303) 555-0147
            </a>
            <button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2 ml-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 shadow-xl">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-6 py-4 text-sm font-medium border-l-4 transition-all ${
                  currentPage === item.id 
                    ? 'text-[#F97316] bg-orange-50/50 border-[#F97316]' 
                    : 'text-gray-600 border-transparent hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page Content */}
        <div className="h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-y-auto scroll-smooth">
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'reviews' && <ReviewsPage />}
          {currentPage === 'contact' && <ContactPage />}
          <FooterSection onNavigate={setCurrentPage} />
        </div>

        {/* Chat Prompt Bubble */}
        {!chatOpen && showChatPrompt && (
          <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-[200px] z-50 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">R</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1E3A5F] mb-1">Chat with Riley</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">I can help you book a service or answer questions! 💬</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </div>
        )}

        {/* Chat Widget Button */}
        {!chatOpen && (
          <button
            onClick={() => { setChatOpen(true); setShowChatPrompt(false); }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center hover:scale-110 transition-all z-50 group"
          >
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[360px] h-[70%] sm:h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1E3A5F] via-[#2d5a8f] to-[#1E3A5F] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">R</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1E3A5F]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Riley</p>
                  <p className="text-white/60 text-[11px]">Virtual Assistant • Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={restartChat} className="text-white/60 hover:text-white text-[11px] font-medium px-2 py-1 rounded hover:bg-white/10">
                  Restart
                </button>
                <button onClick={() => setChatOpen(false)} className="text-white/60 hover:text-white p-1.5 rounded-full hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
              {messages.map(msg => (
                <div key={msg.id}>
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center mr-2 shrink-0 shadow-md">
                        <span className="text-white text-xs font-bold">R</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-[12px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-2xl rounded-br-md shadow-lg shadow-orange-500/20'
                          : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-md border border-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  
                  {/* Quick Reply Buttons */}
                  {msg.sender === 'bot' && msg.quickReplies && msg.id === messages[messages.length - 1]?.id && (
                    <div className="flex flex-wrap gap-2 mt-3 pl-10">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="px-4 py-2 bg-white border-2 border-[#F97316] text-[#F97316] rounded-full text-[11px] font-semibold hover:bg-[#F97316] hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">R</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-md border border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm outline-none text-gray-600 placeholder-gray-400"
                  readOnly
                />
                <button className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md hover:shadow-lg transition-all">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// PAGE COMPONENTS - AWARD WINNING DESIGN
// ============================================

interface PageProps {
  onNavigate?: (page: MockupPage) => void;
}

// HOME PAGE - PREMIUM DESIGN
const HomePage = ({ onNavigate }: PageProps) => (
  <div className="bg-white">
    {/* Hero Section - STUNNING */}
    <div className="relative min-h-[320px] sm:min-h-[400px] overflow-hidden">
      <img 
        src={heroImage} 
        alt="Professional plumber at work in Denver"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/50 to-transparent" />
      
      <div className="relative px-6 sm:px-10 py-10 sm:py-16">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[11px] sm:text-xs font-medium mb-5 shadow-xl">
            <div className="flex -space-x-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span>Rated #1 Plumber in Denver • 500+ Reviews</span>
          </div>
          
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-black mb-4 leading-[1.1] tracking-tight">
            Denver's Most<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Trusted Plumbers</span>
          </h1>
          
          <p className="text-white/80 text-sm sm:text-base mb-6 leading-relaxed max-w-md">
            Family-owned since 1987. Licensed, insured, and ready to help 24/7. We treat every home like our own.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { icon: BadgeCheck, text: 'Licensed & Insured' },
              { icon: Clock, text: '24/7 Emergency' },
              { icon: Shield, text: '100% Guaranteed' }
            ].map((badge) => (
              <span key={badge.text} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs border border-white/10">
                <badge.icon className="w-3 h-3 text-[#F97316]" />
                {badge.text}
              </span>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-bold hover:shadow-2xl hover:shadow-orange-500/30 transition-all flex items-center gap-2 hover:-translate-y-0.5">
              <Calendar className="w-5 h-5" />
              Schedule Service
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2 group">
              <Phone className="w-5 h-5 group-hover:animate-pulse" />
              (303) 555-0147
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Stats Card */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 hidden sm:block">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/50">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-[#F97316] font-black text-2xl">37</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-wide">Years</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-[#F97316] font-black text-2xl">15K+</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-wide">Jobs</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-[#F97316] font-black text-2xl">4.9</p>
              <p className="text-gray-500 text-[9px] uppercase tracking-wide">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Services Section - WITH REAL IMAGES */}
    <div className="px-6 sm:px-10 py-12 sm:py-16 bg-gray-50">
      <div className="text-center mb-10">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">What We Do</span>
        <h2 className="text-[#1E3A5F] text-xl sm:text-3xl font-black mt-2 mb-3">Our Plumbing Services</h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">From emergency repairs to routine maintenance, we handle it all with expert care and honest pricing.</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {[
          { img: serviceEmergency, name: 'Emergency Repairs', desc: '24/7 rapid response for urgent issues' },
          { img: serviceDrain, name: 'Drain Cleaning', desc: 'Clear any clog, guaranteed' },
          { img: serviceWaterheater, name: 'Water Heaters', desc: 'Install, repair & maintenance' },
          { img: serviceLeak, name: 'Leak Detection', desc: 'Find hidden leaks fast' },
          { img: servicePipe, name: 'Pipe Repair', desc: 'Fix or replace damaged pipes' },
          { img: serviceHeating, name: 'Heating Systems', desc: 'Stay warm all winter' },
        ].map((service) => (
          <div key={service.name} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/90 via-[#1E3A5F]/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <h3 className="text-white font-bold text-sm sm:text-base mb-1">{service.name}</h3>
              <p className="text-white/70 text-[10px] sm:text-xs">{service.desc}</p>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="px-6 sm:px-10 py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <img src={bathroomModern} alt="Modern bathroom" className="rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white p-4 rounded-xl shadow-xl">
              <p className="text-2xl font-black">37+</p>
              <p className="text-xs opacity-80">Years of Excellence</p>
            </div>
          </div>
          
          <div>
            <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Why Choose Us</span>
            <h2 className="text-[#1E3A5F] text-xl sm:text-3xl font-black mt-2 mb-6">The Riverstone Difference</h2>
            
            <div className="space-y-4">
              {[
                { icon: Award, title: 'Third Generation Expertise', desc: 'Family knowledge passed down since 1987' },
                { icon: CheckCircle2, title: 'Upfront Honest Pricing', desc: 'No surprises, no hidden fees — ever' },
                { icon: Zap, title: 'Same-Day Service', desc: 'Fast response when you need it most' },
                { icon: Shield, title: '100% Satisfaction Guarantee', desc: "Not happy? We'll make it right" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="text-[#1E3A5F] font-bold text-sm">{item.title}</h3>
                    <p className="text-gray-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Testimonial Section - With Real Image */}
    <div className="relative px-6 sm:px-10 py-16 sm:py-20">
      <img src={testimonialHome} alt="Happy homeowner" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/80" />
      
      <div className="relative max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <blockquote className="text-white text-lg sm:text-2xl font-medium leading-relaxed mb-6">
          "Riverstone saved us when our water heater burst at 2am. Mike arrived within an hour and had us back up and running by morning. True professionals who actually care!"
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <img src={reviewSarah} alt="Sarah M." className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg" />
          <div className="text-left">
            <p className="text-white font-bold">Sarah Mitchell</p>
            <p className="text-white/60 text-sm">Denver Homeowner • Verified Customer</p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#DC2626] px-6 sm:px-10 py-12 sm:py-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      
      <div className="relative">
        <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">Ready to Fix Your Plumbing?</h3>
        <p className="text-white/90 text-sm sm:text-base mb-8 max-w-lg mx-auto">Get expert help today. No job too big or small. Free estimates on all major work.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#F97316] px-8 py-4 rounded-xl text-sm font-black hover:shadow-2xl transition-all flex items-center gap-3 justify-center hover:-translate-y-0.5 group">
            <Phone className="w-5 h-5 group-hover:animate-pulse" />
            Call (303) 555-0147
          </button>
          <button className="bg-[#1E3A5F] text-white px-8 py-4 rounded-xl text-sm font-bold hover:bg-[#2d5a8f] transition-all flex items-center gap-2 justify-center">
            Request Online Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

// SERVICES PAGE - WITH IMAGE CARDS
const ServicesPage = () => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-40 sm:h-52 overflow-hidden">
      <img src={servicesImage} alt="Plumbing services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/70" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">Expert Solutions</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">Our Services</h1>
      </div>
    </div>

    {/* Services Grid */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        {[
          { img: serviceEmergency, name: 'Emergency Repairs', desc: '24/7 rapid response for urgent plumbing issues. Water leaks, burst pipes, overflows — we handle it all fast. Our emergency team is always on standby.', price: 'From $89', features: ['Available 24/7/365', '60-min response time', 'No overtime charges'] },
          { img: serviceDrain, name: 'Drain Cleaning', desc: 'Professional drain and sewer cleaning using advanced hydro-jetting technology. We clear any clog, guaranteed, from kitchen sinks to main sewer lines.', price: 'From $149', features: ['Camera inspection included', 'Hydro-jetting available', 'Preventive maintenance'] },
          { img: serviceWaterheater, name: 'Water Heater Services', desc: 'Complete water heater solutions including installation, repair, and maintenance. We work with all brands and types including tankless systems.', price: 'Free estimates', features: ['All brands serviced', 'Tankless specialists', 'Same-day service'] },
          { img: serviceLeak, name: 'Leak Detection', desc: 'Advanced technology to find hidden leaks without damaging your walls or floors. Our non-invasive methods save you time and money on unnecessary repairs.', price: 'From $175', features: ['Non-invasive methods', 'Thermal imaging', 'Acoustic detection'] },
          { img: servicePipe, name: 'Pipe Repair & Replacement', desc: 'Expert pipe repair and replacement for all types of plumbing systems. We work with copper, PEX, PVC, and more. Trenchless options available.', price: 'Free estimates', features: ['Trenchless repair', 'All pipe materials', 'Lifetime warranty'] },
          { img: serviceHeating, name: 'Heating Systems', desc: 'Keep your home warm and comfortable with our heating installation and repair services. Furnaces, boilers, radiant heating, and more.', price: 'From $125', features: ['Furnaces & boilers', 'Radiant heat', 'Maintenance plans'] },
        ].map((service, i) => (
          <div key={service.name} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all group`}>
            <div className="md:w-2/5 aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#1E3A5F] font-black text-lg sm:text-xl">{service.name}</h3>
                <span className="text-[#F97316] font-bold text-sm bg-orange-50 px-3 py-1 rounded-full">{service.price}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="flex items-center gap-1 text-[11px] text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-100">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="bg-[#1E3A5F] px-6 sm:px-10 py-10 sm:py-12 text-center">
      <h3 className="text-white text-xl sm:text-2xl font-black mb-3">Need a Service Not Listed?</h3>
      <p className="text-white/70 text-sm mb-6">We handle all plumbing and heating needs. Just ask!</p>
      <button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-8 py-3 rounded-xl text-sm font-bold hover:shadow-xl transition-all">
        Contact Us Today
      </button>
    </div>
  </div>
);

// ABOUT PAGE - WITH TEAM PHOTOS
const AboutPage = () => (
  <div className="bg-white">
    {/* Hero */}
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img src={aboutImage} alt="Riverstone team" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/70" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">Our Story</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">Three Generations of Trust</h1>
      </div>
    </div>

    {/* Story */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="text-[#1E3A5F] text-xl sm:text-2xl font-black mb-4">Our Family Legacy</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Marcus Riverstone Sr. started this company in 1987 with a simple belief: treat every customer's home like it's your own family's. That philosophy has guided us through three generations.
              </p>
              <p>
                Today, Marcus Jr. and Elena run the day-to-day operations, but the values remain the same. We show up on time, give honest quotes, and stand behind every job with our 100% satisfaction guarantee.
              </p>
              <p>
                When you call Riverstone, you're not just getting a plumber — you're getting a neighbor who cares about doing the job right.
              </p>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] rounded-3xl p-8 text-white">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[#F97316] font-black text-3xl sm:text-4xl">37</p>
                <p className="text-white/60 text-xs mt-1">Years</p>
              </div>
              <div>
                <p className="text-[#F97316] font-black text-3xl sm:text-4xl">15K+</p>
                <p className="text-white/60 text-xs mt-1">Jobs Done</p>
              </div>
              <div>
                <p className="text-[#F97316] font-black text-3xl sm:text-4xl">4.9</p>
                <p className="text-white/60 text-xs mt-1">★ Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-[#1E3A5F] text-xl sm:text-2xl font-black mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { img: teamMarcus, name: 'Marcus Jr.', role: 'Owner / Lead Tech', exp: '20+ years' },
              { img: teamElena, name: 'Elena', role: 'Operations Manager', exp: '15+ years' },
              { img: teamMike, name: 'Mike S.', role: 'Senior Technician', exp: '18+ years' },
              { img: teamDave, name: 'Dave K.', role: 'Service Technician', exp: '12+ years' },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[3/4]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-[#1E3A5F] font-bold text-sm sm:text-base">{member.name}</h3>
                <p className="text-gray-500 text-xs">{member.role}</p>
                <p className="text-[#F97316] text-[10px] font-medium">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Certifications */}
    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8f] px-6 sm:px-10 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-white font-black text-xl mb-6">Certifications & Licenses</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['Licensed Master Plumber', 'EPA Certified', 'BBB A+ Rated', 'Fully Insured', 'Background Checked', 'Drug-Free Workplace'].map((cert) => (
            <span key={cert} className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium border border-white/10">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// REVIEWS PAGE - WITH CUSTOMER PHOTOS
const ReviewsPage = () => (
  <div className="bg-white">
    {/* Hero */}
    <div className="bg-gradient-to-r from-[#1E3A5F] via-[#2d5a8f] to-[#1E3A5F] px-6 sm:px-10 py-12 sm:py-16 text-center relative overflow-hidden">
      <div className="relative">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Customer Reviews</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black mt-2 mb-4">What Denver Says About Us</h1>
        <div className="flex justify-center items-center gap-4 mb-2">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-white text-3xl sm:text-4xl font-black">4.9</span>
        </div>
        <p className="text-white/70 text-sm">Based on 500+ verified reviews</p>
      </div>
    </div>

    {/* Stats Bar */}
    <div className="px-6 sm:px-10 py-6 bg-gray-50 border-b border-gray-100">
      <div className="flex justify-center gap-8 sm:gap-16">
        {[
          { value: '500+', label: 'Reviews' },
          { value: '98%', label: 'Recommend' },
          { value: '5★', label: 'Average' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-[#1E3A5F] font-black text-xl sm:text-2xl">{stat.value}</p>
            <p className="text-gray-400 text-[10px] uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Reviews Grid */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {[
          { img: reviewSarah, name: 'Sarah M.', date: '2 weeks ago', stars: 5, text: 'Riverstone saved us when our water heater burst at 2am. Mike arrived within an hour and had us back up and running by morning. True professionals!', service: 'Emergency Repair' },
          { img: reviewJames, name: 'James R.', date: '1 month ago', stars: 5, text: "Finally found a plumber I can trust. Upfront pricing, clean work, and they even cleaned up after themselves. Will use them for everything.", service: 'Drain Cleaning' },
          { img: reviewLinda, name: 'Linda K.', date: '1 month ago', stars: 5, text: "Best experience ever with a plumber. Marcus explained everything, gave me options, and didn't try to upsell me on things I didn't need.", service: 'Water Heater' },
          { img: reviewDavid, name: 'David P.', date: '2 months ago', stars: 5, text: 'Had a major sewer line issue. They used camera inspection to find the problem and gave me a fair quote. Fixed it same day!', service: 'Sewer Line' },
          { img: reviewMichelle, name: 'Michelle T.', date: '2 months ago', stars: 5, text: 'Great service! The team was professional, on time, and the quality of work was excellent. Highly recommend Riverstone!', service: 'Pipe Repair' },
          { img: reviewRobert, name: 'Robert B.', date: '3 months ago', stars: 5, text: 'These guys are the real deal. Third generation family business and it shows. They care about their work and their customers.', service: 'Maintenance' },
        ].map((review, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-3 mb-4">
              <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#F97316]/20" />
              <div className="flex-1">
                <p className="text-[#1E3A5F] font-bold text-sm">{review.name}</p>
                <p className="text-gray-400 text-[10px]">{review.date}</p>
              </div>
              <div className="flex">
                {[...Array(review.stars)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.text}</p>
            <span className="text-[#F97316] text-[10px] font-semibold bg-orange-50 px-2 py-1 rounded-full">{review.service}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Leave Review CTA */}
    <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] px-6 sm:px-10 py-10 sm:py-12 text-center">
      <h3 className="text-white font-black text-xl sm:text-2xl mb-2">Had a Great Experience?</h3>
      <p className="text-white/90 text-sm mb-6">We'd love to hear from you!</p>
      <button className="bg-white text-[#F97316] px-8 py-3 rounded-xl text-sm font-black hover:shadow-xl transition-all">
        Leave a Review
      </button>
    </div>
  </div>
);

// CONTACT PAGE
const ContactPage = () => (
  <div className="bg-white">
    {/* Hero */}
    <div className="relative h-36 sm:h-44 overflow-hidden">
      <img src={contactImage} alt="Contact us" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/70" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">Get In Touch</span>
        <h1 className="text-white text-2xl sm:text-3xl font-black">Contact Us</h1>
      </div>
    </div>

    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-[#1E3A5F] font-black text-xl mb-6">Contact Information</h2>
          
          <div className="space-y-5">
            {[
              { icon: Phone, label: 'Phone', value: '(303) 555-0147', sub: '24/7 Emergency Line' },
              { icon: Mail, label: 'Email', value: 'info@riverstoneplumbing.com', sub: 'Response within 1 hour' },
              { icon: MapPin, label: 'Address', value: '4521 Morrison Rd', sub: 'Denver, CO 80219' },
              { icon: Clock, label: 'Hours', value: '24/7 Emergency Service', sub: 'Office: Mon-Fri 8am-6pm' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#F97316]" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wide">{item.label}</p>
                  <p className="text-[#1E3A5F] font-bold text-sm">{item.value}</p>
                  <p className="text-gray-500 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Service Area */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-5">
            <h3 className="text-[#1E3A5F] font-bold text-sm mb-2">Service Area</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              We proudly serve Denver and surrounding areas including Lakewood, Arvada, Aurora, Littleton, Westminster, Thornton, Englewood, and more.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl">
          <h2 className="text-[#1E3A5F] font-black text-xl mb-6">Request Service</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">First Name *</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-gray-500 text-xs font-medium mb-1.5">Last Name *</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Phone *</label>
              <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Service Needed</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all bg-white">
                <option>Select a service...</option>
                <option>Emergency Repair</option>
                <option>Drain Cleaning</option>
                <option>Water Heater</option>
                <option>Leak Detection</option>
                <option>Pipe Repair</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Message</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all resize-none" placeholder="Tell us about your plumbing issue..." />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-4 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Emergency CTA */}
    <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 sm:px-10 py-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-white animate-pulse" />
          <h3 className="text-white font-black text-lg">Plumbing Emergency?</h3>
        </div>
        <button className="bg-white text-red-600 px-8 py-3 rounded-xl text-sm font-black hover:shadow-xl transition-all flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call Now: (303) 555-0147
        </button>
      </div>
    </div>
  </div>
);

// FOOTER
const FooterSection = ({ onNavigate }: PageProps) => (
  <footer className="bg-[#0f1f2e] text-white px-6 sm:px-10 py-10 sm:py-14">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {/* Logo */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
              <span className="text-white text-sm font-bold">RP</span>
            </div>
            <div>
              <span className="font-bold text-sm block">Riverstone</span>
              <span className="text-white/50 text-[10px]">Plumbing & Heating</span>
            </div>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">
            Third-generation family plumbers serving Denver with pride since 1987.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Services</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer transition-colors">Emergency Repair</li>
            <li className="hover:text-white cursor-pointer transition-colors">Drain Cleaning</li>
            <li className="hover:text-white cursor-pointer transition-colors">Water Heaters</li>
            <li className="hover:text-white cursor-pointer transition-colors">Leak Detection</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Company</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('about')}>About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('reviews')}>Reviews</li>
            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate?.('contact')}>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Contact</h4>
          <div className="space-y-2 text-white/60 text-xs">
            <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> (303) 555-0147</p>
            <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> info@riverstoneplumbing.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Denver, CO 80219</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-[10px]">
          © 2024 Riverstone Plumbing & Heating. All rights reserved.
        </p>
        <div className="flex gap-4 text-white/40 text-[10px]">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Sitemap</span>
        </div>
      </div>
    </div>
  </footer>
);

export default RiverstoneInteractiveMockup;
