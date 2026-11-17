import productSoftMerinoSweaterImage from '@/assets/image/product-soft-merino-sweater.jpg';
import productMinimalToteBagImage from '@/assets/image/product-minimal-tote-bag.jpg';
import productCeramicCoffeeSetImage from '@/assets/image/product-ceramic-coffee-set.jpg';
import productNoiseCancellingHeadphonesImage from '@/assets/image/product-noise-cancelling-headphones.jpg';

export interface EcommerceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  image: string;
}

export const ecommerceCategories: EcommerceCategory[] = [
  {
    id: 'apparel',
    name: 'Apparel',
    slug: 'apparel',
    description: 'Layering essentials and seasonal knitwear.',
    productCount: 24,
    image: productSoftMerinoSweaterImage,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Bags, sleeves, and everyday carry.',
    productCount: 18,
    image: productMinimalToteBagImage,
  },
  {
    id: 'home',
    name: 'Home',
    slug: 'home',
    description: 'Ceramics, diffusers, and calm interiors.',
    productCount: 31,
    image: productCeramicCoffeeSetImage,
  },
  {
    id: 'audio',
    name: 'Audio',
    slug: 'audio',
    description: 'Headphones and studio gear.',
    productCount: 12,
    image: productNoiseCancellingHeadphonesImage,
  },
];
