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
// SERVICE DATA
// =============================================================================

const SERVICES = [
  { id: 'service-oil' as MockupPage, name: 'Oil Change & Maintenance', desc: 'Keep your engine running smooth', img: IMAGES.oilChange },
  { id: 'service-brakes' as MockupPage, name: 'Brake Service', desc: 'Safety you can count on', img: IMAGES.brakeService },
  { id: 'service-engine' as MockupPage, name: 'Engine Diagnostics', desc: 'Find the real problem', img: IMAGES.engineDiag },
  { id: 'service-transmission' as MockupPage, name: 'Transmission Service', desc: 'Smooth shifts, longer life', img: IMAGES.transmission },
  { id: 'service-tires' as MockupPage, name: 'Tires & Alignment', desc: 'Better handling, even wear', img: IMAGES.tires },
  { id: 'service-ac' as MockupPage, name: 'A/C & Heating', desc: 'Stay comfortable year-round', img: IMAGES.acHeating },
];

const TESTIMONIALS = [
  { 
    name: 'James Martinez', 
    location: 'Riverside', 
    quote: "Finally found a shop I can trust. Marcus showed me photos of exactly what was wrong with my brakes—no pressure, just honest info. I've been coming back for 3 years now.", 
    img: IMAGES.testimonialJames 
  },
  { 
    name: 'Linda Chen', 
    location: 'Corona', 
    quote: "As a busy professional, I appreciate that they text me updates and never try to upsell unnecessary services. My whole family brings their cars here.", 
    img: IMAGES.testimonialLinda 
  },
  { 
    name: 'Tyler Rodriguez', 
    location: 'Moreno Valley', 
    quote: "First time getting my own car serviced and I was nervous about getting ripped off. These guys explained everything in plain English and the price was exactly what they quoted.", 
    img: IMAGES.testimonialTyler 
  },
];

// =============================================================================
// HOME PAGE COMPONENT
// =============================================================================

