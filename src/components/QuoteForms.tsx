import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { Upload, CheckCircle2, AlertCircle, FileText, X, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { servicesData } from '../data/translations';

interface FormProps {
  lang: Language;
  onSuccessSubmit: (data: any) => void;
}

export function ResidentialQuoteForm({ lang, onSuccessSubmit }: FormProps) {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    language: lang === 'ES' ? 'es' : 'en',
    services: [] as string[],
    scope: '',
    timeline: '',
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (serviceId: string) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
      
      if (errors.services && services.length > 0) {
        setErrors(err => ({ ...err, services: '' }));
      }
      return { ...prev, services };
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArr = Array.from(e.dataTransfer.files).filter((file: File) => file.type.startsWith('image/'));
      setPhotos(prev => [...prev, ...filesArr]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files).filter((file: File) => file.type.startsWith('image/'));
      setPhotos(prev => [...prev, ...filesArr]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = lang === 'EN' ? 'Name is required' : 'El nombre es obligatorio';
    if (!formData.phone.trim()) newErrors.phone = lang === 'EN' ? 'Phone is required' : 'El teléfono es obligatorio';
    if (!formData.email.trim()) newErrors.email = lang === 'EN' ? 'Email is required' : 'El correo es obligatorio';
    if (!formData.address.trim()) newErrors.address = lang === 'EN' ? 'Address is required' : 'La dirección es obligatoria';
    if (formData.services.length === 0) newErrors.services = lang === 'EN' ? 'Please select at least one service' : 'Por favor seleccione al menos un servicio';
    if (!formData.scope) newErrors.scope = lang === 'EN' ? 'Please select project scope' : 'Por favor seleccione el alcance del proyecto';
    if (!formData.timeline) newErrors.timeline = lang === 'EN' ? 'Please select your timeline' : 'Por favor seleccione un plazo de entrega';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission / localStorage log
    const submissions = JSON.parse(localStorage.getItem('residential_quotes') || '[]');
    const payload = {
      ...formData,
      id: 'res_' + Date.now(),
      date: new Date().toLocaleDateString(),
      filesCount: photos.length,
      status: 'pending',
    };

    submissions.push(payload);
    localStorage.setItem('residential_quotes', JSON.stringify(submissions));

    // Reset state
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      language: lang === 'ES' ? 'es' : 'en',
      services: [],
      scope: '',
      timeline: '',
    });
    setPhotos([]);

    onSuccessSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 max-w-4xl mx-auto">
      <div className="space-y-8">
        
        {/* Step 1: Contact Information */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {lang === 'EN' ? 'Contact Information' : 'Información de Contacto'}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldName} *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="John Doe"
              />
              {errors.name && <span id="err-name" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldPhone} *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="(817) 793-8354"
              />
              {errors.phone && <span id="err-phone" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldEmail} *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="john@example.com"
              />
              {errors.email && <span id="err-email" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldAddress} *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.address ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="123 Main St, Arlington, TX 76010"
              />
              {errors.address && <span id="err-address" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.address}</span>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldLanguage}</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-zinc-900 outline-none focus:ring-4 focus:ring-zinc-100 transition-all bg-white"
              >
                <option value="en">{t.resFieldLanguageEn}</option>
                <option value="es">{t.resFieldLanguageEs}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Project Scope & Services */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {lang === 'EN' ? 'Project Requirements' : 'Requisitos del Proyecto'}
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">{t.resFieldServices} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesData.map((service) => (
                  <label 
                    key={service.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.services.includes(service.id) 
                        ? 'bg-zinc-900/5 border-zinc-900 text-zinc-950 font-semibold' 
                        : 'border-gray-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.id)}
                      onChange={() => handleCheckboxChange(service.id)}
                      className="rounded text-zinc-900 focus:ring-zinc-900 h-4.5 w-4.5"
                    />
                    <span>{lang === 'EN' ? service.titleEn : service.titleEs}</span>
                  </label>
                ))}
              </div>
              {errors.services && <span id="err-services" className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.services}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldScope} *</label>
                <select
                  name="scope"
                  value={formData.scope}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.scope ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all bg-white`}
                >
                  <option value="">{t.resFieldScopeSelect}</option>
                  <option value="1room">{t.resScope1}</option>
                  <option value="multiroom">{t.resScope2}</option>
                  <option value="full_int">{t.resScope3}</option>
                  <option value="full_ext">{t.resScope4}</option>
                  <option value="cabinets">{t.resScope5}</option>
                  <option value="both_full">{t.resScope6}</option>
                </select>
                {errors.scope && <span id="err-scope" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.scope}</span>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldTimeline} *</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${errors.timeline ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all bg-white`}
                >
                  <option value="">{t.resFieldTimelineSelect}</option>
                  <option value="immediate">{t.resTimeline1}</option>
                  <option value="month">{t.resTimeline2}</option>
                  <option value="planning">{t.resTimeline3}</option>
                </select>
                {errors.timeline && <span id="err-timeline" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.timeline}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Photo Attachments */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {t.resFieldPhotos}
            </h3>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-zinc-900 bg-zinc-900/5 scale-[0.99]' 
                : 'border-slate-300 hover:border-zinc-900 bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm text-slate-400">
                <Upload className="w-8 h-8 text-zinc-900" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {t.resPhotosDrag}
              </p>
              <p className="text-xs text-slate-400">
                {lang === 'EN' ? 'Supports PNG, JPG, JPEG up to 10MB per image' : 'Soporta formatos PNG, JPG, JPEG de hasta 10MB por imagen'}
              </p>
            </div>
          </div>

          {/* Photos list preview */}
          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {photos.map((file, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <span className="text-xs truncate font-sans font-medium text-slate-700 flex-1">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(i);
                    }}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full text-center py-4 rounded-xl bg-zinc-900 hover:bg-black text-white font-extrabold text-base md:text-lg uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          {t.resFormSubmit}
        </button>
      </div>
    </form action="https://formspree.io/f/mzdlvodp" method="POST">
  );
}

