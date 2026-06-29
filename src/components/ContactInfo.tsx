import { Phone, Mail, Clock, ShieldCheck, MapPin, CheckCircle, Globe, Users } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactInfoProps {
  lang: Language;
}

export default function ContactInfo({ lang }: ContactInfoProps) {
  const t = translations[lang];

  const cities = [
    'Arlington', 'Fort Worth', 'Dallas', 'Grand Prairie', 'Mansfield', 'Irving', 'Euless', 'Bedford', 'Hurst'
  ];

  return (
    <div id="contact-details" className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
      
      {/* Left Column: Direct Info */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Contact info card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-100">
            {t.contactInfoHeading}
          </h3>
          
          <div className="space-y-4">
            <a 
              href={`tel:${t.phoneNumber.replace(/\D/g, '')}`}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="p-2.5 bg-zinc-900/5 rounded-lg text-zinc-900 group-hover:bg-zinc-900/10">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {lang === 'EN' ? 'Call Directly' : 'Llamada Directa'}
                </p>
                <p className="text-base font-bold text-zinc-950 mt-0.5 group-hover:underline">
                  {t.phoneNumber}
                </p>
              </div>
            </a>

            <a 
              href={`mailto:${t.emailAddress}`}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="p-2.5 bg-zinc-900/5 rounded-lg text-zinc-900 group-hover:bg-zinc-900/10">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {lang === 'EN' ? 'Email Address' : 'Correo Electrónico'}
                </p>
                <p className="text-sm md:text-base font-bold text-slate-700 mt-0.5 truncate group-hover:underline">
                  {t.emailAddress}
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-zinc-500" />
            {t.contactHoursHeading}
          </h3>
          <div className="space-y-2 text-sm text-slate-600 font-sans">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="font-semibold">{lang === 'EN' ? 'Monday – Saturday' : 'Lunes – Sábado'}</span>
              <span>7:00 AM – 6:00 PM</span>
            </div>
            <div className="flex justify-between py-1 text-slate-400">
              <span className="font-semibold">{lang === 'EN' ? 'Sunday' : 'Domingo'}</span>
              <span>{lang === 'EN' ? 'Closed' : 'Cerrado'}</span>
            </div>
          </div>
        </div>

        {/* Se Habla Español highlight corner */}
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 text-white rounded-2xl p-6 md:p-8 shadow-md border border-zinc-850 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Globe className="w-40 h-40" />
          </div>
          <div className="relative z-10 space-y-3">
            <span className="bg-white text-zinc-950 font-extrabold text-xs px-2.5 py-1 rounded-md tracking-wider uppercase">
              {t.bilingualBadgeTitle}
            </span>
            <h4 className="text-lg font-bold tracking-tight text-white">
              {lang === 'EN' ? 'Assistance in Spanish' : 'Asistencia en Español'}
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed font-sans font-medium">
              {t.spanishAssistance}
            </p>
          </div>
        </div>

      </div>

      {/* Right Column: Google Maps / DFW Area highlight */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100 flex flex-col justify-between">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-zinc-900" />
            {t.contactMapHeading}
          </h3>
          <p className="text-sm text-slate-500 font-sans leading-relaxed">
            {t.contactMapText}
          </p>
        </div>

        {/* Visual Map Simulator */}
        <div className="relative bg-slate-50 rounded-xl h-[280px] md:h-[350px] overflow-hidden my-6 border border-slate-200 flex items-center justify-center">
          {/* Mock Map Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-60"></div>
          
          {/* Dallas-Fort Worth Core Area Pin with glowing pulse */}
          <div className="absolute top-[42%] left-[32%] flex flex-col items-center">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-zinc-900 opacity-35 animate-ping"></span>
            <div className="w-3 h-3 bg-zinc-900 rounded-full border border-white relative z-10"></div>
            <span className="text-[10px] font-extrabold text-zinc-950 mt-0.5 bg-white/95 px-1.5 py-0.5 rounded shadow-sm border border-slate-100">Fort Worth</span>
          </div>

          <div className="absolute top-[38%] left-[68%] flex flex-col items-center">
            <span className="absolute inline-flex h-4 w-4 rounded-full bg-zinc-900 opacity-35 animate-ping"></span>
            <div className="w-3 h-3 bg-zinc-900 rounded-full border border-white relative z-10"></div>
            <span className="text-[10px] font-extrabold text-zinc-950 mt-0.5 bg-white/95 px-1.5 py-0.5 rounded shadow-sm border border-slate-100">Dallas</span>
          </div>

          {/* Smaller cities indicators around them */}
          <div className="absolute top-[48%] left-[50%] flex flex-col items-center">
            <div className="w-2 h-2 bg-zinc-700 rounded-full border border-white relative z-10"></div>
            <span className="text-[8px] font-bold text-gray-500 mt-0.5">Arlington</span>
          </div>

          <div className="absolute top-[32%] left-[48%] flex flex-col items-center">
            <div className="w-2 h-2 bg-zinc-700 rounded-full border border-white relative z-10"></div>
            <span className="text-[8px] font-bold text-gray-500 mt-0.5">Irving</span>
          </div>

          <div className="absolute top-[58%] left-[45%] flex flex-col items-center">
            <div className="w-2 h-2 bg-zinc-700 rounded-full border border-white relative z-10"></div>
            <span className="text-[8px] font-bold text-gray-500 mt-0.5">Grand Prairie</span>
          </div>

          <div className="absolute top-[42%] left-[46%] flex flex-col items-center">
            <span className="text-[8px] font-bold text-gray-500 bg-white/90 px-1 rounded shadow-xs">Euless-Bedford</span>
          </div>

          {/* Service coverage overlay text */}
          <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-900" />
              <span className="text-xs md:text-sm font-bold text-slate-800">
                {lang === 'EN' ? 'Family-Owned & Operated DFW Service' : 'Servicio de DFW Propiedad de y Operado por su Familia'}
              </span>
            </div>
            <span className="text-[10px] font-bold font-mono text-zinc-500 bg-zinc-50 border border-slate-200 px-2.5 py-0.5 rounded">
              DFW LOCAL
            </span>
          </div>
        </div>

        {/* Cities Grid List */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {lang === 'EN' ? 'Direct Service Areas' : 'Áreas de Servicio Directo'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {cities.map((city) => (
              <div key={city} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 font-sans">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                <span>{city}, TX</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
