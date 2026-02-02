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
  ChevronRight, ChevronLeft, Check, Wrench, Car, Shield, Award, Users, Calendar,
  ThumbsUp, Camera, FileText, AlertCircle, Gauge, Thermometer, CircleDot,
  Droplets, Disc, Settings, Wind, Zap
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
  | 'contact'
  | 'privacy'
  | 'cookies'
  | 'terms'
  | 'data-rights';

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
    
    <MockupFooter navigateTo={navigateTo} />
  </div>
);

// =============================================================================
// SERVICES HUB PAGE
// =============================================================================

const ServicesPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div>
    {/* HERO */}
    <div className="relative h-56 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.servicesHub})` }}
      />
      <div 
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, ${COLORS.primary}F2, ${COLORS.primary}CC, transparent)` }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        <span className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: COLORS.accent }}>
          What We Offer
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Services</h1>
        <p className="text-white/80 text-sm max-w-md">
          Complete auto care from routine maintenance to major repairs—all with our transparency guarantee.
        </p>
      </div>
    </div>
    
    {/* Service Cards Grid */}
    <div className="px-6 py-10 bg-[#FAFAF9]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            onClick={() => navigateTo(service.id)}
            className="group bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden">
              <img 
                src={service.img} 
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-[#1E3A5F] transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
              <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: COLORS.primary }}>
                Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Bottom CTA */}
    <div className="px-6 py-10 bg-white">
      <div 
        className="rounded-2xl p-8 text-center border"
        style={{ 
          background: `linear-gradient(135deg, ${COLORS.primary}08, ${COLORS.accent}08)`,
          borderColor: `${COLORS.primary}20`
        }}
      >
        <span className="text-4xl mb-4 block">🤔</span>
        <h3 className="font-bold text-gray-800 text-xl mb-2">Not Sure What You Need?</h3>
        <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
          Bring your car in for a free diagnostic check. We'll identify the issue and give you honest options.
        </p>
        <button 
          onClick={() => navigateTo('contact')}
          className="text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          style={{ backgroundColor: COLORS.primary }}
        >
          Schedule Free Diagnostic
        </button>
      </div>
    </div>
    
    <MockupFooter navigateTo={navigateTo} />
  </div>
);
// SERVICE DETAIL PAGE TEMPLATE
// =============================================================================

interface ServiceDetailProps {
  navigateTo: (page: MockupPage) => void;
  service: {
    name: string;
    category: string;
    tagline: string;
    heroImg: string;
    actionImg: string;
    stats: { value: string; label: string }[];
    overview: string[];
    included: { title: string; desc: string }[];
    process: { step: string; title: string; desc: string; time: string }[];
    differentiators: { icon: string; title: string; desc: string }[];
    faqs: { q: string; a: string }[];
    testimonial: { quote: string; name: string; location: string; img: string };
    pricing: { headline: string; detail: string };
    cta: { headline: string; subtext: string; button: string; reassurance: string };
    related: MockupPage[];
  };
}

const ServiceDetailPage: React.FC<ServiceDetailProps> = ({ navigateTo, service }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${service.heroImg})` }}
      />
      <div 
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, ${COLORS.primary}F2, ${COLORS.primary}BF, transparent)` }}
      />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button 
          onClick={() => navigateTo('services')} 
          className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"
        >
          <ChevronLeft className="w-3 h-3" /> All Services
        </button>
        <span className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>
          {service.category}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{service.name}</h1>
        <p className="text-white/80 text-sm max-w-lg">{service.tagline}</p>
      </div>
    </div>
    
    {/* QUICK STATS BAR */}
    <div className="px-6 py-4 text-white" style={{ backgroundColor: COLORS.primary }}>
      <div className="flex justify-around text-center">
        {service.stats.map((stat, i) => (
          <div key={i}>
            <p className="font-bold text-lg">{stat.value}</p>
            <p className="text-white/70 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is {service.name}?</h2>
        {service.overview.map((para, i) => (
          <p key={i} className={`${i === 0 ? 'text-gray-700 text-base' : 'text-gray-600 text-sm mt-4'} leading-relaxed`}>
            {para}
          </p>
        ))}
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src={service.actionImg} alt="Service in action" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What's Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.included.map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
              style={{ backgroundColor: `${COLORS.primary}15`, color: COLORS.primary }}
            >
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* THE PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-2">How It Works</h2>
      <p className="text-gray-500 text-sm mb-6">Our proven {service.process.length}-step process ensures quality results.</p>
      <div className="space-y-6">
        {service.process.map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div 
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-lg"
                style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})` }}
              >
                {item.step}
              </div>
              {i < arr.length - 1 && (
                <div className="w-0.5 flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${COLORS.primary}30, transparent)` }} />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-gray-800">{item.title}</h3>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Us for {service.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.differentiators.map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <span className="text-2xl mb-3 block">{item.icon}</span>
            <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* FAQ */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {service.faqs.map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
              <span className="font-bold" style={{ color: COLORS.primary }}>Q:</span>
              {faq.q}
            </h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Customers Say</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src={service.testimonial.img} alt="Customer" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"{service.testimonial.quote}"</p>
            <p className="text-gray-800 font-semibold text-sm">{service.testimonial.name}</p>
            <p className="text-gray-500 text-xs">{service.testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING HINT */}
    <div 
      className="mx-6 my-6 rounded-2xl p-6 border"
      style={{ 
        background: `linear-gradient(to right, ${COLORS.primary}10, ${COLORS.accent}10)`,
        borderColor: `${COLORS.primary}20`
      }}
    >
      <div className="flex items-start gap-4">
        <div 
          className="w-12 h-12 rounded-xl text-white flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: COLORS.primary }}
        >
          <span className="text-xl">💰</span>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">{service.pricing.headline}</h3>
          <p className="text-gray-600 text-sm">{service.pricing.detail}</p>
        </div>
      </div>
    </div>
    
    {/* PRIMARY CTA */}
    <div 
      className="mx-6 mb-6 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative"
      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}CC)` }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">{service.cta.headline}</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">{service.cta.subtext}</p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          style={{ color: COLORS.primary }}
        >
          {service.cta.button}
        </button>
        <p className="text-white/60 text-xs mt-4">{service.cta.reassurance}</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {service.related.map(relatedId => {
          const relatedService = SERVICES.find(s => s.id === relatedId);
          if (!relatedService) return null;
          return (
            <div 
              key={relatedId}
              onClick={() => navigateTo(relatedId)}
              className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={relatedService.img} alt={relatedService.name} className="w-full h-24 object-cover" />
              <p className="p-3 font-semibold text-gray-800 text-sm">{relatedService.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// =============================================================================
// SERVICE DATA - COMPREHENSIVE CONTENT
// =============================================================================

const SERVICE_DETAILS: Record<string, ServiceDetailProps['service']> = {
  'service-oil': {
    name: 'Oil Change & Maintenance',
    category: 'Preventive Maintenance',
    tagline: 'Keep your engine running smooth with our comprehensive oil service and 21-point inspection.',
    heroImg: IMAGES.oilChange,
    actionImg: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=400&fit=crop',
    stats: [
      { value: '5,000+', label: 'Oil Changes/Year' },
      { value: '30min', label: 'Avg. Service Time' },
      { value: '100%', label: 'Satisfaction' }
    ],
    overview: [
      "Regular oil changes are the single most important thing you can do to extend your engine's life. At Honest Wrench Auto, we don't just swap your oil—we perform a complimentary 21-point inspection to catch small issues before they become expensive repairs.",
      "We use only high-quality conventional, synthetic blend, or full synthetic oils matched to your vehicle's specifications. Every service includes a new oil filter, fluid top-offs, and a detailed digital report of your vehicle's condition sent right to your phone."
    ],
    included: [
      { title: 'Premium Oil & Filter', desc: 'Up to 5 quarts of quality oil matched to your vehicle specs' },
      { title: '21-Point Inspection', desc: 'Comprehensive check of brakes, tires, fluids, belts, and more' },
      { title: 'Fluid Top-Offs', desc: 'Washer fluid, coolant, and other fluids checked and topped' },
      { title: 'Digital Report', desc: 'Photos and notes sent to your phone—see what we see' },
      { title: 'Tire Pressure Check', desc: 'All four tires checked and adjusted to proper PSI' },
      { title: 'Next Service Reminder', desc: 'We text you when your next oil change is due' }
    ],
    process: [
      { step: '1', title: 'Drop Off or Wait', desc: 'Comfortable waiting area with WiFi, coffee, and snacks. Appointments recommended but walk-ins welcome.', time: '5 min' },
      { step: '2', title: 'Drain & Replace', desc: 'We drain old oil, replace the filter, and add fresh oil matched to your vehicle manufacturer specs.', time: '15 min' },
      { step: '3', title: 'Full Inspection', desc: 'Our technician performs a thorough 21-point inspection covering all major systems.', time: '10 min' },
      { step: '4', title: 'Review & Go', desc: 'We walk you through our digital report—no pressure, just honest information about your car.', time: '5 min' }
    ],
    differentiators: [
      { icon: '📸', title: 'Digital Inspection Reports', desc: 'Photos and video of your vehicle sent to your phone before any work' },
      { icon: '⏱️', title: 'Fast Service', desc: 'Most oil changes completed in 30-45 minutes with appointment' },
      { icon: '🛡️', title: 'Quality Products', desc: 'We use premium oils and filters—never cheap knockoffs' },
      { icon: '📱', title: 'Service Reminders', desc: "We'll remind you when it's time—never miss maintenance again" }
    ],
    faqs: [
      { q: 'How often should I change my oil?', a: 'Most modern vehicles can go 5,000-7,500 miles between oil changes with synthetic oil. We follow your manufacturer\'s recommendations and consider your driving conditions.' },
      { q: 'Do I need synthetic oil?', a: 'It depends on your vehicle and driving habits. We\'ll recommend what\'s best for YOUR car—not what makes us the most money. Many newer vehicles require synthetic.' },
      { q: 'How long does an oil change take?', a: 'With an appointment, most oil changes take 30-45 minutes including our full inspection. Walk-ins may take a bit longer depending on the queue.' },
      { q: 'What\'s included in the 21-point inspection?', a: 'We check brakes, tires, belts, hoses, fluids, battery, lights, wipers, and more. You\'ll get a detailed report with photos of any concerns.' }
    ],
    testimonial: {
      quote: "I've been getting my oil changed here for 3 years. They always show me exactly what they find and never push unnecessary services. Best shop I've ever used.",
      name: 'Robert Martinez',
      location: 'Riverside, CA',
      img: IMAGES.testimonialJames
    },
    pricing: {
      headline: 'Competitive Pricing, No Hidden Fees',
      detail: 'Oil changes start at $39.95 for conventional oil. Synthetic blend and full synthetic options available. Price includes filter, fluids, and our complete 21-point inspection.'
    },
    cta: {
      headline: 'Ready for Your Oil Change?',
      subtext: 'Schedule online and skip the wait. Most appointments completed in under an hour.',
      button: 'Schedule My Oil Change',
      reassurance: 'No appointment? Walk-ins welcome!'
    },
    related: ['service-brakes', 'service-tires']
  },
  
  'service-brakes': {
    name: 'Brake Service & Repair',
    category: 'Safety & Repairs',
    tagline: 'Your safety depends on reliable brakes. We never recommend work you don\'t need.',
    heroImg: IMAGES.brakeService,
    actionImg: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=400&fit=crop',
    stats: [
      { value: '2,500+', label: 'Brake Jobs/Year' },
      { value: '4.9★', label: 'Google Rating' },
      { value: '24mo', label: 'Parts Warranty' }
    ],
    overview: [
      "Nothing matters more than being able to stop when you need to. Our ASE-certified technicians inspect, service, and repair brake systems on all makes and models—giving you the stopping power and confidence you deserve.",
      "We never recommend brake work you don't need. Every recommendation comes with photos and measurements so you can see exactly what we see. If your brake pads still have life in them, we'll tell you. It's that simple."
    ],
    included: [
      { title: 'Free Brake Inspection', desc: 'Complete measurement and assessment at no charge' },
      { title: 'Photo Documentation', desc: 'See exactly what your brakes look like before approving work' },
      { title: 'Quality Parts', desc: 'OEM-equivalent or better pads and rotors, never cheap imports' },
      { title: '24-Month Warranty', desc: 'All brake work backed by our parts and labor guarantee' },
      { title: 'Road Test', desc: 'Every brake job includes a thorough road test for safety' },
      { title: 'Brake Fluid Check', desc: 'We check and top off brake fluid as needed' }
    ],
    process: [
      { step: '1', title: 'Free Inspection', desc: 'We remove wheels, measure pad thickness, inspect rotors, calipers, lines, and document everything with photos.', time: '20 min' },
      { step: '2', title: 'Detailed Estimate', desc: 'You receive a written estimate with photos showing exactly what needs work and why. No surprises.', time: '10 min' },
      { step: '3', title: 'Expert Repair', desc: 'Our ASE-certified technicians replace pads, resurface or replace rotors, and restore your stopping power.', time: '1-3 hrs' },
      { step: '4', title: 'Test & Verify', desc: 'Complete road test ensures proper braking performance before you leave.', time: '15 min' }
    ],
    differentiators: [
      { icon: '🆓', title: 'Free Inspections', desc: 'Never pay just to find out what\'s wrong with your brakes' },
      { icon: '📷', title: 'See Before You Pay', desc: 'Photos and measurements before any work is approved' },
      { icon: '🏆', title: 'ASE Certified Techs', desc: 'Factory-trained technicians who specialize in brake systems' },
      { icon: '⚡', title: 'Same-Day Service', desc: 'Most brake jobs completed within 2-4 hours' }
    ],
    faqs: [
      { q: 'How do I know if I need new brakes?', a: 'Common signs include squealing, grinding, longer stopping distances, or a pulsating brake pedal. But don\'t guess—bring it in for a free inspection.' },
      { q: 'How long do brake pads last?', a: 'Typically 25,000-65,000 miles depending on driving style, vehicle weight, and pad quality. City driving wears brakes faster than highway driving.' },
      { q: 'Do I always need to replace rotors?', a: 'Not always. If rotors have enough material and aren\'t warped, they can often be resurfaced. We\'ll show you measurements and let you decide.' },
      { q: 'How much does a brake job cost?', a: 'It varies by vehicle and what\'s needed. Basic pad replacement starts around $150/axle. We provide exact quotes before any work begins.' }
    ],
    testimonial: {
      quote: "Took my car in for squeaky brakes expecting to get ripped off. They showed me photos, measured my pads at 5mm, and told me I had another 10k miles. Didn't try to sell me anything. That's rare.",
      name: 'Sarah Johnson',
      location: 'Corona, CA',
      img: IMAGES.testimonialLinda
    },
    pricing: {
      headline: 'Honest Pricing, No Surprises',
      detail: 'Brake pad replacement starts at $149/axle for most vehicles. Rotor replacement additional if needed. Complete quote provided before work begins.'
    },
    cta: {
      headline: 'Concerned About Your Brakes?',
      subtext: 'Don\'t wait until it\'s too late. Free inspections, no obligation.',
      button: 'Get My Free Brake Check',
      reassurance: 'No appointment needed for inspections'
    },
    related: ['service-tires', 'service-oil']
  },
  
  'service-engine': {
    name: 'Engine Diagnostics',
    category: 'Diagnostics & Repair',
    tagline: 'Check engine light on? We find the real problem—not just clear the code and hope.',
    heroImg: IMAGES.engineDiag,
    actionImg: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=400&fit=crop',
    stats: [
      { value: '98%', label: 'First-Time Fix Rate' },
      { value: '$89', label: 'Diagnostic Fee' },
      { value: '1hr', label: 'Avg. Diagnosis Time' }
    ],
    overview: [
      "That glowing check engine light can mean anything from a loose gas cap to a serious engine issue. At Honest Wrench Auto, we use professional-grade diagnostic equipment to identify the root cause—not just read a code and guess.",
      "Our diagnostic process goes deeper than the parts store scanner. We perform live data analysis, component testing, and visual inspections to pinpoint exactly what's happening. Then we explain it in plain English so you can make an informed decision."
    ],
    included: [
      { title: 'OBD-II Code Pull', desc: 'Read all stored and pending diagnostic trouble codes' },
      { title: 'Live Data Analysis', desc: 'Monitor real-time sensor data while engine runs' },
      { title: 'Component Testing', desc: 'Test suspected components to verify failures' },
      { title: 'Visual Inspection', desc: 'Check for vacuum leaks, damaged wires, loose connections' },
      { title: 'Written Report', desc: 'Detailed explanation of what we found and repair options' },
      { title: 'Repair Estimate', desc: 'Complete quote if repairs are needed' }
    ],
    process: [
      { step: '1', title: 'Code Scan', desc: 'We connect professional scanners to read all diagnostic codes and freeze frame data from your vehicle\'s computer.', time: '10 min' },
      { step: '2', title: 'Live Analysis', desc: 'Monitor sensor readings in real-time while testing various conditions to isolate the problem.', time: '20 min' },
      { step: '3', title: 'Component Test', desc: 'Physical testing of suspected components—we verify failures before recommending replacement.', time: '20 min' },
      { step: '4', title: 'Report & Options', desc: 'Plain-English explanation of the issue with repair options and honest recommendations.', time: '10 min' }
    ],
    differentiators: [
      { icon: '🔬', title: 'Advanced Equipment', desc: 'Same diagnostic tools used by dealerships, without the dealer price' },
      { icon: '🎯', title: 'Root Cause Focus', desc: 'We find the actual problem, not just the symptom a code points to' },
      { icon: '💬', title: 'Plain English', desc: 'We translate mechanic-speak so you understand what\'s happening' },
      { icon: '🚗', title: 'Pre-Purchase Inspections', desc: 'Know what you\'re buying before you commit to a used car' }
    ],
    faqs: [
      { q: 'Can I just get the code read for free?', a: 'Parts stores read codes free, but a code is just a starting point—not a diagnosis. We go deeper to find the actual problem so you don\'t waste money replacing parts that aren\'t broken.' },
      { q: 'Is it safe to drive with check engine light on?', a: 'It depends. A solid light usually means a non-emergency issue. A flashing light means stop driving immediately—serious engine damage is possible.' },
      { q: 'How much is a diagnostic?', a: 'Our diagnostic fee is $89, which is applied toward repairs if you have us do the work. You\'ll know exactly what\'s wrong before spending a dime on parts.' },
      { q: 'Do you do pre-purchase inspections?', a: 'Absolutely! For $125, we\'ll give you a complete assessment of any used vehicle before you buy. It\'s the best investment you can make.' }
    ],
    testimonial: {
      quote: "My check engine light had been on for months. Other shops just cleared it. Honest Wrench actually found a small vacuum leak causing the issue. Fixed it for $200 and it's been perfect since.",
      name: 'Mike Torres',
      location: 'Moreno Valley, CA',
      img: IMAGES.testimonialTyler
    },
    pricing: {
      headline: 'Know Before You Pay',
      detail: 'Diagnostic fee is $89. If you approve repairs, the diagnostic fee is applied to your bill. Pre-purchase inspections are $125 for complete used vehicle assessment.'
    },
    cta: {
      headline: 'Check Engine Light Glowing?',
      subtext: 'Stop guessing. Get a real diagnosis from certified technicians.',
      button: 'Diagnose My Check Engine Light',
      reassurance: 'Same-day appointments available'
    },
    related: ['service-transmission', 'service-ac']
  },
  
  'service-transmission': {
    name: 'Transmission Service',
    category: 'Drivetrain Service',
    tagline: 'Smooth shifts keep you moving. Trust our experts for fluid services, repairs, and rebuilds.',
    heroImg: IMAGES.transmission,
    actionImg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop',
    stats: [
      { value: '500+', label: 'Transmissions Serviced' },
      { value: '36mo', label: 'Rebuild Warranty' },
      { value: '17yrs', label: 'Experience' }
    ],
    overview: [
      "Your transmission is one of the most complex—and expensive—components in your vehicle. Regular maintenance can dramatically extend its life, while catching problems early can save you thousands in repairs.",
      "At Honest Wrench Auto, we offer complete transmission care: fluid exchanges, filter replacements, and full diagnostic services. If repairs are needed, we'll explain exactly what's happening and provide honest options from minor fixes to complete rebuilds."
    ],
    included: [
      { title: 'Fluid Analysis', desc: 'We assess fluid condition to gauge transmission health' },
      { title: 'Filter Replacement', desc: 'New filter installed (if applicable to your vehicle)' },
      { title: 'Pan Inspection', desc: 'Check for metal shavings or debris indicating wear' },
      { title: 'Gasket Replacement', desc: 'New pan gasket to prevent leaks' },
      { title: 'Proper Fluid', desc: 'Manufacturer-specified transmission fluid only' },
      { title: 'Road Test', desc: 'Verify proper shifting after service' }
    ],
    process: [
      { step: '1', title: 'Assessment', desc: 'We check fluid condition, look for leaks, and assess shifting quality during a test drive.', time: '20 min' },
      { step: '2', title: 'Service or Diagnose', desc: 'Routine fluid service, or deeper diagnostic if problems are detected.', time: '1-2 hrs' },
      { step: '3', title: 'Pan Inspection', desc: 'We inspect the pan for debris that indicates internal wear.', time: '15 min' },
      { step: '4', title: 'Recommendations', desc: 'Honest assessment of transmission health and maintenance schedule.', time: '10 min' }
    ],
    differentiators: [
      { icon: '🔍', title: 'Thorough Inspection', desc: 'We check fluid, pan, and shifting—not just drain and fill' },
      { icon: '💧', title: 'Right Fluid', desc: 'We use ONLY manufacturer-specified fluid for your transmission' },
      { icon: '⚠️', title: 'Early Detection', desc: 'We catch problems before they become expensive failures' },
      { icon: '🔧', title: 'Rebuild Capability', desc: 'When major work is needed, we have the expertise to do it right' }
    ],
    faqs: [
      { q: 'How often should transmission fluid be changed?', a: 'Most manufacturers recommend every 30,000-60,000 miles, but it varies by vehicle and driving conditions. Check your owner\'s manual or ask us.' },
      { q: 'What are signs of transmission problems?', a: 'Slipping gears, rough shifting, delayed engagement, burning smell, or fluid leaks. Don\'t ignore these—early intervention saves money.' },
      { q: 'Should I flush or just change the fluid?', a: 'We generally recommend a drain-and-fill over flushes for older vehicles. We\'ll explain what\'s best for YOUR transmission.' },
      { q: 'How much does a transmission rebuild cost?', a: 'Rebuilds typically range from $1,500-$3,500 depending on the transmission. But regular maintenance can help you avoid this expense entirely.' }
    ],
    testimonial: {
      quote: "My transmission was slipping bad. Another shop quoted $3,200 for a rebuild. Honest Wrench found a sensor issue and fixed it for $350. Still shifting perfectly a year later.",
      name: 'David Park',
      location: 'Riverside, CA',
      img: IMAGES.testimonialJames
    },
    pricing: {
      headline: 'Prevent the Big Repair',
      detail: 'Transmission fluid service starts at $149 for most vehicles. A $150 service now could save you $3,000 later. We\'ll help you plan maintenance to maximize transmission life.'
    },
    cta: {
      headline: 'Shifting Funny?',
      subtext: 'Don\'t wait until it gets worse. Early diagnosis saves thousands.',
      button: 'Check My Transmission',
      reassurance: 'No-obligation assessment'
    },
    related: ['service-engine', 'service-oil']
  },
  
  'service-tires': {
    name: 'Tires & Alignment',
    category: 'Tires & Suspension',
    tagline: 'Better handling, longer tire life, and a smoother ride with proper alignment.',
    heroImg: IMAGES.tires,
    actionImg: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&h=400&fit=crop',
    stats: [
      { value: '1,200+', label: 'Alignments/Year' },
      { value: '4-wheel', label: 'Precision Alignment' },
      { value: 'Same Day', label: 'Most Services' }
    ],
    overview: [
      "Your tires are the only part of your car that touches the road—making them critical for safety, handling, and fuel efficiency. Whether you need new tires, a rotation, or a precision alignment, Honest Wrench Auto keeps you rolling safely.",
      "Misaligned wheels cause uneven tire wear, pulling, and poor handling. Our computerized alignment system measures all four wheels and adjusts to manufacturer specifications, giving you a straight-tracking vehicle and maximum tire life."
    ],
    included: [
      { title: 'Computerized Alignment', desc: 'Precision measurement and adjustment of all four wheels' },
      { title: 'Tire Inspection', desc: 'Check tread depth, wear patterns, and sidewall condition' },
      { title: 'Pressure Adjustment', desc: 'Set all tires to proper PSI for your vehicle' },
      { title: 'Rotation Service', desc: 'Rotate tires to promote even wear (if needed)' },
      { title: 'TPMS Check', desc: 'Verify tire pressure monitoring sensors work properly' },
      { title: 'Before/After Report', desc: 'See the alignment specs before and after service' }
    ],
    process: [
      { step: '1', title: 'Tire Assessment', desc: 'We measure tread depth, check for wear patterns, and inspect for damage.', time: '10 min' },
      { step: '2', title: 'Alignment Check', desc: 'Vehicle goes on the alignment rack for precise computerized measurement.', time: '15 min' },
      { step: '3', title: 'Precision Adjustment', desc: 'Adjust toe, camber, and caster to manufacturer specs.', time: '30 min' },
      { step: '4', title: 'Verify & Report', desc: 'Final check and printed report showing all alignment specs.', time: '10 min' }
    ],
    differentiators: [
      { icon: '📐', title: 'Precision Equipment', desc: 'Computer-guided alignment for accurate results every time' },
      { icon: '💰', title: 'Competitive Pricing', desc: 'Quality tires and service without big-box markups' },
      { icon: '🔄', title: 'Free Rotation', desc: 'Tire rotation included free with any oil change service' },
      { icon: '📱', title: 'TPMS Experts', desc: 'We service and program all tire pressure monitoring systems' }
    ],
    faqs: [
      { q: 'How do I know if I need an alignment?', a: 'Signs include pulling to one side, uneven tire wear, steering wheel off-center, or vibration at highway speeds. We recommend checking alignment annually.' },
      { q: 'How often should I rotate my tires?', a: 'Every 5,000-7,500 miles, typically with your oil change. Regular rotation helps tires wear evenly and last longer.' },
      { q: 'Do you sell tires?', a: 'Yes! We offer competitive pricing on quality tire brands and can often beat big-box store prices. Installation, balancing, and TPMS service included.' },
      { q: 'How long does an alignment take?', a: 'A standard four-wheel alignment takes about 45-60 minutes. Tire rotations are typically 20-30 minutes.' }
    ],
    testimonial: {
      quote: "My tires were wearing unevenly after just 15k miles. Got an alignment at Honest Wrench and the next set lasted over 50k miles. Should have come here first!",
      name: 'Jennifer Adams',
      location: 'Jurupa Valley, CA',
      img: IMAGES.testimonialLinda
    },
    pricing: {
      headline: 'Extend Your Tire Investment',
      detail: 'Four-wheel alignment starts at $89. A proper alignment can add thousands of miles to your tire life. Free rotation with any oil change.'
    },
    cta: {
      headline: 'Pulling to One Side?',
      subtext: 'Get your alignment checked and extend your tire life.',
      button: 'Align My Vehicle',
      reassurance: 'Quick service, no appointment needed'
    },
    related: ['service-brakes', 'service-oil']
  },
  
  'service-ac': {
    name: 'A/C & Heating',
    category: 'Climate Control',
    tagline: 'Stay comfortable in Riverside heat. Expert A/C diagnosis and repair.',
    heroImg: IMAGES.acHeating,
    actionImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=400&fit=crop',
    stats: [
      { value: '800+', label: 'A/C Repairs/Year' },
      { value: '115°', label: 'Riverside Summers' },
      { value: 'Same Day', label: 'Most Repairs' }
    ],
    overview: [
      "Riverside summers don't mess around—and neither should your air conditioning. Whether you're dealing with warm air when it should be cold, strange smells from the vents, or a heater that won't heat, our technicians will diagnose and repair the issue.",
      "A/C systems are sealed and require specialized equipment to service properly. We use EPA-approved refrigerant recovery systems and have the training to find leaks, replace compressors, and get your cabin comfortable again."
    ],
    included: [
      { title: 'Performance Test', desc: 'Measure vent temperature and system pressure' },
      { title: 'Leak Detection', desc: 'UV dye testing to find hidden refrigerant leaks' },
      { title: 'System Inspection', desc: 'Check compressor, condenser, evaporator, and lines' },
      { title: 'Refrigerant Service', desc: 'Recover, recycle, and recharge to proper levels' },
      { title: 'Cabin Filter', desc: 'Inspect and replace cabin air filter if needed' },
      { title: 'Odor Treatment', desc: 'Eliminate musty smells from the ventilation system' }
    ],
    process: [
      { step: '1', title: 'Performance Test', desc: 'We measure actual vent temperature and system pressures to assess A/C performance.', time: '15 min' },
      { step: '2', title: 'Leak Detection', desc: 'UV dye test and electronic leak detector to find any refrigerant leaks.', time: '20 min' },
      { step: '3', title: 'Diagnosis', desc: 'Identify failing components—compressor, condenser, evaporator, or controls.', time: '15 min' },
      { step: '4', title: 'Repair & Verify', desc: 'Fix the issue and verify cold air output before you leave.', time: '1-3 hrs' }
    ],
    differentiators: [
      { icon: '🌡️', title: 'Performance Testing', desc: 'We measure what your system is actually doing, not guess' },
      { icon: '🔦', title: 'Leak Experts', desc: 'UV dye and electronic detection to find hidden leaks' },
      { icon: '❄️', title: 'Complete Service', desc: 'A/C, heater core, blower motors, and climate controls' },
      { icon: '⚡', title: 'Quick Recharges', desc: 'Simple refrigerant top-offs when that\'s all you need' }
    ],
    faqs: [
      { q: 'Why is my A/C blowing warm air?', a: 'Common causes include low refrigerant (usually from a leak), a failing compressor, clogged condenser, or electrical issues. Diagnosis is the first step.' },
      { q: 'How often does A/C need to be recharged?', a: 'A properly sealed system shouldn\'t need recharging. If you need frequent recharges, there\'s a leak that should be fixed.' },
      { q: 'Why does my car smell musty?', a: 'Mold and bacteria can grow on your evaporator core. We can treat the system to eliminate odors and improve air quality.' },
      { q: 'Can you work on newer R-1234yf systems?', a: 'Yes! We have the equipment to service both R-134a and the newer R-1234yf refrigerants used in newer vehicles.' }
    ],
    testimonial: {
      quote: "My A/C died during a 110° week in July. Honest Wrench found a leak, fixed it, and had me cool again the same day. Lifesavers!",
      name: 'Carlos Mendez',
      location: 'Riverside, CA',
      img: IMAGES.testimonialTyler
    },
    pricing: {
      headline: 'Beat the Heat',
      detail: 'A/C performance check and recharge starts at $149. Leak detection additional. We quote all repairs before work begins—no surprises.'
    },
    cta: {
      headline: 'Sweating in Your Car?',
      subtext: "Don't suffer through summer. Get your A/C fixed fast.",
      button: 'Cool Me Down',
      reassurance: 'Same-day service available'
    },
    related: ['service-engine', 'service-oil']
  }
};

// =============================================================================
// ABOUT PAGE
// =============================================================================

const AboutPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.shopExterior})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 right-4 w-28 h-36 overflow-hidden rounded-t-xl">
        <img src={IMAGES.ownerMarcus} alt="Marcus Reyes" className="w-full h-full object-cover object-top" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <span className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>Our Story</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Meet Marcus & Elena</h1>
        <p className="text-white/80 text-sm max-w-sm">Building trust one repair at a time since 2008</p>
      </div>
    </div>
    
    {/* FOUNDER STORY */}
    <div className="px-6 py-8 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img src={IMAGES.ownerMarcus} alt="Marcus Reyes" className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-lg" />
        </div>
        <div>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            After 12 years working as a dealership technician, I watched too many customers get pressured into repairs they didn't need. I'd see the confusion on their faces, the worry about whether they were being told the truth. In 2008, my wife Elena and I decided to do something about it.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            We opened Honest Wrench Auto with a simple promise: show customers exactly what we see, explain it in plain English, and let them decide. No pressure. No upselling. Just straight talk and expert care. Seventeen years later, that promise hasn't changed.
          </p>
        </div>
      </div>
    </div>
    
    {/* VALUES */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">What We Believe</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: '📸', title: 'Transparency First', desc: 'We show you photos and videos of every issue we find—no guesswork' },
          { icon: '🤝', title: 'Honesty Always', desc: "If you don't need a repair, we'll tell you. It's that simple." },
          { icon: '👨‍👩‍👦', title: 'Family Values', desc: 'We treat every customer the way we want our own family treated' },
        ].map((value, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-3xl mb-3 block">{value.icon}</span>
            <h3 className="font-bold text-gray-800 mb-2">{value.title}</h3>
            <p className="text-gray-500 text-sm">{value.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* CREDENTIALS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Credentials & Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          'ASE Certified Master Technicians',
          'AAA Approved Auto Repair Facility',
          'BBB Accredited Business (A+ Rating)',
          '17 Years Serving Riverside County',
          'MACS Certified A/C Technicians',
          'CA Bureau of Automotive Repair Licensed',
        ].map((cred, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
            <Check className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.primary }} />
            {cred}
          </div>
        ))}
      </div>
    </div>
    
    {/* TEAM */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Meet the Team</h2>
      <div className="grid grid-cols-3 gap-4">
        {[
          { name: 'Marcus Reyes', role: 'Owner & Lead Tech', img: IMAGES.ownerMarcus },
          { name: 'Elena Reyes', role: 'Business Manager', img: IMAGES.ownerElena },
          { name: 'Alex Reyes', role: 'Service Writer', img: IMAGES.testimonialTyler },
        ].map((member, i) => (
          <div key={i} className="text-center">
            <img src={member.img} alt={member.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mx-auto mb-3 shadow-md" />
            <h3 className="font-semibold text-gray-800 text-xs md:text-sm">{member.name}</h3>
            <p className="text-gray-500 text-[10px] md:text-xs">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* SHOP PHOTOS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Our Shop</h2>
      <div className="grid grid-cols-2 gap-3">
        <img src={IMAGES.servicesHub} alt="Shop Interior" className="rounded-xl h-32 w-full object-cover" />
        <img src={IMAGES.shopExterior} alt="Shop Exterior" className="rounded-xl h-32 w-full object-cover" />
      </div>
      <p className="text-gray-500 text-sm mt-3 text-center">Clean, organized, and equipped with the latest diagnostic technology</p>
    </div>
    
    {/* CTA */}
    <div 
      className="mx-6 my-6 rounded-2xl p-8 text-center text-white shadow-xl relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primary}CC)` }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Ready to Experience the Difference?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
          Join thousands of Riverside families who trust Honest Wrench for their auto care.
        </p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          style={{ color: COLORS.primary }}
        >
          Schedule Your First Visit
        </button>
      </div>
    </div>
    
    <MockupFooter navigateTo={navigateTo} />
  </div>
);