export function CommercialEstimateForm({ lang, onSuccessSubmit }: FormProps) {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    propertyType: '',
    sqFt: '',
    units: '',
    serviceType: 'both',
    condition: '',
    occupancy: 'vacant',
    targetBudget: '',
  });

  const [rfpFiles, setRfpFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArr = Array.from(e.dataTransfer.files);
      setRfpFiles(prev => [...prev, ...filesArr]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setRfpFiles(prev => [...prev, ...filesArr]);
    }
  };

  const removeFile = (index: number) => {
    setRfpFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) newErrors.companyName = lang === 'EN' ? 'Company Name is required' : 'Nombre de la empresa es obligatorio';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = lang === 'EN' ? 'Contact person is required' : 'Persona de contacto es obligatoria';
    if (!formData.phone.trim()) newErrors.phone = lang === 'EN' ? 'Phone is required' : 'El teléfono es obligatorio';
    if (!formData.email.trim()) newErrors.email = lang === 'EN' ? 'Email is required' : 'El correo es obligatorio';
    if (!formData.propertyType) newErrors.propertyType = lang === 'EN' ? 'Property Type is required' : 'Tipo de propiedad es obligatorio';
    if (!formData.sqFt.trim()) newErrors.sqFt = lang === 'EN' ? 'Square footage is required' : 'Los pies cuadrados son obligatorios';
    if (!formData.condition) newErrors.condition = lang === 'EN' ? 'Condition description is required' : 'La condición es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission / localStorage log
    const submissions = JSON.parse(localStorage.getItem('commercial_quotes') || '[]');
    const payload = {
      ...formData,
      id: 'comm_' + Date.now(),
      date: new Date().toLocaleDateString(),
      filesCount: rfpFiles.length,
      status: 'pending',
    };

    submissions.push(payload);
    localStorage.setItem('commercial_quotes', JSON.stringify(submissions));

    // Reset state
    setFormData({
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      propertyType: '',
      sqFt: '',
      units: '',
      serviceType: 'both',
      condition: '',
      occupancy: 'vacant',
      targetBudget: '',
    });
    setRfpFiles([]);

    onSuccessSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-slate-100 max-w-4xl mx-auto">
      <div className="space-y-8">
        
        {/* Contact Info */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {lang === 'EN' ? 'Commercial Contact Details' : 'Detalles de Contacto Comercial'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldCompany} *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.companyName ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="DFW Property Management LLC"
              />
              {errors.companyName && <span id="err-companyName" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.companyName}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldContact} *</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.contactPerson ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="David Flores"
              />
              {errors.contactPerson && <span id="err-contactPerson" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.contactPerson}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldPhone} *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="(817) 793-8354"
              />
              {errors.phone && <span id="err-phone" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.resFieldEmail} *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="floresfamilypainting@gmail.com"
              />
              {errors.email && <span id="err-email" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
            </div>
          </div>
        </div>

        {/* Property Specs */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {lang === 'EN' ? 'Property Specifications' : 'Especificaciones de la Propiedad'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldPropertyType} *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.propertyType ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all bg-white`}
              >
                <option value="">{t.commFieldPropertySelect}</option>
                <option value="retail">{t.commPropRetail}</option>
                <option value="office">{t.commPropOffice}</option>
                <option value="hoa">{t.commPropHOA}</option>
                <option value="industrial">{t.commPropIndustrial}</option>
              </select>
              {errors.propertyType && <span id="err-propertyType" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.propertyType}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldSqFt} *</label>
              <input
                type="number"
                name="sqFt"
                value={formData.sqFt}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.sqFt ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all`}
                placeholder="5000"
              />
              {errors.sqFt && <span id="err-sqFt" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.sqFt}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldUnits}</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-zinc-900 outline-none focus:ring-4 focus:ring-zinc-100 transition-all"
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldType}</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-zinc-900 outline-none focus:ring-4 focus:ring-zinc-100 transition-all bg-white"
              >
                <option value="interior">{t.commFieldTypeInt}</option>
                <option value="exterior">{t.commFieldTypeExt}</option>
                <option value="both">{t.commFieldTypeBoth}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldCondition} *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.condition ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-zinc-100 focus:border-zinc-900'} outline-none focus:ring-4 transition-all bg-white`}
              >
                <option value="">{t.commFieldConditionSelect}</option>
                <option value="new">{t.commCondNew}</option>
                <option value="repaint">{t.commCondRepaint}</option>
                <option value="repair">{t.commCondRepair}</option>
              </select>
              {errors.condition && <span id="err-condition" className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.condition}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldOccupancy}</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="occupancy"
                    value="occupied"
                    checked={formData.occupancy === 'occupied'}
                    onChange={handleInputChange}
                    className="text-zinc-900 focus:ring-zinc-900 h-4 w-4"
                  />
                  <span>{t.commFieldOccupied}</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="occupancy"
                    value="vacant"
                    checked={formData.occupancy === 'vacant'}
                    onChange={handleInputChange}
                    className="text-zinc-900 focus:ring-zinc-900 h-4 w-4"
                  />
                  <span>{t.commFieldVacant}</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t.commFieldBudget}</label>
              <select
                name="targetBudget"
                value={formData.targetBudget}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-zinc-900 outline-none focus:ring-4 focus:ring-zinc-100 transition-all bg-white"
              >
                <option value="">{t.commFieldBudgetSelect}</option>
                <option value="under5k">{t.commBudget1}</option>
                <option value="5k_15k">{t.commBudget2}</option>
                <option value="15k_50k">{t.commBudget3}</option>
                <option value="50k_plus">{t.commBudget4}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upload Specs */}
        <div>
          <div className="flex items-center gap-2 pb-2 mb-6 border-b border-slate-100">
            <span className="bg-zinc-900 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>
            <h3 className="font-bold text-slate-800 text-lg">
              {t.commFieldPlans}
            </h3>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all ${
              isDragging 
                ? 'border-zinc-950 bg-zinc-900/5 scale-[0.99]' 
                : 'border-slate-300 hover:border-zinc-950 bg-slate-50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.zip"
              className="hidden"
            />
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-sm text-slate-400">
                <FileText className="w-8 h-8 text-zinc-900" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                {t.commPlansDrag}
              </p>
              <p className="text-xs text-slate-400">
                {lang === 'EN' ? 'Supports PDF, Word, Excel, DWG blueprints up to 25MB' : 'Soporta formatos PDF, Word, Excel, planos DWG de hasta 25MB'}
              </p>
            </div>
          </div>

          {/* Files List Preview */}
          {rfpFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rfpFiles.map((file, i) => (
                <div key={i} className="relative bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-zinc-900 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate font-sans font-medium text-slate-700">{file.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full text-center py-4 rounded-xl bg-zinc-900 hover:bg-black text-white font-extrabold text-base md:text-lg uppercase tracking-wider shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          {t.commFormSubmit}
        </button>
      </div>
    </form action="YOUR_FORMSPREE_COMMERCIAL_URL" method="POST">
  );
}
