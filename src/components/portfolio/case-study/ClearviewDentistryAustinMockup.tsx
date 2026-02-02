/**
 * @fileoverview Clearview Dentistry Austin Interactive Mockup
 * @module components/portfolio/case-study/ClearviewDentistryAustinMockup
 * 
 * Following Desert Cool Air pattern exactly:
 * - macOS browser chrome with gradient
 * - Dark navigation header
 * - Proper hero with background image (not solid color overlay)
 * - AI chatbot with dental-focused conversation
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, Star, 
  MessageCircle, Send, ChevronRight, ChevronLeft, Check, Heart,
  Shield, Calendar, Users, Sparkles, CheckCircle2, Smile, Zap,
  Linkedin, Twitter, Facebook
} from 'lucide-react';

// Brand colors - calming teal/cyan for dental
const COLORS = {
  primary: '#0D9488',
  primaryDark: '#0F766E',
  accent: '#0EA5E9',
  charcoal: '#1E293B',
  darkGray: '#334155',
  white: '#FFFFFF',
  cream: '#FAFAF9',
};

// Image URLs from Unsplash - warm, inviting, anxiety-friendly dental aesthetic
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80', // Warm modern dental office reception
  drChen: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80', // Female doctor portrait
  hygienist: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80', // Female healthcare worker
  receptionist: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80', // Professional woman
  serviceGeneral: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80', // Friendly dentist consultation
  serviceCosmetic: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&q=80', // Happy patient smile
  serviceInvisalign: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80', // Clean dental office
  servicePediatric: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80', // Happy child smiling
  serviceEmergency: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80', // Medical professional ready to help
  serviceWhitening: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800&q=80', // Bright confident smile
  patient1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', // Woman portrait
  patient2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Man portrait
  patient3: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80', // Friendly woman smiling
  officeInterior: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80', // Beautiful modern dental interior
  waitingRoom: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80', // Waiting room
  family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80', // Happy family
  // Service Detail Heroes - warm, inviting dental aesthetic
  serviceGeneralHero: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1200&q=80', // Warm dental office
  serviceCosmeticHero: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=1200&q=80', // Happy patient
  serviceInvisalignHero: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=1200&q=80', // Confident smile
  servicePediatricHero: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80', // Happy child
  serviceEmergencyHero: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80', // Medical professional
  serviceWhiteningHero: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=1200&q=80', // Bright smile
  dentistConsultation: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80', // Consultation
  happyPatient: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&q=80', // Happy patient
};

// Types
type MockupPage = 'home' | 'services' | 'service-general' | 'service-cosmetic' | 'service-invisalign' | 'service-pediatric' | 'service-emergency' | 'service-whitening' | 'about' | 'new-patients' | 'contact' | 'privacy' | 'cookies' | 'terms' | 'data-rights';

// Service data for hub and detail pages
const SERVICES = [
  { id: 'service-general' as MockupPage, name: 'General Dentistry', img: IMAGES.serviceGeneral, desc: 'Checkups, cleanings, and preventive care' },
  { id: 'service-cosmetic' as MockupPage, name: 'Cosmetic Dentistry', img: IMAGES.serviceCosmetic, desc: 'Veneers, bonding, and smile makeovers' },
  { id: 'service-invisalign' as MockupPage, name: 'Invisalign', img: IMAGES.serviceInvisalign, desc: 'Clear aligners for a straighter smile' },
  { id: 'service-pediatric' as MockupPage, name: 'Pediatric Dentistry', img: IMAGES.servicePediatric, desc: 'Gentle care for your little ones' },
  { id: 'service-emergency' as MockupPage, name: 'Emergency Care', img: IMAGES.serviceEmergency, desc: 'Same-day appointments available' },
  { id: 'service-whitening' as MockupPage, name: 'Teeth Whitening', img: IMAGES.serviceWhitening, desc: 'Professional brightening treatments' },
];

type ChatStep = 
  | 'initial' 
  | 'patient-type'
  | 'anxiety-check'
  | 'anxiety-response'
  | 'sedation-info'
  | 'service-type' 
  | 'scheduling'
  | 'scheduling-next'
  | 'time-select-tue'
  | 'time-select-thu'
  | 'contact-info'
  | 'confirmed'
  | 'emergency'
  | 'emergency-urgent'
  | 'end';

interface QuickReply {
  label: string;
  value: string;
  nextStep: ChatStep;
  timeData?: { day: string; time: string };
}

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  quickReplies?: QuickReply[];
}

// Navigation items - Desktop excludes Home (logo navigates) and Contact (CTA handles)
const desktopNavItems = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'Meet Dr. Chen' },
  { id: 'new-patients', label: 'New Patients' },
] as const;

// Mobile nav includes Home but excludes Contact (CTA handles)
const mobileNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'Meet Dr. Chen' },
  { id: 'new-patients', label: 'New Patients' },
] as const;

// ============================================
// PAGE COMPONENTS
// ============================================

// Home Page Component
const HomePage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero Section - fills viewport: container (500/600/700) - chrome (40) - header (56) */}
    <div className="relative h-[404px] md:h-[504px] lg:h-[604px] overflow-hidden">
      <img 
        src={IMAGES.hero} 
        alt="Clearview Dentistry Austin"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      
      <div className="relative px-6 sm:px-10 py-12 sm:py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 w-fit mb-5">
            <Heart className="w-4 h-4 text-[#0D9488]" />
            <span className="text-white/90 text-xs font-medium">Anxiety-Free Dentistry</span>
          </div>
          
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 leading-[1.1]">
            Gentle Care for Your
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-[1.1]">
            <span className="text-[#0D9488]">Whole Family</span>
          </h1>
          
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-md">
            Austin's trusted choice for anxiety-friendly dentistry since 2012. Sedation available for nervous patients.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Your Smile Consultation
            </button>
            <button 
              onClick={() => navigateTo('new-patients')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm transition-all border border-white/30"
            >
              New Patient Special
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* New Patient Special Banner */}
    <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0D9488] text-white px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5" />
          <div>
            <p className="font-bold text-sm">New Patient Special: $99</p>
            <p className="text-xs text-white/90">Includes exam, X-rays & cleaning</p>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white text-[#0D9488] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Claim Offer
        </button>
      </div>
    </div>

    {/* Services Preview */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Our Services</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Comprehensive care for every smile</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { id: 'service-general' as MockupPage, name: 'General Dentistry', img: IMAGES.serviceGeneral, desc: 'Checkups & cleanings' },
          { id: 'service-cosmetic' as MockupPage, name: 'Cosmetic Dentistry', img: IMAGES.serviceCosmetic, desc: 'Smile makeovers' },
          { id: 'service-invisalign' as MockupPage, name: 'Invisalign', img: IMAGES.serviceInvisalign, desc: 'Clear aligners' },
          { id: 'service-pediatric' as MockupPage, name: 'Pediatric', img: IMAGES.servicePediatric, desc: 'Care for little ones' },
          { id: 'service-emergency' as MockupPage, name: 'Emergency Care', img: IMAGES.serviceEmergency, desc: 'Same-day available' },
          { id: 'service-whitening' as MockupPage, name: 'Whitening', img: IMAGES.serviceWhitening, desc: 'Brighten your smile' },
        ].map((service) => (
          <div 
            key={service.id} 
            onClick={() => navigateTo(service.id)}
            className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="relative h-24 overflow-hidden">
              <img src={service.img} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm">{service.name}</h3>
              <p className="text-gray-500 text-xs">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button 
          onClick={() => navigateTo('services')}
          className="text-[#0D9488] font-semibold text-sm hover:underline inline-flex items-center gap-1"
        >
          View All Services <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Why Choose Us */}
    <div className="bg-gray-50 px-6 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Why Choose Clearview?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Heart, label: 'Gentle Care', desc: 'Anxiety-free approach' },
          { icon: Users, label: 'Family Friendly', desc: 'All ages welcome' },
          { icon: Shield, label: 'Insurance Accepted', desc: 'Most plans welcome' },
          { icon: Calendar, label: 'Flexible Hours', desc: 'Saturday available' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-3">
              <item.icon className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">{item.label}</h3>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Meet Dr. Chen */}
    <div className="bg-white px-6 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img 
          src={IMAGES.drChen} 
          alt="Dr. Sarah Chen" 
          className="w-32 h-32 rounded-2xl object-cover shadow-lg"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Meet Dr. Sarah Chen</h2>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
            Dr. Chen has been creating beautiful smiles in Austin since 2012. 
            She specializes in anxiety-free dentistry and believes everyone deserves 
            to feel comfortable in the dental chair.
          </p>
          <button 
            onClick={() => navigateTo('about')}
            className="text-[#0D9488] font-semibold text-sm hover:underline inline-flex items-center gap-1"
          >
            Get to Know Us <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div className="bg-gray-50 px-6 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">What Our Patients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Jennifer M.', img: IMAGES.patient1, quote: 'I used to dread the dentist. Now I actually look forward to my visits!' },
          { name: 'Robert T.', img: IMAGES.patient2, quote: 'Dr. Chen and her team made my kids feel so comfortable.' },
          { name: 'Patricia L.', img: IMAGES.patient3, quote: 'The best dental experience I\'ve had in 40 years.' },
        ].map((testimonial, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={testimonial.img} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                <div className="flex text-yellow-400 text-xs">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Services Hub Page Component
const ServicesPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero with background image */}
    <div className="relative h-48 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.officeInterior})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/90 via-[#1E293B]/70 to-[#1E293B]/50" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Our Dental Services</h1>
        <p className="text-white/80 text-sm">Comprehensive care for every member of your family</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SERVICES.map((service) => (
          <div 
            key={service.id}
            onClick={() => navigateTo(service.id)}
            className="flex gap-4 items-start bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group border border-transparent hover:border-[#0D9488]/20"
          >
            <img src={service.img} alt={service.name} className="w-20 h-20 rounded-lg object-cover shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#0D9488] transition-colors">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{service.desc}</p>
              <span className="text-[#0D9488] font-semibold text-sm inline-flex items-center gap-1">
                Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* CTA */}
      <div className="mt-8 bg-[#0D9488]/10 rounded-xl p-6 text-center">
        <h3 className="font-bold text-gray-800 mb-2">Not sure what you need?</h3>
        <p className="text-gray-600 text-sm mb-4">Book a consultation and we'll create a personalized treatment plan.</p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-[#0D9488] text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#0F766E] transition-colors"
        >
          Let's Talk About Your Smile
        </button>
      </div>
    </div>
  </div>
);

// ============================================
// SERVICE DETAIL PAGES
// ============================================

// General Dentistry Detail Page
const ServiceGeneralPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/95 via-[#0D9488]/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Preventive Care</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">General Dentistry</h1>
        <p className="text-white/80 text-sm max-w-lg">The foundation of a lifetime of healthy smiles</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-[#0D9488] text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">15,000+</p><p className="text-white/70 text-xs">Checkups Performed</p></div>
        <div><p className="font-bold text-lg">12 Years</p><p className="text-white/70 text-xs">Serving Austin</p></div>
        <div><p className="font-bold text-lg">98%</p><p className="text-white/70 text-xs">Patient Retention</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is General Dentistry?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">General dentistry is your first line of defense against oral health problems. Regular checkups allow us to catch cavities, gum disease, and other issues before they become painful, expensive problems. At Clearview Dentistry Austin, we believe prevention is the best medicine — most dental emergencies are completely preventable with routine care.</p>
        <p className="text-gray-600 text-sm leading-relaxed">We recommend visits every six months for most patients, though some may benefit from more frequent care based on their individual risk factors. Each visit includes a thorough examination, professional cleaning, and personalized recommendations to keep your smile healthy between appointments.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80" alt="Dental examination" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Dr. Chen performing a comprehensive examination</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What's Included in Your Visit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Comprehensive Oral Exam', desc: 'Thorough evaluation of teeth, gums, bite, and jaw' },
          { title: 'Professional Cleaning', desc: "Remove plaque and tartar buildup you can't reach at home" },
          { title: 'Digital X-Rays', desc: 'Low-radiation imaging to detect hidden problems' },
          { title: 'Oral Cancer Screening', desc: 'Quick, painless check for early warning signs' },
          { title: 'Gum Disease Assessment', desc: 'Measure pocket depths to catch periodontal issues early' },
          { title: 'Personalized Care Plan', desc: 'Custom recommendations based on your unique needs' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-2">What to Expect</h2>
      <p className="text-gray-500 text-sm mb-6">Your visit typically takes about 60 minutes from start to finish.</p>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Warm Welcome', desc: 'Our team greets you by name. Complete digital check-in from your phone — no clipboard chaos.', time: '5 min' },
          { step: '2', title: 'X-Rays (If Needed)', desc: 'Our digital X-rays use 90% less radiation than traditional film and provide instant results.', time: '10 min' },
          { step: '3', title: 'Professional Cleaning', desc: 'Our gentle hygienists remove buildup and polish your teeth to a smooth finish.', time: '30 min' },
          { step: '4', title: "Dr. Chen's Exam", desc: 'A comprehensive look at your oral health with clear explanations — no jargon, no judgment.', time: '15 min' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0D9488]/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Clearview for General Dentistry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '😌', title: 'Anxiety-Friendly Environment', desc: 'Sedation options, noise-canceling headphones, and a judgment-free approach for nervous patients' },
          { icon: '🔬', title: 'Advanced Technology', desc: 'Digital X-rays, intraoral cameras, and cavity detection lasers for precise diagnosis' },
          { icon: '⏰', title: 'Respect Your Time', desc: 'We run on schedule. Your appointment starts when we say it will.' },
          { icon: '💬', title: 'Clear Communication', desc: 'We explain everything in plain English and never pressure you into treatments' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Questions About General Dentistry</h2>
      <div className="space-y-4">
        {[
          { q: 'How often should I really come in for a checkup?', a: "For most adults, every 6 months is ideal. However, if you have gum disease, a history of cavities, or certain health conditions, we may recommend every 3-4 months. We'll create a schedule that fits your specific needs." },
          { q: "What if I haven't been to the dentist in years?", a: "You're not alone, and we never judge. We'll take extra time to assess your current situation and create a gentle plan to get you back on track. Many 'catch-up' patients are pleasantly surprised — it's rarely as bad as they feared." },
          { q: 'Do cleanings hurt?', a: "They shouldn't! If you have sensitive teeth or gum inflammation, let us know — we can use numbing gel or adjust our technique. Our hygienists are known for their gentle touch." },
          { q: 'Is it worth it if my teeth feel fine?', a: "Absolutely. Most dental problems don't hurt until they're serious (and expensive). A $150 checkup can prevent a $3,000 root canal. Prevention is always cheaper than treatment." },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-[#0D9488] font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Patients Say About Our Checkups</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Patient" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"I hadn't been to a dentist in 8 years — I was terrified of what they'd find and how I'd be treated. Dr. Chen and her team were so kind and non-judgmental. They explained everything clearly and created a realistic plan to fix things gradually. My general checkups here are actually... pleasant? Never thought I'd say that about the dentist."</p>
            <p className="text-gray-800 font-semibold text-sm">Marcus T.</p>
            <p className="text-gray-500 text-xs">Patient since 2021</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0D9488]/10 to-[#0EA5E9]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">New patient exam, X-rays, and cleaning: <strong>$99</strong> (regularly $350). Returning patients: covered by most insurance or $150-200 out of pocket.</p>
          <p className="text-gray-500 text-xs">We accept most PPO insurance and offer payment plans for uninsured patients.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/80 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Due for a Checkup?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">New patients get a comprehensive exam, full X-rays, and professional cleaning for just $99.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Schedule Your Checkup</button>
        <p className="text-white/60 text-xs mt-4">Same-week appointments usually available</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-whitening' as MockupPage, name: 'Teeth Whitening', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80' },
          { id: 'service-cosmetic' as MockupPage, name: 'Cosmetic Dentistry', img: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Cosmetic Dentistry Detail Page
const ServiceCosmeticPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/95 via-[#0D9488]/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Smile Makeovers</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Cosmetic Dentistry</h1>
        <p className="text-white/80 text-sm max-w-lg">Confidence starts with a smile you love</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-[#0D9488] text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">2,500+</p><p className="text-white/70 text-xs">Smile Makeovers</p></div>
        <div><p className="font-bold text-lg">4.9 ★</p><p className="text-white/70 text-xs">Star Rating</p></div>
        <div><p className="font-bold text-lg">95%</p><p className="text-white/70 text-xs">Would Recommend</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is Cosmetic Dentistry?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">Cosmetic dentistry focuses on improving the appearance of your smile — the color, shape, size, and alignment of your teeth. At Clearview, we combine artistry with advanced dental techniques to create natural-looking results. Whether you want to fix a single chipped tooth or completely transform your smile, we'll design a personalized plan that fits your goals and budget.</p>
        <p className="text-gray-600 text-sm leading-relaxed">Our approach is conservative — we preserve as much natural tooth structure as possible while achieving dramatic results. Dr. Chen trained in smile design aesthetics and uses digital preview technology so you can see your new smile before any work begins.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&q=80" alt="Beautiful smile result" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Veneer transformation — natural-looking results</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Our Cosmetic Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Digital Smile Design', desc: 'Preview your results before treatment begins' },
          { title: 'Porcelain Veneers', desc: 'Ultra-thin shells for a flawless, natural-looking smile' },
          { title: 'Dental Bonding', desc: 'Quick fixes for chips, cracks, and gaps in one visit' },
          { title: 'Tooth Contouring', desc: 'Subtle reshaping for a more balanced appearance' },
          { title: 'Smile Makeover Planning', desc: 'Comprehensive treatment combining multiple procedures' },
          { title: 'Color Matching Technology', desc: 'Perfect shade matching for seamless restorations' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Your Smile Journey</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Smile Consultation', desc: 'Discuss goals, take photos, explore options together.', time: '30 min' },
          { step: '2', title: 'Digital Design', desc: 'Create a preview of your new smile using advanced software.', time: '1 week' },
          { step: '3', title: 'Preparation', desc: 'Prepare teeth for veneers or bonding with minimal reduction.', time: '1-2 hours' },
          { step: '4', title: 'Final Reveal', desc: 'Place permanent restorations and see your transformation!', time: '2 hours' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0D9488]/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Clearview for Cosmetic Dentistry</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🎨', title: 'Artistic Eye', desc: 'Dr. Chen trained in smile design aesthetics for natural-looking results' },
          { icon: '💻', title: 'See It First', desc: 'Digital previews show your new smile before any work begins' },
          { icon: '🦷', title: 'Conservative Approach', desc: 'We preserve natural tooth structure whenever possible' },
          { icon: '⏱️', title: 'Efficient Timeline', desc: 'Most smile makeovers complete in just 2-3 visits' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Questions About Cosmetic Dentistry</h2>
      <div className="space-y-4">
        {[
          { q: 'How long do veneers last?', a: 'With proper care, porcelain veneers typically last 10-15 years or longer. We use premium materials and precise bonding techniques to maximize longevity.' },
          { q: 'Will cosmetic work look fake?', a: "We specialize in natural-looking results. Dr. Chen studies facial proportions, skin tone, and natural tooth characteristics to create restorations that look like your own teeth — just perfected." },
          { q: 'Is cosmetic dentistry painful?', a: 'Most procedures are minimally invasive with little to no discomfort. We offer sedation options for patients who prefer a more relaxed experience.' },
          { q: "What's the investment?", a: 'Ranges from $300 (bonding per tooth) to $1,200+ (veneers per tooth) to $15,000+ (full smile makeovers). We offer financing to fit any budget.' },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-[#0D9488] font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Patients Say About Our Cosmetic Work</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" alt="Patient" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"I got porcelain veneers for my wedding and I'm SO glad I chose Dr. Chen. She took the time to understand exactly what I wanted and the digital preview was spot-on. My veneers look completely natural — even my mom couldn't tell they weren't my real teeth! Best investment I've ever made in myself."</p>
            <p className="text-gray-800 font-semibold text-sm">Jennifer M.</p>
            <p className="text-gray-500 text-xs">Veneer patient, 2023</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0D9488]/10 to-[#0EA5E9]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">Bonding: <strong>$300-500/tooth</strong> • Veneers: <strong>$1,200-1,800/tooth</strong> • Full makeovers: <strong>$8,000-25,000</strong></p>
          <p className="text-gray-500 text-xs">0% financing available. Free smile consultations include digital preview.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/80 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Ready to Love Your Smile?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Book a free smile consultation and see your transformation before we start.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Book Your Smile Consultation</button>
        <p className="text-white/60 text-xs mt-4">Free digital smile preview included</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-whitening' as MockupPage, name: 'Teeth Whitening', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80' },
          { id: 'service-invisalign' as MockupPage, name: 'Invisalign', img: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Invisalign Detail Page
const ServiceInvisalignPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/95 via-[#0D9488]/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Clear Aligners</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Invisalign</h1>
        <p className="text-white/80 text-sm max-w-lg">Straighter teeth without the metal</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-[#0D9488] text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">500+</p><p className="text-white/70 text-xs">Cases Completed</p></div>
        <div><p className="font-bold text-lg">Preferred</p><p className="text-white/70 text-xs">Provider Status</p></div>
        <div><p className="font-bold text-lg">12-18 mo</p><p className="text-white/70 text-xs">Average Treatment</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is Invisalign?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">Invisalign uses a series of clear, removable aligners to gradually straighten your teeth — no metal brackets or wires required. At Clearview, Dr. Chen is an Invisalign Preferred Provider, meaning she's completed advanced training and treats a high volume of cases. This experience translates to better treatment planning and faster results for you.</p>
        <p className="text-gray-600 text-sm leading-relaxed">The aligners are virtually invisible, so most people won't even notice you're straightening your teeth. You can remove them to eat, drink, brush, and floss — making it easier to maintain great oral hygiene throughout treatment.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800&q=80" alt="Clear aligners" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Custom-made clear aligners — virtually invisible</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What's Included in Your Treatment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: '3D iTero Scan', desc: 'No goopy impressions — fast, comfortable digital scanning' },
          { title: 'ClinCheck Treatment Preview', desc: 'See your predicted results before you commit' },
          { title: 'Full Set of Custom Aligners', desc: 'Precision-manufactured just for your teeth' },
          { title: 'Refinement Aligners', desc: 'Additional aligners if needed for perfect results' },
          { title: 'Retainers After Treatment', desc: 'Maintain your new smile for years to come' },
          { title: 'Unlimited Office Visits', desc: 'Check-ins throughout treatment at no extra cost' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Your Invisalign Journey</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Free Consultation', desc: 'We scan your teeth and discuss your smile goals.', time: '30 min' },
          { step: '2', title: 'Treatment Plan', desc: 'Review your 3D simulation and approve your custom plan.', time: '1-2 weeks' },
          { step: '3', title: 'Aligners Delivered', desc: 'Pick up your first set and learn how to use them.', time: '2 weeks' },
          { step: '4', title: 'Progress Checks', desc: 'Quick visits every 6-8 weeks to ensure you are on track.', time: 'Ongoing' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0D9488]/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Clearview for Invisalign</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🏅', title: 'Preferred Provider', desc: '500+ cases completed with advanced Invisalign certification' },
          { icon: '📱', title: 'Virtual Check-ins', desc: 'Monitor your progress from home between office visits' },
          { icon: '⚡', title: 'Accelerated Options', desc: 'Propel technology available for faster tooth movement' },
          { icon: '💵', title: 'Flexible Payment', desc: '0% financing available — fits most budgets' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Questions About Invisalign</h2>
      <div className="space-y-4">
        {[
          { q: 'Am I a candidate for Invisalign?', a: 'Most adults and teens are candidates. Invisalign treats crowding, spacing, overbites, underbites, and crossbites. A free scan will confirm if it is right for you.' },
          { q: 'How long does treatment take?', a: 'Average treatment is 12-18 months, but some cases finish in as few as 6 months. Complex cases may take longer. We will give you a specific timeline at your consultation.' },
          { q: 'Does Invisalign hurt?', a: 'You may feel mild pressure when switching to new aligners — this means it is working. Most patients describe it as minor discomfort, not pain.' },
          { q: 'Can I eat normally?', a: 'Yes! Remove your aligners to eat and drink anything. Just wear them 20-22 hours per day for best results.' },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-[#0D9488] font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Patients Say About Invisalign</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" alt="Patient" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"I'm a sales executive and couldn't have metal braces. Invisalign was perfect — my clients never even noticed I was straightening my teeth! The whole process was so easy, and now I have the smile I always wanted. Dr. Chen made it completely painless."</p>
            <p className="text-gray-800 font-semibold text-sm">Michael R.</p>
            <p className="text-gray-500 text-xs">Invisalign patient, completed 2023</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0D9488]/10 to-[#0EA5E9]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">Invisalign treatment: <strong>$3,500-6,000</strong> depending on complexity. Includes all aligners, refinements, and retainers.</p>
          <p className="text-gray-500 text-xs">Most dental insurance covers Invisalign same as braces. 0% financing available.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/80 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Am I a Candidate?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Find out in minutes with a free consultation and 3D smile preview.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Get Your Free Scan</button>
        <p className="text-white/60 text-xs mt-4">No obligation — see your results first</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-cosmetic' as MockupPage, name: 'Cosmetic Dentistry', img: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&q=80' },
          { id: 'service-whitening' as MockupPage, name: 'Teeth Whitening', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Pediatric Dentistry Detail Page
const ServicePediatricPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/95 via-[#0D9488]/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Kids Dentistry</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Pediatric Dentistry</h1>
        <p className="text-white/80 text-sm max-w-lg">Building healthy habits that last a lifetime</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-[#0D9488] text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">3,000+</p><p className="text-white/70 text-xs">Kids Treated</p></div>
        <div><p className="font-bold text-lg">Kid-Approved</p><p className="text-white/70 text-xs">Fun Environment</p></div>
        <div><p className="font-bold text-lg">Ages 1-17</p><p className="text-white/70 text-xs">Welcome Here</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is Pediatric Dentistry?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">Your child's first dental experiences shape their relationship with oral health for life. At Clearview, we specialize in making dentistry fun, not scary. Our kid-friendly office features ceiling-mounted TVs, a treasure chest, and team members trained to work with children of all temperaments — including those who are nervous or have special needs.</p>
        <p className="text-gray-600 text-sm leading-relaxed">We believe every child deserves positive dental experiences. When kids enjoy their visits, they develop healthy habits that last a lifetime. We never force, rush, or shame — just patient, gentle care at their pace.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80" alt="Happy child at dentist" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Making dental visits fun for every child</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Our Pediatric Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'First Dental Visit', desc: 'Gentle intro for ages 1-3, building comfort early' },
          { title: 'Kid-Friendly Checkups', desc: 'Age-appropriate exams with fun explanations' },
          { title: 'Gentle Cleanings', desc: 'Patient hygienists who specialize in children' },
          { title: 'Fluoride Treatments', desc: 'Extra cavity protection for developing teeth' },
          { title: 'Dental Sealants', desc: 'Protective coating for molars — quick and painless' },
          { title: 'Cavity Treatment', desc: 'Gentle fillings with sedation options if needed' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What to Expect at Your Child's Visit</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Happy Visit Tour', desc: 'For first-timers: explore the office, meet the team, ride the chair up and down!', time: '10 min' },
          { step: '2', title: 'Gentle Exam', desc: 'Dr. Chen counts teeth using kid-friendly language. No scary words!', time: '10 min' },
          { step: '3', title: 'Cleaning & Fluoride', desc: 'Our hygienists use the "tickle brush" and "tooth vitamins" for protection.', time: '15 min' },
          { step: '4', title: 'Treasure Chest', desc: 'The best part — every brave kid picks a prize!', time: '5 min' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0D9488]/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Kids Love Clearview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🎈', title: 'Kid-Friendly Environment', desc: 'Ceiling TVs, games, prizes — designed to make visits fun' },
          { icon: '👶', title: 'Trained for All Ages', desc: 'From first tooth through braces — we grow with your child' },
          { icon: '😰', title: 'Anxiety Specialists', desc: 'Special techniques for nervous kids — we never force or rush' },
          { icon: '👨‍👩‍👧', title: 'Parents Welcome', desc: 'Stay with your child the entire visit if you prefer' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Questions From Parents</h2>
      <div className="space-y-4">
        {[
          { q: 'When should my child first visit the dentist?', a: 'The American Academy of Pediatric Dentistry recommends a first visit by age 1 or when the first tooth appears. Early visits prevent problems and build comfort.' },
          { q: 'What if my child is scared?', a: "We go slow, use kid-friendly language, and never force anything. Many 'scared' kids become our biggest fans after a few gentle visits." },
          { q: 'Are sealants worth it?', a: 'Absolutely! Sealants reduce cavities in molars by up to 80%. They are quick, painless, and covered by most insurance. Great investment.' },
          { q: 'Do you see children with special needs?', a: 'Yes! Dr. Chen has extra training for children with autism, sensory issues, and other special needs. We adapt our approach for every child.' },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-[#0D9488] font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Parents Say About Our Pediatric Care</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" alt="Parent" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"My daughter used to cry at every dental appointment. After switching to Clearview for her pediatric care, she actually asks when her next visit is! Dr. Chen and her team are magic with kids. They never rushed her, and now she's proud of her 'no cavity' streak."</p>
            <p className="text-gray-800 font-semibold text-sm">Sarah T.</p>
            <p className="text-gray-500 text-xs">Austin mom of 3</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0D9488]/10 to-[#0EA5E9]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">Kids checkup & cleaning: <strong>$75-150</strong> • Sealants: <strong>$30-50/tooth</strong> • Most services covered by dental insurance.</p>
          <p className="text-gray-500 text-xs">We accept most PPO plans and offer family discounts for multiple children.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/80 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Ready to Start Their Smile Journey?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Give your child the gift of positive dental experiences.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Schedule Your Child's First Visit</button>
        <p className="text-white/60 text-xs mt-4">Happy visits lead to healthy smiles</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-general' as MockupPage, name: 'General Dentistry', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80' },
          { id: 'service-emergency' as MockupPage, name: 'Emergency Care', img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Emergency Care Detail Page
const ServiceEmergencyPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/95 via-red-600/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-red-200 text-xs font-medium uppercase tracking-wider mb-1">Urgent Care</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Emergency Dentistry</h1>
        <p className="text-white/80 text-sm max-w-lg">Same-day relief when you need it most</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-red-600 text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">Same-Day</p><p className="text-white/70 text-xs">Appointments</p></div>
        <div><p className="font-bold text-lg">Open Sat</p><p className="text-white/70 text-xs">9am-2pm</p></div>
        <div><p className="font-bold text-lg">After-Hours</p><p className="text-white/70 text-xs">Emergency Line</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is Emergency Dentistry?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">Dental emergencies don't wait for convenient timing. Whether it's a knocked-out tooth, severe toothache, broken crown, or infection, Clearview keeps emergency slots open every day for patients who need immediate care. If you're in pain, call us — we'll get you in today.</p>
        <p className="text-gray-600 text-sm leading-relaxed">We treat both existing patients and new patients experiencing emergencies. You don't need to suffer through the weekend — we're here to help.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" alt="Emergency care" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Our team is ready for your dental emergency</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What We Treat</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Severe Toothaches', desc: 'Intense, persistent pain requiring immediate relief' },
          { title: 'Knocked-Out Teeth', desc: 'Time-sensitive — best saved within 30 minutes' },
          { title: 'Broken or Cracked Teeth', desc: 'From injury, biting hard objects, or trauma' },
          { title: 'Lost Crowns or Fillings', desc: 'Exposed tooth needs protection from sensitivity' },
          { title: 'Abscess or Infection', desc: 'Swelling that can spread if untreated' },
          { title: 'Bleeding That Won\'t Stop', desc: 'After extraction or injury, persistent bleeding' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">!</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Happens When You Call</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Call Us', desc: 'Describe your symptoms — we triage by urgency and get you scheduled.', time: 'Immediate' },
          { step: '2', title: 'Same-Day Visit', desc: 'We reserve emergency slots daily. Most patients seen within hours.', time: '1-3 hours' },
          { step: '3', title: 'Pain Relief First', desc: 'We address your discomfort before anything else.', time: '15 min' },
          { step: '4', title: 'Treatment Plan', desc: 'Fix the problem or stabilize for follow-up care.', time: 'Varies' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-red-500/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Clearview for Emergencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🚨', title: 'True Same-Day Care', desc: 'Emergency slots held daily — not "next week"' },
          { icon: '📞', title: 'After-Hours Access', desc: 'Real person answers, not endless voicemail' },
          { icon: '💊', title: 'Pain-First Approach', desc: 'We address discomfort before anything else' },
          { icon: '🏥', title: 'Full-Service Office', desc: 'Most emergencies handled in-house, no referrals' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Emergency FAQs</h2>
      <div className="space-y-4">
        {[
          { q: 'What counts as a dental emergency?', a: 'Severe pain, swelling, trauma, knocked-out tooth, broken restoration, or bleeding that won\'t stop. When in doubt, call — we\'ll help you decide.' },
          { q: 'Do you see non-patients for emergencies?', a: 'Yes! Dental emergencies are welcome regardless of patient history. We will get you out of pain first, then discuss ongoing care.' },
          { q: 'How fast can I be seen?', a: 'Usually same day, often within hours. We reserve emergency slots every day specifically for urgent cases.' },
          { q: 'What if it is after hours?', a: 'Call our main number — it forwards to an emergency line. A real person will help you determine next steps.' },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-red-600 font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Patients Say About Our Emergency Care</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" alt="Patient" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"I broke a tooth on a Saturday morning — total panic. I called Clearview expecting to leave a message, but a real person answered! They got me in within 2 hours, fixed my emergency tooth, and I was home by lunch. Absolutely saved my weekend (and my sanity)."</p>
            <p className="text-gray-800 font-semibold text-sm">David K.</p>
            <p className="text-gray-500 text-xs">Emergency patient, 2023</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl p-6 border border-red-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">Emergency exam: <strong>$75-150</strong> • Treatment varies by need. We will give you costs before any work begins.</p>
          <p className="text-gray-500 text-xs">Most insurance accepted. Payment plans available for unexpected expenses.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-red-600 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <Phone className="w-8 h-8 mx-auto mb-3 animate-pulse" />
        <h3 className="text-xl font-bold mb-2">Dental Emergency? Call Now</h3>
        <p className="text-red-100 text-sm mb-6 max-w-sm mx-auto">We're here to help. Same-day appointments available.</p>
        <a href="tel:5125550123" className="inline-block bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Call (512) 555-0123</a>
        <p className="text-white/60 text-xs mt-4">After-hours emergencies: same number</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-general' as MockupPage, name: 'General Dentistry', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80' },
          { id: 'service-pediatric' as MockupPage, name: 'Pediatric Dentistry', img: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Teeth Whitening Detail Page
const ServiceWhiteningPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* HERO */}
    <div className="relative h-64 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/95 via-[#0D9488]/75 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/60 text-xs mb-4 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> All Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Brightening</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Teeth Whitening</h1>
        <p className="text-white/80 text-sm max-w-lg">A brighter smile in just one visit</p>
      </div>
    </div>
    
    {/* STATS BAR */}
    <div className="bg-[#0D9488] text-white px-6 py-4">
      <div className="flex justify-around text-center">
        <div><p className="font-bold text-lg">Up to 8</p><p className="text-white/70 text-xs">Shades Lighter</p></div>
        <div><p className="font-bold text-lg">1 Hour</p><p className="text-white/70 text-xs">Treatment Time</p></div>
        <div><p className="font-bold text-lg">1-2 Years</p><p className="text-white/70 text-xs">Results Last</p></div>
      </div>
    </div>
    
    {/* OVERVIEW */}
    <div className="px-6 py-8 bg-white">
      <div className="max-w-2xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">What is Professional Teeth Whitening?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">Professional teeth whitening delivers dramatically better results than drugstore strips — faster, more even, and longer-lasting. At Clearview, we offer both in-office whitening (results in one hour) and custom take-home trays (gradual brightening over 2 weeks). We'll help you choose the option that fits your timeline and sensitivity level.</p>
        <p className="text-gray-600 text-sm leading-relaxed">Coffee, wine, tea, aging — they all take a toll on your smile's brightness. Our professional treatments use higher concentrations with expert supervision for safe, effective brightening without damaging your enamel.</p>
      </div>
    </div>
    
    {/* VISUAL BREAK */}
    <div className="px-6">
      <div className="relative rounded-2xl overflow-hidden h-48">
        <img src="https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=800&q=80" alt="Bright smile" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-4 left-4 text-white text-sm font-medium">Professional whitening — safe, effective, lasting results</p>
      </div>
    </div>
    
    {/* WHAT'S INCLUDED */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What's Included (In-Office Treatment)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Pre-Whitening Exam', desc: 'Ensure your teeth are healthy and ready for whitening' },
          { title: 'Professional-Grade Gel', desc: 'Stronger concentration than anything over-the-counter' },
          { title: 'LED Acceleration Light', desc: 'Speeds up the whitening process for faster results' },
          { title: 'Sensitivity Management', desc: 'Desensitizing treatment to minimize discomfort' },
          { title: 'Shade Documentation', desc: 'Before/after comparison so you can see the difference' },
          { title: 'Touch-Up Kit', desc: 'Take-home supplies to maintain your results' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
            <div><h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3><p className="text-gray-500 text-xs">{item.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
    
    {/* PROCESS */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">In-Office Whitening Process</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Shade Assessment', desc: 'Document your starting color for comparison.', time: '5 min' },
          { step: '2', title: 'Preparation', desc: 'Protect your gums and apply whitening gel.', time: '10 min' },
          { step: '3', title: 'Whitening Cycles', desc: '3 rounds with LED light for maximum results.', time: '45 min' },
          { step: '4', title: 'Reveal & Aftercare', desc: 'Compare results and get tips to maintain brightness.', time: '5 min' },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < arr.length - 1 && <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0D9488]/30 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold text-gray-800">{item.title}</h3><span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span></div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* WHY CHOOSE US */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Professional Whitening</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '⚡', title: 'Instant Results', desc: 'Walk out 4-8 shades lighter in just one hour' },
          { icon: '😬', title: 'Sensitivity Solutions', desc: 'Desensitizing treatments before, during, and after' },
          { icon: '🎯', title: 'Even Coverage', desc: 'Professional application beats strips every time' },
          { icon: '🏠', title: 'Take-Home Option', desc: 'Custom trays for gradual whitening at home' },
        ].map((item, i) => (
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
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Questions About Whitening</h2>
      <div className="space-y-4">
        {[
          { q: 'How white will my teeth get?', a: 'Depends on your starting shade, but most patients see 4-8 shades lighter. We will give you realistic expectations at your consultation.' },
          { q: 'Does whitening hurt?', a: 'Some sensitivity is normal and temporary. We use desensitizing agents and can adjust intensity based on your comfort level.' },
          { q: 'How long do results last?', a: '1-2 years with proper care. Avoid staining foods/drinks and use touch-up trays as needed to maintain brightness.' },
          { q: 'Will it work on crowns or veneers?', a: 'No — whitening only works on natural teeth. But we can help you match restorations to your new, brighter shade.' },
        ].map((faq, i) => (
          <div key={i} className="bg-[#FAFAF9] rounded-xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-start gap-2"><span className="text-[#0D9488] font-bold">Q:</span>{faq.q}</h3>
            <p className="text-gray-600 text-sm pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* TESTIMONIAL */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Patients Say About Our Whitening</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" alt="Patient" className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
          <div>
            <div className="flex text-yellow-400 text-sm mb-2">★★★★★</div>
            <p className="text-gray-700 text-sm italic mb-3">"I got my teeth whitened before my wedding and WOW. I went 6 shades lighter in one hour! My teeth looked amazing in every photo. The whitening was so worth it — I only wish I'd done it sooner. Dr. Chen made sure I had zero sensitivity too."</p>
            <p className="text-gray-800 font-semibold text-sm">Amanda L.</p>
            <p className="text-gray-500 text-xs">Whitening patient, 2023</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* PRICING */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0D9488]/10 to-[#0EA5E9]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0D9488] text-white flex items-center justify-center flex-shrink-0"><span className="text-xl">💰</span></div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Investment & Value</h3>
          <p className="text-gray-600 text-sm mb-2">In-office whitening: <strong>$399</strong> • Take-home trays: <strong>$299</strong> • Combo package available.</p>
          <p className="text-gray-500 text-xs">Ask about our special offers — we frequently run whitening promotions.</p>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/80 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Ready for a Brighter Smile?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">See dramatic results in just one hour.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Get a Brighter Smile Today</button>
        <p className="text-white/60 text-xs mt-4">Ask about current whitening specials</p>
      </div>
    </div>
    
    {/* RELATED SERVICES */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[
          { id: 'service-cosmetic' as MockupPage, name: 'Cosmetic Dentistry', img: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&q=80' },
          { id: 'service-general' as MockupPage, name: 'General Dentistry', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80' },
        ].map(service => (
          <div key={service.id} onClick={() => navigateTo(service.id)} className="flex-shrink-0 w-44 bg-[#FAFAF9] rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-sm">{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// About Page Component
const AboutPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div 
      className="relative h-48 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.officeInterior})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/90 to-[#1E293B]/70" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        <h1 className="text-2xl font-bold text-white mb-2">Meet Dr. Sarah Chen</h1>
        <p className="text-white/80 text-sm">Creating beautiful smiles in Austin since 2012</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      {/* Dr. Chen Bio */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img src={IMAGES.drChen} alt="Dr. Sarah Chen" className="w-full md:w-48 h-48 rounded-xl object-cover shadow-lg" />
        <div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Dr. Sarah Chen knew she wanted to be a dentist at age 12, when her own orthodontist transformed her smile and her confidence. After graduating from UT Health San Antonio School of Dentistry, she completed advanced training in sedation dentistry — because she believes everyone deserves comfortable care, especially those who've had negative experiences in the past.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            When she's not in the office, Dr. Chen enjoys hiking the Austin greenbelts, trying new restaurants on South Congress, and spending time with her two rescue dogs, Mochi and Boba.
          </p>
        </div>
      </div>
      
      {/* Credentials */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Credentials</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• UT Health San Antonio School of Dentistry</li>
          <li>• Advanced Sedation Dentistry Certification</li>
          <li>• Invisalign Preferred Provider</li>
          <li>• Member, American Dental Association</li>
          <li>• Member, Texas Dental Association</li>
        </ul>
      </div>
      
      {/* Care Philosophy */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Our Care Philosophy</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          We believe dental care should never be scary. Every patient deserves to feel heard, respected, and comfortable. That's why we take extra time with anxious patients, explain every procedure in plain language, and never pressure you into treatments you don't need.
        </p>
      </div>
      
      {/* Team */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Meet Our Team</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Maria', role: 'Dental Hygienist', img: IMAGES.hygienist },
            { name: 'Ashley', role: 'Patient Coordinator', img: IMAGES.receptionist },
          ].map((member, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
              <img src={member.img} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
              <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
              <p className="text-gray-500 text-xs">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Office Photos */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Our Office</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <img src={IMAGES.officeInterior} alt="Treatment room" className="w-full h-24 rounded-lg object-cover" />
            <p className="text-xs text-gray-500 mt-1 text-center">Modern treatment rooms</p>
          </div>
          <div>
            <img src={IMAGES.waitingRoom} alt="Waiting area" className="w-full h-24 rounded-lg object-cover" />
            <p className="text-xs text-gray-500 mt-1 text-center">Comfortable waiting area</p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="text-center">
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-[#0D9488] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#0F766E] transition-colors"
        >
          Book Your First Visit
        </button>
      </div>
    </div>
  </div>
);

// New Patients Page Component
const NewPatientsPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] text-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Welcome to Clearview Dentistry Austin</h1>
      <p className="text-white/80 text-sm">Everything you need to know for your first visit</p>
    </div>
    
    <div className="px-6 py-8 bg-white">
      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0D9488] rounded-2xl p-6 text-white text-center mb-8">
        <p className="text-4xl font-bold mb-1">$99 New Patient Special</p>
        <p className="text-white/90 text-sm mb-4">Includes comprehensive exam, full set of X-rays, and professional cleaning</p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white text-[#0D9488] px-6 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors"
        >
          Claim This Offer
        </button>
      </div>
      
      {/* Your First Visit */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4">Your First Visit</h3>
        <div className="space-y-3">
          {[
            'Complete forms online (saves 15 minutes)',
            'Meet Dr. Chen for a comprehensive exam',
            'Review your personalized treatment plan',
            'Schedule follow-up care if needed'
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#0D9488] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {i + 1}
              </div>
              <p className="text-gray-700 text-sm">{step}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Patient Forms */}
      <div className="bg-gray-50 rounded-xl p-4 mb-8">
        <h3 className="font-bold text-gray-800 mb-2">Patient Forms</h3>
        <p className="text-gray-600 text-sm mb-3">Save time by completing forms before your visit:</p>
        <div className="space-y-2">
          <a href="#" className="block text-[#0D9488] text-sm hover:underline">📄 New Patient Form (PDF)</a>
          <a href="#" className="block text-[#0D9488] text-sm hover:underline">📄 Medical History (PDF)</a>
        </div>
      </div>
      
      {/* FAQs */}
      <div>
        <h3 className="font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: 'Do you offer sedation for anxious patients?', a: 'Yes! We offer nitrous oxide and oral sedation options.' },
            { q: 'How long is the first appointment?', a: 'Plan for about 60-90 minutes for a thorough exam.' },
            { q: 'Do you see children?', a: 'Yes, we welcome patients ages 3 and up.' },
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-100 pb-3">
              <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
              <p className="text-gray-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Contact Page Component
const ContactPage = () => (
  <div>
    {/* Hero with background image */}
    <div className="relative h-48 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${IMAGES.waitingRoom})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1E293B]/90 via-[#1E293B]/70 to-[#1E293B]/50" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Let's Get You Smiling</h1>
        <p className="text-white/80 text-sm">Book online or give us a call — we can't wait to meet you!</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      {/* Appointment Request Form */}
      <div className="bg-gray-50 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-gray-800 mb-4">Request an Appointment</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30" 
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30" 
          />
          <input 
            type="tel" 
            placeholder="Phone Number" 
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30" 
          />
          <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30">
            <option>Preferred Time</option>
            <option>Morning (8am-12pm)</option>
            <option>Afternoon (12pm-5pm)</option>
            <option>No Preference</option>
          </select>
          <button className="w-full bg-[#0D9488] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#0F766E] transition-colors">
            Request Appointment
          </button>
        </div>
      </div>
      
      {/* Contact Info & Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Contact Info</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0D9488]" /> 1234 Oak Street, Austin, TX 78701</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#0D9488]" /> (512) 555-0123</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#0D9488]" /> hello@clearviewdentistryaustin.com</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-3">Office Hours</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Mon-Thu: 8:00 AM - 5:00 PM</p>
            <p>Friday: 8:00 AM - 3:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
        <MapPin className="w-5 h-5 mr-2" />
        Map Placeholder - View on Google Maps
      </div>
    </div>
  </div>
);

// ============================================
// LEGAL PAGES
// ============================================

// Privacy Policy Page
const PrivacyPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="px-6 py-8 bg-white min-h-screen">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: February 1, 2026</p>
    
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration website operated by EverIntent LLC. 
          "Clearview Dentistry Austin" is a fictional business. No actual dental services are provided.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">About This Site</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This website is a demonstration portfolio piece created by EverIntent LLC to showcase web development and AI automation capabilities. It does not represent a real dental practice.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Information Collection</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This demonstration site does not collect personal information. Any forms displayed are for demonstration purposes only and do not transmit or store data.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Cookies</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This site may use essential cookies for basic functionality. No tracking, advertising, or analytics cookies are used.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">For questions about this portfolio demonstration:</p>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">EverIntent LLC</p>
          <p>2892 N Bellflower Blvd PMB 1018</p>
          <p>Long Beach, CA 90815</p>
          <p>info@everintent.com • (562) 685-9500</p>
        </div>
      </div>
    </div>
  </div>
);

// Cookie Policy Page
const CookiesPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="px-6 py-8 bg-white min-h-screen">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Cookie Policy</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: February 1, 2026</p>
    
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration website operated by EverIntent LLC.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">What Are Cookies?</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Cookies are small text files stored on your device when you visit websites. They help sites remember your preferences and improve functionality.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Cookies We Use</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">
          This demonstration site may use only essential cookies required for basic functionality. We do not use:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
          <li>Tracking cookies</li>
          <li>Advertising cookies</li>
          <li>Analytics cookies</li>
          <li>Third-party cookies</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Managing Cookies</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling cookies may affect site functionality.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">EverIntent LLC</p>
          <p>2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815</p>
          <p>info@everintent.com • (562) 685-9500</p>
        </div>
      </div>
    </div>
  </div>
);

// Terms of Service Page
const TermsPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="px-6 py-8 bg-white min-h-screen">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Terms of Service</h1>
    <p className="text-gray-500 text-sm mb-6">Last updated: February 1, 2026</p>
    
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm">
          ⚠️ DEMO SITE NOTICE: "Clearview Dentistry Austin" is a fictional business created for demonstration purposes only. 
          This website is operated by EverIntent LLC.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Purpose of This Website</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This website exists solely to demonstrate the web development, AI automation, and digital marketing capabilities of EverIntent LLC. No actual dental services are offered, sold, or provided through this site.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Fictional Content</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          All business information, testimonials, reviews, staff members, case studies, and service descriptions on this site are fictional examples created for demonstration purposes. Any resemblance to real dental practices, persons, or events is coincidental.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">3. No Business Relationship</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Viewing this demonstration website does not create any business, contractual, or service relationship. You cannot purchase dental services through this site.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Intellectual Property</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          This demonstration site, including its design, code, and content structure, is the intellectual property of EverIntent LLC. Images are sourced from stock photography providers.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Limitation of Liability</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          EverIntent LLC makes no warranties regarding this demonstration site. We are not liable for any damages arising from viewing or interacting with this site.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Contact</h2>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">EverIntent LLC</p>
          <p>2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815</p>
          <p>info@everintent.com • (562) 685-9500</p>
        </div>
      </div>
    </div>
  </div>
);

// Data Rights Page (CCPA / Do Not Sell My Info)
const DataRightsPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="px-6 py-8 bg-white min-h-screen">
    <button 
      onClick={() => navigateTo('home')} 
      className="text-gray-500 text-sm mb-6 flex items-center gap-1 hover:text-gray-700"
    >
      <ChevronLeft className="w-4 h-4" /> Back to Home
    </button>
    
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Data Rights</h1>
    <p className="text-gray-500 text-sm mb-6">California Consumer Privacy Act (CCPA) & Similar Laws</p>
    
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-sm">
          ⚠️ DEMO SITE NOTICE: This is a portfolio demonstration website. No personal data is collected, sold, or shared.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Do Not Sell My Personal Information</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          EverIntent LLC does not sell personal information. This demonstration site does not collect personal data for sale or sharing with third parties for monetary or other valuable consideration.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Rights Under CCPA</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">If you are a California resident, you have the right to:</p>
        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-2">
          <li>Know what personal information is being collected about you</li>
          <li>Know whether your personal information is sold or disclosed and to whom</li>
          <li>Say no to the sale of personal information</li>
          <li>Access your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Equal service and price, even if you exercise your privacy rights</li>
        </ul>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">How to Exercise Your Rights</h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Since this is a demonstration site that does not collect personal data, there is no data to access, delete, or opt-out of selling. If you have questions about EverIntent LLC's privacy practices for our actual business operations, please contact us.
        </p>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact for Data Requests</h2>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">EverIntent LLC</p>
          <p>2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815</p>
          <p>Email: info@everintent.com</p>
          <p>Phone: (562) 685-9500</p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// FOOTER COMPONENT
// ============================================
const MockupFooter = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <footer className="bg-[#1E293B] text-white">
    {/* 4-COLUMN FOOTER */}
    <div className="px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#0D9488] text-xl">✦</span>
            <span className="font-bold text-lg">Clearview Dentistry Austin</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Gentle care for your whole family since 2012.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-xs font-bold">
              G
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <div className="space-y-2">
            <button onClick={() => navigateTo('home')} className="block text-gray-400 text-sm hover:text-white transition-colors">Home</button>
            <button onClick={() => navigateTo('services')} className="block text-gray-400 text-sm hover:text-white transition-colors">Services</button>
            <button onClick={() => navigateTo('about')} className="block text-gray-400 text-sm hover:text-white transition-colors">About Us</button>
            <button onClick={() => navigateTo('contact')} className="block text-gray-400 text-sm hover:text-white transition-colors">Contact</button>
            <button onClick={() => navigateTo('privacy')} className="block text-gray-400 text-sm hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('terms')} className="block text-gray-400 text-sm hover:text-white transition-colors">Terms of Service</button>
          </div>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-semibold text-white mb-4">Services</h4>
          <div className="space-y-2">
            <button onClick={() => navigateTo('service-general')} className="block text-gray-400 text-sm hover:text-white transition-colors">General Dentistry</button>
            <button onClick={() => navigateTo('service-cosmetic')} className="block text-gray-400 text-sm hover:text-white transition-colors">Cosmetic Dentistry</button>
            <button onClick={() => navigateTo('service-invisalign')} className="block text-gray-400 text-sm hover:text-white transition-colors">Invisalign</button>
            <button onClick={() => navigateTo('service-pediatric')} className="block text-gray-400 text-sm hover:text-white transition-colors">Pediatric Dentistry</button>
            <button onClick={() => navigateTo('service-emergency')} className="block text-gray-400 text-sm hover:text-white transition-colors">Emergency Care</button>
            <button onClick={() => navigateTo('service-whitening')} className="block text-gray-400 text-sm hover:text-white transition-colors">Teeth Whitening</button>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#0D9488] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-medium">(512) 555-0123</p>
                <p className="text-gray-500 text-xs">Same-Day Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
              <p className="text-gray-400 text-sm">info@clearviewdentistryaustin.com</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
              <p className="text-gray-400 text-sm">Austin, TX Metro Area</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* DISCLAIMER SECTION */}
    <div className="bg-[#0F172A] px-6 py-4 text-center space-y-2">
      <p className="text-white/50 text-xs">
        © 2024 Clearview Dentistry Austin. Professional Dental Services in Austin.
      </p>
      <p className="text-white/40 text-[10px] leading-relaxed">
        This website is operated by EverIntent LLC. Services are performed by licensed independent third-party providers in your area.
      </p>

      {/* EverIntent Attribution */}
      <div className="pt-2 border-t border-white/5 space-y-1">
        <p className="text-white/50 text-[10px] font-medium">EverIntent LLC</p>
        <p className="text-white/30 text-[10px]">2892 N Bellflower Blvd PMB 1018, Long Beach, CA 90815</p>
        <p className="text-white/30 text-[10px]">
          (562) 685-9500 | 
          <button onClick={() => navigateTo('privacy')} className="hover:text-gray-400 ml-1">Privacy Policy</button> | 
          <button onClick={() => navigateTo('terms')} className="hover:text-gray-400 ml-1">Terms of Service</button>
        </p>
      </div>
    </div>
  </footer>
);

// ============================================
// MAIN COMPONENT - Following Desert Cool Air pattern exactly
// ============================================
export const ClearviewDentistryAustinMockup = () => {
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState<ChatStep>('initial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<{ day: string; time: string } | null>(null);
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
        "Hi there! 😊 Welcome to Clearview Dentistry Austin. How can I brighten your day?",
        [
          { label: "I need to book an appointment", value: "book", nextStep: 'patient-type' },
          { label: "I'm a new patient", value: "new", nextStep: 'patient-type' },
          { label: "I have a dental emergency", value: "emergency", nextStep: 'emergency' }
        ]
      );
    }
  }, [chatOpen]);

  const addBotMessage = (text: string, quickReplies?: QuickReply[], showInputFields?: boolean) => {
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
    }, 1500); // 1.5 second typing indicator
  };

  const restartChat = () => {
    setMessages([]);
    setChatStep('initial');
    setSelectedAppointment(null);
    setTimeout(() => {
      addBotMessage(
        "Hi there! 😊 Welcome to Clearview Dentistry Austin. How can I brighten your day?",
        [
          { label: "I need to book an appointment", value: "book", nextStep: 'patient-type' },
          { label: "I'm a new patient", value: "new", nextStep: 'patient-type' },
          { label: "I have a dental emergency", value: "emergency", nextStep: 'emergency' }
        ]
      );
    }, 300);
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

    // Store appointment data if provided
    if (reply.timeData) {
      setSelectedAppointment(reply.timeData);
    }

    setTimeout(() => {
      switch (reply.nextStep) {
        case 'patient-type':
          addBotMessage(
            "Welcome! We'd love to have you. Are you looking for care for yourself, your child, or your whole family?",
            [
              { label: "Just me", value: "self", nextStep: 'anxiety-check' },
              { label: "My child", value: "child", nextStep: 'service-type' },
              { label: "The whole family", value: "family", nextStep: 'service-type' }
            ]
          );
          break;

        case 'anxiety-check':
          addBotMessage(
            "Is there anything specific you're looking for? Some patients come to us because they've had anxiety about dental visits in the past — we specialize in gentle care.",
            [
              { label: "Yes, I have dental anxiety", value: "anxiety", nextStep: 'anxiety-response' },
              { label: "Just a regular checkup", value: "checkup", nextStep: 'scheduling' },
              { label: "I have a specific concern", value: "concern", nextStep: 'service-type' }
            ]
          );
          break;

        case 'anxiety-response':
          addBotMessage(
            "You're in the right place. 💙 Dr. Chen is known for her gentle approach, and we offer sedation options if needed. Would you like to schedule a no-pressure consultation first?",
            [
              { label: "Yes, that sounds good", value: "yes", nextStep: 'scheduling' },
              { label: "Tell me more about sedation", value: "sedation", nextStep: 'sedation-info' }
            ]
          );
          break;

        case 'sedation-info':
          addBotMessage(
            "We offer nitrous oxide (laughing gas) for mild anxiety and oral sedation for more nervous patients. Dr. Chen will discuss options at your consultation. Ready to book?",
            [
              { label: "Yes, let's book", value: "book", nextStep: 'scheduling' },
              { label: "I have more questions", value: "more", nextStep: 'initial' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "What type of appointment are you looking for?",
            [
              { label: "Cleaning & checkup", value: "cleaning", nextStep: 'scheduling' },
              { label: "Cosmetic consultation", value: "cosmetic", nextStep: 'scheduling' },
              { label: "Something else", value: "other", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'scheduling':
          addBotMessage(
            "I have openings this week on Tuesday afternoon or Thursday morning. Which works better for you?",
            [
              { label: "Tuesday afternoon", value: "tuesday", nextStep: 'time-select-tue' },
              { label: "Thursday morning", value: "thursday", nextStep: 'time-select-thu' },
              { label: "Show me next week", value: "next", nextStep: 'scheduling-next' }
            ]
          );
          break;

        case 'scheduling-next':
          addBotMessage(
            "Next week I have Monday morning or Wednesday afternoon available. Which would you prefer?",
            [
              { label: "Monday morning", value: "monday", nextStep: 'time-select-tue', timeData: { day: 'Monday', time: '' } },
              { label: "Wednesday afternoon", value: "wednesday", nextStep: 'time-select-thu', timeData: { day: 'Wednesday', time: '' } }
            ]
          );
          break;

        case 'time-select-tue':
          addBotMessage(
            "I have 2:00 PM or 3:30 PM available on Tuesday. Which would you prefer?",
            [
              { label: "2:00 PM", value: "2pm", nextStep: 'contact-info', timeData: { day: 'Tuesday', time: '2:00 PM' } },
              { label: "3:30 PM", value: "330pm", nextStep: 'contact-info', timeData: { day: 'Tuesday', time: '3:30 PM' } }
            ]
          );
          break;

        case 'time-select-thu':
          addBotMessage(
            "I have 9:00 AM or 10:30 AM available on Thursday. Which would you prefer?",
            [
              { label: "9:00 AM", value: "9am", nextStep: 'contact-info', timeData: { day: 'Thursday', time: '9:00 AM' } },
              { label: "10:30 AM", value: "1030am", nextStep: 'contact-info', timeData: { day: 'Thursday', time: '10:30 AM' } }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Perfect! To confirm your appointment, I just need your name and phone number so we can send you a reminder."
          );
          // Show confirmation after a delay (simulating form submission)
          setTimeout(() => {
            const appt = selectedAppointment || reply.timeData || { day: 'your selected day', time: 'your selected time' };
            setMessages(prev => [...prev, {
              id: ++messageIdRef.current,
              sender: 'bot',
              text: `✅ You're all set! Your appointment is confirmed for ${appt.day} at ${appt.time} with Dr. Chen. You'll receive a text reminder the day before. We can't wait to meet you! Is there anything else I can help with?`,
              quickReplies: [
                { label: "That's all, thanks!", value: "done", nextStep: 'end' },
                { label: "I have another question", value: "more", nextStep: 'initial' }
              ]
            }]);
          }, 2500);
          break;

        case 'emergency':
          addBotMessage(
            "I'm so sorry you're dealing with a dental emergency! 😟 We keep same-day slots open for urgent cases. Are you experiencing severe pain right now?",
            [
              { label: "Yes, severe pain", value: "severe", nextStep: 'emergency-urgent' },
              { label: "It's uncomfortable but manageable", value: "manageable", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'emergency-urgent':
          addBotMessage(
            "Please call us right away at (512) 555-0123. We'll get you in as soon as possible today. If it's after hours, our voicemail has emergency instructions.",
            [
              { label: "I'll call now", value: "call", nextStep: 'end' },
              { label: "It can wait until tomorrow", value: "wait", nextStep: 'scheduling' }
            ]
          );
          break;

        case 'end':
          addBotMessage(
            "Thank you for chatting with Clearview Dentistry Austin! Have a wonderful day 😊"
          );
          // Show restart button after end message
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: ++messageIdRef.current,
              sender: 'bot',
              text: '',
              quickReplies: [
                { label: "🔄 Start a new conversation", value: "restart", nextStep: 'initial' }
              ]
            }]);
          }, 1800);
          break;

        case 'initial':
          // Restart the conversation
          restartChat();
          break;
      }
    }, 300);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-card border border-border/50 shadow-[0_25px_100px_-12px_rgba(0,0,0,0.4)]">
      {/* Browser Chrome - macOS Style (matching Desert Cool Air exactly) */}
      <div className="h-9 sm:h-11 bg-gradient-to-b from-[#3d3d3d] to-[#2a2a2a] flex items-center px-3 sm:px-4 gap-3 border-b border-[#1a1a1a]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
          <div className="w-3 h-3 rounded-full bg-[#27CA40] shadow-[inset_0_-1px_1px_rgba(0,0,0,0.2)]" />
        </div>
        <div className="flex-1 mx-2 sm:mx-12">
          <div className="bg-[#1a1a1a] rounded-lg px-4 py-1.5 text-[11px] sm:text-xs text-white/80 flex items-center gap-2 max-w-lg mx-auto shadow-inner">
            <Shield className="w-3.5 h-3.5 text-green-400" />
            <span className="font-medium">clearviewdentistryaustin.com{
              currentPage === 'home' ? '' : 
              currentPage.startsWith('service-') ? `/services/${currentPage.replace('service-', '')}` :
              `/${currentPage.replace('-', '')}`
            }</span>
          </div>
        </div>
      </div>

      {/* Website Content Container */}
      <div className="h-[calc(100%-2.25rem)] sm:h-[calc(100%-2.75rem)] overflow-y-auto relative bg-white">
        {/* Navigation Header - Dark charcoal like Desert Cool Air */}
        <nav className="h-14 sm:h-16 bg-[#1E293B]/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 relative z-30 border-b border-white/5">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            {/* Logo - clickable to home */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0D9488] flex items-center justify-center">
              <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-sm sm:text-base">Clearview Dentistry</span>
              <span className="text-white/50 font-medium text-[9px] sm:text-[10px] block -mt-0.5">Austin, TX</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {desktopNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`text-xs transition-all ${
                  currentPage === item.id 
                    ? 'text-white font-semibold' 
                    : 'text-white/70 hover:text-white font-medium'
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
            <a href="tel:5125550123" className="hidden lg:flex items-center gap-2 text-white/80 font-medium text-sm">
              <Phone className="w-4 h-4" />
              (512) 555-0123
            </a>
            <button 
              onClick={() => navigateTo('contact')}
              className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all"
            >
              Book Your Smile
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-[#1E293B]/98 backdrop-blur-md border-b border-white/5 z-40">
            {mobileNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-6 py-4 text-sm border-l-4 transition-all ${
                  currentPage === item.id 
                    ? 'text-white font-semibold bg-white/5 border-[#0D9488]' 
                    : 'text-white/70 font-medium border-transparent hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* Mobile CTA Button */}
            <div className="px-6 py-4 border-t border-white/10">
              <button 
                onClick={() => navigateTo('contact')}
                className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-3 rounded-lg text-sm font-semibold transition-all"
              >
                Book Your Smile
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div ref={contentContainerRef} className="h-[calc(100%-3.5rem)] sm:h-[calc(100%-4rem)] overflow-y-auto scroll-smooth">
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
          {currentPage === 'service-general' && <ServiceGeneralPage navigateTo={navigateTo} />}
          {currentPage === 'service-cosmetic' && <ServiceCosmeticPage navigateTo={navigateTo} />}
          {currentPage === 'service-invisalign' && <ServiceInvisalignPage navigateTo={navigateTo} />}
          {currentPage === 'service-pediatric' && <ServicePediatricPage navigateTo={navigateTo} />}
          {currentPage === 'service-emergency' && <ServiceEmergencyPage navigateTo={navigateTo} />}
          {currentPage === 'service-whitening' && <ServiceWhiteningPage navigateTo={navigateTo} />}
          {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
          {currentPage === 'new-patients' && <NewPatientsPage navigateTo={navigateTo} />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'privacy' && <PrivacyPage navigateTo={navigateTo} />}
          {currentPage === 'cookies' && <CookiesPage navigateTo={navigateTo} />}
          {currentPage === 'terms' && <TermsPage navigateTo={navigateTo} />}
          {currentPage === 'data-rights' && <DataRightsPage navigateTo={navigateTo} />}
          
          {/* Footer */}
          <MockupFooter navigateTo={navigateTo} />
        </div>

        {/* Chat Prompt Bubble - Sophie */}
        {!chatOpen && showChatPrompt && (
          <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-6 bg-white rounded-2xl shadow-2xl p-4 max-w-[200px] z-50 border border-gray-100">
            <button 
              onClick={() => setShowChatPrompt(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5 text-gray-600" />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0F766E] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 mb-1">Sophie</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">Need to book? I can help you find the perfect time! 😊</p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-100 transform rotate-45" />
          </div>
        )}

        {/* Chat Widget Button */}
        {!chatOpen && (
          <button
            onClick={() => { setChatOpen(true); setShowChatPrompt(false); }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#0D9488] to-[#0F766E] rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center hover:scale-110 transition-all z-50 group"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </button>
        )}

        {/* Chat Window - Sophie */}
        {chatOpen && (
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[360px] h-[70%] sm:h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#0F766E] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">S</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1E293B]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Sophie</p>
                  <p className="text-white/60 text-[11px]">Patient Coordinator • Online</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white/80" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-[#0D9488] text-white rounded-br-md' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    {message.quickReplies && (
                      <div className="mt-2 space-y-2">
                        {message.quickReplies.map((reply, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-[#0D9488] hover:bg-[#0D9488]/5 transition-all"
                          >
                            {reply.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50"
                />
                <button className="w-10 h-10 bg-[#0D9488] hover:bg-[#0F766E] rounded-full flex items-center justify-center transition-colors">
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

export default ClearviewDentistryAustinMockup;
