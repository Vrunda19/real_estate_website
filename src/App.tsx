/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import buildingsImg from './assets/buildings.png';
import qrCodeImg from './assets/qr-code.jpg';

import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Maximize,
  Bed,
  Home,
  Building2,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Search,
  Sparkles,
  Check,
  Mail,
  HelpCircle,
  Briefcase,
  DollarSign
} from 'lucide-react';

// Property Data Interface
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  transactionType: 'Rental' | 'Outright';
  category: 'Residential' | 'Commercial';
  propertyType: string;
  area: string;
  imageUrl: string;
  description: string;
  specs: {
    label: string;
    value: string;
    icon: 'Maximize' | 'Bed' | 'Building2' | 'Home' | 'CarEmoji';
  }[];
  amenities: string[];
  highlights: string[];
}

const properties: Property[] = [
  {
    id: '101',
    title: 'Cozy & Well-Designed 1 BHK',
    location: 'D.N. Nagar, Andheri West',
    price: '₹1.35 Cr',
    transactionType: 'Outright',
    category: 'Residential',
    propertyType: '1 BHK',
    area: '450 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    description: 'A cozy and well-designed 1 BHK perfect for small families. Located in the premium locality of D.N. Nagar, this home offers superb natural ventilation, high ceiling layout, and quick access to the metro station.',
    specs: [
      { label: 'Area', value: '450 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '1 Bed', icon: 'Bed' },
      { label: 'Floor', value: 'Mid Floor', icon: 'Building2' },
      { label: 'Vastu', value: 'East Facing', icon: 'Home' }
    ],
    amenities: ['Elevator', '24x7 Security', 'Municipal Water', 'Intercom System'],
    highlights: ['Gated Community', 'Vastu Compliant', 'Ready to Move In']
  },
  {
    id: '102',
    title: 'Spacious 2 BHK with Balcony',
    location: 'Amboli, Andheri West',
    price: '₹2.10 Cr',
    transactionType: 'Outright',
    category: 'Residential',
    propertyType: '2 BHK',
    area: '680 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious 2 BHK with modern amenities and comfortable living. Features sliding glass doors that open up to a private balcony, vitrified tile flooring, vibrant interiors, and covered car parking.',
    specs: [
      { label: 'Area', value: '680 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '2 Beds', icon: 'Bed' },
      { label: 'Parking', value: '1 Reserved', icon: 'CarEmoji' },
      { label: 'Bathrooms', value: '2 Bath', icon: 'Home' }
    ],
    amenities: ['Power Backup', 'Gymnasium', 'Covered Parking', 'CCTV Security'],
    highlights: ['Private Balcony', 'High-Rise View', 'Prime Location']
  },
  {
    id: '103',
    title: 'Premium 3 BHK Residency',
    location: 'Juhu, Mumbai',
    price: '₹4.85 Cr',
    transactionType: 'Outright',
    category: 'Residential',
    propertyType: '3 BHK',
    area: '1,200 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'Ultra-premium 3 BHK for larger families looking for a luxurious lifestyle. Highlights include a spacious open dining zone, Italian marble finishes, premium bathroom fittings, and close proximity to the beach.',
    specs: [
      { label: 'Area', value: '1,200 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '3 Beds', icon: 'Bed' },
      { label: 'Parking', value: '2 Covered', icon: 'CarEmoji' },
      { label: 'Floor', value: 'High Rise', icon: 'Building2' }
    ],
    amenities: ['Grand Lobby', 'Swimming Pool', '24x7 Security', 'High Speed Lifts'],
    highlights: ['Sea Proximity', 'Exclusive Layout', 'Vastu Anukool']
  },
  {
    id: '104',
    title: 'Affordable Cozy 1 BHK Rental',
    location: 'Ceaser Road, Andheri West',
    price: '₹38,000 / mo',
    transactionType: 'Rental',
    category: 'Residential',
    propertyType: '1 BHK',
    area: '420 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    description: 'An affordable and tidy 1 BHK ideal for individuals or working couples. Features a semi-furnished layout with spacious wardrobes, air conditioning, and a fully functional kitchen.',
    specs: [
      { label: 'Area', value: '420 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '1 Bed', icon: 'Bed' },
      { label: 'Furnishing', value: 'Semi-Furnished', icon: 'Home' },
      { label: 'Bldg Age', value: 'New Building', icon: 'Building2' }
    ],
    amenities: ['Elevator', 'Municipal Water', 'Intercom Services', 'Security Guard'],
    highlights: ['Cozy Bedroom', 'Near Metro Station', 'Low Maintenance']
  },
  {
    id: '105',
    title: 'Modern 2 BHK Apartment for Rent',
    location: 'Veera Desai Road, Mumbai',
    price: '₹55,000 / mo',
    transactionType: 'Rental',
    category: 'Residential',
    propertyType: '2 BHK',
    area: '650 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80',
    description: 'Well-maintained 2 BHK apartment ready for immediate occupancy. Features modern interior design with a custom TV console, modular kitchen fittings, large sliding windows, and a peaceful atmosphere.',
    specs: [
      { label: 'Area', value: '650 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '2 Beds', icon: 'Bed' },
      { label: 'Parking', value: '1 Reserved', icon: 'CarEmoji' },
      { label: 'Security', value: 'CCTV Guarded', icon: 'Building2' }
    ],
    amenities: ['Gated Campus', 'Elevator', 'Dedicated Parking', '24x7 Water'],
    highlights: ['Vastu Compliant', 'Furnished Kitchen', 'Active Neighborhood']
  },
  {
    id: '106',
    title: 'Spacious 3 BHK Home for Rent',
    location: 'Bandra West, Mumbai',
    price: '₹95,000 / mo',
    transactionType: 'Rental',
    category: 'Residential',
    propertyType: '3 BHK',
    area: '1,050 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    description: 'Beautiful 3 BHK for rent with spacious rooms and premium modern fittings. Located in a tranquil, tree-lined lane in Bandra, offering an elegant escape from the city bustle with premium security.',
    specs: [
      { label: 'Area', value: '1,050 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '3 Beds', icon: 'Bed' },
      { label: 'Bathrooms', value: '3 Bath', icon: 'Home' },
      { label: 'Parking', value: '1 Car Parking', icon: 'CarEmoji' }
    ],
    amenities: ['High Speed Lift', 'Gated Community', 'Water Storage', 'Visitor Parking'],
    highlights: ['Elite Locality', 'Bright Ventilation', 'Separate Dining']
  },
  {
    id: '107',
    title: 'Professional BKC Corporate Office',
    location: 'Bandra Kurla Complex (BKC)',
    price: '₹2.20 L / mo',
    transactionType: 'Rental',
    category: 'Commercial',
    propertyType: 'Office',
    area: '1,500 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    description: 'Move-in ready professional office space situated in BKC. Features modern desks, ergonomic seating, a private conference room, high-speed internet provisioning, and server setups.',
    specs: [
      { label: 'Area', value: '1,500 sq ft', icon: 'Maximize' },
      { label: 'Desks', value: '20 Workstations', icon: 'Building2' },
      { label: 'Pantry', value: 'Pantry Ready', icon: 'Home' },
      { label: 'AC', value: 'Centralized', icon: 'Maximize' }
    ],
    amenities: ['Centrally Air Conditioned', 'Fiber Optic Ready', 'Car Parking', 'Reception Lobby'],
    highlights: ['Elite Business Hub', 'Conference Room', 'Fully Furnished']
  },
  {
    id: '108',
    title: 'High-Visibility Retail Shop',
    location: 'Link Road, Andheri West',
    price: '₹1.10 L / mo',
    transactionType: 'Rental',
    category: 'Commercial',
    propertyType: 'Shop',
    area: '350 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    description: 'Ground floor retail shop with direct frontage on Link Road. Excellent visibility and massive footfall, perfect for boutique showrooms, electronics, or premium salons.',
    specs: [
      { label: 'Area', value: '350 sq ft', icon: 'Maximize' },
      { label: 'Floor', value: 'Ground Floor', icon: 'Building2' },
      { label: 'Power', value: '3-Phase Power', icon: 'Maximize' },
      { label: 'Frontage', value: 'Glass Door', icon: 'Home' }
    ],
    amenities: ['Washroom', 'Security Camera', 'Loading/Unloading Space', 'Visitor Parking'],
    highlights: ['Prime High-Street', 'Ready for Fitouts', 'High Footfall']
  },
  {
    id: '109',
    title: 'Industrial Gala Space',
    location: 'Saki Naka, Andheri East',
    price: '₹75,000 / mo',
    transactionType: 'Rental',
    category: 'Commercial',
    propertyType: 'Gala',
    area: '800 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious and solid industrial gala in a secure estate. Featuring heavy floor loading capacity, 14 ft ceiling height, and convenient access for transport and logistics.',
    specs: [
      { label: 'Area', value: '800 sq ft', icon: 'Maximize' },
      { label: 'Ceiling Ht', value: '14 Feet', icon: 'Building2' },
      { label: 'Power', value: '25 HP Allowed', icon: 'Maximize' },
      { label: 'Access', value: 'Wide Gate', icon: 'Home' }
    ],
    amenities: ['Loading Bay', 'Goods Lift', '24x7 Industrial Access', 'Fire Safety Systems'],
    highlights: ['Heavy Industrial Grade', 'Gated Estate', 'Metro Connectivity']
  },
  {
    id: '110',
    title: 'Luxury 4 BHK Duplex Penthouse',
    location: 'Carter Road, Bandra West',
    price: '₹12.50 Cr',
    transactionType: 'Outright',
    category: 'Residential',
    propertyType: 'Duplex',
    area: '3,200 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'An architectural marvel on Carter Road, this double-story duplex penthouses offers panoramic vistas of the Arabian Sea, premium marble tiling, double-height ceilings, and private terrace lounge.',
    specs: [
      { label: 'Area', value: '3,200 sq ft', icon: 'Maximize' },
      { label: 'Bedrooms', value: '4 Beds', icon: 'Bed' },
      { label: 'Private Lift', value: 'Included', icon: 'Building2' },
      { label: 'Parking', value: '3 Covered', icon: 'CarEmoji' }
    ],
    amenities: ['Private Sky Terrace', 'Infinity Pool', 'Concierge Service', 'Private Security'],
    highlights: ['Unobstructed Sea View', 'Double-Height Living Room', 'Exclusive Address']
  },
  {
    id: '111',
    title: 'Premium Retail Showroom',
    location: 'Juhu Ville Parle Scheme',
    price: '₹8.50 Cr',
    transactionType: 'Outright',
    category: 'Commercial',
    propertyType: 'Showroom',
    area: '2,200 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    description: 'Double-frontage high-end showroom in Juhu’s most upscale commercial corridor. Glass facade guarantees high visibility to premium clientele.',
    specs: [
      { label: 'Area', value: '2,200 sq ft', icon: 'Maximize' },
      { label: 'Floor', value: 'G + 1 Layout', icon: 'Building2' },
      { label: 'Parking', value: '4 Front Slots', icon: 'CarEmoji' },
      { label: 'Power', value: '40 kW Load', icon: 'Maximize' }
    ],
    amenities: ['Central Air Conditioning', 'Glass Frontage', 'Dedicated Signage Board', 'Private Pantry'],
    highlights: ['Juhu Main Road', 'Luxury Retail Grade', 'Ready Possession']
  },
  {
    id: '112',
    title: 'Bespoke Co-working Office Floor',
    location: 'Link Road, Andheri West',
    price: '₹3.50 L / mo',
    transactionType: 'Rental',
    category: 'Commercial',
    propertyType: 'Co-working',
    area: '2,800 sq ft',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    description: 'Stunning collaborative workspace ready to plug and play. Fitted with soundproof discussion rooms, phone booths, premium coffee bars, and creative breakout zones.',
    specs: [
      { label: 'Area', value: '2,800 sq ft', icon: 'Maximize' },
      { label: 'Capacity', value: '55 Seats', icon: 'Building2' },
      { label: 'Meeting Rms', value: '4 soundproofed', icon: 'Home' },
      { label: 'Power', value: '24x7 Generator', icon: 'Maximize' }
    ],
    amenities: ['Community Manager', 'Unlimited Beverages', 'High-Speed Wi-Fi', 'Biometric Access'],
    highlights: ['Creative Tech Vibe', 'Plug & Play Space', 'Near Metro Station']
  }
];

const SpecIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'Maximize': return <Maximize className="w-4 h-4 text-secondary" />;
    case 'Bed': return <Bed className="w-4 h-4 text-secondary" />;
    case 'Building2': return <Building2 className="w-4 h-4 text-secondary" />;
    case 'Home': return <Home className="w-4 h-4 text-secondary" />;
    case 'CarEmoji': return <span className="text-sm select-none">🚗</span>;
    default: return null;
  }
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0 3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Property Explorer states
  const [transactionType, setTransactionType] = useState<'Rental' | 'Outright'>('Outright');
  const [category, setCategory] = useState<'Residential' | 'Commercial'>('Residential');
  const [propertyType, setPropertyType] = useState<string>('2 BHK');
  
  // Details Modal states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Enquiry Form states
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    transactionType: 'Outright',
    category: 'Residential',
    propertyType: '2 BHK',
    location: '',
    budget: '',
    requirements: ''
  });

  // Track page scroll to apply styling to Navigation
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update default property type when category changes
  useEffect(() => {
    if (category === 'Residential') {
      setPropertyType('2 BHK');
      setFormValues(prev => ({ ...prev, category: 'Residential', propertyType: '2 BHK' }));
    } else {
      setPropertyType('Office');
      setFormValues(prev => ({ ...prev, category: 'Commercial', propertyType: 'Office' }));
    }
  }, [category]);

  // Sync explorer changes to form choices (useful for quick pre-filling)
  const syncExplorerToForm = (trans: 'Rental' | 'Outright', cat: 'Residential' | 'Commercial', type: string) => {
    setFormValues(prev => ({
      ...prev,
      transactionType: trans,
      category: cat,
      propertyType: type
    }));
  };

  // Trigger form prefill from a selected property cards
  const prefillFormForProperty = (property: Property) => {
    setFormValues({
      name: formValues.name,
      phone: formValues.phone,
      email: formValues.email,
      transactionType: property.transactionType,
      category: property.category,
      propertyType: property.propertyType,
      location: property.location,
      budget: property.price.split(' ')[0], // extracts amount (e.g. ₹2.10 Cr)
      requirements: `Enquiring about: "${property.title}" in ${property.location}. Please send details.`
    });
    
    // Close modal if open
    setSelectedProperty(null);
    
    // Scroll to form smoothly
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submission: open WhatsApp with formatted message
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValues.name || !formValues.phone) {
      alert('Please fill in your Name and Phone number to continue.');
      return;
    }

    const message = `Hello Shreeji Prime Realty,

I am interested in enquiring about properties. Here are my details:

• Name: ${formValues.name}
• Phone: ${formValues.phone}
• Email: ${formValues.email || 'Not provided'}
• Transaction: ${formValues.transactionType}
• Category: ${formValues.category}
• Property Type: ${formValues.propertyType}
• Preferred Location: ${formValues.location || 'Any location'}
• Budget: ${formValues.budget || 'Not specified'}
• Specific Requirements: ${formValues.requirements || 'None'}

Please contact me back with matching options. Thank you.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919221439014?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Simple direct WhatsApp enquiry for property card
  const handleDirectPropertyWhatsApp = (property: Property) => {
    const message = `Hello Shreeji Prime Realty,
I am interested in the following property:
• Title: ${property.title}
• Location: ${property.location}
• Price/Rent: ${property.price}
• Area: ${property.area}
• Property Type: ${property.propertyType}

Please share details and layout plans. Thank you.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919221439014?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Custom Search WhatsApp enquiry (for empty states)
  const handleCustomWhatsAppEnquiry = () => {
    const message = `Hello Shreeji Prime Realty,
I am looking for a custom property with the following specifications:
• Transaction: ${transactionType}
• Category: ${category}
• Property Type: ${propertyType}

Please let me know if you have off-market options available matching this criteria.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919221439014?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter properties based on active selections
  const filteredExplorerProperties = properties.filter(p =>
    p.transactionType === transactionType &&
    p.category === category &&
    p.propertyType === propertyType
  );

  // Property types arrays
  const residentialTypes = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4 BHK+', 'Studio', 'Duplex', 'Penthouse'];
  const commercialTypes = ['Office', 'Shop', 'Gala', 'Showroom', 'Warehouse', 'Industrial Space', 'Co-working'];
  const activeTypesList = category === 'Residential' ? residentialTypes : commercialTypes;

  return (
    <div className="min-h-screen bg-surface text-primary selection:bg-secondary/20 font-sans">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav h-20 shadow-sm' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-2 group">
            <span className={`text-xl sm:text-2xl font-serif font-bold tracking-widest transition-colors duration-300 ${scrolled ? 'text-primary' : 'text-white'}`}>
              SHREEJI PRIME REALTY
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {[
              { label: 'Explorer', id: '#explorer' },
              { label: 'How It Works', id: '#how-it-works' },
              { label: 'Services', id: '#services' },
              { label: 'Enquiry', id: '#contact' }
            ].map((item) => (
              <a
                key={item.label}
                href={item.id}
                className={`text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 relative py-1 hover:text-secondary ${
                  scrolled ? 'text-on-surface-variant' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://wa.me/919221439014" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`hidden md:flex items-center gap-2 border px-6 py-3 text-xs tracking-widest uppercase font-bold transition-all duration-300 ${
                scrolled 
                  ? 'border-primary bg-primary text-white hover:bg-transparent hover:text-primary' 
                  : 'border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary'
              }`}
            >
              <WhatsAppIcon className="w-4 h-4 text-green-455 transition-colors" />
              <span>WhatsApp Chat</span>
            </a>
            <button className="lg:hidden p-2 rounded-lg" onClick={() => setIsMenuOpen(true)}>
              <Menu className={`w-6 h-6 ${scrolled ? 'text-primary' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-surface flex flex-col p-8 justify-between"
          >
            <div className="flex justify-between items-center pb-6 border-b border-outline-variant">
              <span className="text-lg font-serif font-bold tracking-widest text-primary">
                SHREEJI PRIME REALTY
              </span>
              <button className="p-2 border border-outline-variant rounded-full hover:bg-surface-dim" onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 py-12">
              {[
                { label: 'Explorer', id: '#explorer' },
                { label: 'How It Works', id: '#how-it-works' },
                { label: 'Services', id: '#services' },
                { label: 'Enquiry Form', id: '#contact' }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.id}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif tracking-wide text-primary hover:text-secondary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-t border-outline-variant pt-8">
              <p className="text-xs text-on-surface-variant font-medium">Quick Connection</p>
              <a 
                href="https://wa.me/919221439014" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wider"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <a 
                href="tel:+919221439014" 
                className="w-full border border-outline-variant py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-primary"
              >
                <Phone className="w-4 h-4 text-secondary" />
                Call Agent: +91 92214 39014
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.55] scale-105"
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80"
            alt="Premium Mumbai Real Estate Towers"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/35 z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 text-center text-white mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-xs tracking-[0.4em] font-semibold text-secondary uppercase mb-6 block drop-shadow-md">
              Established Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-serif mb-8 leading-[1.15] text-white">
              Gateway to <span className="italic font-normal text-gold-gradient">Premium</span> <br />
              Mumbai Properties
            </h1>
            <p className="text-white/85 text-base md:text-xl mb-12 max-w-2xl leading-relaxed font-light font-sans">
              Curating high-end residential apartments, premium offices, shops, and commercial galas in Mumbai's most sought-after neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-secondary hover:bg-secondary-dark text-white px-10 py-5 text-xs tracking-widest uppercase font-bold transition-all duration-300 rounded-lg shadow-lg cursor-pointer"
              >
                Explore Properties
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-white/50 backdrop-blur-sm text-white px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-white hover:text-primary transition-all duration-300 rounded-lg cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* "How It Works" Section */}
      <section id="how-it-works" className="py-24 md:py-32 bg-surface border-b border-outline-variant scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-secondary uppercase mb-4 block">
              Seamless Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary">
              How It Works
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 mb-20">
            {[
              {
                step: '01',
                title: 'Search',
                desc: 'Explore our handpicked database of outright purchases and luxury rentals tailored to your budget and configurations.',
                icon: Search
              },
              {
                step: '02',
                title: 'Look',
                desc: 'Schedule premium physical visits or interactive virtual walkthroughs led by our expert advisors at your convenience.',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Buy / Rent',
                desc: 'Secure your property with zero stress. We handle legal checks, paperwork registration, and handover transitions seamlessly.',
                icon: Check
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative bg-white border border-outline-variant p-10 md:p-12 rounded-2xl custom-shadow group hover:border-secondary transition-all duration-300"
              >
                <div className="absolute top-6 right-8 text-6xl font-serif font-black text-outline-variant/15 select-none transition-colors group-hover:text-secondary/10">
                  {item.step}
                </div>
                
                <div className="w-14 h-14 bg-surface-dim rounded-xl flex items-center justify-center mb-8 border border-outline-variant/60 group-hover:bg-secondary/10 group-hover:border-secondary transition-all">
                  <item.icon className="w-6 h-6 text-secondary" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 font-serif text-primary group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-secondary transition-colors rounded-lg inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Start Your Search</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* Expandable Property Explorer Section */}
      <section id="explorer" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-secondary uppercase mb-4 block">
              Curated Database
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary">
              Property Explorer
            </h2>
            <p className="text-on-surface-variant text-sm mt-4 font-light">
              Filter outright sales or rentals, categorize residential or commercial, and select configurations below.
            </p>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-6" />
          </div>

          {/* Interactive Steps Control */}
          <div className="bg-surface border border-outline-variant p-6 sm:p-8 rounded-2xl custom-shadow max-w-4xl mx-auto mb-16 space-y-8">
            
            {/* Step 1: Transaction Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
              <span className="text-xs tracking-wider uppercase font-bold text-on-surface-variant flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-[10px] font-sans">1</span>
                Transaction
              </span>
              <div className="col-span-3 grid grid-cols-2 gap-3">
                {[
                  { label: 'Outright (For Sale)', value: 'Outright' },
                  { label: 'Rental (For Lease)', value: 'Rental' }
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTransactionType(t.value as any);
                      syncExplorerToForm(t.value as any, category, propertyType);
                    }}
                    className={`py-4 px-6 text-xs uppercase tracking-widest font-bold border rounded-xl transition-all duration-300 cursor-pointer ${
                      transactionType === t.value 
                        ? 'border-secondary bg-secondary text-white shadow-sm' 
                        : 'border-outline-variant bg-white text-on-surface-variant hover:border-secondary/60 hover:text-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Category */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border-t border-outline-variant pt-6">
              <span className="text-xs tracking-wider uppercase font-bold text-on-surface-variant flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-[10px] font-sans">2</span>
                Category
              </span>
              <div className="col-span-3 grid grid-cols-2 gap-3">
                {[
                  { label: 'Residential', value: 'Residential' },
                  { label: 'Commercial', value: 'Commercial' }
                ].map((c) => (
                  <button
                    key={c.value}
                    onClick={() => {
                      setCategory(c.value as any);
                      syncExplorerToForm(transactionType, c.value as any, c.value === 'Residential' ? '2 BHK' : 'Office');
                    }}
                    className={`py-4 px-6 text-xs uppercase tracking-widest font-bold border rounded-xl transition-all duration-300 cursor-pointer ${
                      category === c.value 
                        ? 'border-secondary bg-secondary text-white shadow-sm' 
                        : 'border-outline-variant bg-white text-on-surface-variant hover:border-secondary/60 hover:text-primary'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Property Type */}
            <div className="grid grid-cols-1 md:grid-cols-4 items-start gap-4 border-t border-outline-variant pt-6">
              <span className="text-xs tracking-wider uppercase font-bold text-on-surface-variant flex items-center gap-2 pt-2">
                <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-[10px] font-sans">3</span>
                Property Type
              </span>
              <div className="col-span-3">
                {/* Flex wrap for categories */}
                <div className="flex flex-wrap gap-2 pr-2">
                  {activeTypesList.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setPropertyType(type);
                        syncExplorerToForm(transactionType, category, type);
                      }}
                      className={`py-2.5 px-4 text-xs font-bold border rounded-lg transition-all duration-300 cursor-pointer ${
                        propertyType === type 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-outline-variant bg-white text-on-surface-variant hover:border-secondary hover:text-secondary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Results Grid */}
          <div className="mt-16">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                
                {filteredExplorerProperties.map((property) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5 }}
                    key={property.id}
                    className="group bg-surface border border-outline-variant rounded-2xl overflow-hidden custom-shadow hover-lift flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Banner */}
                      <div className="aspect-[4/3] overflow-hidden bg-surface-dim relative">
                        <img
                          src={property.imageUrl}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="bg-primary text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                            {property.transactionType === 'Rental' ? 'FOR LEASE' : 'FOR SALE'}
                          </span>
                          <span className="bg-secondary text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                            {property.propertyType}
                          </span>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-1.5 text-secondary mb-3">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-[10px] tracking-wider font-bold uppercase">{property.location}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold font-serif mb-4 text-primary group-hover:text-secondary transition-colors line-clamp-1">
                          {property.title}
                        </h3>
                        
                        <p className="text-on-surface-variant text-xs leading-relaxed font-light mb-6 line-clamp-2">
                          {property.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-outline-variant">
                          {property.specs.slice(0, 2).map((spec, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <SpecIcon icon={spec.icon} />
                              <span className="text-[11px] font-medium text-on-surface-variant">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t border-outline-variant/60 flex items-center justify-between gap-4 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] tracking-wider text-on-surface-variant uppercase font-medium">Price</span>
                        <span className="text-base font-bold text-primary">{property.price}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedProperty(property)}
                          className="px-4 py-3 border border-outline-variant hover:border-secondary hover:text-secondary text-[11px] tracking-wider uppercase font-bold transition-all rounded cursor-pointer"
                        >
                          Details
                        </button>
                        <button 
                          onClick={() => handleDirectPropertyWhatsApp(property)}
                          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3 rounded transition-colors cursor-pointer"
                          title="Enquire on WhatsApp"
                        >
                          <WhatsAppIcon className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}

                {/* Always show "Custom Sourcing" card to make explorer feel complete */}
                <motion.article
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-surface-dim border border-dashed border-secondary/50 rounded-2xl p-8 flex flex-col justify-between min-h-[380px]"
                >
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/35 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-secondary" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold font-serif text-primary">
                        Bespoke Property Search
                      </h3>
                      <p className="text-on-surface-variant text-xs mt-3 leading-relaxed font-light">
                        Don't see exactly what you need? We source off-market luxury units, commercial showrooms, and corporate workspaces in prime Mumbai locations.
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-outline-variant/80 pt-4">
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                        <Check className="w-3.5 h-3.5 text-secondary" />
                        <span>Exclusive builder allocations</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                        <Check className="w-3.5 h-3.5 text-secondary" />
                        <span>Seamless regulatory clearance</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCustomWhatsAppEnquiry}
                    className="w-full mt-6 bg-primary text-white py-3.5 rounded-lg text-xs tracking-widest uppercase font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-green-450" />
                    <span>Custom Sourcing Enquiry</span>
                  </button>
                </motion.article>

              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Property Details Modal */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-surface w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black text-white p-2.5 rounded-full z-20 transition-colors border border-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto">
                
                {/* Banner Image */}
                <div className="aspect-[16/9] w-full bg-surface-dim relative">
                  <img 
                    src={selectedProperty.imageUrl} 
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[10px] tracking-[0.25em] font-bold text-secondary uppercase block mb-1">
                      {selectedProperty.location}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
                      {selectedProperty.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8">
                  
                  {/* Quick specs banner */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface-dim border border-outline-variant p-5 rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">Price/Rent</span>
                      <span className="text-base font-bold text-primary mt-1">{selectedProperty.price}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">Built Area</span>
                      <span className="text-base font-bold text-primary mt-1">{selectedProperty.area}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">Type</span>
                      <span className="text-base font-bold text-primary mt-1">{selectedProperty.propertyType}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-medium">Transaction</span>
                      <span className="text-base font-bold text-primary mt-1">
                        {selectedProperty.transactionType === 'Rental' ? 'Lease' : 'Sale'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-secondary font-sans">About This Property</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-light">
                      {selectedProperty.description}
                    </p>
                  </div>

                  {/* Property Specifications */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-secondary font-sans">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProperty.specs.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-3 border-b border-outline-variant pb-3">
                          <SpecIcon icon={s.icon} />
                          <div>
                            <span className="text-[9px] text-on-surface-variant block uppercase font-medium">{s.label}</span>
                            <span className="text-xs font-bold text-primary">{s.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-secondary font-sans">Premium Amenities</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedProperty.amenities.map((a, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-surface-dim px-4 py-3 rounded-lg border border-outline-variant/50">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span className="text-xs text-on-surface font-medium">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-secondary font-sans">Special Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProperty.highlights.map((h, idx) => (
                        <span key={idx} className="bg-secondary/10 border border-secondary/25 text-secondary text-[10px] tracking-wider uppercase font-bold px-3 py-1.5 rounded-full">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Sticky Footer */}
              <div className="p-6 border-t border-outline-variant bg-surface flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => prefillFormForProperty(selectedProperty)}
                  className="flex-1 bg-primary text-white py-4 rounded-xl text-xs tracking-widest uppercase font-bold hover:bg-secondary transition-colors cursor-pointer"
                >
                  Fill Enquiry Form
                </button>
                <button
                  onClick={() => handleDirectPropertyWhatsApp(selectedProperty)}
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-xl text-xs tracking-widest uppercase font-bold hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4 text-green-200" />
                  <span>Enquire on WhatsApp</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-surface-dim scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-secondary uppercase mb-4 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary">
              Comprehensive Services
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Premium Acquisitions',
                icon: ShieldCheck,
                desc: 'End-to-end purchasing representation. We filter properties, verify licenses, draft pricing benchmarks, and conduct due diligence for clear transactions.'
              },
              {
                title: 'High-Net-Worth Leasing',
                icon: Zap,
                desc: 'Top-tier rental solutions for corporations and individuals. We draft bulletproof lease covenants, complete verification registry, and oversee transition inventories.'
              },
              {
                title: 'Investment Advisory',
                icon: TrendingUp,
                desc: 'Maximize rental yields and capital gains. We source off-market residential floors, strategic retail fronts, and industrial logistics parks matching institutional mandates.'
              }
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-10 md:p-12 bg-white border border-outline-variant hover:border-secondary hover-lift rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <service.icon className="w-12 h-12 text-secondary mb-8" />
                  <h3 className="text-xl font-bold font-serif mb-4 text-primary">{service.title}</h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed font-light">{service.desc}</p>
                </div>
                <div className="mt-8 border-t border-outline-variant/60 pt-6">
                  <a 
                    href="#contact" 
                    className="text-xs uppercase tracking-widest font-bold text-secondary inline-flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <span>Enquire Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Enquiry Form (Get in Touch Redesign) */}
      <section id="contact" className="py-24 md:py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Context details */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <span className="text-[10px] tracking-[0.3em] font-semibold text-secondary uppercase mb-4 block">
                  Get In Touch
                </span>
                <h2 className="text-3xl md:text-5xl font-bold font-serif text-primary leading-tight">
                  Inquire About <br />
                  <span className="italic font-normal text-secondary">Exclusive</span> Properties
                </h2>
                <div className="w-16 h-[2px] bg-secondary mt-6" />
              </div>

              <p className="text-on-surface-variant text-sm leading-relaxed font-light max-w-md">
                Looking for your next premium workspace or luxury residence in Mumbai? Send us your requirement parameters, and our desk will coordinate with you on WhatsApp within 1 business hour.
              </p>

              <div className="space-y-6 border-t border-outline-variant pt-8">
                <div className="flex gap-5 items-center">
                  <div className="w-11 h-11 bg-surface-dim rounded-xl flex items-center justify-center border border-outline-variant/60 shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block font-medium">Head Office</span>
                    <p className="text-sm font-bold text-primary">Andheri West, Mumbai, India</p>
                  </div>
                </div>
                
                <div className="flex gap-5 items-center">
                  <div className="w-11 h-11 bg-surface-dim rounded-xl flex items-center justify-center border border-outline-variant/60 shrink-0">
                    <Phone className="w-4.5 h-4.5 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block font-medium">Phone Support</span>
                    <p className="text-sm font-bold text-primary">+91 92214 39014</p>
                  </div>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="w-11 h-11 bg-surface-dim rounded-xl flex items-center justify-center border border-outline-variant/60 shrink-0">
                    <Mail className="w-4.5 h-4.5 text-secondary" />
                  </div>
                  <div>
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-wider block font-medium">Enquiry Desk</span>
                    <p className="text-sm font-bold text-primary">info@shreejiprimerealty.com</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-outline-variant">
                <p className="text-[10px] tracking-wider text-on-surface-variant uppercase font-bold mb-4 font-sans">Follow Shreeji Prime Realty</p>
                <div className="flex gap-3">
                  {[
                    { icon: WhatsAppIcon, url: 'https://wa.me/919221439014', color: 'hover:text-[#25D366]' },
                    { icon: InstagramIcon, url: 'https://www.instagram.com/shreeji_prime_realty?igsh=MXEzNHlxMTBvdjFscA==', color: 'hover:text-[#E1306C]' },
                    { icon: FacebookIcon, url: 'https://www.facebook.com/share/17eW4jL1hq/', color: 'hover:text-[#1877F2]' },
                    { icon: LinkedInIcon, url: 'https://www.linkedin.com/in/tejas-parekh-69a107405?utm_source=share_via&utm_content=profile&utm_medium=member_android', color: 'hover:text-[#0A66C2]' },
                    { icon: YoutubeIcon, url: 'https://www.youtube.com/@tejasparekh-o8s', color: 'hover:text-[#FF0000]' }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 border border-outline-variant flex items-center justify-center rounded-lg text-on-surface-variant transition-all hover:scale-105 hover:bg-surface-dim ${soc.color}`}
                    >
                      <soc.icon className="w-4.5 h-4.5" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface border border-outline-variant rounded-2xl p-8 md:p-12 custom-shadow">
                
                <h3 className="text-xl font-bold font-serif mb-8 text-primary border-b border-outline-variant pb-4">
                  Property Enquiry Form
                </h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formValues.phone}
                        onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. rajesh@gmail.com"
                      value={formValues.email}
                      onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none"
                    />
                  </div>

                  {/* Grid selections */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Transaction Choice */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Transaction</label>
                      <select
                        value={formValues.transactionType}
                        onChange={(e) => setFormValues({ ...formValues, transactionType: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-3 py-3.5 text-xs text-primary focus:border-secondary outline-none font-medium cursor-pointer"
                      >
                        <option value="Outright">Outright (Buy)</option>
                        <option value="Rental">Rental (Rent)</option>
                      </select>
                    </div>

                    {/* Category Choice */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Category</label>
                      <select
                        value={formValues.category}
                        onChange={(e) => {
                          const catVal = e.target.value;
                          setFormValues({ 
                            ...formValues, 
                            category: catVal,
                            propertyType: catVal === 'Residential' ? '2 BHK' : 'Office'
                          });
                        }}
                        className="w-full bg-white border border-outline-variant rounded-lg px-3 py-3.5 text-xs text-primary focus:border-secondary outline-none font-medium cursor-pointer"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    {/* Property Type selection */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Type</label>
                      <select
                        value={formValues.propertyType}
                        onChange={(e) => setFormValues({ ...formValues, propertyType: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-3 py-3.5 text-xs text-primary focus:border-secondary outline-none font-medium cursor-pointer"
                      >
                        {formValues.category === 'Residential' 
                          ? residentialTypes.map(t => <option key={t} value={t}>{t}</option>)
                          : commercialTypes.map(t => <option key={t} value={t}>{t}</option>)
                        }
                      </select>
                    </div>

                  </div>

                  {/* Location & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Preferred Location(s)</label>
                      <input
                        type="text"
                        placeholder="e.g. Andheri West, Juhu"
                        value={formValues.location}
                        onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Budget Range</label>
                      <input
                        type="text"
                        placeholder="e.g. ₹2 Cr - ₹3 Cr or ₹50k/mo"
                        value={formValues.budget}
                        onChange={(e) => setFormValues({ ...formValues, budget: e.target.value })}
                        className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none"
                      />
                    </div>
                  </div>

                  {/* Requirements details */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-wider uppercase font-bold text-on-surface-variant block">Specific Requirements / Message</label>
                    <textarea
                      rows={4}
                      placeholder="Share details like preferred floor, vastu requirement, furnishing status, parking availability, timeline..."
                      value={formValues.requirements}
                      onChange={(e) => setFormValues({ ...formValues, requirements: e.target.value })}
                      className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3.5 text-xs text-primary focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all placeholder:text-on-surface-variant/50 font-medium outline-none resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2.5 shadow-md shadow-green-500/10 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-green-150" />
                    <span>Send Enquiry on WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-center text-on-surface-variant/75 pt-2 leading-relaxed">
                    Privacy Note: Your information is handled securely and is used exclusively for property coordination matching. We do not distribute your details.
                  </p>

                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-20 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            {/* Logo and info */}
            <div className="md:col-span-5 space-y-6">
              <span className="text-xl font-serif font-bold tracking-widest text-white block">
                SHREEJI PRIME REALTY
              </span>
              <p className="text-white/60 text-xs leading-relaxed max-w-sm font-light">
                Providing premium brokerage consulting, corporate logistics leases, and high-performance commercial property representation across Mumbai's prime corridors.
              </p>
              <div className="flex gap-3 pt-2">
                {[
                  { label: 'Privacy Policy', url: '#' },
                  { label: 'Terms', url: '#' },
                  { label: 'Contact', url: '#contact' }
                ].map(l => (
                  <a key={l.label} href={l.url} className="text-[10px] uppercase tracking-wider text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick sections */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary">Navigation</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: 'Property Explorer', url: '#explorer' },
                  { name: 'Process Workflow', url: '#how-it-works' },
                  { name: 'Expert Solutions', url: '#services' },
                  { name: 'Send Custom Request', url: '#contact' }
                ].map(item => (
                  <a key={item.name} href={item.url} className="text-xs text-white/60 hover:text-white transition-colors font-light font-sans">
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* QR Card Container */}
            <div className="md:col-span-4 flex flex-col items-start space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-secondary">Digital Business Card</h4>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <img 
                  src={qrCodeImg} 
                  alt="Business Card QR Code" 
                  className="w-20 h-20 object-contain rounded bg-white p-1" 
                />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-secondary">Tejas Parekh</p>
                  <p className="text-[9px] text-white/50">Director of Consulting</p>
                  <p className="text-[10px] font-bold text-white/90 pt-1">+91 92214 39014</p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[9px] tracking-wider text-white/35 uppercase font-medium">
              © 2026 SHREEJI PRIME REALTY PORTFOLIO. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[9px] tracking-wider text-white/35 uppercase font-medium">
              Rera Registered Brokerage Office Mumbai
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