// =============================================================================
// CONTACT PAGE
// =============================================================================

const ContactPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div>
    {/* HERO */}
    <div className="relative h-48 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.riverside})` }}
      />
      <div 
        className="absolute inset-0"
        style={{ background: `linear-gradient(to right, ${COLORS.primary}E6, ${COLORS.primary}B3)` }}
      />
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        <span className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: COLORS.accent }}>Get In Touch</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Schedule Your Service</h1>
        <p className="text-white/80 text-sm">We'd love to hear from you</p>
      </div>
    </div>
    
    {/* QUICK CONTACT */}
    <div className="px-6 py-6 bg-white">
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Phone, label: 'Call', value: '(951) 555-0147' },
          { icon: Mail, label: 'Email', value: 'info@hwrench.com' },
          { icon: MapPin, label: 'Visit', value: 'Riverside, CA' },
        ].map((item, i) => (
          <div 
            key={i}
            className="flex flex-col items-center p-4 rounded-2xl text-center transition-colors cursor-pointer"
            style={{ backgroundColor: `${COLORS.primary}08` }}
          >
            <div 
              className="w-10 h-10 rounded-full text-white flex items-center justify-center mb-2"
              style={{ backgroundColor: COLORS.primary }}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-gray-800">{item.label}</span>
            <span className="text-[10px] text-gray-500 truncate w-full">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* CONTACT FORM */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-1">Send Us a Message</h2>
        <p className="text-gray-500 text-sm mb-6">We'll get back to you within 1 business hour.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
            <input 
              type="text"
              placeholder="John Smith"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input 
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">What service do you need?</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all text-sm text-gray-500">
              <option>Select a service...</option>
              <option>Oil Change & Maintenance</option>
              <option>Brake Service</option>
              <option>Engine Diagnostics</option>
              <option>Transmission Service</option>
              <option>Tires & Alignment</option>
              <option>A/C & Heating</option>
              <option>Other / Not Sure</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tell us about your vehicle</label>
            <textarea 
              placeholder="Year, make, model, and what's going on..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/20 outline-none transition-all text-sm resize-none"
            />
          </div>
          
          <button 
            className="w-full text-white py-4 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.accent})` }}
          >
            Request Appointment
          </button>
          
          <p className="text-center text-xs text-gray-400">
            🔒 Your information is secure and never shared.
          </p>
        </div>
      </div>
    </div>
    
    {/* BUSINESS INFO */}
    <div className="px-6 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" style={{ color: COLORS.primary }} />
            Location & Hours
          </h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-800 text-sm">{BUSINESS.name}</p>
              <p className="text-gray-500 text-sm">{BUSINESS.address}</p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="font-medium text-gray-800 text-sm mb-2">Hours</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday - Friday</span>
                  <span className="text-gray-800">7:30am - 6:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-gray-800">8:00am - 3:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="text-gray-800">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" style={{ color: COLORS.primary }} />
            Direct Contact
          </h3>
          <div className="space-y-3">
            <div 
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
              style={{ backgroundColor: `${COLORS.primary}08` }}
            >
              <Phone className="w-5 h-5" style={{ color: COLORS.primary }} />
              <div>
                <p className="font-medium text-gray-800 text-sm">{BUSINESS.phone}</p>
                <p className="text-gray-500 text-xs">Call or text</p>
              </div>
            </div>
            <div 
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
              style={{ backgroundColor: `${COLORS.primary}08` }}
            >
              <Mail className="w-5 h-5" style={{ color: COLORS.primary }} />
              <div>
                <p className="font-medium text-gray-800 text-sm">info@honestwrenchauto.com</p>
                <p className="text-gray-500 text-xs">We reply within 1 hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* MAP PLACEHOLDER */}
    <div className="px-6 pb-8">
      <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
        <div className="relative z-10 text-center">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm font-medium">View on Google Maps</p>
          <p className="text-gray-400 text-xs">{BUSINESS.address}</p>
        </div>
      </div>
    </div>
    
    <MockupFooter navigateTo={navigateTo} />
  </div>
);

