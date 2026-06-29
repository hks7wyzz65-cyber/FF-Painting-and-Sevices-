export type Language = 'EN' | 'ES';

export type Page = 'home' | 'services' | 'about' | 'gallery' | 'residential' | 'commercial' | 'contact';

export interface GalleryItem {
  id: string;
  category: 'interior' | 'exterior' | 'commercial' | 'cabinets';
  titleEn: string;
  titleEs: string;
  locationEn: string;
  locationEs: string;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  textEn: string;
  textEs: string;
  source: 'Google' | 'Yelp';
  date: string;
}

export interface ServiceDetail {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  fullDetailsEn: string;
  fullDetailsEs: string;
  icon: string;
}
