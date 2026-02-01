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
  Shield, Calendar, Users, Sparkles, CheckCircle2, Smile, Zap
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
type MockupPage = 'home' | 'services' | 'service-general' | 'service-cosmetic' | 'service-invisalign' | 'service-pediatric' | 'service-emergency' | 'service-whitening' | 'about' | 'new-patients' | 'contact';

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

// Navigation items
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'Meet Dr. Chen' },
  { id: 'new-patients', label: 'New Patients' },
  { id: 'contact', label: 'Contact' },
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
          { name: 'General Dentistry', img: IMAGES.serviceGeneral, desc: 'Checkups & cleanings' },
          { name: 'Cosmetic Dentistry', img: IMAGES.serviceCosmetic, desc: 'Smile makeovers' },
          { name: 'Invisalign', img: IMAGES.serviceInvisalign, desc: 'Clear aligners' },
          { name: 'Pediatric', img: IMAGES.servicePediatric, desc: 'Care for little ones' },
          { name: 'Emergency Care', img: IMAGES.serviceEmergency, desc: 'Same-day available' },
          { name: 'Whitening', img: IMAGES.serviceWhitening, desc: 'Brighten your smile' },
        ].map((service, i) => (
          <div key={i} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
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
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceGeneralHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit">
          <ChevronLeft className="w-3 h-3" /> Back to Services
        </button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Our Services</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">General Dentistry</h1>
        <p className="text-white/90 text-sm max-w-md">Preventive care for a lifetime of healthy smiles</p>
      </div>
    </div>
    
    {/* Intro */}
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">
        Regular dental checkups are the foundation of great oral health. At Clearview Dentistry Austin, we believe prevention is the best medicine — catching small problems before they become big ones.
      </p>
      <p className="text-gray-600 text-sm leading-relaxed">
        We recommend visits every six months for most patients, though some may benefit from more frequent care.
      </p>
    </div>
    
    {/* What's Included */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What's Included in Your Visit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🔍', title: 'Comprehensive Exam', desc: 'Thorough evaluation of teeth, gums, and oral health' },
          { icon: '✨', title: 'Professional Cleaning', desc: 'Remove plaque and tartar buildup' },
          { icon: '📷', title: 'Digital X-Rays', desc: 'Low-radiation imaging to see below the surface' },
          { icon: '🛡️', title: 'Oral Cancer Screening', desc: 'Quick, painless check for early warning signs' },
          { icon: '📋', title: 'Personalized Plan', desc: 'Custom recommendations based on your needs' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Process Timeline */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What to Expect</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Warm Welcome', desc: 'Our team greets you by name. No clipboard chaos.', time: '5 min' },
          { step: '2', title: 'Gentle Cleaning', desc: 'Our hygienists use the latest techniques for comfort.', time: '25 min' },
          { step: '3', title: "Dr. Chen's Exam", desc: 'A comprehensive look with clear explanations.', time: '15 min' },
          { step: '4', title: 'Your Game Plan', desc: 'Honest recommendations, no pressure.', time: '10 min' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < 3 && <div className="w-0.5 h-full bg-gradient-to-b from-[#0D9488]/50 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Anxiety Callout */}
    <div className="mx-6 my-6 bg-gradient-to-r from-[#0EA5E9]/10 to-[#0D9488]/10 rounded-2xl p-6 border border-[#0D9488]/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
          <Heart className="w-6 h-6 text-[#0D9488]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-1">Nervous About Your Visit?</h3>
          <p className="text-gray-600 text-sm mb-3">You're not alone. Dr. Chen specializes in anxious patients with sedation options available.</p>
          <button onClick={() => navigateTo('new-patients')} className="text-[#0D9488] font-semibold text-sm hover:underline">Learn About Our Gentle Approach →</button>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 mb-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">New Patient Special</span>
        <h3 className="text-xl font-bold mt-2 mb-2">$99 Exam, X-Rays & Cleaning</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Everything you need for a healthy start.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Schedule Your Checkup</button>
      </div>
    </div>
    
    {/* Related Services */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">You May Also Be Interested In</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[SERVICES[1], SERVICES[5]].map(s => (
          <div key={s.id} onClick={() => navigateTo(s.id)} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-xs">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Cosmetic Dentistry Detail Page
const ServiceCosmeticPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceCosmeticHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Smile Transformations</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Cosmetic Dentistry</h1>
        <p className="text-white/90 text-sm max-w-md">Transform your smile, transform your confidence</p>
      </div>
    </div>
    
    {/* Intro */}
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">Your smile is often the first thing people notice — and it can shape how you feel about yourself. Whether you're preparing for a wedding, starting a new job, or simply ready for a change, cosmetic dentistry can help you smile with confidence.</p>
      <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0D9488]/10 rounded-xl p-4 border border-[#0D9488]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#0EA5E9]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Digital Smile Design</h3>
            <p className="text-gray-600 text-xs">See your new smile before we start — preview your transformation digitally!</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* What's Included */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Our Cosmetic Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '💎', title: 'Porcelain Veneers', desc: 'Ultra-thin shells that cover the front of your teeth for a flawless, natural-looking smile', price: 'From $1,200/tooth' },
          { icon: '✨', title: 'Dental Bonding', desc: 'Quick, affordable fixes for chips, cracks, gaps, and discoloration in just one visit', price: 'From $300/tooth' },
          { icon: '🌟', title: 'Complete Smile Makeovers', desc: 'Comprehensive treatment plans combining multiple procedures for total transformation', price: 'Custom quote' },
          { icon: '💫', title: 'Gum Contouring', desc: 'Reshape your gumline to show more tooth and create a balanced, beautiful smile', price: 'From $500' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs mb-2">{item.desc}</p>
                <span className="text-[#0D9488] text-xs font-medium">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Process Timeline */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Your Smile Journey</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Discovery Consultation', desc: 'We discuss your goals, take photos, and create your digital smile preview.', time: '45 min' },
          { step: '2', title: 'Custom Treatment Plan', desc: 'Dr. Chen designs a personalized plan with timeline and investment details.', time: '30 min' },
          { step: '3', title: 'Smile Creation', desc: 'Your treatment begins — some procedures take one visit, others require multiple.', time: 'Varies' },
          { step: '4', title: 'The Big Reveal', desc: 'See your new smile! We ensure everything looks and feels perfect.', time: '30 min' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < 3 && <div className="w-0.5 h-full bg-gradient-to-b from-[#0D9488]/50 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Before/After Testimonial */}
    <div className="mx-6 my-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <img src={IMAGES.patient1} alt="Patient" className="w-14 h-14 rounded-full object-cover shadow-md" />
        <div>
          <p className="text-gray-700 text-sm italic mb-2">"I had always been embarrassed by my smile. After veneers with Dr. Chen, I can't stop smiling! The process was so comfortable and the results exceeded my dreams."</p>
          <p className="text-gray-800 font-semibold text-sm">— Jennifer M., Austin</p>
          <div className="flex text-yellow-400 text-xs mt-1">★★★★★</div>
        </div>
      </div>
    </div>
    
    {/* FAQs */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Common Questions</h2>
      <div className="space-y-4">
        {[
          { q: 'How long do veneers last?', a: 'With proper care, porcelain veneers typically last 10-15 years or longer.' },
          { q: 'Is cosmetic dentistry painful?', a: 'Most procedures involve minimal discomfort. We offer sedation options for anxious patients.' },
          { q: 'Will my results look natural?', a: 'Absolutely! Dr. Chen uses advanced materials and techniques designed to match your natural teeth.' },
        ].map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-3">
            <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Free Consultation</span>
        <h3 className="text-xl font-bold mt-2 mb-2">See Your New Smile Today</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Book a consultation and receive your complimentary digital smile preview.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Start My Transformation</button>
      </div>
    </div>
    
    {/* Related Services */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Complete Your Smile</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[SERVICES[2], SERVICES[5]].map(s => (
          <div key={s.id} onClick={() => navigateTo(s.id)} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-xs">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Invisalign Detail Page
const ServiceInvisalignPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceInvisalignHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Preferred Provider</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Invisalign Clear Aligners</h1>
        <p className="text-white/90 text-sm max-w-md">Straighten your teeth without anyone knowing</p>
      </div>
    </div>
    
    {/* Intro with Badge */}
    <div className="px-6 py-8 bg-white">
      <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0D9488]/10 rounded-xl p-4 mb-6 border border-[#0D9488]/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-6 h-6 text-[#0D9488]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Invisalign Preferred Provider</h3>
            <p className="text-gray-600 text-xs">Dr. Chen has successfully treated 200+ patients with Invisalign</p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-base leading-relaxed mb-4">Invisalign uses custom-made, virtually invisible aligners to gradually shift your teeth into perfect alignment. No metal brackets, no wires, no food restrictions — just a beautiful smile in progress.</p>
      <p className="text-gray-600 text-sm leading-relaxed">Most patients complete treatment in 12-18 months, though some see results in as little as 6 months.</p>
    </div>
    
    {/* Why Choose Invisalign */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Patients Love Invisalign</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Nearly Invisible', icon: '👁️', desc: 'Clear aligners are virtually undetectable' },
          { title: 'Fully Removable', icon: '🍕', desc: 'Eat what you want, brush normally' },
          { title: 'Smooth & Comfortable', icon: '😌', desc: 'No brackets or wires to irritate' },
          { title: 'Faster Results', icon: '⚡', desc: 'Many cases finish in under a year' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl block mb-2">{item.icon}</span>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* Process Timeline */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Your Invisalign Journey</h2>
      <div className="space-y-6">
        {[
          { step: '1', title: 'Free Consultation', desc: 'We scan your teeth and discuss your smile goals.', time: '30 min' },
          { step: '2', title: '3D Treatment Preview', desc: 'See your predicted results before you start.', time: 'Same visit' },
          { step: '3', title: 'Custom Aligners', desc: 'Your aligners are manufactured just for you.', time: '2 weeks' },
          { step: '4', title: 'Wear & Switch', desc: 'Change aligners every 1-2 weeks as teeth shift.', time: 'Ongoing' },
          { step: '5', title: 'Reveal Your Smile', desc: 'Treatment complete! Maintain with retainers.', time: '6-18 months' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-sm shadow-lg">{item.step}</div>
              {i < 4 && <div className="w-0.5 h-full bg-gradient-to-b from-[#0D9488]/50 to-transparent mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span>
              </div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Comparison Table */}
    <div className="px-6 py-6 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Invisalign vs Traditional Braces</h2>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 bg-gray-50 p-3 border-b border-gray-100">
          <span></span><span className="text-center text-[#0D9488]">Invisalign</span><span className="text-center">Braces</span>
        </div>
        {[
          { label: 'Visibility', invis: 'Nearly invisible', braces: 'Visible metal' },
          { label: 'Comfort', invis: 'Smooth plastic', braces: 'Brackets & wires' },
          { label: 'Eating', invis: 'No restrictions', braces: 'Food limits' },
          { label: 'Cleaning', invis: 'Remove to brush', braces: 'Difficult' },
          { label: 'Office Visits', invis: 'Every 8-12 weeks', braces: 'Every 4 weeks' },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 text-xs p-3 border-t border-gray-50">
            <span className="text-gray-600 font-medium">{row.label}</span>
            <span className="text-center text-[#0D9488]">✓ {row.invis}</span>
            <span className="text-center text-gray-400">{row.braces}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Testimonial */}
    <div className="mx-6 my-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <div className="flex items-start gap-4">
        <img src={IMAGES.patient2} alt="Patient" className="w-14 h-14 rounded-full object-cover shadow-md" />
        <div>
          <p className="text-gray-700 text-sm italic mb-2">"I'm a sales executive and couldn't have metal braces. Invisalign was perfect — my clients never even noticed I was straightening my teeth!"</p>
          <p className="text-gray-800 font-semibold text-sm">— Michael R., Austin</p>
          <div className="flex text-yellow-400 text-xs mt-1">★★★★★</div>
        </div>
      </div>
    </div>
    
    {/* FAQs */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Invisalign FAQs</h2>
      <div className="space-y-4">
        {[
          { q: 'How much does Invisalign cost?', a: 'Treatment ranges from $3,500 to $6,000 depending on complexity. We offer flexible payment plans.' },
          { q: 'Does insurance cover Invisalign?', a: 'Most dental insurance plans that cover orthodontics will cover Invisalign the same as braces.' },
          { q: 'How long do I wear aligners each day?', a: 'For best results, wear your aligners 20-22 hours per day, removing only to eat and brush.' },
          { q: 'Will Invisalign affect my speech?', a: 'Some patients have a slight lisp for the first day or two, but it disappears quickly.' },
        ].map((faq, i) => (
          <div key={i} className="border-b border-gray-100 pb-3">
            <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Free Assessment</span>
        <h3 className="text-xl font-bold mt-2 mb-2">Am I a Candidate for Invisalign?</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Find out in minutes with a complimentary consultation and 3D smile preview.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Take the Quiz</button>
      </div>
    </div>
    
    {/* Related Services */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">You May Also Be Interested In</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[SERVICES[1], SERVICES[5]].map(s => (
          <div key={s.id} onClick={() => navigateTo(s.id)} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-xs">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Pediatric Dentistry Detail Page
const ServicePediatricPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.servicePediatricHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Family Dentistry</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Pediatric Dentistry</h1>
        <p className="text-white/90 text-sm max-w-md">Where kids actually want to go to the dentist</p>
      </div>
    </div>
    
    {/* Intro */}
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">We believe every child deserves a positive dental experience. When kids enjoy their visits, they develop healthy habits that last a lifetime. That's why we've created an environment where children feel safe, respected, and even excited about dental care.</p>
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎈</span>
          <div>
            <p className="font-semibold text-gray-800 text-sm">First Visit? No Pressure!</p>
            <p className="text-gray-600 text-xs">We take extra time to let kids explore, ask questions, and feel comfortable before any treatment.</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* What Makes Us Kid-Friendly */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">The Clearview Kids Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '🎮', title: 'Adventure Waiting Area', desc: 'Tablets, games, books, and activities to keep kids entertained' },
          { icon: '🦸', title: 'Superhero Sunglasses', desc: 'Cool protective shades make every kid feel special' },
          { icon: '🏆', title: 'Treasure Chest Rewards', desc: 'Every brave kid picks a prize after their visit' },
          { icon: '💬', title: 'Kid-Friendly Explanations', desc: 'We use fun names: "tooth counter" for explorer, "tickle brush" for polisher' },
          { icon: '📺', title: 'Ceiling TVs', desc: 'Watch cartoons during treatment — time flies!' },
          { icon: '🎵', title: 'Music & Headphones', desc: 'Kids can listen to their favorite songs' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Services for Kids */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Pediatric Services</h2>
      <div className="space-y-3">
        {[
          { title: 'First Dental Visit', desc: 'Gentle intro for ages 1-3, building comfort early' },
          { title: 'Checkups & Cleanings', desc: 'Regular visits with age-appropriate techniques' },
          { title: 'Fluoride Treatments', desc: 'Extra protection against cavities' },
          { title: 'Dental Sealants', desc: 'Protective coating for molars — quick and painless' },
          { title: 'Cavity Treatment', desc: 'Gentle fillings with sedation options if needed' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
            <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Parent Tips */}
    <div className="px-6 py-6 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tips for Parents</h2>
      <div className="bg-white rounded-xl p-5 shadow-sm space-y-4">
        {[
          { tip: 'Start dental visits by age 1', why: 'Early visits prevent problems and build comfort' },
          { tip: 'Stay positive — kids pick up on anxiety', why: 'Your attitude shapes their experience' },
          { tip: "Don't use dental visits as a threat", why: 'We want the dentist to be a happy place!' },
          { tip: 'Let them bring a comfort item', why: 'Stuffed animals and blankets are welcome' },
          { tip: 'Read books about dental visits', why: 'Familiarity reduces fear' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#0D9488] text-xs font-bold">{i + 1}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{item.tip}</p>
              <p className="text-gray-500 text-xs">{item.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Testimonial */}
    <div className="mx-6 my-6 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
      <div className="flex items-start gap-4">
        <img src={IMAGES.family} alt="Family" className="w-14 h-14 rounded-full object-cover shadow-md" />
        <div>
          <p className="text-gray-700 text-sm italic mb-2">"My daughter used to cry at every dental appointment. After switching to Clearview, she actually asks when her next visit is. Dr. Chen and her team are magic with kids!"</p>
          <p className="text-gray-800 font-semibold text-sm">— Sarah T., Austin Mom of 3</p>
          <div className="flex text-yellow-400 text-xs mt-1">★★★★★</div>
        </div>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Kid-Friendly Care</span>
        <h3 className="text-xl font-bold mt-2 mb-2">Schedule Your Child's First Visit</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">We make every visit a positive experience they'll remember.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Book Kids Appointment</button>
      </div>
    </div>
    
    {/* Related Services */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Family Services</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[SERVICES[0], SERVICES[4]].map(s => (
          <div key={s.id} onClick={() => navigateTo(s.id)} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-xs">{s.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Emergency Care Detail Page
const ServiceEmergencyPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceEmergencyHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-600/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-red-200 text-xs font-medium uppercase tracking-wider mb-1">Urgent Care</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Emergency Dental Care</h1>
        <p className="text-white/90 text-sm max-w-md">Same-day appointments when you need us most</p>
      </div>
    </div>
    
    {/* Emergency Banner */}
    <div className="bg-red-600 text-white px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 animate-pulse" />
          <div>
            <p className="font-bold text-sm">Dental Emergency? Call Now</p>
            <p className="text-red-200 text-xs">We reserve same-day slots for urgent cases — every day</p>
          </div>
        </div>
        <a href="tel:5125550123" className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all">(512) 555-0123</a>
      </div>
    </div>
    
    {/* Intro */}
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">Dental emergencies don't wait for convenient times. Whether it's 2 AM on a Saturday or right before an important meeting, we understand you need help — fast. At Clearview, we reserve same-day slots specifically for urgent cases because we believe no one should suffer in pain.</p>
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-red-500" />
          <div>
            <p className="font-semibold text-gray-800 text-sm">Average Wait: Under 2 Hours</p>
            <p className="text-gray-600 text-xs">Most emergency patients are seen within 2 hours of calling</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Common Emergencies */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Common Dental Emergencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: '😣', title: 'Severe Toothache', desc: 'Intense, persistent pain that will not go away', urgency: 'High' },
          { icon: '🦷', title: 'Knocked-Out Tooth', desc: 'Time-sensitive — best saved within 30 minutes', urgency: 'Critical' },
          { icon: '💔', title: 'Broken/Cracked Tooth', desc: 'From injury, biting hard objects, or trauma', urgency: 'High' },
          { icon: '👑', title: 'Lost Crown or Filling', desc: 'Exposed tooth needs protection from sensitivity', urgency: 'Medium' },
          { icon: '🔴', title: 'Abscess or Swelling', desc: 'Signs of infection that can spread if untreated', urgency: 'Critical' },
          { icon: '🩸', title: 'Bleeding That Will Not Stop', desc: 'After extraction or injury, persistent bleeding', urgency: 'High' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.urgency === 'Critical' ? 'bg-red-100 text-red-600' : item.urgency === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{item.urgency}</span>
              </div>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* What To Do */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What To Do While You Wait</h2>
      <div className="space-y-4">
        {[
          { situation: 'Knocked-Out Tooth', steps: ['Pick up by crown (not root)', 'Rinse gently with water', 'Try to place back in socket OR keep in milk', 'Get to us within 30 minutes for best chance of saving it'] },
          { situation: 'Severe Toothache', steps: ['Rinse with warm salt water', 'Floss gently to remove any trapped debris', 'Take over-the-counter pain relief', 'Apply cold compress to cheek if swollen'] },
          { situation: 'Broken Tooth', steps: ['Rinse mouth with warm water', 'Save any pieces', 'Apply gauze if bleeding', 'Use cold compress for swelling'] },
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-500" />
              {item.situation}
            </h3>
            <div className="space-y-2">
              {item.steps.map((step, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">{j + 1}</span>
                  <p className="text-gray-600 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* After Hours */}
    <div className="mx-6 my-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
      <h3 className="font-bold text-gray-800 mb-3">After-Hours Emergencies</h3>
      <p className="text-gray-600 text-sm mb-4">If you have an emergency outside office hours, call our main number. Our voicemail includes instructions and an emergency contact option for truly urgent situations.</p>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <Clock className="w-4 h-4" />
        <span>Regular Hours: Mon-Thu 8-5, Fri 8-3, Sat 9-2</span>
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 my-6 bg-red-600 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2">Don't Wait in Pain</h3>
        <p className="text-red-100 text-sm mb-6 max-w-sm mx-auto">We're here to help. Call now for same-day emergency care.</p>
        <a href="tel:5125550123" className="inline-block bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Call (512) 555-0123</a>
      </div>
    </div>
  </div>
);

// Teeth Whitening Detail Page
const ServiceWhiteningPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceWhiteningHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Cosmetic Enhancement</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Teeth Whitening</h1>
        <p className="text-white/90 text-sm max-w-md">Professional results up to 8 shades brighter</p>
      </div>
    </div>
    
    {/* Intro */}
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">Coffee, wine, tea, aging — they all take a toll on your smile's brightness. Professional whitening delivers dramatic, lasting results that over-the-counter products simply can't match. Our treatments use higher concentrations with professional supervision for safe, effective brightening.</p>
      <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0D9488]/10 rounded-xl p-4 border border-[#0D9488]/20">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-[#0EA5E9]" />
          <div>
            <p className="font-semibold text-gray-800 text-sm">Up to 8 Shades Brighter</p>
            <p className="text-gray-600 text-xs">Most patients see dramatic results in a single session</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Options Comparison */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Choose Your Whitening Experience</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-[#0D9488] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#0D9488] text-white text-xs px-3 py-1 rounded-bl-lg font-medium">Most Popular</div>
          <h3 className="font-bold text-gray-800 text-lg mb-2">In-Office Whitening</h3>
          <p className="text-gray-600 text-sm mb-4">Walk in with stained teeth, walk out with a dazzling smile — all in about one hour.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Time', value: '~1 hour' },
              { label: 'Results', value: 'Up to 8 shades' },
              { label: 'Sessions', value: 'Usually 1' },
              { label: 'Investment', value: 'From $399' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> Professional-strength gel</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> LED light acceleration</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> Sensitivity protection</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-2">Take-Home Custom Trays</h3>
          <p className="text-gray-600 text-sm mb-4">Professional-grade results on your schedule with custom-fitted trays made just for you.</p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { label: 'Time', value: '30 min/day' },
              { label: 'Results', value: 'Up to 6 shades' },
              { label: 'Duration', value: '2-3 weeks' },
              { label: 'Investment', value: 'From $299' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-gray-500 text-xs">{item.label}</p>
                <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> Custom-molded for perfect fit</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> Whiten while you work or relax</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#0D9488]" /> Keep trays for touch-ups</li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Process */}
    <div className="px-6 py-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-6">In-Office Whitening Process</h2>
      <div className="space-y-4">
        {[
          { step: '1', title: 'Prep & Protect', desc: 'We apply a protective barrier to your gums and lips', time: '10 min' },
          { step: '2', title: 'Apply Gel', desc: 'Professional-strength whitening gel is carefully applied', time: '5 min' },
          { step: '3', title: 'Light Activation', desc: 'LED light accelerates the whitening process', time: '15 min' },
          { step: '4', title: 'Repeat', desc: 'We repeat the gel application 2-3 times for maximum results', time: '30 min' },
          { step: '5', title: 'Reveal', desc: 'Remove gel and see your dramatically brighter smile!', time: '5 min' },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0EA5E9] text-white flex items-center justify-center font-bold text-xs shadow-lg">{item.step}</div>
              {i < 4 && <div className="w-0.5 h-full bg-gradient-to-b from-[#0D9488]/50 to-transparent mt-1" />}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{item.time}</span>
              </div>
              <p className="text-gray-600 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* FAQs */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Whitening FAQs</h2>
      <div className="space-y-4">
        {[
          { q: 'Will whitening make my teeth sensitive?', a: 'Some patients experience temporary sensitivity. We use desensitizing agents and can adjust treatment intensity.' },
          { q: 'How long do results last?', a: 'With proper care, results can last 1-3 years. Avoid staining foods/drinks and touch up as needed.' },
          { q: 'Can I whiten with crowns or veneers?', a: 'Whitening only works on natural teeth. We can help you match your restorations if needed.' },
          { q: 'Is professional whitening safe?', a: 'Yes! Professional supervision ensures safe concentrations and proper application.' },
        ].map((faq, i) => (
          <div key={i} className="border-b border-gray-200 pb-3">
            <p className="font-semibold text-gray-800 text-sm mb-1">{faq.q}</p>
            <p className="text-gray-600 text-sm">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
    
    {/* CTA */}
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Special Offer</span>
        <h3 className="text-xl font-bold mt-2 mb-2">Get a Brighter Smile Today</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Book your whitening session and ask about our current specials.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">Book Whitening Session</button>
      </div>
    </div>
    
    {/* Related Services */}
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Complete Your Smile</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {[SERVICES[1], SERVICES[0]].map(s => (
          <div key={s.id} onClick={() => navigateTo(s.id)} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
            <img src={s.img} alt={s.name} className="w-full h-20 object-cover" />
            <p className="p-3 font-semibold text-gray-800 text-xs">{s.name}</p>
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
          <div className="flex items-center gap-3">
            {/* Logo */}
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
            {navItems.map(item => (
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
            <button className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all">
              Book Appointment
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-[#1E293B]/98 backdrop-blur-md border-b border-white/5 z-40">
            {navItems.map(item => (
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
          
          {/* Footer */}
          <footer className="bg-[#1E293B] text-white px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Smile className="w-5 h-5 text-[#0D9488]" />
                  <span className="font-bold">Clearview Dentistry Austin</span>
                </div>
                <p className="text-white/60">Gentle care for your whole family since 2012.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="text-white/60">1234 Oak Street</p>
                <p className="text-white/60">Austin, TX 78701</p>
                <p className="text-white/60">(512) 555-0123</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Hours</h4>
                <p className="text-white/60">Mon-Thu: 8am-5pm</p>
                <p className="text-white/60">Fri: 8am-3pm</p>
                <p className="text-white/60">Sat: 9am-2pm</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-center text-white/40 text-xs">
              © 2024 Clearview Dentistry Austin. All rights reserved.
            </div>
          </footer>
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
