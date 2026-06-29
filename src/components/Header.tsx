import { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentTab: Page;
  setCurrentTab: (tab: Page) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Header({ currentTab, setCurrentTab, lang, setLang }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; id: Page }[] = [
    { label: t.menuHome, id: 'home' },
    { label: t.menuServices, id: 'services' },
    { label: t.menuAbout, id: 'about' },
    { label: t.menuGallery, id: 'gallery' },
    { label: t.menuContact, id: 'contact' },
  ];

  const handleNavClick = (tab: Page) => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    const nextLang = lang === 'EN' ? 'ES' : 'EN';
    setLang(nextLang);
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3 border-b border-gray-100' 
          : 'bg-white/95 md:bg-white/80 md:backdrop-blur-md py-4 border-b border-gray-200/50'
      }`}
    >
      {/* Upper Top Info Bar */}
      <div className="hidden lg:block bg-zinc-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-300" />
              {t.phoneNumber}
            </span>
            <span className="text-zinc-600">|</span>
            <span>{t.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium text-zinc-300">{t.spanishAssistance}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* LOGO */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3.5 cursor-pointer text-left group"
        >
          {/* Custom circular dripping logo as SVG */}
          <div className="w-11 h-11 md:w-12 md:h-12 relative flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-950 group-hover:scale-105 transition-all duration-200" fill="none">
              {/* Solid Black Background Circle (offset slightly up to y=46, r=44) */}
              <circle cx="50" cy="46" r="44" fill="currentColor" />
              
              {/* Organic Paint Drips at the Bottom of the Circle in the same color */}
              <g fill="currentColor">
                {/* Drip 1 (Far Left) */}
                <path d="M 12 60 C 12 75 8 82 11 86 C 13 89 16 87 16 70 Z" />
                {/* Drip 2 */}
                <path d="M 18 65 C 18 80 15 88 18 92 C 21 95 24 93 24 75 Z" />
                {/* Drip 3 */}
                <path d="M 27 70 C 27 82 25 87 27 90 C 29 92 31 90 31 75 Z" />
                {/* Drip 4 */}
                <path d="M 35 72 C 35 88 32 94 35 97 C 37 99 40 97 40 78 Z" />
                {/* Drip 5 (Deepest center) */}
                <path d="M 48 74 C 48 93 45 101 48 104 C 50 106 53 104 53 80 Z" />
                {/* Drip 6 */}
                <path d="M 59 73 C 59 90 57 96 59 99 C 61 101 64 99 64 79 Z" />
                {/* Drip 7 */}
                <path d="M 70 70 C 70 85 68 91 70 94 C 72 96 74 94 74 76 Z" />
                {/* Drip 8 */}
                <path d="M 80 65 C 80 78 78 84 80 87 C 82 89 84 87 84 72 Z" />
                {/* Drip 9 (Far Right) */}
                <path d="M 88 60 C 88 72 86 78 88 81 C 90 83 92 81 92 68 Z" />
              </g>

              {/* Inner White Circular Ring */}
              <circle cx="50" cy="46" r="40" stroke="white" strokeWidth="1.25" fill="none" />

              {/* Stars Left of "FF" */}
              <g fill="white">
                {/* Left Star 1 (Outer, smaller) */}
                <polygon points="21,24 22,25.5 24,25.5 22.5,26.5 23,28.5 21,27.5 19,28.5 19.5,26.5 18,25.5 20,25.5" />
                {/* Left Star 2 (Middle, larger) */}
                <polygon points="28,19 29.5,21 32,21 30,22.5 30.5,25 28,23.5 25.5,25 26,22.5 24,21 26.5,21" />
                {/* Left Star 3 (Inner, smaller) */}
                <polygon points="35,24 36,25.5 38,25.5 36.5,26.5 37,28.5 35,27.5 33,28.5 33.5,26.5 32,25.5 34,25.5" />
              </g>

              {/* Letters "FF" in Elegant White Serif */}
              <text x="50" y="32" fontSize="19" fontWeight="900" fontFamily="Georgia, serif" fill="white" textAnchor="middle" letterSpacing="0.05em">FF</text>

              {/* Stars Right of "FF" */}
              <g fill="white">
                {/* Right Star 1 (Inner, smaller) */}
                <polygon points="65,24 66,25.5 68,25.5 66.5,26.5 67,28.5 65,27.5 63,28.5 63.5,26.5 62,25.5 64,25.5" />
                {/* Right Star 2 (Middle, larger) */}
                <polygon points="72,19 73.5,21 76,21 74,22.5 74.5,25 72,23.5 69.5,25 70,22.5 68,21 70.5,21" />
                {/* Right Star 3 (Outer, smaller) */}
                <polygon points="79,24 80,25.5 82,25.5 80.5,26.5 81,28.5 79,27.5 77,28.5 77.5,26.5 76,25.5 78,25.5" />
              </g>

              {/* "Painting" Calligraphy Text in White */}
              <text 
                x="50" 
                y="51" 
                fontSize="21" 
                fontWeight="bold" 
                fontFamily="'Great Vibes', 'Playball', 'Brush Script MT', 'Pacifico', cursive" 
                fill="white" 
                textAnchor="middle"
                transform="rotate(-5 50 51)"
              >
                Painting
              </text>

              {/* White Paint Roller */}
              <g>
                {/* Roller Sleeve */}
                <rect x="36" y="58" width="28" height="6.5" rx="1.5" fill="white" />
                
                {/* Wire Frame Line behind the roller */}
                <path 
                  d="M 36 61.25 L 32.5 61.25 C 31.5 61.25 31.5 66.5 32.5 66.5 L 43 66.5" 
                  stroke="white" 
                  strokeWidth="1.25" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
                
                {/* Roller Handle Extension */}
                <rect x="43" y="65.5" width="10" height="2" rx="0.5" fill="white" />
              </g>

              {/* "AND SERVICES" in bold sans-serif */}
              <text 
                x="50" 
                y="77" 
                fontSize="6" 
                fontWeight="900" 
                fontFamily="'Inter', 'Arial Black', sans-serif" 
                fill="white" 
                textAnchor="middle" 
                letterSpacing="0.12em"
              >
                AND SERVICES
              </text>

              {/* Lower Decorative Stars */}
              <g fill="white">
                {/* Lower Left Star */}
                <polygon points="26,74 27,75 28.5,75 27.25,76 27.75,77.5 26,76.5 24.25,77.5 24.75,76 23.5,75 25,75" />
                {/* Lower Right Star */}
                <polygon points="74,74 75,75 76.5,75 75.25,76 75.75,77.5 74,76.5 72.25,77.5 72.75,76 71.5,75 73,75" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tight text-zinc-950">
              FF Painting & Services
            </span>
            <span className="text-[10px] tracking-wider text-zinc-500 uppercase font-black -mt-1">
              DFW Experienced Painters • Hablamos Español
            </span>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-bold tracking-wide cursor-pointer transition-colors ${
                currentTab === item.id
                  ? 'text-zinc-950 border-b-2 border-zinc-950 pb-1'
                  : 'text-gray-500 hover:text-zinc-950 hover:border-b-2 hover:border-zinc-200 pb-1'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Language Selector Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-700 cursor-pointer transition-all"
            title="Toggle Language / Cambiar Idioma"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-600" />
            <span className={lang === 'EN' ? 'text-zinc-950 font-black' : ''}>EN</span>
            <span className="text-zinc-300">/</span>
            <span className={lang === 'ES' ? 'text-zinc-950 font-black' : ''}>ES</span>
          </button>

          {/* CTAs */}
          <button
            onClick={() => handleNavClick('residential')}
            className={`text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg border-2 border-zinc-900 bg-white text-zinc-900 shadow-sm hover:bg-zinc-50 transition-all cursor-pointer ${
              currentTab === 'residential' ? 'ring-2 ring-offset-2 ring-zinc-950' : ''
            }`}
          >
            {t.quoteBtn}
          </button>

          <button
            onClick={() => handleNavClick('commercial')}
            className={`text-xs font-bold uppercase tracking-wider py-2 px-3.5 rounded-lg border-2 border-zinc-900 bg-zinc-900 text-white shadow-sm hover:bg-black hover:border-black transition-all cursor-pointer ${
              currentTab === 'commercial' ? 'ring-2 ring-offset-2 ring-zinc-950' : ''
            }`}
          >
            {t.estimateBtn}
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language selector */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 rounded-md border border-zinc-200 text-zinc-700 mr-1"
          >
            <Globe className="w-3 h-3 text-zinc-600" />
            <span>{lang}</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 text-zinc-950 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-3 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-lg font-bold ${
                  currentTab === item.id
                    ? 'bg-zinc-100 text-zinc-950 border-l-4 border-zinc-950'
                    : 'text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <hr className="border-gray-100 my-1" />

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => handleNavClick('residential')}
              className="w-full text-center text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg bg-white border-2 border-zinc-900 text-zinc-900 shadow-sm"
            >
              {t.quoteBtn}
            </button>
            <button
              onClick={() => handleNavClick('commercial')}
              className="w-full text-center text-sm font-bold uppercase tracking-wider py-2.5 px-4 rounded-lg bg-zinc-900 text-white shadow-sm hover:bg-black"
            >
              {t.estimateBtn}
            </button>
          </div>

          <div className="text-center text-xs text-zinc-500 mt-2 font-medium flex flex-col gap-1">
            <span>📞 {t.phoneNumber}</span>
            <span>📍 {t.hours}</span>
          </div>
        </div>
      )}
    </header>
  );
}
