export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export type Category = 
  | 'electronics'
  | 'clothing'
  | 'books'
  | 'home'
  | 'sports'
  | 'beauty'
  | 'toys'
  | 'automotive';

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
}

export interface FilterOptions {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
} 