import { useState } from 'react';
import { Eye, X, MapPin } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { galleryItems, translations } from '../data/translations';

interface GalleryGridProps {
  lang: Language;
  limit?: number;
}

export default function GalleryGrid({ lang, limit }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const t = translations[lang];

  const filters = [
    { label: t.galleryFilterAll, id: 'all' },
    { label: t.galleryFilterInterior, id: 'interior' },
    { label: t.galleryFilterExterior, id: 'exterior' },
    { label: t.galleryFilterCommercial, id: 'commercial' },
    { label: t.galleryFilterCabinets, id: 'cabinets' },
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  return (
    <div className="w-full">
      {/* Filters (only show if not limited/preview mode) */}
      {!limit && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full transition-all cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-slate-100"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={lang === 'EN' ? item.titleEn : item.titleEs}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              loading="lazy"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] uppercase font-black tracking-widest text-zinc-300 mb-1">
                {item.category === 'cabinets' ? t.galleryFilterCabinets : 
                 item.category === 'interior' ? t.galleryFilterInterior :
                 item.category === 'exterior' ? t.galleryFilterExterior : t.galleryFilterCommercial}
              </span>
              <h3 className="text-white font-extrabold text-base md:text-lg leading-tight tracking-tight">
                {lang === 'EN' ? item.titleEn : item.titleEs}
              </h3>
              <div className="flex items-center gap-1.5 text-zinc-300 text-xs mt-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{lang === 'EN' ? item.locationEn : item.locationEs}</span>
              </div>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            {/* Static Card Caption for Mobile (if not hovered) */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:hidden group-hover:hidden">
              <h4 className="text-white font-bold text-sm">
                {lang === 'EN' ? item.titleEn : item.titleEs}
              </h4>
              <span className="text-zinc-300 text-[10px] font-semibold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {lang === 'EN' ? item.locationEn : item.locationEs}
              </span>
            </div>
          </div>
        ))}
      </div>

      {displayedItems.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-gray-500 font-sans">
            {lang === 'EN' ? 'No projects found in this category.' : 'No se encontraron proyectos en esta categoría.'}
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full flex flex-col gap-4">
            <div className="relative max-h-[75vh] rounded-xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={lang === 'EN' ? selectedImage.titleEn : selectedImage.titleEs}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>
            
            <div className="text-left px-2">
              <span className="text-xs uppercase font-black tracking-widest text-zinc-400">
                {selectedImage.category.toUpperCase()}
              </span>
              <h2 className="text-white text-xl md:text-2xl font-extrabold tracking-tight mt-1">
                {lang === 'EN' ? selectedImage.titleEn : selectedImage.titleEs}
              </h2>
              <p className="text-zinc-400 text-sm md:text-base mt-1.5 flex items-center gap-1.5 font-sans">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{lang === 'EN' ? selectedImage.locationEn : selectedImage.locationEs}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
