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

// Image URLs from Unsplash - dental/healthcare themed
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
  drChen: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  hygienist: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80',
  receptionist: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  serviceGeneral: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
  serviceCosmetic: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
  serviceInvisalign: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
  servicePediatric: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
  serviceEmergency: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80',
  serviceWhitening: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
  patient1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  patient2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  patient3: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80',
  officeInterior: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80',
  waitingRoom: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
  // Service Detail Heroes
  serviceGeneralHero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
  serviceCosmeticHero: 'https://images.unsplash.com/photo-1581585090574-3e0b11459c7c?w=1200&q=80',
  serviceInvisalignHero: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80',
  servicePediatricHero: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80',
  serviceEmergencyHero: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80',
  serviceWhiteningHero: 'https://images.unsplash.com/photo-1581585090574-3e0b11459c7c?w=1200&q=80',
  dentistConsultation: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?w=800&q=80',
  happyPatient: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=800&q=80',
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
    {/* Hero Section - with background image like Desert Cool Air */}
    <div className="relative min-h-[350px] sm:min-h-[450px] overflow-hidden">
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
    {/* Hero */}
    <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] text-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Our Dental Services</h1>
      <p className="text-white/80 text-sm">Comprehensive care for every member of your family</p>
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
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceCosmeticHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Our Services</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Cosmetic Dentistry</h1>
        <p className="text-white/90 text-sm max-w-md">Transform your smile with confidence</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">Your smile is often the first thing people notice. Whether you want to fix a small imperfection or completely transform your look, our cosmetic treatments can help.</p>
      <div className="bg-[#0EA5E9]/10 rounded-xl p-4 border border-[#0EA5E9]/20">
        <div className="flex items-center gap-3">
          <Smile className="w-8 h-8 text-[#0EA5E9]" />
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Digital Smile Design</h3>
            <p className="text-gray-600 text-xs">See your new smile before we start any treatment!</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Our Cosmetic Services</h2>
      <div className="space-y-4">
        {[
          { title: 'Porcelain Veneers', desc: 'Ultra-thin shells for a flawless smile', icon: '💎' },
          { title: 'Dental Bonding', desc: 'Quick fixes for chips, cracks, and gaps', icon: '✨' },
          { title: 'Smile Makeovers', desc: 'Complete transformations', icon: '🌟' },
          { title: 'Gum Contouring', desc: 'Reshape your gumline', icon: '💫' },
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
    
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Free Consultation</span>
        <h3 className="text-xl font-bold mt-2 mb-2">Book Your Smile Consultation</h3>
        <p className="text-white/80 text-sm mb-6 max-w-sm mx-auto">Discuss your goals and see your digital smile preview.</p>
        <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg">Get Started</button>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
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
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceInvisalignHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Invisalign Provider</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Invisalign Clear Aligners</h1>
        <p className="text-white/90 text-sm max-w-md">Straighten your teeth discreetly</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <div className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0D9488]/10 rounded-xl p-4 mb-6 border border-[#0D9488]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><CheckCircle2 className="w-5 h-5 text-[#0D9488]" /></div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm">Invisalign Preferred Provider</h3>
            <p className="text-gray-600 text-xs">Dr. Chen has treated 200+ patients with Invisalign</p>
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-base leading-relaxed">Invisalign uses custom-made, virtually invisible aligners to gradually shift your teeth into place. No metal brackets, no wires.</p>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Why Choose Invisalign?</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Nearly Invisible', icon: '👁️' },
          { title: 'Removable', icon: '🍕' },
          { title: 'Comfortable', icon: '😌' },
          { title: 'Faster Results', icon: '⚡' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
            <span className="text-2xl block mb-2">{item.icon}</span>
            <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
    
    <div className="px-6 py-6 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Invisalign vs Traditional Braces</h2>
      <div className="bg-gray-50 rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 text-xs font-semibold text-gray-500 bg-gray-100 p-3">
          <span></span><span className="text-center text-[#0D9488]">Invisalign</span><span className="text-center">Braces</span>
        </div>
        {[
          { label: 'Visibility', invis: 'Nearly invisible', braces: 'Visible metal' },
          { label: 'Comfort', invis: 'Smooth plastic', braces: 'Brackets & wires' },
          { label: 'Eating', invis: 'No restrictions', braces: 'Food limits' },
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-3 text-xs p-3 border-t border-gray-100">
            <span className="text-gray-600 font-medium">{row.label}</span>
            <span className="text-center text-[#0D9488]">✓ {row.invis}</span>
            <span className="text-center text-gray-400">{row.braces}</span>
          </div>
        ))}
      </div>
    </div>
    
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl">
      <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Free Assessment</span>
      <h3 className="text-xl font-bold mt-2 mb-2">Am I a Candidate?</h3>
      <p className="text-white/80 text-sm mb-6">Find out if Invisalign is right for you.</p>
      <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg">Take the Quiz</button>
    </div>
  </div>
);

// Pediatric Dentistry Detail Page
const ServicePediatricPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.servicePediatricHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Kids Welcome</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Pediatric Dentistry</h1>
        <p className="text-white/90 text-sm max-w-md">Making dentistry fun since 2012</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-4">We believe every child deserves a positive dental experience. Our kid-friendly environment helps children develop healthy habits and happy associations with dental care.</p>
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <p className="text-gray-700 text-sm">🎈 <strong>First visit?</strong> We take extra time to let kids explore and feel comfortable before any treatment.</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">What Makes Us Kid-Friendly</h2>
      <div className="space-y-4">
        {[
          { icon: '🎮', title: 'Fun Waiting Area', desc: 'Games, books, and activities' },
          { icon: '🦸', title: 'Superhero Sunglasses', desc: 'Cool shades to wear during treatment' },
          { icon: '🏆', title: 'Prize Box', desc: 'Every brave kid gets a prize!' },
          { icon: '💬', title: 'Kid-Friendly Language', desc: 'We explain everything in terms they understand' },
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
    
    <div className="px-6 py-6 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Tips for Parents</h2>
      <div className="space-y-3">
        {['Start dental visits by age 1', 'Stay positive — kids pick up on anxiety', "Don't use dental visits as a threat", 'Let them bring a comfort item'].map((tip, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
            <p className="text-gray-600 text-sm">{tip}</p>
          </div>
        ))}
      </div>
    </div>
    
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl">
      <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Kid-Friendly Care</span>
      <h3 className="text-xl font-bold mt-2 mb-2">Schedule Your Child's First Visit</h3>
      <p className="text-white/80 text-sm mb-6">We make every visit a positive experience.</p>
      <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg">Book Kids Appointment</button>
    </div>
  </div>
);

// Emergency Care Detail Page
const ServiceEmergencyPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceEmergencyHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 via-red-600/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-red-200 text-xs font-medium uppercase tracking-wider mb-1">Urgent Care</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Emergency Dental Care</h1>
        <p className="text-white/90 text-sm max-w-md">Same-day appointments for urgent situations</p>
      </div>
    </div>
    
    <div className="bg-red-600 text-white px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 animate-pulse" />
          <div>
            <p className="font-bold text-sm">Dental Emergency? Call Now</p>
            <p className="text-red-200 text-xs">We keep same-day slots open every day</p>
          </div>
        </div>
        <a href="tel:5125550123" className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-sm">(512) 555-0123</a>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed mb-6">Dental emergencies don't wait for convenient times. Whether it's severe pain, a knocked-out tooth, or a broken restoration, we're here to help — fast.</p>
      <h2 className="text-lg font-bold text-gray-800 mb-4">Common Dental Emergencies</h2>
      <div className="space-y-3">
        {[
          { title: 'Severe Toothache', desc: 'Intense, persistent pain' },
          { title: 'Knocked-Out Tooth', desc: 'Time-sensitive — call immediately' },
          { title: 'Broken/Cracked Tooth', desc: 'From injury or biting hard objects' },
          { title: 'Lost Crown or Filling', desc: 'Exposed tooth needs protection' },
          { title: 'Abscess or Swelling', desc: 'Signs of infection' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 bg-red-50 rounded-lg p-3">
            <Zap className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="px-6 py-6 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">What To Do While You Wait</h2>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3 text-sm text-gray-600">
        <p>• <strong>Knocked-out tooth:</strong> Keep it moist in milk</p>
        <p>• <strong>Severe pain:</strong> Take over-the-counter pain relief</p>
        <p>• <strong>Swelling:</strong> Apply cold compress</p>
        <p>• <strong>Bleeding:</strong> Apply gentle pressure with gauze</p>
      </div>
    </div>
    
    <div className="mx-6 my-6 bg-red-600 rounded-2xl p-8 text-center text-white shadow-xl">
      <h3 className="text-xl font-bold mb-2">Don't Wait in Pain</h3>
      <p className="text-red-100 text-sm mb-6">Call us now for same-day emergency care.</p>
      <a href="tel:5125550123" className="inline-block bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-sm shadow-lg">Call (512) 555-0123</a>
    </div>
  </div>
);

// Teeth Whitening Detail Page
const ServiceWhiteningPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    <div className="relative h-56 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${IMAGES.serviceWhiteningHero})` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 via-[#0D9488]/70 to-transparent" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6">
        <button onClick={() => navigateTo('services')} className="text-white/70 text-xs mb-3 flex items-center gap-1 hover:text-white transition-colors w-fit"><ChevronLeft className="w-3 h-3" /> Back to Services</button>
        <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider mb-1">Brighten Your Smile</span>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Teeth Whitening</h1>
        <p className="text-white/90 text-sm max-w-md">Professional results in just one visit</p>
      </div>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <p className="text-gray-700 text-base leading-relaxed">Brighten your smile safely and effectively with professional whitening. Our treatments are stronger, faster, and more reliable than anything over the counter.</p>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Choose Your Option</h2>
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border-2 border-[#0D9488]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">In-Office Whitening</h3>
            <span className="bg-[#0D9488] text-white text-xs px-2 py-1 rounded-full">Popular</span>
          </div>
          <p className="text-gray-600 text-sm mb-3">Dramatic results in about one hour.</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>✓ Up to 8 shades whiter</li>
            <li>✓ Results in 1 hour</li>
            <li>✓ Professional supervision</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">Take-Home Trays</h3>
          <p className="text-gray-600 text-sm mb-3">Custom-fitted trays for gradual whitening at your convenience.</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>✓ Custom-fitted for comfort</li>
            <li>✓ Whiten on your schedule</li>
            <li>✓ Great for touch-ups</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="mx-6 my-6 bg-gradient-to-br from-[#0D9488] to-[#0D9488]/90 rounded-2xl p-8 text-center text-white shadow-xl">
      <span className="text-[#0EA5E9] text-xs font-medium uppercase tracking-wider">Limited Offer</span>
      <h3 className="text-xl font-bold mt-2 mb-2">Get a Brighter Smile Today</h3>
      <p className="text-white/80 text-sm mb-6">Ask about our whitening specials when you book.</p>
      <button onClick={() => navigateTo('contact')} className="bg-white text-[#0D9488] px-8 py-3 rounded-xl font-bold text-sm shadow-lg">Book Whitening Session</button>
    </div>
    
    <div className="px-6 py-8 bg-[#FAFAF9]">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Related Services</h2>
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
