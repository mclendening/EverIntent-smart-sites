/**
 * @fileoverview Interactive mockup for Riverstone Plumbing case study
 * @module components/portfolio/case-study/RiverstoneInteractiveMockup
 * 
 * Fully interactive mockup of the Riverstone Plumbing website with:
 * - State-based internal navigation (not using site router)
 * - Simulated AI chatbot with pre-scripted conversation
 * - Realistic industry-specific content
 */

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Star, ChevronRight, MessageCircle, Send, X, Menu } from 'lucide-react';
import heroImage from '@/assets/portfolio/riverstone-plumbing-hero.jpg';

type MockupPage = 'home' | 'services' | 'about' | 'contact';

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  delay: number; // ms delay before showing
}

const chatScript: ChatMessage[] = [
  { id: 1, sender: 'bot', text: "Hi! 👋 Welcome to Riverstone Plumbing. I'm Riley, your virtual assistant. How can I help you today?", delay: 500 },
  { id: 2, sender: 'user', text: "I have a leak under my kitchen sink", delay: 2000 },
  { id: 3, sender: 'bot', text: "I'm sorry to hear about the leak! That can definitely be stressful. Let me help you get this fixed quickly.", delay: 1500 },
  { id: 4, sender: 'bot', text: "Is the leak actively dripping now, or does it only happen when you run water?", delay: 2500 },
  { id: 5, sender: 'user', text: "It drips constantly, pretty fast", delay: 2000 },
  { id: 6, sender: 'bot', text: "That sounds urgent. I'd recommend turning off the water supply valve under the sink if you can — there should be a knob on the pipe.", delay: 1800 },
  { id: 7, sender: 'bot', text: "We have emergency availability today. Can I schedule a technician to come out?", delay: 2000 },
  { id: 8, sender: 'user', text: "Yes please, that would be great", delay: 1500 },
  { id: 9, sender: 'bot', text: "Perfect! I have Mike available between 2-4 PM today. He's one of our senior techs with 15+ years experience.", delay: 1800 },
  { id: 10, sender: 'bot', text: "What's your name and address so I can get this scheduled?", delay: 2000 },
  { id: 11, sender: 'user', text: "Sarah Johnson, 1847 Oak Street", delay: 1500 },
  { id: 12, sender: 'bot', text: "Got it, Sarah! You're all set for today between 2-4 PM. Mike will call 30 min before arrival.", delay: 1500 },
  { id: 13, sender: 'bot', text: "Our diagnostic fee is $89, which gets waived if you proceed with repairs. Is there anything else I can help with?", delay: 2200 },
  { id: 14, sender: 'user', text: "No that's everything, thank you!", delay: 1500 },
  { id: 15, sender: 'bot', text: "You're welcome, Sarah! We'll take great care of you. Have a great day! 🔧", delay: 1200 },
];

