import { useState, useRef, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface BeforeAfterSliderProps {
  lang: Language;
}

export default function BeforeAfterSlider({ lang }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const onMouseUp = () => handleMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-3xl h-[280px] sm:h-[380px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg select-none cursor-ew-resize border border-slate-200"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* AFTER IMAGE (Bottom Layer - Painted) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
            alt="After Painting Finished" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
          <div className="absolute right-6 bottom-6 bg-zinc-950 bg-opacity-90 text-white text-xs md:text-sm font-bold py-2 px-4 rounded-lg shadow-md backdrop-blur-sm">
            {t.afterLabel}
          </div>
        </div>

        {/* BEFORE IMAGE (Top Layer - Sliding Crop) */}
        <div 
          className="absolute inset-y-0 left-0 overflow-hidden select-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" 
            alt="Before Painting Condition" 
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.getBoundingClientRect().width || 768 }}
          />
          <div className="absolute left-6 bottom-6 bg-zinc-900 bg-opacity-90 text-white text-xs md:text-sm font-bold py-2 px-4 rounded-lg shadow-md backdrop-blur-sm">
            {t.beforeLabel}
          </div>
        </div>

        {/* SLIDER HANDLE LINE */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-zinc-950 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* DRAG HANDLE BUTTON */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-zinc-950 shadow-xl flex items-center justify-center cursor-ew-resize transition-transform duration-100 hover:scale-110 active:scale-95">
            <div className="flex gap-1 items-center text-zinc-950">
              <Eye className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Help text */}
      <span className="text-xs md:text-sm text-gray-500 mt-4 flex items-center gap-1.5 font-sans font-semibold">
        <span className="inline-block w-2 h-2 rounded-full bg-zinc-950 animate-pulse"></span>
        {lang === 'EN' 
          ? 'Drag the center circle left and right to inspect the details' 
          : 'Arrastre el círculo central a la izquierda y derecha para inspeccionar los detalles'}
      </span>
    </div>
  );
}