// =============================================================================
// LEGAL PAGES
// =============================================================================

const PrivacyPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div className="px-6 py-10 bg-white min-h-full">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: January 2026</p>
    
    <div className="prose prose-sm text-gray-600 space-y-4 max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration website operated by EverIntent LLC. 
          "{BUSINESS.name}" is a fictional business. No actual services are provided.
        </p>
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">About This Site</h2>
      <p>This website is a demonstration portfolio piece created by EverIntent LLC to showcase web development and AI automation capabilities.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Information Collection</h2>
      <p>This demonstration site does not collect personal information. Any forms displayed are for demonstration purposes only.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Contact</h2>
      <p className="font-medium">
        EverIntent LLC<br/>
        2892 N Bellflower Blvd PMB 1018<br/>
        Long Beach, CA 90815<br/>
        info@everintent.com • (562) 685-9500
      </p>
    </div>
  </div>
);

const CookiesPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div className="px-6 py-10 bg-white min-h-full">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: January 2026</p>
    
    <div className="prose prose-sm text-gray-600 space-y-4 max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration website operated by EverIntent LLC.
        </p>
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit websites.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Cookies We Use</h2>
      <p>This demonstration site uses only essential cookies. We do not use tracking, advertising, or analytics cookies.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Contact</h2>
      <p>
        EverIntent LLC<br/>
        2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815<br/>
        info@everintent.com • (562) 685-9500
      </p>
    </div>
  </div>
);

const TermsPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div className="px-6 py-10 bg-white min-h-full">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Terms of Service</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: January 2026</p>
    
    <div className="prose prose-sm text-gray-600 space-y-4 max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ DEMO SITE NOTICE: "{BUSINESS.name}" is a fictional business created for demonstration purposes only.
        </p>
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">1. Purpose</h2>
      <p>This website demonstrates the web development capabilities of EverIntent LLC. No actual auto repair services are offered.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">2. Fictional Content</h2>
      <p>All business information, testimonials, and service descriptions are fictional examples.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">3. Contact</h2>
      <p>
        EverIntent LLC<br/>
        2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815<br/>
        info@everintent.com • (562) 685-9500
      </p>
    </div>
  </div>
);

const DataRightsPage: React.FC<HomePageProps> = ({ navigateTo }) => (
  <div className="px-6 py-10 bg-white min-h-full">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Data Rights</h1>
    <p className="text-gray-500 text-sm mb-6">California Consumer Privacy Act (CCPA)</p>
    
    <div className="prose prose-sm text-gray-600 space-y-4 max-w-2xl">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration. No personal data is collected, sold, or shared.
        </p>
      </div>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Do Not Sell My Personal Information</h2>
      <p>EverIntent LLC does not sell personal information. This demonstration site does not collect personal data.</p>
      
      <h2 className="text-lg font-semibold text-gray-800 mt-6">Contact for Data Requests</h2>
      <p>
        EverIntent LLC<br/>
        2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815<br/>
        Email: info@everintent.com<br/>
        Phone: (562) 685-9500
      </p>
    </div>
  </div>
);

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

