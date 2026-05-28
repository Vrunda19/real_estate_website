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
  CreditCard,
  Bed,
  Home,
  Building2,
  ChevronRight,
  Star,
  CheckCircle2,
  Menu,
  X,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  LayoutGrid
} from 'lucide-react';

// Data types and mock data
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: 'Residential' | 'Commercial';
  specs: {
    area: string;
    detail: string;
    icon: 'Maximize' | 'CreditCard' | 'Bed' | 'Home' | 'MapPin' | 'Building2' | 'ArrowUpRight' | 'CarEmoji';
  }[];
  imageUrl: string;
}

const properties: Property[] = [
  {
    id: '101',
    title: '1 BHK at Platinum Tower 2',
    location: 'D.N.NAGAR',
    price: '₹1.45 Cr',
    type: 'Residential',
    specs: [
      { area: '440 sq ft', detail: '1 Bedroom', icon: 'Bed' },
      { area: 'No Parking', detail: 'Mid-High Flr', icon: 'CarEmoji' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdGMw0ycJXZgrKz06Gu0nnrvOBJjsk6s_kAO28rhIBjmLVfqH8xnYbFgeO8uoJfRntvXHOYITUJLdgsCLQxoMg8bcrSSK79MvCZmd1Ab63WMnmav9Oef5Kg2JCS7HSuryae6iGfNoEoRXYQnpKb8-EF8hnZGpp4Pa5UFaYUbaoQGMsbFzawaSuVYXyD1DOJsIcuc89ytiii_piYCEVPHPpQIGERFxDdVT2tWE1R0nLDNq5zLs7eMw_WA6kpl7AxnwN8DoBq8MPDWgo'
  },
  {
    id: '102',
    title: '3 BHK in Sainik Nagar',
    location: 'AMBOLI',
    price: '₹3.00 Cr',
    type: 'Residential',
    specs: [
      { area: '1200 sq ft', detail: 'Furnished', icon: 'Maximize' },
      { area: '1 Parking', detail: 'Ready Poss.', icon: 'CarEmoji' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGH1doEkDsEqbTosjwVf9SS7oipAtpXCspbVPZsaikPouCbqutD1y0h9hp49B6IGORup95RHz81uQgYerZ-uCWbXLmqgqNToljdBJAilQFk7Sm2eNEqcjhezvQCb42SXRydW9EtMk8jNmycO-2bFExvd2cbEaADxuIZ3kbk2gF88pWW69zKOsa9VKtM-Oc-_Hzerf3eYG-RKwM0K_GbiNhT6sSbj0Tis6XPN8YBddmTPweHAiqjp0D1mW2LCF2hKBJ4xpSDuSABjMp'
  },
  {
    id: '103',
    title: 'New 2 BHK Residence',
    location: 'AMBOLI',
    price: '₹1.72 Cr',
    type: 'Residential',
    specs: [
      { area: '585 sq ft', detail: 'New Bldg', icon: 'Building2' },
      { area: 'With Parking', detail: 'Vastu Anukool', icon: 'CarEmoji' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvvauNuw3t7QBVLepqZNxoolVFyjB5WviSx2iyYdKp4OE3bL_p66gGgZ3gOWHacWeVBhBpLC3EXu8eQKi5nWRJxXAtnJCAMvLWxRn7Q2pUN8iOS5NEJDEs3p6FUv7MUE4LJRs0FaDF2_Kk-d0lyXU2UEJC-_9Oa3FAlJQMWn-p6YARGPw9NJmZ3-SDgxD8QeZSy9fORZeYKCC-KTy80ZjhL_IkV2jFQtTFf-TFyCMof3K771BqxnEwVHlTUm9JyNr3MhoNwLbIj4TY'
  },
  {
    id: '1',
    title: 'Shop at Romel Amore',
    location: 'AMBOLI',
    price: '₹50,000 / mo',
    type: 'Commercial',
    specs: [
      { area: '215 sq ft', detail: 'Dep: 2L', icon: 'Maximize' },
      { area: 'Prime Loc.', detail: 'G-Floor', icon: 'Building2' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPDkDBWOApGMiYerQSWCs2kW3NwDjUXF6j48XdIiMQfBOU8nMOc3SicqD4UAW00_1iv9v6bwa_tNVwQjVz7K-otIHtvMXf0XvGf-BUIPbQ8TbauUlzgs7-kbdKUNDoG6eorvLBs4uQCqCJMUT42dQUgkINg7pwJwOnsRBIuFa9lcSe729cawAXY5zQBT7ERtD1hjIOEdscNjQrS-1JWDFNyCkdfBq1OxOvSCcR7C7rEIbAg2FZWpQEM5xsHBPnCnO07k5EPiwV6x7q'
  },
  {
    id: '2',
    title: 'Modern 2 BHK Residence',
    location: 'AMBOLI',
    price: '₹40,000 / mo',
    type: 'Residential',
    specs: [
      { area: '650 sq ft', detail: '2 Bedrooms', icon: 'Bed' },
      { area: 'Sea View', detail: 'High Rise', icon: 'Maximize' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdGMw0ycJXZgrKz06Gu0nnrvOBJjsk6s_kAO28rhIBjmLVfqH8xnYbFgeO8uoJfRntvXHOYITUJLdgsCLQxoMg8bcrSSK79MvCZmd1Ab63WMnmav9Oef5Kg2JCS7HSuryae6iGfNoEoRXYQnpKb8-EF8hnZGpp4Pa5UFaYUbaoQGMsbFzawaSuVYXyD1DOJsIcuc89ytiii_piYCEVPHPpQIGERFxDdVT2tWE1R0nLDNq5zLs7eMw_WA6kpl7AxnwN8DoBq8MPDWgo'
  },
  {
    id: '3',
    title: '3 BHK at Prabhu Darshan',
    location: 'AMBOLI',
    price: '₹80,000 / mo',
    type: 'Residential',
    specs: [
      { area: '950 sq ft', detail: 'Furnished', icon: 'Maximize' },
      { area: '3 Bath', detail: 'Parking', icon: 'CarEmoji' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGH1doEkDsEqbTosjwVf9SS7oipAtpXCspbVPZsaikPouCbqutD1y0h9hp49B6IGORup95RHz81uQgYerZ-uCWbXLmqgqNToljdBJAilQFk7Sm2eNEqcjhezvQCb42SXRydW9EtMk8jNmycO-2bFExvd2cbEaADxuIZ3kbk2gF88pWW69zKOsa9VKtM-Oc-_Hzerf3eYG-RKwM0K_GbiNhT6sSbj0Tis6XPN8YBddmTPweHAiqjp0D1mW2LCF2hKBJ4xpSDuSABjMp'
  },
  {
    id: '4',
    title: 'Compact Urban 1 BHK',
    location: 'CEASER ROAD',
    price: '₹40,000 / mo',
    type: 'Residential',
    specs: [
      { area: 'Prime Loc.', detail: 'Residential', icon: 'MapPin' },
      { area: 'Semi Furnished', detail: 'Active Community', icon: 'Building2' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbTukWUX3fUitaj5mlZUGfC-xYsD0_7cQ7q5Q_4aBmazj6BsXDZaGvNQPn-mfpWbwcap47PYqvwz9l-05KS2XGUACLzChgBA8PEVFsmjiH-1SHwH7S7vewetl6e-OIhpGUpzoXrvid-sixNSgFAW_EjGUCjsFpj3fk92T-f6d374lx7VOSOQtga55bzy1bRzFZWr6DfYWm7isO0BjoCPY9-58qixm1znH-HJuIoetcZcJxwamO079PH-rRmed98Cp6f2A9fo98Rqaa'
  },
  {
    id: '5',
    title: '2 BHK with Terrace',
    location: 'ANDHERI WEST',
    price: '₹70,000 / mo',
    type: 'Residential',
    specs: [
      { area: '670 sq ft', detail: 'Pvt Terrace', icon: 'Maximize' },
      { area: 'Penthouse', detail: 'Private Entry', icon: 'ArrowUpRight' }
    ],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvvauNuw3t7QBVLepqZNxoolVFyjB5WviSx2iyYdKp4OE3bL_p66gGgZ3gOWHacWeVBhBpLC3EXu8eQKi5nWRJxXAtnJCAMvLWxRn7Q2pUN8iOS5NEJDEs3p6FUv7MUE4LJRs0FaDF2_Kk-d0lyXU2UEJC-_9Oa3FAlJQMWn-p6YARGPw9NJmZ3-SDgxD8QeZSy9fORZeYKCC-KTy80ZjhL_IkV2jFQtTFf-TFyCMof3K771BqxnEwVHlTUm9JyNr3MhoNwLbIj4TY'
  }
];

const SpecIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'Maximize': return <Maximize className="w-4 h-4 text-outline" />;
    case 'CreditCard': return <CreditCard className="w-4 h-4 text-outline" />;
    case 'Bed': return <Bed className="w-4 h-4 text-outline" />;
    case 'Home': return <Home className="w-4 h-4 text-outline" />;
    case 'MapPin': return <MapPin className="w-4 h-4 text-outline" />;
    case 'Building2': return <Building2 className="w-4 h-4 text-outline" />;
    case 'ArrowUpRight': return <ArrowUpRight className="w-4 h-4 text-outline" />;
    case 'CarEmoji': return <span className="text-sm">🚗</span>;
    default: return null;
  }
};

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function App() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Residential' | 'Commercial'>('All');
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = properties.filter(p =>
    activeFilter === 'All' || p.type === activeFilter
  );

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md h-20 shadow-sm' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`text-lg sm:text-xl md:text-2xl font-serif font-bold tracking-tighter ${scrolled ? 'text-primary' : 'text-white'}`}>
              SHREEJI PRIME REALTY
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {['Properties', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm tracking-widest uppercase font-serif transition-colors ${scrolled ? 'text-on-surface-variant hover:text-primary' : 'text-white/80 hover:text-white'
                  }`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hidden lg:block bg-primary text-on-primary px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-on-primary hover:text-primary transition-all duration-300 border border-primary">
              Consultation
            </button>
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className={scrolled ? 'text-primary' : 'text-white'} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-white p-10 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-10 right-10" onClick={() => setIsMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
            {['Properties', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-serif uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <img
            className="w-full h-full object-cover brightness-[0.65]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0pkOzXbZ7r16SNfVLkkfPgXxq9XMGwyWlCBcyF6fdmF_yvCB68mDVW0BQ_EFsLH0KxNwHdrJ5ZI9KIkdCd2IGhnpw87pcxVUfhgLFTyOIpjfn0O3szSorpippO-Gt4Yyn7oqbswhYGVdbcuWrA4UJO-s-b28CYth0nHMS8Y5eI-BGSHNQqpJR7-GZkw1vAShypolJH0Bmo0p9kkVw37v85PHVIA_HPOn3Untu6GtWJgsJSAriKGaEopqM8P30cvApD-CVGysm8ci9"
            alt="Luxury Villa"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full pt-12 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl bg-white/5 backdrop-blur-xl p-8 md:p-14 border border-white/10"
          >
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/70 block mb-6 uppercase">
              Established Excellence
            </span>
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-8 leading-tight">
              Your Gateway to <br />
              <span className="italic font-normal">Exclusive</span> Real Estate
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              Discover a curated collection of ultra-premium properties designed for the discerning few. From urban penthouses to tranquil estates.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-white text-primary px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-transparent hover:text-white border border-white transition-all duration-300">
                Explore Listings
              </button>
              <button className="border border-white/50 text-white px-10 py-5 text-xs tracking-widest uppercase font-bold hover:bg-white hover:text-primary transition-all duration-300">
                Private Tour
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase mb-6 block">
              The Broker
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Dedicated Service in Local Markets
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              As a dynamic new agency in the real estate market, we bring fresh perspectives and dedicated energy to property transactions. Over the past 6 months, we have successfully collaborated with established broker networks to facilitate seamless property deals and lifestyle transformations.
            </p>
            <div className="flex border-t border-b border-outline-variant py-8 gap-12">
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-1">6+</div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-on-surface-variant">Months Experience</span>
              </div>
              <div className="w-px bg-outline-variant" />
              <div>
                <div className="text-3xl font-serif font-bold text-primary mb-1">Growing</div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-on-surface-variant">Broker Network</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:col-start-7 relative"
          >
            <div className="aspect-[4/5] overflow-hidden custom-shadow">
              <img
                src={buildingsImg}
                alt="Modern Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-4 sm:left-6 lg:-left-12 md:-bottom-12 bg-primary-container p-8 md:p-12 hidden sm:block max-w-[320px]">
              <p className="text-white text-xl md:text-2xl font-serif italic leading-snug">
                "Excellence is not an act, but a habit."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Listings */}
      <section id="properties" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 md:mb-24">
            <div>
              <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase mb-6 block">
                Curated Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">Featured Listings</h2>
            </div>
            <div className="flex gap-8 border-b border-outline-variant pb-2">
              {['All', 'Residential', 'Commercial'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`text-[10px] tracking-widest uppercase font-bold transition-all relative ${activeFilter === filter ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                >
                  {filter}
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute -bottom-[10px] left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProperties.map((property) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={property.id}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-8 custom-shadow bg-surface-container-low">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="px-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] tracking-[0.15em] font-bold text-secondary uppercase">
                        {property.location}
                      </span>
                      <span className="text-xl font-bold text-primary">{property.price}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-6 group-hover:text-secondary transition-colors">
                      {property.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-outline-variant">
                      {property.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <SpecIcon icon={spec.icon} />
                          <span className="text-xs font-medium text-on-surface-variant">{spec.area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase mb-6 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Comprehensive Solutions</h2>
            <p className="text-on-surface-variant text-lg">
              We provide end-to-end real estate services tailored to the specific needs of property owners and investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Strategic Buying',
                icon: ShieldCheck,
                desc: 'Data-driven property acquisition tailored to your long-term portfolio goals.'
              },
              {
                title: 'Expert Selling',
                icon: Zap,
                desc: 'Premium marketing strategies to ensure your property reaches the right global audience.'
              },
              {
                title: 'Rental Management',
                icon: TrendingUp,
                desc: 'Complete tenant screening and maintenance oversight for a truly passive income stream.'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-14 bg-white border border-outline-variant hover:border-secondary transition-all hover-lift"
              >
                <service.icon className="w-12 h-12 text-secondary mb-10" />
                <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-primary-container text-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 text-white">
            <span className="text-[10px] tracking-[0.2em] font-semibold text-white/50 uppercase mb-6 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
              Inquire About Exclusive Listings
            </h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-lg">Andheri West, Mumbai - 400058</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center border border-white/10">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-2 font-sans">Call Us</div>
                  <p className="text-lg">+91 92214 39014</p>
                </div>
              </div>
              <div className="pt-8 flex flex-wrap gap-4">
                <a href="https://wa.me/919221439014" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:scale-110 transition-transform group shadow-lg">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                </a>
                <a href="https://www.instagram.com/shreeji_prime_realty?igsh=MXEzNHlxMTBvdjFscA==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:scale-110 transition-transform group shadow-lg">
                  <InstagramIcon className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/share/17eW4jL1hq/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:scale-110 transition-transform group shadow-lg">
                  <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                </a>
                <a href="https://www.linkedin.com/in/tejas-parekh-69a107405?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:scale-110 transition-transform group shadow-lg">
                  <LinkedInIcon className="w-6 h-6 text-[#0A66C2]" />
                </a>
                <a href="https://www.youtube.com/@tejasparekh-o8s" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white flex items-center justify-center rounded-full hover:scale-110 transition-transform group shadow-lg">
                  <YoutubeIcon className="w-6 h-6 text-[#FF0000]" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="bg-white p-8 md:p-14 custom-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-secondary transition-colors placeholder:text-on-surface-variant font-medium text-primary"
                  />
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-secondary transition-colors placeholder:text-on-surface-variant font-medium text-primary"
                  />
                </div>
              </div>
              <div className="mb-12">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border-0 border-b border-outline-variant py-4 px-0 focus:ring-0 focus:border-secondary transition-colors placeholder:text-on-surface-variant font-medium text-primary"
                />
              </div>
              <button className="w-full bg-primary text-on-primary py-6 text-xs tracking-[0.2em] uppercase font-bold hover:bg-secondary transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
          <span className="text-2xl font-serif font-bold text-white tracking-[1px] mb-12">
            SHREEJI PRIME REALTY PORTFOLIO
          </span>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-16">
            {[
              { name: 'Privacy Policy', url: '#' },
              { name: 'Terms of Service', url: '#' },
              { name: 'Cookie Settings', url: '#' },
              { name: 'WhatsApp', url: 'https://wa.me/919221439014' },
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tejas-parekh-69a107405?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
              { name: 'Facebook', url: 'https://www.facebook.com/share/17eW4jL1hq/' },
              { name: 'Instagram', url: 'https://www.instagram.com/shreeji_prime_realty?igsh=MXEzNHlxMTBvdjFscA==' },
              { name: 'YouTube', url: 'https://www.youtube.com/@tejasparekh-o8s' },
            ].map(link => (
              <a
                key={link.name}
                href={link.url}
                target={link.url !== '#' ? "_blank" : "_self"}
                rel={link.url !== '#' ? "noopener noreferrer" : ""}
                className="text-[10px] tracking-widest uppercase font-semibold text-white/40 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center mb-16">
            <img src={qrCodeImg} alt="Digital Business Card QR Code" className="w-64 h-auto object-contain rounded-xl shadow-2xl" />
          </div>
          <p className="text-[10px] tracking-[0.1em] font-medium text-white/20 uppercase">
            © 2024 SHREEJI PRIME REALTY PORTFOLIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
