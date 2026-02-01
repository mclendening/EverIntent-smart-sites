/**
 * @fileoverview Image assets for Clearview Dentistry Austin mockup
 * @module assets/portfolio/clearviewdentistryaustin/images
 * 
 * All images selected for warm, calming, anxiety-friendly aesthetic
 * Avoiding clinical/sterile imagery per brand guidelines
 */

export const CLEARVIEW_IMAGES = {
  // Hero & Office
  hero: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80',
  officeInterior: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=800&q=80',
  waitingRoom: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
  
  // Team Members
  drChen: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  hygienist: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80',
  receptionist: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  
  // Services (warm, non-clinical)
  serviceGeneral: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
  serviceCosmetic: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&q=80',
  serviceInvisalign: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
  servicePediatric: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
  serviceEmergency: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80',
  serviceWhitening: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
  
  // Patient Testimonials (happy, relaxed faces)
  patient1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
  patient2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  patient3: 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80',
  
  // Lifestyle & Location
  comfortablePatient: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
  family: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
  austin: 'https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=80',
} as const;

export type ClearviewImageKey = keyof typeof CLEARVIEW_IMAGES;