interface HomePageProps {
  navigateTo: (page: MockupPage) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div>
    {/* HERO - FULL VIEWPORT HEIGHT */}
    <div className="relative h-[404px] md:h-[504px] lg:h-[604px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.heroShop})` }}
      />
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(to right, ${COLORS.primary}F2, ${COLORS.primary}CC, transparent)` 
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        {/* Eyebrow */}
        <span 
          className="text-xs font-medium uppercase tracking-wider mb-2"
          style={{ color: COLORS.accent }}
        >
          ★ 5-Star Rated • Serving Riverside Since 2008
        </span>
        
        {/* Main Headline */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 max-w-lg leading-tight">
          Honest Auto Repair You Can Actually Trust
        </h1>
        
        {/* Subheadline */}
        <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">
          We show you exactly what's wrong—with photos—before we touch a wrench. No surprises, no pressure, just straight talk.
        </p>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap gap-4 text-white/80 text-xs mb-6">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> ASE Certified Techs
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> 24-Month Warranty
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3" /> Free Inspections
          </span>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => navigateTo('contact')}
            className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            Schedule Service
          </button>
          <button 
            onClick={() => navigateTo('services')}
            className="bg-white/10 backdrop-blur text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all"
          >
            View Services →
          </button>
        </div>
      </div>
    </div>
    
    {/* VALUE PROP BAR */}
    <div 
      className="px-6 py-4 text-white"
      style={{ backgroundColor: COLORS.accent }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          <p className="font-bold text-sm">🔧 Digital Inspections with Every Service</p>
          <p className="text-white/80 text-xs">Photos & video sent to your phone—see exactly what we see</p>
        </div>
        <button 
          onClick={() => navigateTo('about')}
          className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white/30 transition-colors whitespace-nowrap"
        >
          Learn How It Works
        </button>
      </div>
    </div>
    
    {/* SERVICES PREVIEW */}
    <div className="px-6 py-10 bg-white">
      <div className="text-center mb-8">
        <span 
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: COLORS.primary }}
        >
          What We Do
        </span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Expert Auto Repair Services</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            onClick={() => navigateTo(service.id)}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden mb-3">
              <img 
                src={service.img} 
                alt={service.name}
                className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 
              className="font-semibold text-gray-800 text-sm group-hover:text-[#1E3A5F] transition-colors"
            >
              {service.name}
            </h3>
            <p className="text-gray-500 text-xs">{service.desc}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button 
          onClick={() => navigateTo('services')}
          className="font-semibold text-sm hover:underline"
          style={{ color: COLORS.primary }}
        >
          View All Services →
        </button>
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-10 bg-[#FAFAF9]">
      <div className="text-center mb-8">
        <span 
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: COLORS.primary }}
        >
          Why Us
        </span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">Why Customers Choose Honest Wrench</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            icon: <Camera className="w-6 h-6" />, 
            title: 'See Before You Pay', 
            desc: 'Digital inspections with photos sent to your phone before any work begins' 
          },
          { 
            icon: <Shield className="w-6 h-6" />, 
            title: 'No Upsell Guarantee', 
            desc: "We'll never recommend repairs you don't need—period" 
          },
          { 
            icon: <Award className="w-6 h-6" />, 
            title: '24-Month Warranty', 
            desc: '24 months / 24,000 miles on all repairs, parts and labor' 
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div 
              className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${COLORS.accent}20`, color: COLORS.accent }}
            >
              {item.icon}
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-sm">{item.title}</h3>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* MEET THE OWNER */}
    <div className="px-6 py-10 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img 
          src={IMAGES.ownerMarcus}
          alt="Marcus Reyes"
          className="w-28 h-28 rounded-2xl object-cover shadow-lg flex-shrink-0"
        />
        <div>
          <span 
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: COLORS.primary }}
          >
            Meet the Owner
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-1 mb-2">Marcus Reyes</h2>
          <p className="text-gray-600 text-sm mb-4">
            After 12 years watching dealerships pressure customers into unnecessary repairs, 
            I started Honest Wrench with a simple promise: treat every customer like family. 
            We show you what's wrong, explain it in plain English, and let you decide.
          </p>
          <button 
            onClick={() => navigateTo('about')}
            className="font-semibold text-sm hover:underline"
            style={{ color: COLORS.primary }}
          >
            Read Our Story →
          </button>
        </div>
      </div>
    </div>
    
    {/* TESTIMONIALS */}
    <div className="px-6 py-10 bg-[#FAFAF9]">
      <div className="text-center mb-8">
        <span 
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: COLORS.primary }}
        >
          Reviews
        </span>
        <h2 className="text-xl font-bold text-gray-800 mt-1">What Our Customers Say</h2>
      </div>
      
      <div className="space-y-4">
        {TESTIMONIALS.map((testimonial, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <img 
                src={testimonial.img}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800 text-sm">{testimonial.name}</span>
                  <span className="text-gray-400 text-xs">• {testimonial.location}</span>
                </div>
                <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
                <p className="text-gray-600 text-sm italic">"{testimonial.quote}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* FINAL CTA */}
    <div 
      className="mx-6 my-8 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}CC)` 
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-2">Ready for Honest Auto Care?</h2>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
          Schedule your service today. Free inspections, upfront pricing, and no pressure—ever.
        </p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          style={{ color: COLORS.primary }}
        >
          Get Your Free Inspection
        </button>
      </div>
    </div>
    
    {/* FOOTER */}
    <footer 
      className="px-6 py-8 text-white"
      style={{ backgroundColor: COLORS.primary }}
    >
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: COLORS.accent }}
            >
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">{BUSINESS.name}</span>
          </div>
          <p className="text-white/70 text-xs mb-2">{BUSINESS.tagline}</p>
        </div>
        
        <div className="text-sm space-y-2 text-white/80">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-xs">{BUSINESS.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="text-xs">{BUSINESS.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{BUSINESS.hours}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/20 text-center text-white/50 text-xs">
        © 2024 {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  </div>
);

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
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        
        {/* Placeholder for other pages */}
        {currentPage !== 'home' && (
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
        )}
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
