import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Clock, Star, 
  MessageCircle, Send, ChevronRight, Check, Heart 
} from 'lucide-react';

// Brand colors
const COLORS = {
  primary: '#0D9488',
  accent: '#0EA5E9',
  background: '#FAFAF9',
  text: '#475569',
  white: '#FFFFFF',
};

// Image URLs from Unsplash
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
  austin: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80',
};

// Types
type MockupPage = 'home' | 'services' | 'about' | 'new-patients' | 'contact';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  options?: { label: string; value: string }[];
}

// Navigation items
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'Meet Dr. Chen' },
  { id: 'new-patients', label: 'New Patients' },
  { id: 'contact', label: 'Contact' },
];

// Home Page Component
const HomePage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div>
    {/* Hero */}
    <div 
      className="relative h-64 bg-cover bg-center"
      style={{ backgroundImage: `url(${IMAGES.hero})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D9488]/90 to-[#0D9488]/70" />
      <div className="relative z-10 h-full flex flex-col justify-center px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Gentle Care for Your Whole Family
        </h1>
        <p className="text-white/90 mb-4 text-sm">
          Anxiety-friendly dentistry in Austin since 2012
        </p>
        <p className="text-white/80 text-xs mb-4">
          Sedation Available • New Patients Welcome • Most Insurance Accepted
        </p>
        <button 
          onClick={() => navigateTo('contact')}
          className="bg-white text-[#0D9488] px-6 py-2 rounded-lg font-semibold text-sm w-fit hover:bg-gray-100 transition-colors"
        >
          Book Your Smile Consultation
        </button>
      </div>
    </div>

    {/* New Patient Special */}
    <div className="bg-[#0EA5E9] text-white px-6 py-4 text-center">
      <p className="font-bold">New Patient Special: $99 Exam, X-Rays & Cleaning</p>
      <p className="text-sm text-white/90">New patients only. Call to schedule.</p>
    </div>

    {/* Services Preview */}
    <div className="px-6 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Our Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { name: 'General Dentistry', img: IMAGES.serviceGeneral, desc: 'Checkups & cleanings' },
          { name: 'Cosmetic Dentistry', img: IMAGES.serviceCosmetic, desc: 'Smile makeovers' },
          { name: 'Invisalign', img: IMAGES.serviceInvisalign, desc: 'Clear aligners' },
          { name: 'Pediatric', img: IMAGES.servicePediatric, desc: 'Care for little ones' },
          { name: 'Emergency Care', img: IMAGES.serviceEmergency, desc: 'Same-day available' },
          { name: 'Whitening', img: IMAGES.serviceWhitening, desc: 'Brighten your smile' },
        ].map((service, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img src={service.img} alt={service.name} className="w-full h-24 object-cover" />
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
          className="text-[#0D9488] font-semibold text-sm hover:underline"
        >
          View All Services →
        </button>
      </div>
    </div>

    {/* Meet Dr. Chen */}
    <div className="bg-gray-50 px-6 py-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img 
          src={IMAGES.drChen} 
          alt="Dr. Sarah Chen" 
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Meet Dr. Sarah Chen</h2>
          <p className="text-gray-600 text-sm mb-4">
            Dr. Chen has been creating beautiful smiles in Austin since 2012. 
            She specializes in anxiety-free dentistry and believes everyone deserves 
            to feel comfortable in the dental chair.
          </p>
          <button 
            onClick={() => navigateTo('about')}
            className="text-[#0D9488] font-semibold text-sm hover:underline"
          >
            Get to Know Us →
          </button>
        </div>
      </div>
    </div>

    {/* Testimonials */}
    <div className="px-6 py-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">What Our Patients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: 'Jennifer M.', img: IMAGES.patient1, quote: 'I used to dread the dentist. Now I actually look forward to my visits!' },
          { name: 'Robert T.', img: IMAGES.patient2, quote: 'Dr. Chen and her team made my kids feel so comfortable.' },
          { name: 'Patricia L.', img: IMAGES.patient3, quote: 'The best dental experience I\'ve had in 40 years.' },
        ].map((testimonial, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4">
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

// Placeholder page components (will be added in next prompts)
const ServicesPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="p-8 text-center text-gray-500">Services page content coming next.</div>
);

const AboutPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="p-8 text-center text-gray-500">About page content coming next.</div>
);

const NewPatientsPage = ({ navigateTo }: { navigateTo: (page: MockupPage) => void }) => (
  <div className="p-8 text-center text-gray-500">New Patients page content coming next.</div>
);

const ContactPage = () => (
  <div className="p-8 text-center text-gray-500">Contact page content coming next.</div>
);

export const ClearviewDentistryAustinMockup = () => {
  // Page state
  const [currentPage, setCurrentPage] = useState<MockupPage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatStep, setChatStep] = useState('initial');
  const [isTyping, setIsTyping] = useState(false);
  
  // Refs
  const contentContainerRef = useRef<HTMLDivElement>(null);
  
  // Navigation handler - MUST reset scroll to top
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
  
  // Show chat bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatPrompt(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Browser Chrome - macOS Style */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-md px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
          <span className="text-gray-400">🔒</span> clearviewdentistryaustin.com{currentPage === 'home' ? '' : `/${currentPage}`}
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#0D9488] text-white px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <div>
              <span className="font-bold text-sm">Clearview Dentistry Austin</span>
              <span className="hidden sm:block text-xs text-white/80">Gentle Care for All Ages</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as MockupPage)}
                className={`text-xs font-medium transition-all ${
                  currentPage === item.id 
                    ? 'text-white font-semibold' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <button 
            onClick={() => navigateTo('contact')}
            className="hidden md:block bg-white text-[#0D9488] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-white/90 transition-colors"
          >
            Book Appointment
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <nav className="md:hidden mt-3 pb-2 border-t border-white/20 pt-3 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id as MockupPage)}
                className={`block w-full text-left px-2 py-2 rounded text-sm ${
                  currentPage === item.id 
                    ? 'bg-white/20 font-semibold' 
                    : 'hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Scrollable Content Area */}
      <div 
        ref={contentContainerRef}
        className="flex-1 overflow-y-auto bg-[#FAFAF9]"
      >
        {/* Render current page */}
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'services' && <ServicesPage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
        {currentPage === 'new-patients' && <NewPatientsPage navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactPage />}

        {/* Footer - shows on all pages */}
        <footer className="bg-gray-800 text-white px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-[#0D9488]" />
                <span className="font-bold">Clearview Dentistry Austin</span>
              </div>
              <p className="text-gray-400">Gentle care for your whole family since 2012.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-400">1234 Oak Street</p>
              <p className="text-gray-400">Austin, TX 78701</p>
              <p className="text-gray-400">(512) 555-0123</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hours</h4>
              <p className="text-gray-400">Mon-Thu: 8am-5pm</p>
              <p className="text-gray-400">Fri: 8am-3pm</p>
              <p className="text-gray-400">Sat: 9am-2pm</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-500 text-xs">
            © 2024 Clearview Dentistry Austin. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ClearviewDentistryAustinMockup;