export const RiverstoneInteractiveMockup = () => {
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Progress chat script
  useEffect(() => {
    if (!chatOpen || currentMessageIndex >= chatScript.length) return;

    const nextMessage = chatScript[currentMessageIndex];
    
    if (nextMessage.sender === 'bot') {
      setIsTyping(true);
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, nextMessage]);
      setCurrentMessageIndex(prev => prev + 1);
    }, nextMessage.delay);

    return () => clearTimeout(timer);
  }, [chatOpen, currentMessageIndex, messages]);

  // Start chat when opened
  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      setCurrentMessageIndex(0);
      setMessages([]);
      // Trigger first message
      const timer = setTimeout(() => {
        setMessages([chatScript[0]]);
        setCurrentMessageIndex(1);
      }, chatScript[0].delay);
      return () => clearTimeout(timer);
    }
  }, [chatOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <div className="relative w-full aspect-[16/9] min-h-[500px] md:min-h-[600px] lg:min-h-[700px] rounded-xl overflow-hidden bg-card border border-border shadow-2xl">
      {/* Browser Chrome */}
      <div className="h-8 sm:h-10 bg-muted flex items-center px-3 sm:px-4 gap-2 border-b border-border">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-2 sm:mx-4">
          <div className="bg-background rounded-md px-3 py-1 text-[10px] sm:text-xs text-muted-foreground flex items-center gap-2">
            <span className="hidden sm:inline">🔒</span>
            <span>riverstoneplumbing.com</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className="h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] overflow-hidden relative" style={{ backgroundColor: '#1E3A5F' }}>
        {/* Navigation */}
        <nav className="h-10 sm:h-12 bg-white/95 backdrop-blur-sm flex items-center justify-between px-3 sm:px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-[#F97316] flex items-center justify-center">
              <span className="text-white text-[8px] sm:text-xs font-bold">RP</span>
            </div>
            <span className="text-[#1E3A5F] font-semibold text-[10px] sm:text-sm hidden xs:inline">Riverstone Plumbing</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-[10px] lg:text-xs font-medium transition-colors ${
                  currentPage === item.id ? 'text-[#F97316]' : 'text-gray-600 hover:text-[#1E3A5F]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button className="bg-[#F97316] text-white px-2 lg:px-4 py-1 lg:py-1.5 rounded text-[8px] lg:text-xs font-medium hover:bg-[#EA580C] transition-colors flex items-center gap-1">
              <Phone className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
              <span className="hidden lg:inline">(720) 555-0142</span>
              <span className="lg:hidden">Call</span>
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-4 h-4 text-gray-600" />
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-10 sm:top-12 left-0 right-0 bg-white border-b border-gray-200 z-40 shadow-lg">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-xs ${
                  currentPage === item.id ? 'text-[#F97316] bg-orange-50' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Page Content */}
        <div className="h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)] overflow-y-auto">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'services' && <ServicesPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
        </div>

        {/* Chat Widget */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-14 sm:h-14 bg-[#F97316] rounded-full shadow-xl flex items-center justify-center hover:bg-[#EA580C] transition-all hover:scale-105 z-50"
          >
            <MessageCircle className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
          </button>
        )}

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-[calc(100%-1rem)] sm:w-80 h-[60%] sm:h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-[#1E3A5F] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F97316] rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-bold">R</span>
                </div>
                <div>
                  <p className="text-white font-medium text-xs sm:text-sm">Riley</p>
                  <p className="text-white/70 text-[8px] sm:text-[10px]">Virtual Assistant</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 p-2 sm:p-3 overflow-y-auto space-y-2 sm:space-y-3 bg-gray-50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#F97316] text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl rounded-bl-none shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-2 sm:p-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-[10px] sm:text-xs outline-none text-gray-600 placeholder-gray-400"
                  readOnly
                />
                <Send className="w-3 h-3 sm:w-4 sm:h-4 text-[#F97316]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-pages
const HomePage = () => (
  <div className="bg-[#1E3A5F]">
    {/* Hero with Real Image */}
    <div className="relative">
      {/* Background Image */}
      <img 
        src={heroImage} 
        alt="Professional plumber at work"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/90 via-[#1E3A5F]/80 to-[#1E3A5F]/95" />
      
      {/* Content */}
      <div className="relative px-3 sm:px-8 py-6 sm:py-12 text-center">
        <h1 className="text-white text-sm sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
          Denver's Most Trusted<br />Plumbing Experts
        </h1>
        <p className="text-white/90 text-[10px] sm:text-sm mb-3 sm:mb-6 max-w-md mx-auto drop-shadow-md">
          Third-generation family business. 24/7 emergency service. 100% satisfaction guaranteed.
        </p>
        <div className="flex justify-center gap-2 sm:gap-3">
          <button className="bg-[#F97316] text-white px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-[#EA580C] flex items-center gap-1 sm:gap-2 shadow-lg">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
            Get Free Quote
          </button>
          <button className="border-2 border-white/50 text-white px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-white/10 backdrop-blur-sm">
            Our Services
          </button>
        </div>
      </div>
    </div>

    {/* Trust Bar */}
    <div className="bg-white/10 px-3 sm:px-8 py-2 sm:py-4 flex justify-center gap-4 sm:gap-8 flex-wrap">
      <div className="flex items-center gap-1 sm:gap-2 text-white">
        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-[10px] sm:text-xs">4.9 ★ (312 reviews)</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 text-white">
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#F97316]" />
        <span className="text-[10px] sm:text-xs">24/7 Emergency</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 text-white">
        <span className="text-[10px] sm:text-xs">Licensed & Insured</span>
      </div>
    </div>

    {/* Services Grid */}
    <div className="bg-gray-50 px-3 sm:px-8 py-4 sm:py-8">
      <h2 className="text-[#1E3A5F] text-xs sm:text-lg font-bold text-center mb-3 sm:mb-6">Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
        {['Drain Cleaning', 'Water Heaters', 'Leak Repair', 'Sewer Lines', 'Fixture Install', 'Emergency'].map((service) => (
          <div key={service} className="bg-white p-2 sm:p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-[#F97316]/10 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-5 sm:h-5 bg-[#F97316] rounded-full" />
            </div>
            <p className="text-[#1E3A5F] font-medium text-[9px] sm:text-sm">{service}</p>
          </div>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="bg-[#F97316] px-3 sm:px-8 py-4 sm:py-6 text-center">
      <h3 className="text-white text-xs sm:text-lg font-bold mb-1 sm:mb-2">Ready to Fix Your Plumbing?</h3>
      <p className="text-white/90 text-[10px] sm:text-sm mb-2 sm:mb-4">Call now or chat with our AI assistant for instant help</p>
      <button className="bg-white text-[#F97316] px-4 sm:px-8 py-1.5 sm:py-3 rounded-lg text-[10px] sm:text-sm font-bold hover:bg-gray-100 flex items-center gap-2 mx-auto">
        <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
        (720) 555-0142
      </button>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="bg-gray-50 p-3 sm:p-6">
    <h1 className="text-[#1E3A5F] text-sm sm:text-xl font-bold mb-3 sm:mb-6">Our Plumbing Services</h1>
    <div className="space-y-2 sm:space-y-3">
      {[
        { name: 'Emergency Repairs', desc: '24/7 rapid response for urgent issues' },
        { name: 'Drain Cleaning', desc: 'Professional drain and sewer cleaning' },
        { name: 'Water Heater Services', desc: 'Installation, repair, and maintenance' },
        { name: 'Leak Detection', desc: 'Advanced technology to find hidden leaks' },
        { name: 'Pipe Repair & Replacement', desc: 'Fix or replace damaged pipes' },
        { name: 'Fixture Installation', desc: 'Faucets, toilets, and more' },
      ].map((service) => (
        <div key={service.name} className="bg-white p-2 sm:p-4 rounded-lg shadow-sm flex items-center gap-2 sm:gap-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#F97316]/10 rounded-lg flex items-center justify-center shrink-0">
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#F97316] rounded" />
          </div>
          <div>
            <h3 className="text-[#1E3A5F] font-semibold text-[10px] sm:text-sm">{service.name}</h3>
            <p className="text-gray-600 text-[9px] sm:text-xs">{service.desc}</p>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ml-auto" />
        </div>
      ))}
    </div>
  </div>
);

const AboutPage = () => (
  <div className="bg-gray-50 p-3 sm:p-6">
    <h1 className="text-[#1E3A5F] text-sm sm:text-xl font-bold mb-3 sm:mb-4">About Riverstone Plumbing</h1>
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm mb-3 sm:mb-4">
      <p className="text-gray-600 text-[10px] sm:text-sm mb-2 sm:mb-4">
        Since 1987, Riverstone Plumbing has served Denver families with honest, reliable plumbing services. 
        Now in our third generation, we combine old-school craftsmanship with modern technology.
      </p>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div>
          <p className="text-[#F97316] font-bold text-sm sm:text-2xl">35+</p>
          <p className="text-gray-600 text-[8px] sm:text-xs">Years Experience</p>
        </div>
        <div>
          <p className="text-[#F97316] font-bold text-sm sm:text-2xl">15K+</p>
          <p className="text-gray-600 text-[8px] sm:text-xs">Jobs Completed</p>
        </div>
        <div>
          <p className="text-[#F97316] font-bold text-sm sm:text-2xl">4.9★</p>
          <p className="text-gray-600 text-[8px] sm:text-xs">Rating</p>
        </div>
      </div>
    </div>
    <div className="bg-[#1E3A5F] p-3 sm:p-6 rounded-lg text-white text-center">
      <p className="text-[10px] sm:text-sm italic mb-2">"We treat every home like our own."</p>
      <p className="text-[9px] sm:text-xs opacity-80">— Mike Riverstone, Owner</p>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="bg-gray-50 p-3 sm:p-6">
    <h1 className="text-[#1E3A5F] text-sm sm:text-xl font-bold mb-3 sm:mb-4">Contact Us</h1>
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
        <div>
          <p className="text-[9px] sm:text-xs text-gray-500">Phone</p>
          <p className="text-[10px] sm:text-sm font-medium text-[#1E3A5F]">(720) 555-0142</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
        <div>
          <p className="text-[9px] sm:text-xs text-gray-500">Email</p>
          <p className="text-[10px] sm:text-sm font-medium text-[#1E3A5F]">info@riverstoneplumbing.com</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
        <div>
          <p className="text-[9px] sm:text-xs text-gray-500">Address</p>
          <p className="text-[10px] sm:text-sm font-medium text-[#1E3A5F]">4521 Morrison Rd, Denver, CO 80219</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#F97316]" />
        <div>
          <p className="text-[9px] sm:text-xs text-gray-500">Hours</p>
          <p className="text-[10px] sm:text-sm font-medium text-[#1E3A5F]">24/7 Emergency Service</p>
        </div>
      </div>
    </div>
  </div>
);

export default RiverstoneInteractiveMockup;