const MockupFooter: React.FC<HomePageProps> = ({ navigateTo }) => (
  <footer className="bg-[#1a1a2e] text-white">
    <div className="px-6 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.accent }}>
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold">{BUSINESS.name}</span>
          </div>
          <p className="text-gray-400 text-xs mb-3">{BUSINESS.tagline}</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { id: 'home' as MockupPage, label: 'Home' },
              { id: 'services' as MockupPage, label: 'Services' },
              { id: 'about' as MockupPage, label: 'About Us' },
              { id: 'contact' as MockupPage, label: 'Contact' },
              { id: 'privacy' as MockupPage, label: 'Privacy Policy' },
              { id: 'terms' as MockupPage, label: 'Terms of Service' },
            ].map(item => (
              <button key={item.id} onClick={() => navigateTo(item.id)} className="block text-gray-400 text-xs hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Services */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Services</h4>
          <div className="space-y-2">
            {SERVICES.map(service => (
              <button key={service.id} onClick={() => navigateTo(service.id)} className="block text-gray-400 text-xs hover:text-white transition-colors">
                {service.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm mb-3">Contact</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-400">
              <Phone className="w-3 h-3" style={{ color: COLORS.accent }} />
              {BUSINESS.phone}
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-3 h-3" style={{ color: COLORS.accent }} />
              info@hwrench.com
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-3 h-3" style={{ color: COLORS.accent }} />
              Riverside, CA Metro Area
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Disclaimer */}
    <div className="border-t border-gray-800 px-6 py-6">
      <p className="text-gray-400 text-xs text-center mb-2">
        © 2026 {BUSINESS.name}. Professional Auto Repair in Riverside.
      </p>
      <p className="text-gray-500 text-[10px] text-center max-w-xl mx-auto mb-4">
        This website is operated by EverIntent LLC. Services are performed by licensed independent providers.
      </p>
      <div className="border-t border-gray-800 pt-4 text-center">
        <p className="text-gray-600 text-[10px]">
          EverIntent LLC • 2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815 • (562) 685-9500
        </p>
      </div>
    </div>
  </footer>
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
    // Map values to display text
    const displayMap: Record<string, string> = {
      'schedule': 'I want to schedule a service',
      'diagnose': 'My car is making a noise',
      'hours': 'What are your hours?',
      'human': 'I want to talk to someone',
      'brakes': 'Squeaking brakes',
      'engine': 'Engine knocking',
      'other': 'Something else',
      'oil': 'Oil Change',
      'check-engine': 'Check Engine Light',
      'other-service': 'Something Else',
      'morning': 'Morning (7:30-10am)',
      'midday': 'Midday (10am-2pm)',
      'afternoon': 'Afternoon (2-6pm)',
      'tomorrow': 'Tomorrow',
      'this-week': 'This week',
      'next-week': 'Next week',
      'emergency': '🚨 This is urgent!',
      'done': "That's all, thanks!",
      'confirm-yes': 'Yes, looks good!',
      'confirm-edit': 'I need to change something',
    };

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: displayMap[value] || value,
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
            content: "Great! Let's get you scheduled. 🚗\n\nWhat are you driving? (Year, make, model works great!)",
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
              { label: '🚨 This is urgent!', value: 'emergency' },
            ],
          };
          setChatStep('diagnose');
          break;
          
        case 'hours':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `We're open:\n\n📍 ${BUSINESS.address}\n\n⏰ Mon-Fri: 7:30am - 6pm\n    Saturday: 8am - 3pm\n    Sunday: Closed\n\n📞 ${BUSINESS.phone}\n\nNeed to schedule a visit?`,
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
            content: `No problem! Give us a call at ${BUSINESS.phone} and someone will be happy to help.\n\n⏰ We're available ${BUSINESS.hours}.\n\nOr if you prefer, I can have someone call you back. Want me to set that up?`,
            options: [
              { label: 'Yes, call me back', value: 'callback' },
              { label: "I'll call you", value: 'done' },
            ],
          };
          break;
          
        case 'callback':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Perfect! What's the best number to reach you? We'll give you a call within the hour during business hours.",
          };
          setChatStep('phone-callback');
          break;
          
        case 'brakes':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Squeaky brakes are definitely worth checking out! It could be as simple as dust buildup, or your pads might be getting thin.\n\n✅ Good news: we offer FREE brake inspections. We'll measure everything, take photos, and show you exactly what's going on—no obligation.\n\nWant to schedule a free brake check?",
            options: [
              { label: 'Yes, schedule me', value: 'schedule' },
              { label: 'Maybe later', value: 'done' },
            ],
          };
          break;
          
        case 'engine':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Engine knocking can mean a few things—could be something minor like low oil, or it might need a closer look.\n\n🔍 Our diagnostic check includes:\n• Computer scan\n• Visual inspection\n• Photo documentation\n• Plain-English explanation\n\nWant to schedule a diagnostic?",
            options: [
              { label: 'Yes, book diagnostic', value: 'schedule' },
              { label: 'Tell me more first', value: 'engine-info' },
            ],
          };
          break;
          
        case 'engine-info':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Our engine diagnostics are thorough but simple:\n\n1️⃣ We hook up our scanner\n2️⃣ Read all codes and data\n3️⃣ Do a hands-on inspection\n4️⃣ Take photos of anything we find\n5️⃣ Explain it all in plain English\n\nNo pressure, no upselling. Just honest answers.\n\nReady to book?",
            options: [
              { label: 'Yes, schedule me', value: 'schedule' },
              { label: 'Maybe later', value: 'done' },
            ],
          };
          break;
          
        case 'emergency':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `🚨 Got it—this is urgent!\n\nCall us right now at ${BUSINESS.phone} and let them know it's an emergency. We'll get you in ASAP.\n\nIf your car is unsafe to drive:\n• Don't risk it\n• We can recommend a tow\n• Just tell them Wrenchy sent you\n\nYou'll be in good hands. 🔧`,
          };
          break;
          
        case 'other':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "No worries—sometimes car problems are hard to describe! Tell me a bit more:\n\n• When does it happen? (starting, driving, stopping)\n• Any warning lights on?\n• Is it safe to drive?\n\nType your answer and I'll help figure out next steps.",
          };
          setChatStep('describe-issue');
          break;
          
        case 'oil':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Oil change it is! 🛢️\n\nWe use quality synthetic blend or full synthetic (your choice), and we include a free multi-point inspection with every oil change.\n\nWhen works best for you?",
            options: [
              { label: 'Tomorrow', value: 'tomorrow' },
              { label: 'This week', value: 'this-week' },
              { label: 'Next week', value: 'next-week' },
            ],
          };
          setChatStep('timing');
          break;
          
        case 'check-engine':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Check engine light on? Let's see what's going on under the hood.\n\n🔍 Our diagnostic includes a full computer scan + visual inspection. We'll tell you exactly what's wrong and what it'll take to fix it.\n\nWhen can you bring it in?",
            options: [
              { label: 'Tomorrow', value: 'tomorrow' },
              { label: 'This week', value: 'this-week' },
              { label: 'Next week', value: 'next-week' },
            ],
          };
          setChatStep('timing');
          break;
          
        case 'other-service':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "No problem! What do you need help with?\n\n• Tires / alignment\n• A/C or heating\n• Transmission\n• Something else\n\nJust type what you need and I'll take it from there.",
          };
          setChatStep('describe-service');
          break;
          
        case 'tomorrow':
        case 'this-week':
        case 'next-week':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "What time of day works best for drop-off?",
            options: [
              { label: 'Morning (7:30-10am)', value: 'morning' },
              { label: 'Midday (10am-2pm)', value: 'midday' },
              { label: 'Afternoon (2-6pm)', value: 'afternoon' },
            ],
          };
          setChatStep('time-of-day');
          break;
          
        case 'morning':
        case 'midday':
        case 'afternoon':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Perfect! 📋 Last step—what's the best phone number to reach you? We'll send a text confirmation and reminder.",
          };
          setChatStep('phone');
          break;
          
        case 'done':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Thanks for chatting! 🔧\n\nRemember, we're here when you need us:\n📞 " + BUSINESS.phone + "\n📍 " + BUSINESS.address + "\n\nDrive safe!",
          };
          setChatStep('complete');
          break;
          
        case 'confirm-yes':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "🎉 You're all set!\n\nWe've texted your confirmation. See you soon!\n\nHelpful reminders:\n• Bring your keys\n• Note any recent changes\n• We have free coffee ☕\n\nQuestions? Just reply here or call us. Thanks for choosing Honest Wrench Auto!",
          };
          setChatStep('complete');
          break;
          
        case 'confirm-edit':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `No problem! Give us a call at ${BUSINESS.phone} and we can adjust your appointment. Or would you like to start over?`,
            options: [
              { label: 'Start over', value: 'schedule' },
              { label: "I'll call", value: 'done' },
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
    }, 1200);
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
    const savedInput = userInput;
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResponse: ChatMessage;

      switch (chatStep) {
        case 'vehicle':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `Got it—${savedInput}! 🚗\n\nWhat service do you need today?`,
            options: [
              { label: 'Oil Change', value: 'oil' },
              { label: 'Brake Check', value: 'brakes' },
              { label: 'Check Engine Light', value: 'check-engine' },
              { label: 'Something Else', value: 'other-service' },
            ],
          };
          setChatStep('service');
          break;
          
        case 'phone':
        case 'phone-callback':
          // Validate phone-like input
          const phoneDigits = savedInput.replace(/\D/g, '');
          if (phoneDigits.length >= 10) {
            botResponse = {
              id: `bot-${Date.now()}`,
              type: 'bot',
              content: `Got it! 📱 We'll text you at ${savedInput}.\n\n📋 **Your Appointment Summary:**\n• Service: Oil Change\n• When: Tomorrow morning\n• Where: ${BUSINESS.address}\n\nDoes everything look good?`,
              options: [
                { label: 'Yes, looks good!', value: 'confirm-yes' },
                { label: 'I need to change something', value: 'confirm-edit' },
              ],
            };
            setChatStep('confirm');
          } else {
            botResponse = {
              id: `bot-${Date.now()}`,
              type: 'bot',
              content: "Hmm, that doesn't look like a complete phone number. Can you double-check? I need 10 digits to send your confirmation. 📱",
            };
          }
          break;
          
        case 'describe-issue':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `Thanks for the details! That sounds like something we should take a look at.\n\n🔍 I'd recommend scheduling a diagnostic so we can inspect it properly and give you honest answers.\n\nWant to book a diagnostic appointment?`,
            options: [
              { label: 'Yes, schedule me', value: 'schedule' },
              { label: 'Maybe later', value: 'done' },
            ],
          };
          break;
          
        case 'describe-service':
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: `Got it—${savedInput}! We can definitely help with that.\n\nWhen works best to bring it in?`,
            options: [
              { label: 'Tomorrow', value: 'tomorrow' },
              { label: 'This week', value: 'this-week' },
              { label: 'Next week', value: 'next-week' },
            ],
          };
          setChatStep('timing');
          break;
          
        default:
          botResponse = {
            id: `bot-${Date.now()}`,
            type: 'bot',
            content: "Thanks for sharing! Is there anything specific I can help you with today?",
            options: [
              { label: '🗓️ Schedule Service', value: 'schedule' },
              { label: '📍 Hours & Location', value: 'hours' },
              { label: '💬 Talk to a Human', value: 'human' },
            ],
          };
      }

      setChatMessages(prev => [...prev, botResponse]);
    }, 1200);
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
      'privacy': '/privacy',
      'cookies': '/cookies',
      'terms': '/terms',
      'data-rights': '/data-rights',
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
        {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
        
        {/* Service Detail Pages */}
        {currentPage === 'service-oil' && SERVICE_DETAILS['service-oil'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-oil']} />
        )}
        {currentPage === 'service-brakes' && SERVICE_DETAILS['service-brakes'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-brakes']} />
        )}
        {currentPage === 'service-engine' && SERVICE_DETAILS['service-engine'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-engine']} />
        )}
        {currentPage === 'service-transmission' && SERVICE_DETAILS['service-transmission'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-transmission']} />
        )}
        {currentPage === 'service-tires' && SERVICE_DETAILS['service-tires'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-tires']} />
        )}
        {currentPage === 'service-ac' && SERVICE_DETAILS['service-ac'] && (
          <ServiceDetailPage navigateTo={navigateTo} service={SERVICE_DETAILS['service-ac']} />
        )}
        
        {/* About & Contact Pages */}
        {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactPage navigateTo={navigateTo} />}
        
        {/* Legal Pages */}
        {currentPage === 'privacy' && <PrivacyPage navigateTo={navigateTo} />}
        {currentPage === 'cookies' && <CookiesPage navigateTo={navigateTo} />}
        {currentPage === 'terms' && <TermsPage navigateTo={navigateTo} />}
        {currentPage === 'data-rights' && <DataRightsPage navigateTo={navigateTo} />}
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
