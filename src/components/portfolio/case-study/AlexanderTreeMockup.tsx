/**
 * @fileoverview Alexander Tree & Landscaping Interactive Mockup
 * @module components/portfolio/case-study/AlexanderTreeMockup
 * 
 * Replica of alexandertreeandlandscaping.com - Orange County Tree Service
 * - 4 pages: Home, Services, About, Contact
 * - Forest green (#166534) primary with earthy brown (#78350F) accents
 * - Tree service focused AI chatbot
 * - Orange County service area
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Star, ChevronRight, MessageCircle, 
  Send, X, Menu, Shield, Award, TreePine, Leaf, Shovel,
  CheckCircle2, Calendar, ArrowRight, Truck, Mountain, Scissors,
  AlertTriangle, Users, BadgeCheck, ChevronDown, Camera
} from 'lucide-react';

// Import images
import treeWork from '@/assets/portfolio/alexandertree/tree-work.jpg';
import stumpRoots from '@/assets/portfolio/alexandertree/stump-roots.jpg';
import palmService from '@/assets/portfolio/alexandertree/palm-service.jpg';
import sprinklerRepair from '@/assets/portfolio/alexandertree/sprinkler-repair.jpg';
import haulingCleanup from '@/assets/portfolio/alexandertree/hauling-cleanup.jpg';
import plantingSod from '@/assets/portfolio/alexandertree/planting-sod.jpg';
import alexanderPortrait from '@/assets/portfolio/alexandertree/alexander-portrait.jpg';
import heroBackground from '@/assets/portfolio/alexandertree/hero-background.jpg';

type MockupPage = 'home' | 'services' | 'about' | 'contact';

// ============================================
// CHATBOT TYPES AND DATA
// ============================================
type ChatStep = 
  | 'initial' 
  | 'service-type' 
  | 'tree-details'
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
  forest: '#166534',
  forestDark: '#14532d',
  brown: '#78350F',
  brownLight: '#92400E',
  cream: '#FEFCE8',
  white: '#FFFFFF',
  grayLight: '#F8FAFC',
};

// ============================================
// MAIN COMPONENT
// ============================================
export const AlexanderTreeMockup = () => {
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
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
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
        "Hi! 👋 I'm Alex from Alexander Tree & Landscaping. How can I help you today?",
        [
          { label: "🌳 Tree Removal or Trimming", value: "tree", nextStep: 'tree-details' },
          { label: "🌴 Palm Tree Service", value: "palm", nextStep: 'service-type' },
          { label: "💰 Get a Free Estimate", value: "quote", nextStep: 'quote' },
          { label: "📅 Schedule Service", value: "schedule", nextStep: 'service-type' }
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
        case 'tree-details':
          addBotMessage(
            "Got it — tree work! Can you tell me more about what you need? 📸 Photos really help us give accurate estimates!",
            [
              { label: "Full tree removal", value: "removal", nextStep: 'scheduling' },
              { label: "Trimming / pruning", value: "trim", nextStep: 'scheduling' },
              { label: "Stump grinding", value: "stump", nextStep: 'scheduling' },
              { label: "Not sure — need assessment", value: "assess", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "Perfect! What type of service are you looking for?",
            [
              { label: "🌳 Tree Service", value: "tree", nextStep: 'tree-details' },
              { label: "🌴 Palm Tree Trimming", value: "palm", nextStep: 'scheduling' },
              { label: "💧 Sprinkler Repair", value: "sprinkler", nextStep: 'scheduling' },
              { label: "🚛 Hauling & Cleanup", value: "hauling", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'scheduling':
          addBotMessage(
            "Great! Alexander can come take a look and give you an honest quote. When works best for a free estimate?",
            [
              { label: "As soon as possible", value: "asap", nextStep: 'contact-info' },
              { label: "This week", value: "this-week", nextStep: 'contact-info' },
              { label: "Just need a ballpark", value: "ballpark", nextStep: 'contact-info' }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Perfect! To schedule your free estimate, I'll need your address or zip code and photos of the job. You can upload them here or text them to (714) 555-8234."
          );
          setTimeout(() => {
            addBotMessage(
              "✅ Got it! Alexander will reach out within 24 hours to confirm your estimate. Is there anything else I can help with?",
              [
                { label: "That's all, thanks!", value: "done", nextStep: 'confirmed' },
                { label: "I have another question", value: "another", nextStep: 'initial' }
              ]
            );
          }, 2000);
          break;

        case 'quote':
          addBotMessage(
            "Happy to help with a free estimate! We require photos before providing quotes — this ensures honest, accurate pricing. What service do you need?",
            [
              { label: "🌳 Tree Removal / Trim", value: "tree", nextStep: 'scheduling' },
              { label: "🌴 Palm Service", value: "palm", nextStep: 'scheduling' },
              { label: "🚛 Hauling / Cleanup", value: "hauling", nextStep: 'scheduling' },
              { label: "💧 Landscaping", value: "landscape", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'confirmed':
          addBotMessage(
            "You're all set! We treat every property like our own — no mess left behind. Talk soon! 🌳"
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
      "Hi! 👋 I'm Alex from Alexander Tree & Landscaping. How can I help you today?",
      [
        { label: "🌳 Tree Removal or Trimming", value: "tree", nextStep: 'tree-details' },
        { label: "🌴 Palm Tree Service", value: "palm", nextStep: 'service-type' },
        { label: "💰 Get a Free Estimate", value: "quote", nextStep: 'quote' },
        { label: "📅 Schedule Service", value: "schedule", nextStep: 'service-type' }
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
            <span className="font-medium">alexandertreeandlandscaping.com{currentPage === 'home' ? '' : `/${currentPage}`}</span>
          </div>
        </div>
      </div>

      {/* Website Content - NO background color here, hero handles its own bg */}
      <div ref={contentContainerRef} className="h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] overflow-y-auto relative">
        
        {/* Navigation Header - ONLY show on non-home pages */}
        {currentPage !== 'home' && (
          <nav className="sticky top-0 left-0 right-0 h-14 sm:h-16 bg-[#166534] flex items-center justify-between px-4 sm:px-8 z-30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <TreePine className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-sm sm:text-base">Alexander Tree</span>
                <span className="text-white/50 font-medium text-[9px] sm:text-[10px] block -mt-0.5">& Landscaping</span>
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
                      ? 'text-[#FEFCE8]' 
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
              <a href="tel:7145558234" className="hidden lg:flex items-center gap-2 text-white/80 font-medium text-sm">
                <Phone className="w-4 h-4" />
                (714) 555-8234
              </a>
              <button className="bg-[#FEFCE8] hover:bg-white text-[#166534] px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all">
                Get Free Estimate
              </button>
            </div>
          </nav>
        )}

        {/* Mobile Menu - for non-home pages */}
        {currentPage !== 'home' && mobileMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-[#166534]/98 backdrop-blur-md border-b border-white/10 z-40">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-6 py-4 text-sm font-medium border-l-4 transition-all ${
                  currentPage === item.id 
                    ? 'text-[#FEFCE8] bg-white/5 border-[#FEFCE8]' 
                    : 'text-white/70 border-transparent hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page Content */}
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} onOpenMenu={() => setMobileMenuOpen(true)} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} navItems={navItems} />}
        {currentPage === 'services' && <ServicesPage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage />}
        <FooterSection onNavigate={navigateTo} />

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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#166534] to-[#14532d] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 mb-1">Chat with Alex</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">Need tree work? I can help schedule your free estimate! 🌳</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </div>
        )}

        {/* Chat Widget Button */}
        {!chatOpen && (
          <button
            onClick={() => { setChatOpen(true); setShowChatPrompt(false); }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#166534] to-[#14532d] rounded-full shadow-lg shadow-green-900/30 flex items-center justify-center hover:scale-110 transition-all z-50 group"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[360px] h-[70%] sm:h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#166534] to-[#14532d] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FEFCE8] to-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#166534] text-lg font-bold">A</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#166534]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Alex</p>
                  <p className="text-white/60 text-[11px]">Tree Expert • Online</p>
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#166534] to-[#14532d] flex items-center justify-center mr-2 shrink-0 shadow-md">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 text-[12px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#166534] to-[#14532d] text-white rounded-2xl rounded-br-md shadow-lg'
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
                          className="px-4 py-2 bg-white border-2 border-[#166534] text-[#166534] rounded-full text-[11px] font-semibold hover:bg-[#166534] hover:text-white transition-all shadow-sm"
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#166534] to-[#14532d] flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-bold">A</span>
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
                <button className="w-9 h-9 rounded-full bg-gradient-to-r from-[#166534] to-[#14532d] flex items-center justify-center shadow-md">
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

interface HomePageProps extends PageProps {
  onOpenMenu?: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  navItems?: readonly { id: MockupPage; label: string }[];
}

// HOME PAGE - EXACT MATCH to oak-roots-shine.lovable.app
// FULLSCREEN HERO with floating nav overlay
const HomePage = ({ onNavigate, mobileMenuOpen, setMobileMenuOpen, navItems }: HomePageProps) => (
  <div className="bg-white">
    {/* Hero Section - fills 100% of viewport */}
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: 'calc(500px - 36px)' }}  
    >
      {/* On md+, adjust for larger chrome */}
      <style>{`
        @media (min-width: 768px) {
          section:first-child { height: calc(600px - 44px) !important; }
        }
        @media (min-width: 1024px) {
          section:first-child { height: calc(700px - 44px) !important; }
        }
      `}</style>
      
      {/* Background image - edge to edge */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Subtle dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      
      {/* Floating Navigation Overlay - logo left, hamburger right */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo */}
        <button onClick={() => onNavigate?.('home')} className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <TreePine className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-white font-bold text-sm">Alexander Tree</span>
          </div>
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems?.filter(item => item.id !== 'home').map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="text-white/80 hover:text-white text-xs font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate?.('contact')}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            Get Free Estimate
          </button>
        </div>
        
        {/* Mobile Hamburger */}
        <button 
          onClick={() => setMobileMenuOpen?.(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-4 right-4 z-30 bg-black/80 backdrop-blur-md rounded-xl overflow-hidden border border-white/10">
          {navItems?.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="block w-full text-left px-5 py-4 text-white/90 hover:bg-white/10 text-sm font-medium border-b border-white/5 last:border-b-0 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate?.('contact')}
            className="block w-full text-left px-5 py-4 bg-[#166534] text-white text-sm font-semibold"
          >
            Get Free Estimate →
          </button>
        </div>
      )}
      
      {/* Centered content */}
      <div className="relative text-center px-5 sm:px-6 max-w-2xl mx-auto z-10">
        {/* Main headline - Playfair Display, italic, properly sized for mobile */}
        <h1 
          className="text-white text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-4 sm:mb-6"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}
        >
          Old School<br />
          Craftsmanship.<br />
          Modern<br />
          Reliability.
        </h1>
        
        {/* Subheadline - smaller on mobile */}
        <p className="text-white/90 text-xs sm:text-sm md:text-lg max-w-md mx-auto leading-relaxed mb-6 sm:mb-8">
          25+ years of treating every home like our own. No shortcuts. No mess left behind. Just honest, expert tree and landscape service.
        </p>
        
        {/* CTA Button - WHITE bg, green text, properly sized */}
        <button 
          onClick={() => onNavigate?.('contact')}
          className="bg-white hover:bg-gray-50 text-green-800 text-xs sm:text-sm md:text-base font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded shadow-xl hover:shadow-2xl transition-all"
        >
          Get Your Free Estimate
        </button>
        
        {/* Service area tagline */}
        <p className="text-white/70 text-xs sm:text-sm mt-6">
          Serving Greater Orange County Since 1999
        </p>
      </div>
    </section>

    {/* Services Section */}
    <div className="px-6 sm:px-10 py-14 sm:py-20 bg-white">
      <div className="text-center mb-10">
        <span className="text-[#166534] font-semibold text-xs uppercase tracking-widest">Our Services</span>
        <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">Professional Tree & Landscape Services</h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">Backed by 25+ years of experience and old-school craftsmanship.</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {[
          { img: treeWork, name: 'Tree Removal & Trimming', desc: 'Precision cuts. Safety first. Expert pruning and removal for trees of all sizes.' },
          { img: stumpRoots, name: 'Stump & Root Extraction', desc: 'Full root system removal—essential for protecting foundations.' },
          { img: palmService, name: 'Palm Tree Service', desc: 'Professional skinning and trimming by climbing experts.' },
          { img: sprinklerRepair, name: 'Sprinkler & Landscape', desc: 'Irrigation repairs, sod removal, and landscape restoration.' },
          { img: haulingCleanup, name: 'Hauling & Cleanup', desc: 'Complete debris removal—yard waste, construction debris, estate cleanouts.' },
          { img: plantingSod, name: 'Planting & Sod Removal', desc: 'Professional planting services and sod removal for landscape renovation.' },
        ].map((service) => (
          <div key={service.name} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-gray-900 font-bold text-sm sm:text-base mb-2">{service.name}</h3>
              <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed mb-3">{service.desc}</p>
              <button className="text-[#166534] text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
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
          <span className="text-[#166534] font-semibold text-xs uppercase tracking-widest">The Old School Promise</span>
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">Why Orange County Trusts Us</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">In an industry full of quick fixes and disappearing contractors, we believe in the old way.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {[
            { icon: Clock, title: 'Show Up On Time', desc: 'Every time. No excuses.' },
            { icon: Shovel, title: 'No Mess Left Behind', desc: 'We leave your property cleaner than we found it.' },
            { icon: Camera, title: 'Photo-First Quotes', desc: 'Accurate pricing with no surprises.' },
            { icon: BadgeCheck, title: 'Honest Prices', desc: 'Fair, upfront pricing — always.' },
            { icon: Users, title: '25+ Years Experience', desc: 'Master craftsmanship in every job.' },
            { icon: MapPin, title: 'Local Orange County', desc: "We're your neighbors." },
          ].map((item) => (
            <div key={item.title} className="bg-white p-5 rounded-xl border border-gray-100">
              <item.icon className="w-8 h-8 text-[#166534] mb-3" />
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
              { value: '25+', label: 'Years Experience' },
              { value: '4.9/5', label: 'Customer Rating' },
              { value: '24hr', label: 'Response Time' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#166534] font-black text-xl sm:text-2xl">{stat.value}</p>
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
          <span className="text-[#166534] font-semibold text-xs uppercase tracking-widest">Testimonials</span>
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-black mt-2 mb-3">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">Real reviews from real customers across Orange County.</p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { name: 'Maria Rodriguez', location: 'Anaheim', text: 'Alexander and his team did an amazing job removing three large trees from my backyard. Professional, efficient, and left my property spotless!' },
            { name: 'James Chen', location: 'Fullerton', text: "Best tree service in Orange County! Alexander took the time to explain everything and gave me an honest quote. No hidden fees." },
            { name: 'Sarah Mitchell', location: 'Garden Grove', text: "I needed palm tree trimming and stump removal. They were on time, worked safely, and the cleanup was incredible. You'd never know they were here!" },
          ].map((review, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#166534] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{review.name[0]}</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{review.name}</p>
                  <p className="text-gray-400 text-xs">{review.location}, CA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-[#166534] font-bold text-lg">4.9/5 <span className="text-gray-400 text-sm font-normal">from 200+ reviews</span></p>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-[#166534] px-6 sm:px-10 py-14 sm:py-16 text-center">
      <h3 className="text-white text-2xl sm:text-3xl font-black mb-3">Ready to Transform Your Property?</h3>
      <p className="text-white/70 text-sm sm:text-base mb-8 max-w-lg mx-auto">Get your free estimate today. Photos required for accurate quotes — we don't waste your time.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="bg-[#FEFCE8] hover:bg-white text-[#166534] px-8 py-4 rounded-lg text-sm font-bold transition-all flex items-center gap-2 justify-center">
          <Phone className="w-5 h-5" />
          Call (714) 555-8234
        </button>
        <button 
          onClick={() => onNavigate?.('contact')}
          className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg text-sm font-bold hover:bg-white/20 transition-all"
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
      <img src={treeWork} alt="Tree services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#FEFCE8] font-semibold text-xs uppercase tracking-widest mb-2">Our Services</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">Tree & Landscape Services</h1>
        <p className="text-white/70 text-sm mt-2">Professional services backed by 25+ years of experience</p>
      </div>
    </div>

    {/* Services List */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {[
          { img: treeWork, name: 'Tree Removal & Trimming', desc: 'Precision cuts. Safety first. Expert pruning and removal for trees of all sizes. We use ladders and climbing expertise—no cranes means we focus on accessible work done right.', features: ['Professional assessment', 'Mandatory photo review', 'Property protection', 'Old-school craftsmanship', 'Complete cleanup included'] },
          { img: stumpRoots, name: 'Stump & Root Extraction', desc: "Not just surface grinding. We offer full root system removal—essential for protecting foundations and clearing land for construction or landscaping projects.", features: ['Cosmetic stump grinding', 'Complete root extraction', 'Foundation protection', 'Land clearing', 'Photo-first estimates'] },
          { img: palmService, name: 'Palm Tree Service', desc: 'Professional skinning and trimming by climbing experts. We handle accessible palms with care and precision. For jobs requiring heavy equipment, we connect you with trusted specialists.', features: ['Professional skinning', 'Expert climbing', 'Ladder-accessible work', 'Precision trimming', 'No mess left behind'] },
        ].map((service, i) => (
          <div key={service.name} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 === 1 ? 'md:order-2' : ''}>
              <img src={service.img} alt={service.name} className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover" />
            </div>
            <div className={i % 2 === 1 ? 'md:order-1' : ''}>
              <div className="w-12 h-12 rounded-xl bg-[#166534]/10 flex items-center justify-center mb-4">
                <TreePine className="w-6 h-6 text-[#166534]" />
              </div>
              <h2 className="text-gray-900 text-xl sm:text-2xl font-black mb-3">{service.name}</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.desc}</p>
              <div className="mb-4">
                <p className="text-gray-700 text-sm font-semibold mb-2">What's Included:</p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-gray-500 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#166534] shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => onNavigate?.('contact')}
                className="bg-[#166534] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#14532d] transition-all"
              >
                Get Free Estimate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Photo Requirement */}
    <div className="bg-[#166534] px-6 sm:px-10 py-10 sm:py-12 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <Camera className="w-8 h-8 text-white" />
          <div className="text-left">
            <h3 className="text-white font-bold text-lg">Photos Required</h3>
            <p className="text-white/80 text-sm">For honest, accurate estimates</p>
          </div>
        </div>
        <button className="bg-[#FEFCE8] text-[#166534] px-8 py-3 rounded-lg text-sm font-bold hover:bg-white transition-all flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call: (714) 555-8234
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
      <img src={alexanderPortrait} alt="Alexander Aguirre" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#FEFCE8] font-semibold text-xs uppercase tracking-widest mb-2">About Us</span>
        <h1 className="text-white text-2xl sm:text-4xl font-black">Meet Alexander Aguirre</h1>
        <p className="text-white/70 text-sm mt-2">25+ years of old school craftsmanship</p>
      </div>
    </div>

    {/* Story Section */}
    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-gray-900 text-2xl font-black mb-4">The Old School Promise</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              I'm Alexander Aguirre. For over 25 years, I've been serving the Greater Orange County Area with the kind of service I'd want for my own home.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              In an industry full of quick fixes and disappearing contractors, I believe in the old way: looking you in the eye, explaining exactly what needs to be done, and leaving your property cleaner than we found it.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We don't offer monthly lawn mowing or routine maintenance contracts. Our expertise is in the work that matters most—heavy-duty tree work, complete root extraction, and property cleanup projects that need an expert touch.
            </p>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="mt-6 bg-[#166534] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#14532d] transition-all"
            >
              Get a Free Estimate
            </button>
          </div>
          <div className="relative">
            <img src={alexanderPortrait} alt="Alexander Aguirre" className="rounded-2xl shadow-xl" />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-xl">
              <p className="text-[#166534] font-black text-3xl">25+</p>
              <p className="text-gray-500 text-xs">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-gray-900 text-2xl font-black mb-8 text-center">Our Promise To You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Clock, title: 'On Time', desc: "Show up on time, every time" },
              { icon: Shovel, title: 'No Mess', desc: 'Leave absolutely no mess behind' },
              { icon: Users, title: 'Educate', desc: "Explain the work, don't just sell" },
              { icon: BadgeCheck, title: 'Honest', desc: 'Fair prices and timelines upfront' },
            ].map((value) => (
              <div key={value.title} className="bg-gray-50 p-5 rounded-xl text-center">
                <value.icon className="w-8 h-8 text-[#166534] mx-auto mb-3" />
                <h3 className="text-gray-900 font-bold text-sm mb-1">{value.title}</h3>
                <p className="text-gray-500 text-[11px]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Service Area */}
    <div className="bg-gray-50 px-6 sm:px-10 py-10 sm:py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-gray-900 font-black text-xl mb-4">Proudly Serving Orange County</h3>
        <p className="text-gray-500 text-sm mb-4">We service homes and businesses throughout the Greater Orange County Area.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Anaheim', 'Fullerton', 'Orange', 'Garden Grove', 'Santa Ana', 'Irvine', 'Costa Mesa', 'Tustin', 'Buena Park', 'La Habra', 'Yorba Linda', 'Placentia'].map((city) => (
            <span key={city} className="text-[#166534] text-sm font-medium">{city}</span>
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
      <img src={treeWork} alt="Contact us" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-10">
        <span className="text-[#FEFCE8] font-semibold text-xs uppercase tracking-widest mb-2">Contact Us</span>
        <h1 className="text-white text-2xl sm:text-3xl font-black">Get Your Free Estimate</h1>
        <p className="text-white/70 text-sm mt-2">Answer a few questions and upload photos—we'll respond within 24 hours</p>
      </div>
    </div>

    {/* Photo Requirement Banner */}
    <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FEFCE8] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#166534]/10 flex items-center justify-center">
            <Camera className="w-5 h-5 text-[#166534]" />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm">Photos Required</p>
            <p className="text-gray-500 text-xs">For accurate, honest estimates</p>
          </div>
        </div>
        <button className="bg-[#166534] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#14532d] transition-all flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call: (714) 555-8234
        </button>
      </div>
    </div>

    <div className="px-6 sm:px-10 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
        {/* Contact Info */}
        <div>
          <span className="text-[#166534] font-semibold text-xs uppercase tracking-widest">Contact Us</span>
          <h2 className="text-gray-900 font-black text-2xl mt-2 mb-6">Get Your Free Estimate</h2>
          <p className="text-gray-500 text-sm mb-6">Fill out the form and upload photos of your project. Alexander will personally review and respond within 24 hours with an honest, detailed estimate.</p>
          
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Phone', value: '(714) 555-8234', sub: 'Text photos welcome' },
              { icon: Mail, label: 'Email', value: 'alex@alexandertree.com', sub: '' },
              { icon: Clock, label: 'Response', value: 'Within 24 Hours', sub: 'Free estimates' },
              { icon: MapPin, label: 'Service Area', value: 'Greater Orange County', sub: 'Anaheim, Fullerton, Orange, Irvine & more' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                  <p className="text-[#166534] text-sm">{item.value}</p>
                  {item.sub && <p className="text-gray-400 text-xs">{item.sub}</p>}
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
                <input type="text" placeholder="John" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Last Name *</label>
                <input type="text" placeholder="Smith" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Phone *</label>
                <input type="tel" placeholder="(714) 555-1234" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-medium mb-1.5">Email</label>
                <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Address / Zip Code *</label>
              <input type="text" placeholder="123 Main St, Anaheim, CA 92801" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Service Needed *</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none bg-white text-gray-600">
                <option>Select a service</option>
                <option>Tree Removal</option>
                <option>Tree Trimming</option>
                <option>Stump Grinding</option>
                <option>Root Extraction</option>
                <option>Palm Tree Service</option>
                <option>Sprinkler Repair</option>
                <option>Hauling & Cleanup</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Upload Photos *</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#166534] transition-colors">
                <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Drag photos here or click to upload</p>
                <p className="text-gray-400 text-[10px] mt-1">Required for accurate estimates</p>
              </div>
            </div>
            <div>
              <label className="block text-gray-600 text-xs font-medium mb-1.5">Tell us about your project</label>
              <textarea rows={3} placeholder="Describe the work you need done..." className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-[#166534] focus:ring-1 focus:ring-[#166534] outline-none resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#166534] text-white py-4 rounded-lg text-sm font-bold hover:bg-[#14532d] transition-all">
              Submit for Free Estimate
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
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block">Alexander Tree</span>
              <span className="text-white/50 text-[10px]">& Landscaping</span>
            </div>
          </div>
          <p className="text-white/50 text-xs leading-relaxed">
            Old school craftsmanship. Serving Orange County since 1999.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#FEFCE8]">Services</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Tree Removal</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Tree Trimming</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Stump Grinding</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('services')}>Palm Service</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#FEFCE8]">Company</h4>
          <ul className="space-y-2 text-white/60 text-xs">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('about')}>About Alexander</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('home')}>Reviews</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('contact')}>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-xs mb-4 text-[#FEFCE8]">Contact</h4>
          <div className="space-y-2 text-white/60 text-xs">
            <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> (714) 555-8234</p>
            <p className="flex items-center gap-2"><Mail className="w-3 h-3" /> alex@alexandertree.com</p>
            <p className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Orange County, CA</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-[10px]">
          © 2026 Alexander Tree & Landscaping. All rights reserved.
        </p>
        <p className="text-white/30 text-[9px] text-center sm:text-right">
          This is a fictional demonstration site operated by EverIntent LLC.
        </p>
      </div>
    </div>
  </footer>
);

export default AlexanderTreeMockup;
