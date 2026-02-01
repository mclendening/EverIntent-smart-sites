/**
 * @fileoverview Interactive mockup for Riverstone Plumbing case study
 * @module components/portfolio/case-study/RiverstoneInteractiveMockup
 * 
 * WEBSITE-WITHIN-WEBSITE implementation per spec:
 * - 5 fully interactive pages (Home, Services, About, Reviews, Contact)
 * - Simulated AI chatbot with quick-reply buttons (10+ messages)
 * - Real Unsplash imagery on all pages
 * - Award-winning $15K website quality
 * - State-based internal navigation (not using site router)
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Star, ChevronRight, MessageCircle, 
  Send, X, Menu, Shield, Award, Users, Wrench, Droplets, Flame,
  ThermometerSun, PipetteIcon, AlertCircle, CheckCircle2, Calendar
} from 'lucide-react';

// Import all page images
import heroImage from '@/assets/portfolio/riverstone-plumbing-hero.jpg';
import servicesImage from '@/assets/portfolio/riverstone-services.jpg';
import aboutImage from '@/assets/portfolio/riverstone-about.jpg';
import contactImage from '@/assets/portfolio/riverstone-contact.jpg';

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
          { label: "Emergency! I need help now", value: "emergency", nextStep: 'emergency' },
          { label: "Schedule a service", value: "schedule", nextStep: 'service-type' },
          { label: "Get a quote", value: "quote", nextStep: 'quote' }
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

    // Handle each step
    setTimeout(() => {
      switch (reply.nextStep) {
        case 'emergency':
          addBotMessage(
            "I'm so sorry you're dealing with an emergency! 🚨 Let me get a technician to you FAST. Are you home right now?",
            [
              { label: "Yes, I'm home", value: "home", nextStep: 'confirmed' },
              { label: "I'll be home in an hour", value: "later", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "I'd be happy to help you schedule. What type of service do you need?",
            [
              { label: "Water heater", value: "water-heater", nextStep: 'water-heater-type' },
              { label: "Drain cleaning", value: "drain", nextStep: 'day-select' },
              { label: "Pipe repair", value: "pipe", nextStep: 'day-select' },
              { label: "Other", value: "other", nextStep: 'day-select' }
            ]
          );
          break;

        case 'water-heater-type':
          addBotMessage(
            "Got it — water heater service. Is this for repair or a new installation?",
            [
              { label: "Repair", value: "repair", nextStep: 'day-select' },
              { label: "New installation", value: "install", nextStep: 'day-select' },
              { label: "Not sure", value: "unsure", nextStep: 'day-select' }
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
              { label: "Morning (9-11am)", value: "morning", nextStep: 'contact-info' },
              { label: "Afternoon (1-3pm)", value: "afternoon", nextStep: 'contact-info' }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Perfect! I've reserved that time slot for you. To confirm, I just need your name and phone number."
          );
          setTimeout(() => {
            addBotMessage(
              "You're all set! ✅ A technician will arrive at your scheduled time. You'll get a text reminder the day before. Is there anything else I can help with?",
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
        { label: "Emergency! I need help now", value: "emergency", nextStep: 'emergency' },
        { label: "Schedule a service", value: "schedule", nextStep: 'service-type' },
        { label: "Get a quote", value: "quote", nextStep: 'quote' }
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
    <div className="relative w-full aspect-[16/10] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] rounded-xl overflow-hidden bg-card border border-border shadow-2xl">
      {/* Browser Chrome */}
      <div className="h-8 sm:h-10 bg-[#2D2D2D] flex items-center px-3 sm:px-4 gap-2 border-b border-[#404040]">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27CA40]" />
        </div>
        <div className="flex-1 mx-2 sm:mx-8">
          <div className="bg-[#404040] rounded-md px-3 py-1 text-[10px] sm:text-xs text-white/70 flex items-center gap-2 max-w-md mx-auto">
            <Shield className="w-3 h-3 text-green-400" />
            <span className="truncate">riverstonepmh.com/{currentPage === 'home' ? '' : currentPage}</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] overflow-hidden relative bg-white">
        {/* Navigation Header */}
        <nav className="h-12 sm:h-14 bg-white shadow-sm flex items-center justify-between px-3 sm:px-6 relative z-30">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#2d5a8f] flex items-center justify-center shadow-md">
              <span className="text-white text-xs sm:text-sm font-bold">RP</span>
            </div>
            <div className="hidden xs:block">
              <span className="text-[#1E3A5F] font-bold text-xs sm:text-sm">RIVERSTONE</span>
              <span className="text-[#1E3A5F]/60 font-medium text-[10px] sm:text-xs block -mt-0.5">Plumbing & Heating</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-[11px] lg:text-xs font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-[#F97316] border-b-2 border-[#F97316] pb-0.5' 
                    : 'text-gray-600 hover:text-[#1E3A5F]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2">
            <a href="tel:3035550147" className="hidden sm:flex items-center gap-1.5 text-[#1E3A5F] font-semibold text-xs">
              <Phone className="w-3.5 h-3.5" />
              (303) 555-0147
            </a>
            <button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-semibold hover:shadow-lg transition-all flex items-center gap-1.5">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Schedule Service</span>
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-1.5 ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-12 sm:top-14 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-lg">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 text-sm border-l-4 ${
                  currentPage === item.id 
                    ? 'text-[#F97316] bg-orange-50 border-[#F97316]' 
                    : 'text-gray-600 border-transparent hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page Content */}
        <div className="h-[calc(100%-3rem)] sm:h-[calc(100%-3.5rem)] overflow-y-auto">
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'reviews' && <ReviewsPage />}
          {currentPage === 'contact' && <ContactPage />}
          <FooterSection onNavigate={setCurrentPage} />
        </div>

        {/* Chat Prompt Bubble */}
        {!chatOpen && showChatPrompt && (
          <div className="absolute bottom-16 sm:bottom-20 right-3 sm:right-4 bg-white rounded-xl shadow-xl p-3 max-w-[180px] sm:max-w-[200px] z-50 animate-bounce-subtle">
            <p className="text-[10px] sm:text-xs text-gray-700 font-medium">Need help? Chat with Riley, our virtual assistant! 💬</p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45" />
          </div>
        )}

        {/* Chat Widget Button */}
        {!chatOpen && (
          <button
            onClick={() => { setChatOpen(true); setShowChatPrompt(false); }}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-all z-50"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </button>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-[calc(100%-1rem)] sm:w-[340px] h-[65%] sm:h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8f] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-bold">R</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Riley</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-white/70 text-[10px]">Online • Virtual Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={restartChat} className="text-white/70 hover:text-white text-[10px] underline">
                  Restart
                </button>
                <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id}>
                  <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-[11px] sm:text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white rounded-br-sm'
                          : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  
                  {/* Quick Reply Buttons */}
                  {msg.sender === 'bot' && msg.quickReplies && msg.id === messages[messages.length - 1]?.id && (
                    <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 bg-white border border-[#F97316] text-[#F97316] rounded-full text-[10px] sm:text-[11px] font-medium hover:bg-[#F97316] hover:text-white transition-all shadow-sm"
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-xs outline-none text-gray-600 placeholder-gray-400"
                  readOnly
                />
                <Send className="w-4 h-4 text-[#F97316]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for subtle bounce animation */}
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// ============================================
// PAGE COMPONENTS
// ============================================

interface PageProps {
  onNavigate?: (page: MockupPage) => void;
}

// HOME PAGE - Full content as specified
const HomePage = ({ onNavigate }: PageProps) => (
  <div className="bg-white">
    {/* Hero Section with Image */}
    <div className="relative min-h-[280px] sm:min-h-[360px]">
      <img 
        src={heroImage} 
        alt="Professional plumber at work in Denver"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 via-[#1E3A5F]/85 to-[#1E3A5F]/70" />
      
      <div className="relative px-4 sm:px-8 py-8 sm:py-14">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-2 bg-[#F97316] text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium mb-4">
            <span>⭐ Rated #1 Plumber in Denver</span>
          </div>
          
          <h1 className="text-white text-xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            Denver's Most Trusted<br />Plumbers
          </h1>
          <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed max-w-md">
            Family-owned since 1987. Licensed, insured, and ready to help 24/7. We treat every home like our own.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {['BBB A+', '500+ Reviews', 'Licensed & Insured', '24/7 Emergency'].map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[11px]">
                <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                {badge}
              </span>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Service
            </button>
            <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              (303) 555-0147
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Trust Bar */}
    <div className="bg-[#1E3A5F] px-4 sm:px-8 py-3 sm:py-4">
      <div className="flex justify-center items-center gap-6 sm:gap-12 flex-wrap">
        <div className="flex items-center gap-2 text-white">
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs font-medium">4.9 (500+ reviews)</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#F97316]" />
          <span className="text-[10px] sm:text-xs">24/7 Emergency Service</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
          <span className="text-[10px] sm:text-xs">100% Satisfaction Guarantee</span>
        </div>
      </div>
    </div>

    {/* Services Section */}
    <div className="px-4 sm:px-8 py-8 sm:py-12 bg-gray-50">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-[#1E3A5F] text-lg sm:text-2xl font-bold mb-2">Our Plumbing Services</h2>
        <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto">From emergency repairs to routine maintenance, we handle it all with expert care.</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
        {[
          { icon: AlertCircle, name: 'Emergency Repairs', desc: '24/7 rapid response' },
          { icon: Droplets, name: 'Drain Cleaning', desc: 'Clear any clog fast' },
          { icon: Flame, name: 'Water Heaters', desc: 'Install & repair' },
          { icon: PipetteIcon, name: 'Leak Detection', desc: 'Find hidden leaks' },
          { icon: Wrench, name: 'Pipe Repair', desc: 'Fix or replace' },
          { icon: ThermometerSun, name: 'Heating Systems', desc: 'Stay warm all winter' },
        ].map((service) => (
          <div key={service.name} className="bg-white p-3 sm:p-5 rounded-xl shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#F97316]" />
            </div>
            <h3 className="text-[#1E3A5F] font-semibold text-xs sm:text-sm mb-1">{service.name}</h3>
            <p className="text-gray-500 text-[10px] sm:text-xs">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Why Choose Riverstone */}
    <div className="px-4 sm:px-8 py-8 sm:py-12 bg-white">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-[#1E3A5F] text-lg sm:text-2xl font-bold mb-2">Why Choose Riverstone?</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {[
          { icon: Award, title: '37 Years', desc: 'Family Experience' },
          { icon: CheckCircle2, title: 'Upfront', desc: 'Honest Pricing' },
          { icon: Clock, title: 'Same-Day', desc: 'Service Available' },
          { icon: Shield, title: '100%', desc: 'Satisfaction Guarantee' },
        ].map((item) => (
          <div key={item.title} className="text-center p-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E3A5F]/5 rounded-full flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E3A5F]" />
            </div>
            <h3 className="text-[#F97316] font-bold text-sm sm:text-lg">{item.title}</h3>
            <p className="text-gray-600 text-[10px] sm:text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Testimonial Section */}
    <div className="px-4 sm:px-8 py-8 sm:py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-3">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <blockquote className="text-gray-700 text-sm sm:text-base italic mb-4">
          "Riverstone saved us when our water heater burst at 2am. Mike arrived within an hour and had us back up and running by morning. True professionals!"
        </blockquote>
        <p className="text-[#1E3A5F] font-semibold text-xs sm:text-sm">— Sarah M., Denver Homeowner</p>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-gradient-to-r from-[#F97316] to-[#EA580C] px-4 sm:px-8 py-8 sm:py-10 text-center">
      <h3 className="text-white text-lg sm:text-2xl font-bold mb-2">Ready to Fix Your Plumbing?</h3>
      <p className="text-white/90 text-xs sm:text-sm mb-4 sm:mb-6">Get expert help today. No job too big or small.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="bg-white text-[#F97316] px-6 py-3 rounded-lg text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2 justify-center">
          <Phone className="w-4 h-4" />
          Call (303) 555-0147
        </button>
        <button className="bg-[#1E3A5F] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#2d5a8f] transition-all">
          Request Online Quote
        </button>
      </div>
    </div>
  </div>
);

// SERVICES PAGE
const ServicesPage = () => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-32 sm:h-44">
      <img src={servicesImage} alt="Plumbing services" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/80" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-xl sm:text-3xl font-bold mb-2">Our Plumbing & Heating Services</h1>
        <p className="text-white/80 text-xs sm:text-sm max-w-lg">Professional solutions for every plumbing need</p>
      </div>
    </div>

    {/* Services Grid */}
    <div className="px-4 sm:px-8 py-8 sm:py-12">
      <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
        {[
          { icon: AlertCircle, name: 'Emergency Repairs', desc: '24/7 rapid response for urgent plumbing issues. Water leaks, burst pipes, overflows — we handle it all fast.', price: 'Starting at $89' },
          { icon: Droplets, name: 'Drain Cleaning', desc: 'Professional drain and sewer cleaning using advanced hydro-jetting technology. Clear any clog, guaranteed.', price: 'Starting at $149' },
          { icon: Flame, name: 'Water Heater Services', desc: 'Installation, repair, and maintenance for all water heater types including tankless systems.', price: 'Free estimates' },
          { icon: PipetteIcon, name: 'Leak Detection', desc: 'Advanced technology to find hidden leaks without damaging your walls or floors. Non-invasive and accurate.', price: 'Starting at $175' },
          { icon: Wrench, name: 'Pipe Repair & Replacement', desc: 'Fix or replace damaged, corroded, or outdated pipes. We work with copper, PEX, and more.', price: 'Free estimates' },
          { icon: ThermometerSun, name: 'Heating Systems', desc: 'Keep your home warm with our heating installation and repair services. Furnaces, boilers, and more.', price: 'Starting at $125' },
        ].map((service) => (
          <div key={service.name} className="bg-gray-50 rounded-xl p-4 sm:p-6 flex gap-4 hover:shadow-md transition-all group border border-gray-100">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[#1E3A5F] font-bold text-sm sm:text-lg">{service.name}</h3>
                <span className="text-[#F97316] text-[10px] sm:text-xs font-medium bg-orange-50 px-2 py-1 rounded">{service.price}</span>
              </div>
              <p className="text-gray-600 text-[11px] sm:text-sm leading-relaxed">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="bg-[#1E3A5F] px-4 sm:px-8 py-6 sm:py-8 text-center">
      <h3 className="text-white text-lg sm:text-xl font-bold mb-2">Need a Service Not Listed?</h3>
      <p className="text-white/80 text-xs sm:text-sm mb-4">We handle all plumbing and heating needs. Just ask!</p>
      <button className="bg-[#F97316] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#EA580C] transition-all">
        Contact Us Today
      </button>
    </div>
  </div>
);

// ABOUT PAGE
const AboutPage = () => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-36 sm:h-48">
      <img src={aboutImage} alt="Riverstone Plumbing team" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/75" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-xl sm:text-3xl font-bold mb-2">Three Generations of Trust</h1>
        <p className="text-white/80 text-xs sm:text-sm">Family-owned since 1987</p>
      </div>
    </div>

    {/* Story Section */}
    <div className="px-4 sm:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-sm sm:prose text-gray-600 mb-8">
          <p className="text-sm sm:text-base leading-relaxed mb-4">
            Marcus Riverstone Sr. started this company in his garage with a simple belief: treat every customer's home like it's your own family's. That philosophy has guided us through three generations and 35+ years of serving Denver families.
          </p>
          <p className="text-sm sm:text-base leading-relaxed mb-4">
            Today, Marcus Jr. and Elena run the day-to-day operations, but the values remain the same. We show up on time, give honest quotes, and stand behind every job with our 100% satisfaction guarantee.
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            When you call Riverstone, you're not just getting a plumber — you're getting a neighbor who cares about doing the job right.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4 sm:p-6 mb-8">
          <div className="text-center">
            <p className="text-[#F97316] font-bold text-2xl sm:text-4xl">37</p>
            <p className="text-gray-600 text-[10px] sm:text-xs">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-[#F97316] font-bold text-2xl sm:text-4xl">15K+</p>
            <p className="text-gray-600 text-[10px] sm:text-xs">Jobs Completed</p>
          </div>
          <div className="text-center">
            <p className="text-[#F97316] font-bold text-2xl sm:text-4xl">4.9</p>
            <p className="text-gray-600 text-[10px] sm:text-xs">Star Rating</p>
          </div>
        </div>

        {/* Team */}
        <h3 className="text-[#1E3A5F] font-bold text-lg sm:text-xl mb-4">Meet Our Team</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: 'Marcus Jr.', role: 'Owner/Lead Tech' },
            { name: 'Elena', role: 'Operations Manager' },
            { name: 'Mike S.', role: 'Senior Technician' },
            { name: 'Dave K.', role: 'Service Technician' },
          ].map((member) => (
            <div key={member.name} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full mx-auto mb-2 flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
              </div>
              <p className="text-[#1E3A5F] font-semibold text-xs sm:text-sm">{member.name}</p>
              <p className="text-gray-500 text-[10px] sm:text-xs">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Certifications */}
    <div className="bg-[#1E3A5F] px-4 sm:px-8 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-white font-bold text-lg sm:text-xl text-center mb-4">Certifications & Licenses</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {['Licensed Master Plumber', 'EPA Certified', 'BBB A+ Rated', 'Fully Insured', 'Background Checked'].map((cert) => (
            <span key={cert} className="bg-white/10 text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// REVIEWS PAGE (NEW - was missing from original)
const ReviewsPage = () => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8f] px-4 sm:px-8 py-8 sm:py-12 text-center">
      <h1 className="text-white text-xl sm:text-3xl font-bold mb-3">What Denver Says About Us</h1>
      <div className="flex justify-center items-center gap-3 mb-2">
        <div className="flex">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <span className="text-white text-lg sm:text-2xl font-bold">4.9</span>
      </div>
      <p className="text-white/80 text-sm">Based on 500+ verified reviews</p>
    </div>

    {/* Review Stats */}
    <div className="px-4 sm:px-8 py-6 bg-gray-50 border-b border-gray-200">
      <div className="flex justify-center gap-6 sm:gap-10">
        <div className="text-center">
          <p className="text-[#1E3A5F] font-bold text-xl sm:text-2xl">500+</p>
          <p className="text-gray-500 text-[10px] sm:text-xs">Total Reviews</p>
        </div>
        <div className="text-center">
          <p className="text-[#1E3A5F] font-bold text-xl sm:text-2xl">98%</p>
          <p className="text-gray-500 text-[10px] sm:text-xs">Recommend Us</p>
        </div>
        <div className="text-center">
          <p className="text-[#1E3A5F] font-bold text-xl sm:text-2xl">5★</p>
          <p className="text-gray-500 text-[10px] sm:text-xs">Most Common</p>
        </div>
      </div>
    </div>

    {/* Reviews Grid */}
    <div className="px-4 sm:px-8 py-8 sm:py-12">
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {[
          { name: 'Sarah M.', date: '2 weeks ago', stars: 5, text: 'Riverstone saved us when our water heater burst at 2am. Mike arrived within an hour and had us back up and running by morning. True professionals!' },
          { name: 'James R.', date: '1 month ago', stars: 5, text: 'Finally found a plumber I can trust. Upfront pricing, clean work, and they even cleaned up after themselves. Will use them for everything.' },
          { name: 'Linda K.', date: '1 month ago', stars: 5, text: 'Best experience ever with a plumber. Marcus explained everything, gave me options, and didn\'t try to upsell me on things I didn\'t need.' },
          { name: 'David P.', date: '2 months ago', stars: 5, text: 'Had a major sewer line issue. They used camera inspection to find the problem and gave me a fair quote. Fixed it same day!' },
          { name: 'Michelle T.', date: '2 months ago', stars: 4, text: 'Great service! Only reason for 4 stars is the wait time was a bit longer than expected, but the quality of work was excellent.' },
          { name: 'Robert B.', date: '3 months ago', stars: 5, text: 'These guys are the real deal. Third generation family business and it shows. They care about their work and their customers.' },
        ].map((review, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{review.name[0]}</span>
                </div>
                <div>
                  <p className="text-[#1E3A5F] font-semibold text-sm">{review.name}</p>
                  <p className="text-gray-400 text-[10px]">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[...Array(review.stars)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Leave Review CTA */}
    <div className="bg-[#F97316] px-4 sm:px-8 py-6 sm:py-8 text-center">
      <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Had a Great Experience?</h3>
      <p className="text-white/90 text-xs sm:text-sm mb-4">We'd love to hear from you!</p>
      <button className="bg-white text-[#F97316] px-6 py-2.5 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
        Leave a Review
      </button>
    </div>
  </div>
);

// CONTACT PAGE
const ContactPage = () => (
  <div className="bg-white">
    {/* Hero Banner */}
    <div className="relative h-32 sm:h-40">
      <img src={contactImage} alt="Contact us" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/95 to-[#1E3A5F]/80" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-xl sm:text-3xl font-bold mb-1">Get In Touch</h1>
        <p className="text-white/80 text-xs sm:text-sm">We're here to help 24/7</p>
      </div>
    </div>

    <div className="px-4 sm:px-8 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-[#1E3A5F] font-bold text-lg sm:text-xl mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-wide">Phone</p>
                <p className="text-[#1E3A5F] font-semibold text-sm sm:text-base">(303) 555-0147</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-wide">Email</p>
                <p className="text-[#1E3A5F] font-semibold text-sm sm:text-base">info@riverstoneplumbing.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-wide">Address</p>
                <p className="text-[#1E3A5F] font-semibold text-sm sm:text-base">4521 Morrison Rd<br />Denver, CO 80219</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#F97316]" />
              </div>
              <div>
                <p className="text-gray-500 text-[11px] uppercase tracking-wide">Hours</p>
                <p className="text-[#1E3A5F] font-semibold text-sm sm:text-base">24/7 Emergency Service</p>
                <p className="text-gray-500 text-xs">Office: Mon-Fri 8am-6pm</p>
              </div>
            </div>
          </div>
          
          {/* Service Area */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4">
            <h3 className="text-[#1E3A5F] font-semibold text-sm mb-2">Service Area</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              We proudly serve Denver and surrounding areas including Lakewood, Arvada, Aurora, Littleton, Westminster, Thornton, and Englewood.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
          <h2 className="text-[#1E3A5F] font-bold text-lg sm:text-xl mb-4">Request Service</h2>
          
          <form className="space-y-3">
            <div>
              <label className="block text-gray-600 text-xs mb-1">Name *</label>
              <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs mb-1">Phone *</label>
              <input type="tel" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-600 text-xs mb-1">Service Needed</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:outline-none">
                <option>Select a service...</option>
                <option>Emergency Repair</option>
                <option>Drain Cleaning</option>
                <option>Water Heater</option>
                <option>Leak Detection</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 text-xs mb-1">Message</label>
              <textarea rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-[#F97316] focus:outline-none resize-none" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white py-3 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Emergency CTA */}
    <div className="bg-red-600 px-4 sm:px-8 py-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertCircle className="w-5 h-5 text-white" />
        <h3 className="text-white font-bold text-lg">Plumbing Emergency?</h3>
      </div>
      <p className="text-white/90 text-sm mb-3">Don't wait — call us now for immediate help!</p>
      <button className="bg-white text-red-600 px-8 py-3 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
        Call (303) 555-0147 Now
      </button>
    </div>
  </div>
);

// FOOTER SECTION
const FooterSection = ({ onNavigate }: PageProps) => (
  <footer className="bg-[#1E3A5F] text-white px-4 sm:px-8 py-8 sm:py-10">
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        {/* Logo & Info */}
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center">
              <span className="text-white text-xs font-bold">RP</span>
            </div>
            <span className="font-bold text-sm">Riverstone</span>
          </div>
          <p className="text-white/60 text-[10px] leading-relaxed">
            Third-generation family plumbers serving Denver since 1987.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-xs mb-3">Services</h4>
          <ul className="space-y-1.5 text-white/60 text-[10px]">
            <li className="hover:text-white cursor-pointer">Emergency Repair</li>
            <li className="hover:text-white cursor-pointer">Drain Cleaning</li>
            <li className="hover:text-white cursor-pointer">Water Heaters</li>
            <li className="hover:text-white cursor-pointer">Leak Detection</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-xs mb-3">Company</h4>
          <ul className="space-y-1.5 text-white/60 text-[10px]">
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('about')}>About Us</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('reviews')}>Reviews</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer" onClick={() => onNavigate?.('contact')}>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-xs mb-3">Contact</h4>
          <div className="space-y-1.5 text-white/60 text-[10px]">
            <p>(303) 555-0147</p>
            <p>info@riverstoneplumbing.com</p>
            <p>Denver, CO 80219</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 text-center">
        <p className="text-white/40 text-[9px]">
          © 2024 Riverstone Plumbing & Heating. All rights reserved. Licensed & Insured.
        </p>
      </div>
    </div>
  </footer>
);

export default RiverstoneInteractiveMockup;
