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
  MessageCircle, Send, ChevronRight, Check, Heart,
  Shield, Calendar, Users, Sparkles, CheckCircle2
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
};

// Types
type MockupPage = 'home' | 'services' | 'about' | 'new-patients' | 'contact';

type ChatStep = 
  | 'initial' 
  | 'service-type' 
  | 'anxiety-support'
  | 'scheduling'
  | 'time-select'
  | 'contact-info'
  | 'confirmed'
  | 'new-patient'
  | 'insurance';

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
    <div 
      className="relative h-72 sm:h-80 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.hero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 w-fit mb-4">
          <Heart className="w-4 h-4 text-[#0D9488]" />
          <span className="text-white/90 text-xs font-medium">Anxiety-Free Dentistry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
          Gentle Care for Your<br />
          <span className="text-[#0D9488]">Whole Family</span>
        </h1>
        <p className="text-white/80 mb-4 text-sm max-w-md">
          Austin's trusted choice for anxiety-friendly dentistry since 2012. Sedation available.
        </p>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-[#0D9488] hover:bg-[#0F766E] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Your Visit
          </button>
          <button 
            onClick={() => navigateTo('new-patients')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all border border-white/30"
          >
            New Patient Special
          </button>
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

// Services Page Component
const ServicesPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] text-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Our Dental Services</h1>
      <p className="text-white/80 text-sm">Comprehensive care for every member of your family</p>
    </div>
    
    <div className="px-6 py-8 bg-white">
      <div className="space-y-6">
        {[
          { name: 'General Dentistry', img: IMAGES.serviceGeneral, desc: 'Regular checkups, professional cleanings, fillings, and preventive care to keep your smile healthy for life.', cta: 'Schedule Checkup' },
          { name: 'Cosmetic Dentistry', img: IMAGES.serviceCosmetic, desc: 'Transform your smile with veneers, bonding, and complete smile makeovers tailored to your goals.', cta: 'Free Consultation' },
          { name: 'Invisalign Clear Aligners', img: IMAGES.serviceInvisalign, desc: 'Straighten your teeth discreetly with custom clear aligners. No metal brackets required.', cta: 'Am I a Candidate?' },
          { name: 'Pediatric Dentistry', img: IMAGES.servicePediatric, desc: 'Gentle, fun dental care designed to help kids develop healthy habits and positive associations.', cta: 'Book Kids Visit' },
          { name: 'Emergency Dental Care', img: IMAGES.serviceEmergency, desc: "Dental emergencies can't wait. We keep same-day appointments open for urgent situations.", cta: 'Emergency? Call Now' },
          { name: 'Teeth Whitening', img: IMAGES.serviceWhitening, desc: 'Professional-grade whitening that\'s safer and more effective than over-the-counter options.', cta: 'Brighten My Smile' },
        ].map((service, i) => (
          <div key={i} className="flex gap-4 items-start bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-24 h-24 rounded-lg object-cover shrink-0" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{service.desc}</p>
              <button 
                onClick={() => navigateTo('contact')}
                className="text-[#0D9488] font-semibold text-sm hover:underline"
              >
                {service.cta} →
              </button>
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
    {/* Hero */}
    <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] text-white px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Let's Get You Smiling</h1>
      <p className="text-white/80 text-sm">Book online or give us a call</p>
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
        "Hi! 👋 I'm Maya from Clearview Dentistry. How can I help you today?",
        [
          { label: "😰 I'm nervous about the dentist", value: "anxiety", nextStep: 'anxiety-support' },
          { label: "📅 Schedule an Appointment", value: "schedule", nextStep: 'service-type' },
          { label: "🎁 New Patient Special ($99)", value: "new-patient", nextStep: 'new-patient' }
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
        case 'anxiety-support':
          addBotMessage(
            "I completely understand – you're not alone! 💚 Dr. Chen specializes in anxiety-free dentistry. We offer sedation options, noise-canceling headphones, and go at your pace. Would you like to schedule a no-pressure consultation?",
            [
              { label: "Yes, that sounds great", value: "yes", nextStep: 'scheduling' },
              { label: "Tell me more about sedation", value: "sedation", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'service-type':
          addBotMessage(
            "Great! What type of appointment are you looking for?",
            [
              { label: "🦷 Checkup & Cleaning", value: "checkup", nextStep: 'scheduling' },
              { label: "😁 Cosmetic Consultation", value: "cosmetic", nextStep: 'scheduling' },
              { label: "🚨 I have a dental emergency", value: "emergency", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'scheduling':
          addBotMessage(
            "Perfect! What day works best for you?",
            [
              { label: "This week", value: "this-week", nextStep: 'time-select' },
              { label: "Next week", value: "next-week", nextStep: 'time-select' },
              { label: "Just exploring options", value: "exploring", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'time-select':
          addBotMessage(
            "We have morning or afternoon appointments available. Which do you prefer?",
            [
              { label: "☀️ Morning (8am-12pm)", value: "morning", nextStep: 'contact-info' },
              { label: "🌤️ Afternoon (1pm-5pm)", value: "afternoon", nextStep: 'contact-info' }
            ]
          );
          break;

        case 'contact-info':
          addBotMessage(
            "Wonderful! I'll need your name and phone number to confirm the appointment."
          );
          setTimeout(() => {
            addBotMessage(
              "✅ You're all set! We'll text you a confirmation. Is there anything else I can help with?",
              [
                { label: "That's all, thanks!", value: "done", nextStep: 'confirmed' },
                { label: "I have more questions", value: "more", nextStep: 'initial' }
              ]
            );
          }, 2000);
          break;

        case 'new-patient':
          addBotMessage(
            "Excellent choice! 🎉 Our $99 New Patient Special includes a comprehensive exam, full X-rays, and professional cleaning. Would you like to schedule?",
            [
              { label: "Yes, schedule me!", value: "yes", nextStep: 'scheduling' },
              { label: "Do you accept my insurance?", value: "insurance", nextStep: 'insurance' }
            ]
          );
          break;

        case 'insurance':
          addBotMessage(
            "We accept most major insurance plans including Delta Dental, Cigna, Aetna, and many more. Our team will verify your benefits before your visit. Ready to schedule?",
            [
              { label: "Yes, let's do it!", value: "yes", nextStep: 'scheduling' },
              { label: "I'll call to verify first", value: "call", nextStep: 'confirmed' }
            ]
          );
          break;

        case 'confirmed':
          addBotMessage(
            "Thank you for reaching out! We look forward to seeing your smile soon! 😊"
          );
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
            <span className="font-medium">clearviewdentistryaustin.com{currentPage === 'home' ? '' : `/${currentPage.replace('-', '')}`}</span>
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
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
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
                className={`text-xs font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-[#0D9488]' 
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
                className={`block w-full text-left px-6 py-4 text-sm font-medium border-l-4 transition-all ${
                  currentPage === item.id 
                    ? 'text-[#0D9488] bg-white/5 border-[#0D9488]' 
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
          {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
          {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
          {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
          {currentPage === 'new-patients' && <NewPatientsPage navigateTo={navigateTo} />}
          {currentPage === 'contact' && <ContactPage />}
          
          {/* Footer */}
          <footer className="bg-[#1E293B] text-white px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-5 h-5 text-[#0D9488]" />
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0F766E] flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 mb-1">Chat with Maya</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">Have questions? I can help schedule your visit! 😊</p>
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

        {/* Chat Window */}
        {chatOpen && (
          <div className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 w-[calc(100%-1.5rem)] sm:w-[360px] h-[70%] sm:h-[450px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#1E293B] to-[#334155] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#0F766E] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-bold">M</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1E293B]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Maya</p>
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
