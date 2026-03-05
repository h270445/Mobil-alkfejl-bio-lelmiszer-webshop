import { Product } from '../models';

export const MOCK_PRODUCTS: Product[] = [
  // Tejtermékek (3 db)
  {
    id: 1,
    name: 'Bio Tehéntej 1L',
    category: 'Tejtermékek',
    price: 890,
    description: 'Friss bio tehéntej hazai gazdaságból, tartósítószer-mentes.',
    imageUrl: 'assets/images/placeholder-dairy.svg',
    rating: 5,
    reviews: 42,
    inStock: true
  },
  {
    id: 2,
    name: 'Bio Görög Joghurt 400g',
    category: 'Tejtermékek',
    price: 1290,
    originalPrice: 1490,
    description: 'Krémes bio joghurt élőflórával, magas fehérjetartalommal.',
    imageUrl: 'assets/images/placeholder-dairy.svg',
    rating: 5,
    reviews: 38,
    inStock: true
  },
  {
    id: 3,
    name: 'Bio Trappista Sajt 200g',
    category: 'Tejtermékek',
    price: 1890,
    description: 'Hagyományosan érlelt bio trappista sajt.',
    imageUrl: 'assets/images/placeholder-dairy.svg',
    rating: 4,
    reviews: 27,
    inStock: true
  },

  // Pékáruk (3 db)
  {
    id: 4,
    name: 'Bio Teljes Kiőrlésű Kenyér 500g',
    category: 'Pékáruk',
    price: 790,
    description: 'Kézműves bio kenyér teljes kiőrlésű lisztből.',
    imageUrl: 'assets/images/placeholder-bakery.svg',
    rating: 5,
    reviews: 65,
    inStock: true
  },
  {
    id: 5,
    name: 'Bio Croissant 4db',
    category: 'Pékáruk',
    price: 1190,
    originalPrice: 1390,
    description: 'Vajas bio croissant, frissen sütve.',
    imageUrl: 'assets/images/placeholder-bakery.svg',
    rating: 4,
    reviews: 31,
    inStock: true
  },
  {
    id: 6,
    name: 'Bio Zabpehely Keksz 200g',
    category: 'Pékáruk',
    price: 890,
    description: 'Ropogós bio keksz zabpehellyel és mézzel.',
    imageUrl: 'assets/images/placeholder-bakery.svg',
    rating: 4,
    reviews: 19,
    inStock: false
  },

  // Zöldség-gyümölcs (4 db)
  {
    id: 7,
    name: 'Bio Alma 1kg',
    category: 'Zöldség-gyümölcs',
    price: 690,
    description: 'Ropogós bio alma magyar kertből.',
    imageUrl: 'assets/images/placeholder-produce.svg',
    rating: 5,
    reviews: 87,
    inStock: true
  },
  {
    id: 8,
    name: 'Bio Sárgarépa 1kg',
    category: 'Zöldség-gyümölcs',
    price: 490,
    description: 'Édes bio sárgarépa, kiváló levesbe vagy rágcsálásra.',
    imageUrl: 'assets/images/placeholder-produce.svg',
    rating: 5,
    reviews: 56,
    inStock: true
  },
  {
    id: 9,
    name: 'Bio Banán 1kg',
    category: 'Zöldség-gyümölcs',
    price: 1190,
    originalPrice: 1290,
    description: 'Fairtrade bio banán Ecuadorból.',
    imageUrl: 'assets/images/placeholder-produce.svg',
    rating: 4,
    reviews: 73,
    inStock: true
  },
  {
    id: 10,
    name: 'Bio Avokádó 2db',
    category: 'Zöldség-gyümölcs',
    price: 1490,
    description: 'Krémes bio avokádó, azonnal fogyasztható.',
    imageUrl: 'assets/images/placeholder-produce.svg',
    rating: 5,
    reviews: 44,
    inStock: true
  },

  // Húskészítmények (2 db)
  {
    id: 11,
    name: 'Bio Csirkemell 500g',
    category: 'Húskészítmények',
    price: 2490,
    description: 'Friss bio csirkemell szabadtartásból.',
    imageUrl: 'assets/images/placeholder-meat.svg',
    rating: 5,
    reviews: 52,
    inStock: true
  },
  {
    id: 12,
    name: 'Bio Kolbász 300g',
    category: 'Húskészítmények',
    price: 1890,
    originalPrice: 2190,
    description: 'Házi bio kolbász természetes füstöléssel.',
    imageUrl: 'assets/images/placeholder-meat.svg',
    rating: 4,
    reviews: 29,
    inStock: true
  },

  // Italok (3 db)
  {
    id: 13,
    name: 'Bio Narancslé 1L',
    category: 'Italok',
    price: 1290,
    description: '100% bio narancslé hozzáadott cukor nélkül.',
    imageUrl: 'assets/images/placeholder-drinks.svg',
    rating: 5,
    reviews: 91,
    inStock: true
  },
  {
    id: 14,
    name: 'Bio Zöld Tea 20db',
    category: 'Italok',
    price: 890,
    description: 'Prémium bio zöld tea filteres kiszerelésben.',
    imageUrl: 'assets/images/placeholder-drinks.svg',
    rating: 4,
    reviews: 67,
    inStock: true
  },
  {
    id: 15,
    name: 'Bio Kókuszvíz 500ml',
    category: 'Italok',
    price: 1590,
    originalPrice: 1790,
    description: 'Természetes bio kókuszvíz elektrolitokkal.',
    imageUrl: 'assets/images/placeholder-drinks.svg',
    rating: 5,
    reviews: 38,
    inStock: false
  },

  // Snackek (3 db)
  {
    id: 16,
    name: 'Bio Mandula 200g',
    category: 'Snackek',
    price: 1990,
    description: 'Natúr bio mandula, pirítás nélkül.',
    imageUrl: 'assets/images/placeholder-snacks.svg',
    rating: 5,
    reviews: 45,
    inStock: true
  },
  {
    id: 17,
    name: 'Bio Étcsokoládé 100g',
    category: 'Snackek',
    price: 1390,
    originalPrice: 1590,
    description: 'Bio étcsokoládé 70% kakaótartalommal.',
    imageUrl: 'assets/images/placeholder-snacks.svg',
    rating: 5,
    reviews: 102,
    inStock: true
  },
  {
    id: 18,
    name: 'Bio Müzliszelet 6db',
    category: 'Snackek',
    price: 1190,
    description: 'Energiadús bio müzliszelet gyümölcsökkel.',
    imageUrl: 'assets/images/placeholder-snacks.svg',
    rating: 4,
    reviews: 54,
    inStock: true
  }
];

// Category helper
export const CATEGORIES = [
  'Tejtermékek',
  'Pékáruk',
  'Zöldség-gyümölcs',
  'Húskészítmények',
  'Italok',
  'Snackek'
] as const;

export type CategoryType = typeof CATEGORIES[number];
