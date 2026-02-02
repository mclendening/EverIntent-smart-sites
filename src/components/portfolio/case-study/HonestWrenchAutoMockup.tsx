/**
 * @fileoverview Honest Wrench Auto - Interactive Portfolio Mockup
 * @module components/portfolio/case-study/HonestWrenchAutoMockup
 * 
 * Automotive repair website mockup featuring:
 * - Trust-focused design (transparency, digital inspections)
 * - "Wrenchy" AI chatbot for service scheduling
 * - 10-page structure with 6 service detail pages
 * - Mobile-first with click-to-call prominence
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, Star, MessageCircle, Send, 
  ChevronRight, Check, Wrench, Car, Shield, Award, Users, Calendar,
  ThumbsUp, Camera, FileText, AlertCircle, Gauge, Thermometer, CircleDot
} from 'lucide-react';

// =============================================================================
// CONSTANTS
// =============================================================================

const COLORS = {
  primary: '#1E3A5F',      // Deep Navy Blue - trust, professionalism
  accent: '#E67E22',       // Warm Orange - energy, friendliness, CTAs
  secondary: '#F5F6FA',    // Light Gray - clean backgrounds
  text: '#2D3436',         // Charcoal - readability
  success: '#27AE60',      // Green - trust signals
  white: '#FFFFFF',
};

const BUSINESS = {
  name: 'Honest Wrench Auto',
  domain: 'honestwrenchauto-riverside.com',
  phone: '(951) 555-0147',
  address: '4521 Magnolia Ave, Riverside, CA 92501',
  tagline: 'Straight Talk. Expert Care. Since 2008.',
  hours: 'Mon-Fri: 7:30am-6pm | Sat: 8am-3pm',
  established: '2008',
  owners: 'Marcus & Elena Reyes',
};

// =============================================================================
// IMAGE HELPER
// =============================================================================

const getImage = (searchTerm: string, width = 800) => 
  `https://images.unsplash.com/photo-${searchTerm}?w=${width}&h=600&fit=crop&auto=format`;

// Curated Unsplash image IDs for consistent, high-quality imagery
const IMAGES = {
  heroShop: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1200&h=800&fit=crop',
  mechanicWorking: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop',
  servicesHub: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop',
  oilChange: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&h=400&fit=crop',
  brakeService: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  engineDiag: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop',
  transmission: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
  tires: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&h=400&fit=crop',
  acHeating: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
  ownerMarcus: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  ownerElena: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  teamPhoto: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop',
  shopExterior: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=500&fit=crop',
  testimonialJames: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  testimonialLinda: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
  testimonialTyler: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
  riverside: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
};

// =============================================================================
// TYPES
// =============================================================================

type MockupPage = 
  | 'home' 
  | 'services' 
  | 'service-oil' 
  | 'service-brakes' 
  | 'service-engine' 
  | 'service-transmission' 
  | 'service-tires' 
  | 'service-ac' 
  | 'about' 
  | 'contact';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: { label: string; value: string }[];
}

interface NavItem {
  id: MockupPage;
  label: string;
  children?: { id: MockupPage; label: string }[];
}

// =============================================================================
// NAVIGATION
// =============================================================================

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { 
    id: 'services', 
    label: 'Services',
    children: [
      { id: 'service-oil', label: 'Oil Change & Maintenance' },
      { id: 'service-brakes', label: 'Brake Service & Repair' },
      { id: 'service-engine', label: 'Engine Diagnostics' },
      { id: 'service-transmission', label: 'Transmission Service' },
      { id: 'service-tires', label: 'Tires & Alignment' },
      { id: 'service-ac', label: 'A/C & Heating' },
    ]
  },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

// =============================================================================
// CHATBOT CONVERSATION FLOW
// =============================================================================

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'welcome',
  type: 'bot',
  content: "Hey there! 👋 I'm Wrenchy, your virtual assistant at Honest Wrench Auto. Need to book a service, ask a question, or just figure out what's wrong with your car? I'm here to help!",
  options: [
    { label: '🗓️ Schedule Service', value: 'schedule' },
    { label: "🔧 What's That Noise?", value: 'diagnose' },
    { label: '📍 Hours & Location', value: 'hours' },
    { label: '💬 Talk to a Human', value: 'human' },
  ],
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const HonestWrenchAutoMockup: React.FC = () => {
  // State
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatStep, setChatStep] = useState('initial');
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  
  // Refs
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Navigation handler with scroll reset
  const navigateTo = (page: MockupPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTop = 0;
    }
    setTimeout(() => {
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }
    }, 0);
  };

  // Chat bubble delay
  useEffect(() => {
    const timer = setTimeout(() => setShowChatPrompt(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize chat when opened
  useEffect(() => {
    if (chatOpen && chatMessages.length === 0) {
      setChatMessages([INITIAL_BOT_MESSAGE]);
    }
  }, [chatOpen, chatMessages.length]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // Handle chat option click
  const handleChatOption = (value: string) => {
    // Add user response
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: value === 'schedule' ? 'I want to schedule a service' :
               value === 'diagnose' ? 'My car is making a noise' :
               value === 'hours' ? 'What are your hours?' :
               'I want to talk to someone',
    };
    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Bot response after delay
    setTimeout(() => {
      setIsTyping(false);
      let botResponse: ChatMessage;

      switch (value) {
        case 'schedule':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Great! Let's get you scheduled. What are you driving? (Year, make, model works great!)",
          };
          setChatStep('vehicle');
          break;
        case 'diagnose':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Let's figure out what's going on! Can you describe the noise? Where does it seem to be coming from?",
            options: [
              { label: 'Squeaking brakes', value: 'brakes' },
              { label: 'Engine knocking', value: 'engine' },
              { label: 'Something else', value: 'other' },
            ],
          };
          setChatStep('diagnose');
          break;
        case 'hours':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `We're open:\n📍 ${BUSINESS.address}\n⏰ ${BUSINESS.hours}\n📞 ${BUSINESS.phone}\n\nNeed to schedule a visit?`,
            options: [
              { label: 'Yes, schedule me', value: 'schedule' },
              { label: "That's all, thanks!", value: 'done' },
            ],
          };
          break;
        case 'human':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `No problem! Give us a call at ${BUSINESS.phone} and someone will be happy to help. We're available ${BUSINESS.hours}.`,
          };
          break;
        case 'brakes':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Squeaky brakes are definitely worth checking out! It could be as simple as dust buildup, or your pads might be getting thin.\n\nGood news: we offer free brake inspections. We'll measure everything, take photos, and show you exactly what's going on—no obligation.\n\nWant to schedule a free brake check?",
            options: [
              { label: 'Yes, schedule me', value: 'schedule' },
              { label: 'Maybe later', value: 'done' },
            ],
          };
          break;
        default:
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Thanks for chatting! Feel free to come back anytime. 🔧",
          };
      }

      setChatMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  // Handle user text input
  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userInput,
    };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResponse: ChatMessage;

      if (chatStep === 'vehicle') {
        botResponse = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: `Great choice! 🚗 What service do you need today?`,
          options: [
            { label: 'Oil Change', value: 'oil' },
            { label: 'Brake Check', value: 'brakes' },
            { label: 'Check Engine Light', value: 'engine' },
            { label: 'Something Else', value: 'other-service' },
          ],
        };
        setChatStep('service');
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          type: 'bot',
          content: `Perfect! What's the best phone number to reach you? One of our team members will give you a quick call to lock in your appointment.`,
        };
        setChatStep('phone');
      }

      setChatMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  // Get URL bar display
  const getUrlPath = () => {
    const paths: Record<MockupPage, string> = {
      'home': '',
      'services': '/services',
      'service-oil': '/services/oil-change',
      'service-brakes': '/services/brakes',
      'service-engine': '/services/diagnostics',
      'service-transmission': '/services/transmission',
      'service-tires': '/services/tires',
      'service-ac': '/services/ac-heating',
      'about': '/about',
      'contact': '/contact',
    };
    return BUSINESS.domain + paths[currentPage];
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  // Desktop nav items - NO Home (logo handles it), NO Contact (CTA handles it)
  const desktopNavItems = [
    { id: 'services' as MockupPage, label: 'Services', hasDropdown: true },
    { id: 'about' as MockupPage, label: 'About' },
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200 flex flex-col">
      
      {/* Browser Chrome */}
      <div className="flex-shrink-0 h-9 md:h-11 bg-gray-100 border-b border-gray-200 flex items-center px-3 gap-2">
        {/* Window Controls */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" />
        </div>
        {/* URL Bar */}
        <div className="flex-1 mx-2 md:mx-4">
          <div className="bg-white rounded-md px-3 py-1 md:py-1.5 text-[10px] md:text-xs text-gray-600 truncate border border-gray-200">
            🔒 {getUrlPath()}
          </div>
        </div>
      </div>

      {/* Header */}
      <header 
        className="flex-shrink-0 px-4 py-3 text-white"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="flex items-center justify-between">
          {/* Logo - CLICKS TO HOME */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: COLORS.accent }}
            >
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="font-bold text-sm block">{BUSINESS.name}</span>
              <span className="hidden sm:block text-[10px] text-white/80">{BUSINESS.tagline}</span>
            </div>
          </button>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {desktopNavItems.map(item => (
              <div key={item.id} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => navigateTo('services')}
                      className={`text-xs font-medium transition-all flex items-center gap-1 ${
                        currentPage.startsWith('service') 
                          ? 'text-white font-semibold' 
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <ChevronRight className={`w-3 h-3 transition-transform ${servicesDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        <button
                          onClick={() => navigateTo('services')}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-semibold border-b border-gray-100"
                        >
                          All Services
                        </button>
                        {navItems.find(n => n.id === 'services')?.children?.map(child => (
                          <button
                            key={child.id}
                            onClick={() => navigateTo(child.id)}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                              currentPage === child.id 
                                ? 'bg-gray-50 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            style={currentPage === child.id ? { color: COLORS.primary } : {}}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => navigateTo(item.id)}
                    className={`text-xs font-medium transition-all ${
                      currentPage === item.id 
                        ? 'text-white font-semibold' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
          
          {/* CTA Button - Industry-specific */}
          <button 
            onClick={() => navigateTo('contact')}
            className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-xs font-semibold hover:shadow-lg transition-all"
            style={{ color: COLORS.primary }}
          >
            <Calendar className="w-4 h-4" />
            Schedule Service
          </button>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pb-2 border-t border-white/20 pt-3 space-y-1">
            {/* Home link - only in mobile */}
            <button
              onClick={() => navigateTo('home')}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm ${
                currentPage === 'home' ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
            >
              Home
            </button>
            
            {/* Services with nested items */}
            <div>
              <button
                onClick={() => navigateTo('services')}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm ${
                  currentPage === 'services' ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
                }`}
              >
                Services
              </button>
              <div className="ml-4 mt-1 space-y-1 border-l border-white/20 pl-3">
                {navItems.find(n => n.id === 'services')?.children?.map(child => (
                  <button
                    key={child.id}
                    onClick={() => navigateTo(child.id)}
                    className={`block w-full text-left px-2 py-1.5 rounded text-xs ${
                      currentPage === child.id ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* About */}
            <button
              onClick={() => navigateTo('about')}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm ${
                currentPage === 'about' ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
            >
              About
            </button>
            
            {/* CTA Button at bottom */}
            <button
              onClick={() => navigateTo('contact')}
              className="flex items-center justify-center gap-2 w-full mt-4 bg-white px-4 py-3 rounded-lg text-sm font-bold"
              style={{ color: COLORS.primary }}
            >
              <Calendar className="w-4 h-4" />
              Schedule Service
            </button>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <div 
        ref={contentContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden bg-[#FAFAFA]"
      >
        {/* Placeholder - will be replaced with page components */}
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <Wrench className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.primary }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
              {BUSINESS.name}
            </h2>
            <p className="text-gray-600">{BUSINESS.tagline}</p>
            <p className="text-sm text-gray-400 mt-4">Current Page: {currentPage}</p>
          </div>
        </div>
      </div>

      {/* Chat Bubble Prompt (when closed) */}
      {!chatOpen && showChatPrompt && (
        <div className="absolute bottom-16 right-3 md:right-4 z-40 animate-fade-in">
          <div 
            className="relative bg-white rounded-xl shadow-lg p-3 max-w-[180px] md:max-w-[200px] border"
            style={{ borderColor: COLORS.accent }}
          >
            <button 
              onClick={() => setShowChatPrompt(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs md:text-sm text-gray-700">
              👋 Need help scheduling? Ask Wrenchy!
            </p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => {
          setChatOpen(true);
          setShowChatPrompt(false);
        }}
        className={`absolute bottom-3 right-3 md:bottom-4 md:right-4 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 ${chatOpen ? 'hidden' : ''}`}
        style={{ backgroundColor: COLORS.accent }}
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-50 w-[calc(100%-24px)] max-w-[320px] md:max-w-[360px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ height: 'min(400px, calc(100% - 60px))' }}
        >
          {/* Chat Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ backgroundColor: COLORS.primary }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Wrenchy</p>
                <p className="text-white/70 text-xs">Virtual Assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  msg.type === 'user' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
                  style={msg.type === 'user' ? { backgroundColor: COLORS.primary } : {}}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleChatOption(opt.value)}
                          className="text-xs px-3 py-1.5 rounded-full border border-current transition-colors"
                          style={{ 
                            color: COLORS.accent,
                            borderColor: COLORS.accent,
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex-shrink-0 border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2"
                style={{ focusRing: COLORS.accent } as any}
              />
              <button
                onClick={handleSendMessage}
                className="px-3 py-2 rounded-lg text-white"
                style={{ backgroundColor: COLORS.accent }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HonestWrenchAutoMockup;
