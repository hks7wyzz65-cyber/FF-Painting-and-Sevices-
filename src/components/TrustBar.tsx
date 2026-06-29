import { ClipboardCheck, Building2, Languages, Users } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TrustBarProps {
  lang: Language;
}

export default function TrustBar({ lang }: TrustBarProps) {
  const t = translations[lang];

  const badges = [
    {
      id: 'family-owned',
      icon: Users,
      title: t.trustFamily,
      descEn: 'Owned & operated by David Flores & family',
      descEs: 'Operado por David Flores y su familia',
    },
    {
      id: 'estimates',
      icon: ClipboardCheck,
      title: t.trustEstimates,
      descEn: 'No-obligation virtual & physical quotes',
      descEs: 'Presupuestos virtuales y físicos sin compromiso',
    },
    {
      id: 'types',
      icon: Building2,
      title: t.trustResComm,
      descEn: 'From small bedrooms to retail plazas',
      descEs: 'Desde recámaras pequeñas hasta plazas comerciales',
    },
    {
      id: 'bilingual',
      icon: Languages,
      title: t.trustSupport,
      descEn: 'Support in English and Spanish',
      descEs: 'Asistencia completa en inglés y español',
    },
  ];

  return (
    <div id="trust-bar" className="bg-slate-50 border-y border-slate-200/60 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div 
                key={badge.id}
                className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="p-2.5 bg-zinc-900/5 rounded-lg text-zinc-900">
                  <IconComponent className="w-6 md:w-7 h-6 md:h-7 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-slate-800 text-sm md:text-base tracking-tight flex items-center justify-center md:justify-start gap-1">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal max-w-[200px] md:max-w-none">
                    {lang === 'EN' ? badge.descEn : badge.descEs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
