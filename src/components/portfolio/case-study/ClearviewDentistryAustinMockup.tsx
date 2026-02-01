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
        {/* Page content will be added in next prompt */}
        <div className="p-8 text-center text-gray-500">
          Header added. Run next prompt to add page content.
        </div>
      </div>
    </div>
  );
};

export default ClearviewDentistryAustinMockup;
