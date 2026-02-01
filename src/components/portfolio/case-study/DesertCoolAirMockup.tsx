/**
 * @fileoverview Desert Cool Air Interactive Mockup
 * @module components/portfolio/case-study/DesertCoolAirMockup
 * 
 * Exact replica of desertcoolair.com - Phoenix HVAC Company
 * - 4 pages: Home, Services, About, Contact
 * - Dark charcoal (#1a1a1a) header with white text
 * - Orange (#F97316) CTAs
 * - Arizona mountain hero background
 * - HVAC-focused AI chatbot
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Star, ChevronRight, MessageCircle, 
  Send, X, Menu, Shield, Award, Wrench, ThermometerSun, Wind,
  CheckCircle2, Calendar, ArrowRight, Zap, Snowflake, Flame,
  AlertTriangle, Users, BadgeCheck, ChevronDown
} from 'lucide-react';

// Import images
import heroMountain from '@/assets/portfolio/desertcoolair/hero-mountain.jpg';
import teamGroup from '@/assets/portfolio/desertcoolair/team-group.jpg';
import comfortableHome from '@/assets/portfolio/desertcoolair/comfortable-home-interior.jpg';
import serviceAcRepair from '@/assets/portfolio/desertcoolair/service-ac-repair.jpg';
import serviceAcInstallation from '@/assets/portfolio/desertcoolair/service-ac-installation.jpg';
import serviceHeating from '@/assets/portfolio/desertcoolair/service-heating.jpg';
import serviceMaintenance from '@/assets/portfolio/desertcoolair/service-maintenance.jpg';
import serviceEmergency from '@/assets/portfolio/desertcoolair/service-emergency.jpg';
import serviceAirQuality from '@/assets/portfolio/desertcoolair/service-air-quality.jpg';
import reviewMaria from '@/assets/portfolio/desertcoolair/review-maria.jpg';
import reviewJames from '@/assets/portfolio/desertcoolair/review-james.jpg';
import reviewHenderson from '@/assets/portfolio/desertcoolair/review-henderson.jpg';

type MockupPage = 'home' | 'services' | 'about' | 'contact';

// ============================================
// CHATBOT TYPES AND DATA
// ============================================
type ChatStep = 
  | 'initial' 
  | 'service-type' 
  | 'ac-issue-type'
  | 'scheduling'
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

// Brand colors
const COLORS = {
  charcoal: '#1a1a1a',
  darkGray: '#2a2a2a',
  orange: '#F97316',
  orangeDark: '#EA580C',
  white: '#FFFFFF',
  grayLight: '#F8FAFC',
};

// ============================================
// MAIN COMPONENT
// ============================================
export const DesertCoolAirMockup = () => {
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>('initial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  // Navigation handler that ALWAYS scrolls to top
  const navigateTo = (page: MockupPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    // Force scroll to top immediately
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
    // Also use setTimeout as backup for any async rendering
    setTimeout(() => {
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }
    }, 0);
  };

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
        "Hi! 👋 I'm Chloe from Desert Cool Air. How can I help you beat the heat today?",
        [
          { label: "🚨 AC Emergency - Need help NOW", value: "emergency", nextStep: 'emergency' },
          { label: "📅 Schedule Service", value: "schedule", nextStep: 'service-type' },
          { label: "💰 Get a Free Estimate", value: "quote", nextStep: 'quote' }
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
            "I understand — AC emergencies are stressful, especially in this heat! 🌡️ We have technicians available 24/7. Is someone home right now to let us in?",
            [
              { label: "Yes, I'm home now", value: "home", nextStep: 'confirmed' },
              { label: "I'll be home within the hour", value: "later", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "Great! What type of service do you need?",
            [
              { label: "❄️ AC Repair", value: "ac-repair", nextStep: 'ac-issue-type' },
              { label: "🔥 Heating Service", value: "heating", nextStep: 'scheduling' },
              { label: "🔧 Maintenance", value: "maintenance", nextStep: 'scheduling' },
              { label: "💨 Air Quality", value: "air-quality", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'ac-issue-type':
          addBotMessage(
            "Got it — AC repair. Can you tell me more about the issue?",
            [
              { label: "AC not cooling", value: "not-cooling", nextStep: 'scheduling' },
              { label: "AC making noise", value: "noise", nextStep: 'scheduling' },
              { label: "AC won't turn on", value: "wont-start", nextStep: 'scheduling' },
              { label: "Not sure — just not working right", value: "other", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'scheduling':
          addBotMessage(
            "Thanks for that info! I can get a certified tech to you quickly. What day works best?",
            [
              { label: "Today (if available)", value: "today", nextStep: 'time-select' },
              { label: "Tomorrow", value: "tomorrow", nextStep: 'time-select' },
              { label: "This week", value: "this-week", nextStep: 'time-select' }
            ]
          );
          break;

        case 'time-select':
          addBotMessage(
            "We have morning (8-11am) or afternoon (1-4pm) available. Which works better for you?",
            [
              { label: "☀️ Morning (8-11am)", value: "morning", nextStep: 'contact-info' },
              { label: "🌤️ Afternoon (1-4pm)", value: "afternoon", nextStep: 'contact-info' }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Perfect! I've got that time reserved. To confirm your appointment, I just need your name and phone number."
          );
          setTimeout(() => {
            addBotMessage(
              "✅ You're all set! A technician will call 30 minutes before arrival. You'll also get a text reminder. Is there anything else I can help with?",
              [
                { label: "That's all, thanks!", value: "done", nextStep: 'confirmed' },
                { label: "I have another question", value: "another", nextStep: 'initial' }
              ]
            );
          }, 2000);
          break;

        case 'quote':
          addBotMessage(
            "Happy to help with a free estimate! What service are you interested in?",
            [
              { label: "New AC Installation", value: "ac-install", nextStep: 'confirmed' },
              { label: "Heating System", value: "heating", nextStep: 'confirmed' },
              { label: "Maintenance Plan", value: "maintenance", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'confirmed':
          addBotMessage(
            "You're welcome! We'll take great care of you. Stay cool! ❄️😊"
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
      "Hi! 👋 I'm Chloe from Desert Cool Air. How can I help you beat the heat today?",
      [
        { label: "🚨 AC Emergency - Need help NOW", value: "emergency", nextStep: 'emergency' },
        { label: "📅 Schedule Service", value: "schedule", nextStep: 'service-type' },
        { label: "💰 Get a Free Estimate", value: "quote", nextStep: 'quote' }
      ]
    );
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-card border border-border/50 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)]">
      {/* Browser Chrome - macOS Style */}
      <div className="h-9 sm:h-11 bg-gradient-to-b from-[#3d3d3d] to-[#2a2a2a] flex items-center px-3 sm:px-4 gap-3 border-b border-[#1a1a1a]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#27CA40] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
        </div>
        <div className="flex-1 mx-2 sm:mx-12">
          <div className="bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-[11px] sm:text-xs text-white/80 flex items-center gap-2 max-w-lg mx-auto shadow-inner">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="font-medium">desertcoolair.com{currentPage === 'home' ? '' : `/${currentPage}`}</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] overflow-y-auto relative bg-[#1a1a1a]">
        {/* Navigation Header - Dark charcoal like the real site */}
        <nav className="h-14 sm:h-16 bg-[#1a1a1a]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 relative z-30 border-b border-white/5">
          <div className="flex items-center gap-3">
            {/* Logo - Snowflake icon like the real site */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Snowflake className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm sm:text-base">Desert Cool Air</span>
              <span className="text-white/50 font-medium text-[9px] sm:text-[10px] block -mt-0.5">HVAC Experts</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-xs font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-[#F97316]' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:6026092300" className="hidden lg:flex items-center gap-2 text-white/80 font-medium text-sm">
              <Phone className="w-4 h-4" />
              (602) 609-2300
            </a>
            <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all">
              Get Free Estimate
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-[#1a1a1a]/98 backdrop-blur-md border-b border-white/5 z-40">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-6 py-4 text-sm font-medium border-l-4 transition-all ${
                  currentPage === item.id 
                    ? 'text-[#F97316] bg-white/5 border-[#F97316]' 
                    : 'text-white/70 border-transparent hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page Content */}
        <div ref={contentContainerRef} className="h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-y-auto scroll-smooth">
          {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
          {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}
          {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
          {currentPage === 'contact' && <ContactPage />}
          <FooterSection onNavigate={navigateTo} />
        </div>

        {/* Chat Prompt Bubble */}
        {!chatOpen && showChatPrompt && (
          <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-[200px] z-50 border border-gray-100">
            <button 
              onClick={() => setShowChatPrompt(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 mb-1">Chat with Chloe</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">AC issues? I can help schedule service right now! ❄️</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </div>
        )}

        {/* Chat Widget Button */}
        {!chatOpen && (
          <button
            onClick={() => { setChatOpen(true); setShowChatPrompt(false); }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 transition-all z-50 group"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[360px] h-[70%] sm:h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">C</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Chloe</p>
                  <p className="text-white/60 text-[11px]">HVAC Assistant • Online</p>
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
                        <span className="text-white text-xs font-bold">C</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-[12px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-2xl rounded-br-md shadow-lg'
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
                          className="px-4 py-2 bg-white border-2 border-[#F97316] text-[#F97316] rounded-full text-[11px] font-semibold hover:bg-[#F97316] hover:text-white transition-all shadow-sm"
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
                    <span className="text-white text-xs font-bold">C</span>
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
                <button className="w-9 h-9 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-md">
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
// PAGE COMPONENTS
// ============================================

interface PageProps {
  onNavigate?: (page: MockupPage) => void;
}

// HOME PAGE - Matching desertcoolair.com
const HomePage = ({ onNavigate }: PageProps) => (
  <div className="bg-white">
    {/* Hero Section - Mountain background */}
    <div className="relative min-h-[350px] sm:min-h-[450px] overflow-hidden">
      <img 
        src={heroMountain} 
        alt="Arizona desert mountains"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="relative px-6 sm:px-10 py-12 sm:py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-[10px] sm:text-xs font-medium mb-5">
            <div className="w-2 h-2 bg-[#F97316] rounded-full" />
            <span>Serving the Valley Since 2010 • Licensed • Bonded • Insured</span>
          </div>
          
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black mb-2 leading-[1.1]">
            Phoenix's Most Trusted
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-5 leading-[1.1]">
            <span className="text-[#F97316]">HVAC Experts</span>
          </h1>
          
          <p className="text-white/70 text-sm sm:text-base font-medium mb-3">
            24/7 Emergency Service • Same-Day Appointments • 100% Satisfaction Guaranteed
          </p>
          
          <p className="text-white/60 text-sm sm:text-base mb-8 max-w-md">
            Beat the Arizona heat with fast, reliable AC repair and installation. Expert technicians, upfront pricing, and service you can count on.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate?.('contact')}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            >
              Schedule Your Free Estimate
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (602) 609-2300
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
      </div>
    </div>

    {/* Services Section */}
    <div className="px-6 sm:px-10 py-14 sm:py-20 bg-white">
      <div className="text-center mb-10">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Our Services</span>
        <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">Complete HVAC Solutions</h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">From emergency repairs to full system installations, we've got you covered with comprehensive heating and cooling services.</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {[
          { img: serviceAcRepair, name: 'AC Repair', desc: 'Fast diagnosis and repair for all AC brands. Most repairs completed same-day.' },
          { img: serviceAcInstallation, name: 'AC Installation', desc: 'Energy-efficient systems professionally installed. Free in-home estimates.' },
          { img: serviceHeating, name: 'Heating Services', desc: 'Furnace repair, heat pump service, and heating system installation.' },
          { img: serviceMaintenance, name: 'Maintenance Plans', desc: 'Preventive maintenance to extend equipment life and prevent breakdowns.' },
          { img: serviceEmergency, name: 'Emergency Service', desc: "24/7 emergency repairs. We're here when you need us most." },
          { img: serviceAirQuality, name: 'Indoor Air Quality', desc: 'Air purifiers, filtration systems, and duct cleaning for healthier air.' },
        ].map((service) => (
          <div key={service.name} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-gray-900 font-bold text-sm sm:text-base mb-2">{service.name}</h3>
              <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed mb-3">{service.desc}</p>
              <button className="text-[#F97316] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="px-6 sm:px-10 py-14 sm:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Why Choose Us</span>
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">Why Phoenix Trusts Us</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">When your AC breaks down in the Arizona heat, you need a team that responds fast, works efficiently, and stands behind their work.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            { icon: BadgeCheck, title: 'Licensed & Insured', desc: 'ROC licensed, fully bonded and insured for your protection' },
            { icon: Clock, title: '24/7 Emergency', desc: 'AC emergency at 2am? We answer the phone.' },
            { icon: Zap, title: 'Upfront Pricing', desc: 'No surprises. Know the cost before we start.' },
            { icon: Calendar, title: 'Same-Day Service', desc: 'Most calls completed the same day you call.' },
            { icon: CheckCircle2, title: 'Satisfaction Guaranteed', desc: "Not happy? We make it right. Period." },
            { icon: MapPin, title: 'Local Phoenix Team', desc: 'We live here too. We know desert HVAC.' },
          ].map((item) => (
            <div key={item.title} className="bg-white p-5 rounded-xl border border-gray-100">
              <item.icon className="w-8 h-8 text-[#F97316] mb-3" />
              <h3 className="text-gray-900 font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-center text-gray-400 text-xs font-semibold uppercase tracking-widest mb-6">By The Numbers</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { value: '15,000+', label: 'Homes Served' },
              { value: '4.9/5', label: 'Customer Rating' },
              { value: '24/7', label: 'Emergency Service' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#F97316] font-black text-xl sm:text-2xl">{stat.value}</p>
                <p className="text-gray-400 text-[10px] sm:text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div className="px-6 sm:px-10 py-14 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Testimonials</span>
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Don't just take our word for it. Here's what Phoenix homeowners have to say about their experience with Desert Cool Air.</p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { img: reviewMaria, name: 'Maria R.', location: 'Scottsdale', text: 'Our AC died during a 115° week. Desert Cool Air had a tech here in 2 hours and got us cool by dinner. Lifesavers!' },
            { img: reviewJames, name: 'James T.', location: 'Mesa', text: "Fair pricing, no upselling, and they actually showed up on time. Hard to find these days. Highly recommend." },
            { img: reviewHenderson, name: 'The Henderson Family', location: 'Gilbert', text: "They've maintained our system for 5 years. Never had a breakdown. Worth every penny of the maintenance plan." },
          ].map((review, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-[#F97316] font-bold text-lg">4.9/5 <span className="text-gray-400 text-sm font-normal">from 500+ reviews</span></p>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-[#1a1a1a] px-6 sm:px-10 py-14 sm:py-16 text-center">
      <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">Don't Sweat It — We've Got You Covered</h3>
      <p className="text-white/70 text-sm sm:text-base mb-8 max-w-lg mx-auto">Schedule your free estimate today and stay comfortable year-round.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-8 py-4 rounded-lg text-sm font-bold transition-all flex items-center gap-2 justify-center">
          <Phone className="w-5 h-5" />
          Call (602) 609-2300
        </button>
        <button 
          onClick={() => onNavigate?.('contact')}
          className="bg-white text-gray-900 px-8 py-4 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all"
        >
          Request Estimate
        </button>
      </div>
    </div>
  </div>
);

// SERVICES PAGE
const ServicesPage = ({ onNavigate }: PageProps) => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img src={serviceAcRepair} alt="HVAC services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">Our Services</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">Our HVAC Services</h1>
        <p className="text-white/70 text-sm mt-2">Comprehensive heating and cooling solutions for Phoenix homes and businesses</p>
      </div>
    </div>

    {/* Services List */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {[
          { img: serviceAcRepair, name: 'Air Conditioning Repair', desc: 'When your AC fails in the Arizona heat, you need fast, reliable service. Our certified technicians diagnose and repair all brands and models, with most repairs completed the same day you call.', features: ['Refrigerant leaks and recharging', 'Compressor and fan motor issues', 'Thermostat problems', 'Electrical component failures', 'Frozen evaporator coils', 'Drainage issues'] },
          { img: serviceAcInstallation, name: 'AC Installation & Replacement', desc: "Whether you're replacing an aging system or installing AC in a new home, we help you choose the right system for your space and budget. We install all major brands including Trane, Carrier, Lennox, and Goodman.", features: ['Free in-home estimates', 'Energy-efficient options (up to 21 SEER)', 'Financing available', '10-year parts warranty', 'Proper sizing for maximum efficiency'] },
          { img: serviceHeating, name: 'Heating Services', desc: 'Phoenix winters can get cold. Our heating experts service and install furnaces, heat pumps, and dual-fuel systems to keep you comfortable year-round.', features: ['Furnace repair and installation', 'Heat pump service', 'Gas and electric systems', 'Pilot light and ignition issues', 'Ductwork inspection'] },
        ].map((service, i) => (
          <div key={service.name} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <img src={service.img} alt={service.name} className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
            </div>
            <div className={i % 2 === 1 ? 'md:order-1' : ''}>
              <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-[#F97316]" />
              </div>
              <h2 className="text-gray-900 text-xl sm:text-2xl font-black mb-3">{service.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-semibold mb-2">What We {i === 0 ? 'Fix' : 'Include'}:</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-gray-500 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#F97316] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => onNavigate?.('contact')}
                className="bg-[#F97316] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#EA580C] transition-all"
              >
                Schedule {service.name.split(' ')[0]} Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Emergency CTA */}
    <div className="bg-[#F97316] px-6 sm:px-10 py-10 sm:py-12 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-white" />
          <div className="text-left">
            <h3 className="text-white font-bold text-lg">AC Emergency?</h3>
            <p className="text-white/80 text-sm">We answer 24/7 — don't wait!</p>
          </div>
        </div>
        <button className="bg-white text-[#F97316] px-8 py-3 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call Now: (602) 609-2300
        </button>
      </div>
    </div>
  </div>
);

// ABOUT PAGE
const AboutPage = ({ onNavigate }: PageProps) => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img src={teamGroup} alt="Desert Cool Air team" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">About Us</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">About Desert Cool Air</h1>
        <p className="text-white/70 text-sm mt-2">Your neighbors keeping Phoenix comfortable since 2010</p>
      </div>
    </div>

    {/* Story Section */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-gray-900 text-2xl font-black mb-4">Our Story</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Desert Cool Air was founded with a simple mission: provide honest, reliable HVAC service to Phoenix families and businesses. What started as a one-truck operation has grown into a team of certified technicians serving the entire Valley.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              We're not a franchise or a big corporate chain. We're your neighbors who understand what it means to lose AC during a 115° summer day. That's why we answer our phones 24/7, show up when we say we will, and charge fair prices with no surprises.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every technician on our team is NATE certified, drug tested, and background checked. When we send someone to your home, we send someone we'd trust in our own.
            </p>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="mt-6 bg-[#F97316] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#EA580C] transition-all"
            >
              Get a Free Estimate
            </button>
          </div>
          <div className="relative">
            <img src={comfortableHome} alt="Comfortable Arizona home" className="rounded-2xl shadow-xl" />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl">
              <p className="text-[#F97316] font-black text-3xl">15+</p>
              <p className="text-gray-500 text-xs">Years Serving Phoenix</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-gray-900 text-2xl font-black mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'Integrity', desc: "We do the right thing, even when no one's watching" },
              { icon: Award, title: 'Excellence', desc: "Good enough isn't in our vocabulary" },
              { icon: Users, title: 'Community', desc: 'Phoenix is our home. We give back.' },
              { icon: Clock, title: 'Reliability', desc: 'We show up. On time. Every time.' },
            ].map((value) => (
              <div key={value.title} className="bg-gray-50 p-5 rounded-xl text-center">
                <value.icon className="w-8 h-8 text-[#F97316] mx-auto mb-3" />
                <h3 className="text-gray-900 font-bold text-sm mb-1">{value.title}</h3>
                <p className="text-gray-500 text-[11px]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-16">
          <h2 className="text-gray-900 text-2xl font-black mb-6 text-center">Certifications & Credentials</h2>
          <p className="text-gray-500 text-sm text-center mb-6">We invest in training and certifications so you can trust that your HVAC system is in expert hands.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['NATE Certified Technicians', 'EPA 608 Universal Certified', 'BBB Accredited Business (A+ Rating)', 'Arizona ROC Licensed', 'Factory Authorized: Trane, Carrier, Lennox'].map((cert) => (
              <span key={cert} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-medium">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Service Area */}
    <div className="bg-gray-50 px-6 sm:px-10 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-gray-900 font-black text-xl mb-4">Proudly Serving the Phoenix Metro</h3>
        <p className="text-gray-500 text-sm mb-4">We service homes and businesses throughout the Valley.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Phoenix', 'Scottsdale', 'Mesa', 'Tempe', 'Chandler', 'Gilbert', 'Glendale', 'Peoria', 'Surprise', 'Avondale', 'Goodyear', 'Buckeye'].map((city) => (
            <span key={city} className="text-[#F97316] text-sm font-medium">{city}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// CONTACT PAGE
const ContactPage = () => (
  <div className="bg-white">
    {/* Hero */}
    <div className="relative h-44 sm:h-56 overflow-hidden">
      <img src={serviceAcInstallation} alt="Contact us" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest mb-2">Contact Us</span>
        <h1 className="text-white text-2xl sm:text-3xl font-black">Let's Talk About Your HVAC Needs</h1>
        <p className="text-white/70 text-sm mt-2">Get your free estimate or schedule service today</p>
      </div>
    </div>

    {/* Emergency Banner */}
    <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm">AC Emergency?</p>
            <p className="text-gray-500 text-xs">We answer 24/7 — don't wait!</p>
          </div>
        </div>
        <button className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#EA580C] transition-all flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call Now: (602) 609-2300
        </button>
      </div>
    </div>

    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
        {/* Contact Info */}
        <div>
          <span className="text-[#F97316] font-semibold text-xs uppercase tracking-widest">Contact Us</span>
          <h2 className="text-gray-900 font-black text-2xl mt-2 mb-6">Get Your Free Estimate</h2>
          <p className="text-gray-500 text-sm mb-6">Fill out the form and one of our HVAC experts will contact you within 24 hours to discuss your needs and schedule service.</p>
          
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Phone', value: '(602) 609-2300', sub: '24/7 Emergency' },
              { icon: Mail, label: 'Email', value: 'info@desertcoolair.com', sub: '' },
              { icon: Clock, label: 'Hours', value: 'Mon-Fri: 7am - 7pm', sub: 'Sat: 8am - 5pm\n24/7 Emergency Service' },
              { icon: MapPin, label: 'Service Area', value: 'Phoenix Metro Area', sub: 'Scottsdale, Tempe, Mesa, Gilbert, Chandler, Glendale & more' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                  <p className="text-[#F97316] text-sm">{item.value}</p>
                  {item.sub && <p className="text-gray-400 text-xs whitespace-pre-line">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">First Name *</label>
                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Last Name *</label>
                <input type="text" placeholder="Smith" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Phone *</label>
                <input type="tel" placeholder="(602) 555-1234" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Email *</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Address / Zip Code</label>
              <input type="text" placeholder="123 Main St, Phoenix, AZ 85001" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Service Needed *</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none bg-white text-gray-600">
                <option>Select a service</option>
                <option>AC Repair</option>
                <option>AC Installation</option>
                <option>Heating Services</option>
                <option>Maintenance</option>
                <option>Emergency Service</option>
                <option>Indoor Air Quality</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Message</label>
              <textarea rows={3} placeholder="Tell us about your HVAC needs..." className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none resize-none" />
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <input type="checkbox" className="mt-1" />
              <span>By checking this box, I consent to receive calls and text messages from Desert Cool Air regarding my request.</span>
            </div>
            <button type="submit" className="w-full bg-[#F97316] text-white py-4 rounded-lg text-sm font-bold hover:bg-[#EA580C] transition-all">
              Request Your Free Estimate
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// FOOTER
const FooterSection = ({ onNavigate }: PageProps) => (
  <footer className="bg-[#0f1419] text-white px-6 sm:px-10 py-10 sm:py-14">
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {/* Logo */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <Snowflake className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block">Desert Cool Air</span>
              <span className="text-white/50 text-[10px]">HVAC Experts</span>
            </div>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">
            Keeping Phoenix comfortable since 2010. Licensed, bonded, insured.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Services</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>AC Repair</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>AC Installation</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Heating</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Maintenance</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Company</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('about')}>About Us</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('home')}>Reviews</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('about')}>Careers</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('contact')}>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#F97316]">Contact</h4>
          <div className="space-y-2 text-white/60 text-xs">
            <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> (602) 609-2300</p>
            <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> info@desertcoolair.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Phoenix, AZ</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-[10px]">
          © 2024 Desert Cool Air. All rights reserved.
        </p>
        <div className="flex gap-4 text-white/40 text-[10px]">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default DesertCoolAirMockup;
