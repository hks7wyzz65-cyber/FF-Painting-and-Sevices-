import { useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Home as HomeIcon, 
  Layers, 
  Grid, 
  Sparkles, 
  Wrench, 
  FolderKanban, 
  Hammer, 
  ChevronRight, 
  Star, 
  MessageSquare, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Languages, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  ChevronDown,
  BookOpen,
  ArrowRight
} from 'lucide-react';

import { Language, Page, Review, ServiceDetail } from './types';
import { servicesData, reviews, translations } from './data/translations';
import Header from './components/Header';
import Footer from './components/Footer';
import TrustBar from './components/TrustBar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import GalleryGrid from './components/GalleryGrid';
import ContactInfo from './components/ContactInfo';
import { ResidentialQuoteForm, CommercialEstimateForm } from './components/QuoteForms';

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [currentTab, setCurrentTab] = useState<Page>('home');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<any | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Load submissions on mount
  useEffect(() => {
    const saved = localStorage.getItem('ff_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const t = translations[lang];

  const handleFormSuccess = (payload: any) => {
    const updated = [payload, ...submissions];
    setSubmissions(updated);
    localStorage.setItem('ff_submissions', JSON.stringify(updated));
    setLastSubmission(payload);
    setShowSuccessModal(true);
  };

  // Maps icon names to their components
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Paintbrush': return Paintbrush;
      case 'Home': return HomeIcon;
      case 'Layers': return Layers;
      case 'Grid': return Grid;
      case 'Sparkles': return Sparkles;
      case 'Wrench': return Wrench;
      case 'FolderKanban': return FolderKanban;
      case 'Hammer': return Hammer;
      default: return Paintbrush;
    }
  };

  const navigateToServiceDetail = (serviceId: string) => {
    setCurrentTab('services');
    setExpandedService(serviceId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* HEADER */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        lang={lang} 
        setLang={setLang} 
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1">

        {/* ==================== 1. HOME PAGE VIEW ==================== */}
        {currentTab === 'home' && (
          <div className="animate-fadeIn">
            {/* HERO SECTION */}
            <section className="relative bg-zinc-950 text-white py-16 md:py-28 overflow-hidden border-b border-zinc-900">
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
              
              <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Headline and CTAs */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                    {/* Bilingual Badge */}
                    <div className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
                      <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse"></span>
                      <span className="text-xs md:text-sm font-bold tracking-wide uppercase text-zinc-300">
                        {t.bilingualBadgeTitle} – {t.bilingualBadgeSubtitle}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none text-white">
                      {t.heroTitle}
                    </h1>

                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans font-medium">
                      {t.heroSubtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                      <button
                        onClick={() => setCurrentTab('residential')}
                        className="bg-white hover:bg-zinc-100 text-zinc-950 font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 uppercase tracking-wider text-sm md:text-base cursor-pointer"
                      >
                        {t.freeQuoteBtn}
                      </button>
                      <a
                        href={`tel:${t.phoneNumber.replace(/\D/g, '')}`}
                        className="bg-transparent hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl border-2 border-white/25 hover:border-white/50 transition-all flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                      >
                        <Phone className="w-4 h-4 text-zinc-300" />
                        <span>{t.callUs}: {t.phoneNumber}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Hero Graphic / Photo Card */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900">
                      <img 
                        src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80" 
                        alt="FF Painting Crew At Work" 
                        referrerPolicy="no-referrer"
                        className="w-full h-[280px] md:h-[350px] object-cover filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent flex flex-col justify-end p-6">
                        <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Dallas, Fort Worth & Arlington</span>
                        <h3 className="text-white font-bold text-lg md:text-xl tracking-tight mt-1">Serving DFW Communities</h3>
                        <p className="text-xs text-zinc-300 font-sans mt-1">Family-owned, professional, and highly recommended painting crew.</p>
                      </div>
                    </div>
                    {/* Floating mini badge */}
                    <div className="absolute -bottom-5 -left-5 bg-white text-zinc-950 p-4 rounded-xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                      <div className="p-2 bg-slate-50 rounded-lg text-zinc-900">
                        <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-slate-400 uppercase">DFW Rating</span>
                        <span className="text-sm font-extrabold text-slate-800">5.0 Star Painting Service</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* TRUST BAR */}
            <TrustBar lang={lang} />

            {/* 8 CARD SERVICES GRID */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
                  {lang === 'EN' ? 'Expert Handiwork' : 'Mano de Obra Experta'}
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                  {t.servicesSectionTitle}
                </h2>
                <p className="text-slate-500 font-sans leading-relaxed text-sm md:text-base">
                  {t.servicesSectionSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {servicesData.map((service) => {
                  const Icon = getServiceIcon(service.icon);
                  return (
                    <div 
                      key={service.id}
                      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
                    >
                      <div>
                        {/* Icon and Accent */}
                        <div className="w-12 h-12 rounded-xl bg-zinc-900/5 text-zinc-900 flex items-center justify-center mb-5 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300 shadow-inner">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        
                        <h3 className="font-extrabold text-slate-800 text-lg tracking-tight mb-2.5">
                          {lang === 'EN' ? service.titleEn : service.titleEs}
                        </h3>
                        
                        <p className="text-slate-500 text-sm font-sans leading-relaxed mb-4">
                          {lang === 'EN' ? service.descriptionEn : service.descriptionEs}
                        </p>
                      </div>

                      <button
                        onClick={() => navigateToServiceDetail(service.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 group-hover:text-zinc-500 transition-colors pt-2 border-t border-slate-50 uppercase tracking-wider cursor-pointer"
                      >
                        <span>{lang === 'EN' ? 'Learn More' : 'Saber Más'}</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* BILINGUAL COMMITMENT CALLOUT */}
            <section className="bg-zinc-900 text-white py-16 md:py-20 relative overflow-hidden border-y border-zinc-800">
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-15"></div>
              
              <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 text-center space-y-6">
                <span className="bg-white text-zinc-950 font-black text-xs md:text-sm tracking-widest px-4 py-1.5 rounded-full uppercase">
                  {lang === 'EN' ? 'Bilingual Guarantee' : 'Garantía Bilingüe'}
                </span>
                
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                  {t.bilingualCommitmentTitle}
                </h2>
                
                <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
                  {t.bilingualCommitmentText}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setLang('ES');
                      setCurrentTab('residential');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-block bg-transparent hover:bg-white text-white hover:text-zinc-950 border-2 border-zinc-700 font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    {t.bilingualCommitmentCTA}
                  </button>
                </div>
              </div>
            </section>

            {/* INTERACTIVE BEFORE & AFTER SLIDER */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6 bg-white/50 border-b border-slate-200">
              <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                  {t.beforeAfterTitle}
                </h2>
                <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
                  {t.beforeAfterSubtitle}
                </p>
              </div>

              <BeforeAfterSlider lang={lang} />
            </section>

            {/* REVIEWS & SOCIAL PROOF */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                  {t.socialProofTitle}
                </h2>
                <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
                  {t.socialProofSubtitle}
                </p>
                <div className="flex justify-center items-center gap-1 pt-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                  ))}
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider ml-2 font-mono">{t.reviewsCount}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-extrabold text-slate-800 tracking-tight">{rev.name}</span>
                        <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-full font-sans">{rev.source}</span>
                      </div>
                      
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-zinc-900 text-zinc-900" />
                        ))}
                      </div>

                      <p className="text-slate-600 text-sm font-sans leading-relaxed italic">
                        "{lang === 'EN' ? rev.textEn : rev.textEs}"
                      </p>
                    </div>

                    <span className="text-xs text-slate-400 font-sans mt-4 self-end">{rev.date}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}


        {/* ==================== 2. SERVICES PAGE VIEW ==================== */}
        {currentTab === 'services' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              {/* Intro section */}
              <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
                <span className="bg-zinc-100 text-zinc-900 font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full">
                  FF Services
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {t.servicesPageIntroTitle}
                </h1>
                <p className="text-slate-500 font-sans text-base md:text-lg leading-relaxed">
                  {t.servicesPageIntroSubtitle}
                </p>
              </div>

              {/* Three detailed blocks required by blueprint */}
              <div className="space-y-12 mb-16">
                
                {/* Block 1 */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 h-52 md:h-64 rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=600&q=80" 
                      alt="Drywall and Taping Prep Work" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">Precision Foundation</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                      {t.serviceBlock1Title}
                    </h2>
                    <p className="text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                      {t.serviceBlock1Text}
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 font-sans pt-1">
                      <span>✓ Taping & Bedding</span>
                      <span>✓ Crack Repair</span>
                      <span>✓ Match Textures</span>
                    </div>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 md:order-last h-52 md:h-64 rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" 
                      alt="Cabinet Painting and Wood Staining" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 font-mono">Specialized Spray Finishes</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                      {t.serviceBlock2Title}
                    </h2>
                    <p className="text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                      {t.serviceBlock2Text}
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 font-sans pt-1">
                      <span>✓ High-End Lacquer Polyurethane</span>
                      <span>✓ Kitchen & Vanities</span>
                      <span>✓ Deck/Fence Sealing</span>
                    </div>
                  </div>
                </div>

                {/* Block 3 */}
                <div className="bg-white rounded-3xl p-6 md:p-10 shadow-md border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 h-52 md:h-64 rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80" 
                      alt="Popcorn Ceiling Texture Removal" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-8 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">Ceiling Modernization</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                      {t.serviceBlock3Title}
                    </h2>
                    <p className="text-slate-600 font-sans leading-relaxed text-sm md:text-base">
                      {t.serviceBlock3Text}
                    </p>
                    <div className="flex gap-4 text-xs font-semibold text-slate-400 font-sans pt-1">
                      <span>✓ Dust-Contained Scrape</span>
                      <span>✓ Smooth Skim Coat</span>
                      <span>✓ Bright White Painting</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Accordion / Full Services List Detail Blocks with State */}
              <div className="space-y-4 max-w-4xl mx-auto">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight text-center mb-6">
                  {lang === 'EN' ? 'Detailed Service Process' : 'Proceso Detallado de Nuestros Servicios'}
                </h3>
                {servicesData.map((service) => {
                  const Icon = getServiceIcon(service.icon);
                  const isExpanded = expandedService === service.id;
                  return (
                    <div 
                      key={service.id} 
                      className={`bg-white rounded-xl border transition-all ${isExpanded ? 'border-zinc-900 shadow-md ring-1 ring-zinc-900' : 'border-slate-200'}`}
                    >
                      <button
                        onClick={() => setExpandedService(isExpanded ? null : service.id)}
                        className="w-full text-left py-4.5 px-6 flex items-center justify-between cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-zinc-900" />
                          <span className="font-extrabold text-slate-800 tracking-tight text-sm md:text-base">
                            {lang === 'EN' ? service.titleEn : service.titleEs}
                          </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-6 pt-1 border-t border-slate-50 text-slate-600 font-sans text-sm md:text-base leading-relaxed space-y-3 animate-fadeIn">
                          <p>{lang === 'EN' ? service.fullDetailsEn : service.fullDetailsEs}</p>
                          <div className="flex justify-between items-center pt-4">
                            <span className="text-xs text-zinc-900 font-extrabold tracking-wider uppercase">★ FF Quality Standard</span>
                            <button
                              onClick={() => {
                                setCurrentTab('residential');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="text-xs font-bold text-zinc-900 hover:text-zinc-500 uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                            >
                              <span>Book {lang === 'EN' ? 'this service' : 'este servicio'}</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}


        {/* ==================== 3. ABOUT PAGE VIEW ==================== */}
        {currentTab === 'about' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Image */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-800">
                    <img 
                      src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80" 
                      alt="FF Painting Crew" 
                      referrerPolicy="no-referrer"
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-zinc-950 text-white py-2 px-4 rounded-xl font-bold text-xs border border-white/25 shadow-md">
                      Est. 2025
                    </div>
                  </div>
                </div>

                {/* Right Column: Text */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
                    {lang === 'EN' ? 'About Us' : 'Sobre Nosotros'}
                  </span>
                  
                  <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                    {t.aboutTitle}
                  </h1>

                  <h3 className="text-xl font-bold text-zinc-900 tracking-tight mt-4">
                    {t.aboutStoryTitle}
                  </h3>

                  <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    {t.aboutStoryParagraph1}
                  </p>

                  <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
                    {t.aboutStoryParagraph2}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base">{t.aboutValue1Title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans">{t.aboutValue1Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base">{t.aboutValue2Title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans">{t.aboutValue2Desc}</p>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-base">{t.aboutValue3Title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans">{t.aboutValue3Desc}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}


        {/* ==================== 4. GALLERY PAGE VIEW ==================== */}
        {currentTab === 'gallery' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 bg-zinc-100 px-3 py-1 rounded-full">
                  FF Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {t.galleryTitle}
                </h1>
                <p className="text-slate-500 font-sans text-base leading-relaxed">
                  {t.gallerySubtitle}
                </p>
              </div>

              {/* Interactive gallery grid */}
              <GalleryGrid lang={lang} />

            </div>
          </div>
        )}


        {/* ==================== 5. RESIDENTIAL QUOTE VIEW ==================== */}
        {currentTab === 'residential' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-zinc-900 font-bold text-xs uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-full">
                  Residential Estimates
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {t.resFormTitle}
                </h1>
                <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
                  {t.resFormSubtitle}
                </p>
              </div>

              {/* Form component */}
              <ResidentialQuoteForm lang={lang} onSuccessSubmit={handleFormSuccess} />

            </div>
          </div>
        )}


        {/* ==================== 6. COMMERCIAL ESTIMATE VIEW ==================== */}
        {currentTab === 'commercial' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="text-zinc-900 font-bold text-xs uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-full">
                  Commercial Procurement
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {t.commFormTitle}
                </h1>
                <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
                  {t.commFormSubtitle}
                </p>
              </div>

              {/* Form component */}
              <CommercialEstimateForm lang={lang} onSuccessSubmit={handleFormSuccess} />

            </div>
          </div>
        )}


        {/* ==================== 7. CONTACT VIEW ==================== */}
        {currentTab === 'contact' && (
          <div className="animate-fadeIn py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 bg-zinc-100 px-3.5 py-1 rounded-full font-mono">
                  Get In Touch
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                  {t.contactTitle}
                </h1>
                <p className="text-slate-500 font-sans text-sm md:text-base leading-relaxed">
                  {t.contactSubtitle}
                </p>
              </div>

              {/* Contact Information component */}
              <ContactInfo lang={lang} />

            </div>
          </div>
        )}

        {/* ==================== PERSISTED ESTIMATES DATABASE DASHBOARD ==================== */}
        {submissions.length > 0 && (
          <section className="bg-slate-100 border-t border-slate-200 py-12 md:py-16">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-slate-800 text-lg">
                    {lang === 'EN' ? 'Recent Estimate Requests (Saved locally)' : 'Solicitudes Recientes (Guardadas localmente)'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('ff_submissions');
                    setSubmissions([]);
                  }}
                  className="text-xs font-bold text-red-500 hover:text-red-700 uppercase cursor-pointer animate-pulse"
                >
                  {lang === 'EN' ? 'Clear History' : 'Borrar Historial'}
                </button>
              </div>

              <div className="space-y-4">
                {submissions.map((sub, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          sub.type === 'residential' ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
                        }`}>
                          {sub.type === 'residential' ? t.quoteBtn : t.estimateBtn}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {new Date(sub.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        {lang === 'EN' ? 'Estimator assigned' : 'Estimador asignado'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 font-sans">
                      <div>
                        <strong>{lang === 'EN' ? 'Name / Company' : 'Nombre / Empresa'}:</strong> {sub.name || sub.companyName}
                      </div>
                      <div>
                        <strong>{lang === 'EN' ? 'Contact Phone' : 'Teléfono'}:</strong> {sub.phone}
                      </div>
                      <div>
                        <strong>{lang === 'EN' ? 'Email Address' : 'Correo'}:</strong> {sub.email}
                      </div>
                      {sub.address && (
                        <div>
                          <strong>{lang === 'EN' ? 'Property Address' : 'Dirección'}:</strong> {sub.address}
                        </div>
                      )}
                      {sub.propertyType && (
                        <div>
                          <strong>{lang === 'EN' ? 'Property Type' : 'Tipo'}:</strong> {sub.propertyType.toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                      {sub.services && sub.services.length > 0 && (
                        <span className="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded">
                          Services: {sub.services.join(', ')}
                        </span>
                      )}
                      {sub.scope && (
                        <span className="bg-slate-50 border border-slate-200 py-1 px-2.5 rounded">
                          Scope: {sub.scope}
                        </span>
                      )}
                      {sub.photoCount > 0 && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 py-1 px-2.5 rounded flex items-center gap-1">
                          📸 {sub.photoCount} files uploaded: {sub.photoNames?.join(', ')}
                        </span>
                      )}
                      {sub.rfpCount > 0 && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 py-1 px-2.5 rounded flex items-center gap-1">
                          📄 {sub.rfpCount} RFP/Specs uploaded: {sub.rfpNames?.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <Footer setCurrentTab={setCurrentTab} lang={lang} />

      {/* SUCCESS MODAL POPUP */}
      {showSuccessModal && lastSubmission && (
        <div className="fixed inset-0 z-[100] bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {t.formSuccessTitle}
            </h3>
            
            <p className="text-slate-500 font-sans text-sm leading-relaxed">
              {t.formSuccessText}
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs font-sans space-y-1">
              <p><strong>{lang === 'EN' ? 'Reference Type' : 'Tipo de Referencia'}:</strong> {lastSubmission.type === 'residential' ? 'Residential Quote' : 'Commercial RFP'}</p>
              <p><strong>{lang === 'EN' ? 'Contact Name' : 'Nombre'}:</strong> {lastSubmission.name || lastSubmission.contactPerson}</p>
              <p><strong>{lang === 'EN' ? 'Assigned' : 'Asignado'}:</strong> David Flores (Estimator Leads)</p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold tracking-wide uppercase transition-all cursor-pointer"
            >
              {t.formSuccessBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
