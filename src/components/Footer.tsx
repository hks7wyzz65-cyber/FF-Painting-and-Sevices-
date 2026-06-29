import { Phone, Mail, Clock, MapPin, Globe, Users } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  setCurrentTab: (tab: Page) => void;
  lang: Language;
}

export default function Footer({ setCurrentTab, lang }: FooterProps) {
  const t = translations[lang];

  const handleNav = (tab: Page) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="bg-white text-zinc-950 font-black text-lg px-2 py-0.5 rounded">FF</span>
              <span className="font-extrabold text-base tracking-tight">Painting & Services</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {lang === 'EN' 
                ? 'Providing quality residential and commercial painting, drywall repair, and cabinet refinishing across Dallas-Fort Worth. We take pride in quality work, cleanliness, and clear communication.'
                : 'Ofrecemos pintura residencial y comercial de calidad, reparación de drywall y acabado de gabinetes en Dallas-Fort Worth. Nos enorgullecemos del trabajo de calidad, la limpieza y la comunicación clara.'}
            </p>
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold font-sans">
              <Users className="w-4 h-4 text-zinc-400" />
              <span>Family-Owned & Operated</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
              {lang === 'EN' ? 'Navigation' : 'Navegación'}
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-zinc-400 font-sans font-medium">
              <button onClick={() => handleNav('home')} className="text-left hover:text-white transition-colors cursor-pointer">{t.menuHome}</button>
              <button onClick={() => handleNav('services')} className="text-left hover:text-white transition-colors cursor-pointer">{t.menuServices}</button>
              <button onClick={() => handleNav('about')} className="text-left hover:text-white transition-colors cursor-pointer">{t.menuAbout}</button>
              <button onClick={() => handleNav('gallery')} className="text-left hover:text-white transition-colors cursor-pointer">{t.menuGallery}</button>
              <button onClick={() => handleNav('contact')} className="text-left hover:text-white transition-colors cursor-pointer">{t.menuContact}</button>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">
              {lang === 'EN' ? 'Direct Contact' : 'Contacto Directo'}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-zinc-400 font-sans">
              <a href={`tel:${t.phoneNumber.replace(/\D/g, '')}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-zinc-500" />
                <span className="font-semibold text-white">{t.phoneNumber}</span>
              </a>
              <a href={`mailto:${t.emailAddress}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span className="truncate">{t.emailAddress}</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-500" />
                <span>{t.hours}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                <span>Dallas-Fort Worth (DFW) Area</span>
              </div>
            </div>
          </div>

          {/* Column 4: Se Habla Español highlight */}
          <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-zinc-400" />
              <h4 className="text-white font-bold text-sm tracking-tight">{t.bilingualBadgeTitle}</h4>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans font-medium">
              {lang === 'EN'
                ? 'We provide estimators, paperwork, and crew leads who speak fluent Spanish. Full communication guaranteed.'
                : 'Ofrecemos estimadores, contratos y líderes de equipo que hablan perfecto español. Comunicación total garantizada.'}
            </p>
            <span className="text-xs font-bold text-zinc-300 pt-1 leading-normal">
              {t.spanishAssistance}
            </span>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-sans">
          <span>&copy; {new Date().getFullYear()} FF Painting and Services. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => handleNav('residential')} className="hover:text-white transition-colors">{t.quoteBtn}</button>
            <span>•</span>
            <button onClick={() => handleNav('commercial')} className="hover:text-white transition-colors">{t.estimateBtn}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
