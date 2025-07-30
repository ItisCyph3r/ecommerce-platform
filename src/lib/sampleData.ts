import { Product, Category } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const sampleProducts: Product[] = [
  {
    id: uuidv4(),
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 129.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    stock: 25,
    rating: 4.5,
    reviews: 128,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z"
  },
  {
    id: uuidv4(),
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Perfect for everyday wear.",
    price: 24.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    stock: 50,
    rating: 4.2,
    reviews: 89,
    createdAt: "2024-01-10T14:30:00Z",
    updatedAt: "2024-01-10T14:30:00Z"
  },
  {
    id: uuidv4(),
    name: "The Art of Programming",
    description: "Comprehensive guide to modern programming practices and design patterns. Essential reading for developers.",
    price: 39.99,
    category: "books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    stock: 15,
    rating: 4.8,
    reviews: 256,
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z"
  },
  {
    id: uuidv4(),
    name: "Smart Home Hub",
    description: "Control all your smart devices from one central hub. Compatible with Alexa, Google Home, and Apple HomeKit.",
    price: 199.99,
    category: "home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    stock: 12,
    rating: 4.6,
    reviews: 67,
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z"
  },
  {
    id: uuidv4(),
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness activities.",
    price: 49.99,
    category: "sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    stock: 30,
    rating: 4.4,
    reviews: 142,
    createdAt: "2024-01-08T11:20:00Z",
    updatedAt: "2024-01-08T11:20:00Z"
  },
  {
    id: uuidv4(),
    name: "Natural Face Serum",
    description: "Hydrating face serum with vitamin C and hyaluronic acid. Suitable for all skin types.",
    price: 34.99,
    category: "beauty",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    stock: 40,
    rating: 4.3,
    reviews: 78,
    createdAt: "2024-01-14T13:10:00Z",
    updatedAt: "2024-01-14T13:10:00Z"
  },
  {
    id: uuidv4(),
    name: "Educational Building Blocks",
    description: "STEM-focused building blocks that encourage creativity and problem-solving skills in children.",
    price: 29.99,
    category: "toys",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop",
    stock: 35,
    rating: 4.7,
    reviews: 203,
    createdAt: "2024-01-06T15:30:00Z",
    updatedAt: "2024-01-06T15:30:00Z"
  },
  {
    id: uuidv4(),
    name: "Car Phone Mount",
    description: "Universal car phone mount with suction cup. Compatible with all smartphones and tablets.",
    price: 19.99,
    category: "automotive",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    stock: 60,
    rating: 4.1,
    reviews: 95,
    createdAt: "2024-01-11T12:00:00Z",
    updatedAt: "2024-01-11T12:00:00Z"
  },
  {
    id: uuidv4(),
    name: "4K Ultra HD Smart TV",
    description: "55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps. Perfect for home entertainment.",
    price: 599.99,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
    stock: 8,
    rating: 4.9,
    reviews: 312,
    createdAt: "2024-01-03T08:45:00Z",
    updatedAt: "2024-01-03T08:45:00Z"
  },
  {
    id: uuidv4(),
    name: "Denim Jacket Classic",
    description: "Timeless denim jacket with a modern fit. Versatile piece that goes with any casual outfit.",
    price: 79.99,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    stock: 22,
    rating: 4.4,
    reviews: 156,
    createdAt: "2024-01-09T10:30:00Z",
    updatedAt: "2024-01-09T10:30:00Z"
  }
];

export const categoryLabels: Record<Category, string> = {
  electronics: "Electronics",
  clothing: "Clothing",
  books: "Books",
  home: "Home & Garden",
  sports: "Sports & Fitness",
  beauty: "Beauty & Health",
  toys: "Toys & Games",
  automotive: "Automotive"
};

export const categoryIcons: Record<Category, string> = {
  electronics: "📱",
  clothing: "👕",
  books: "📚",
  home: "🏠",
  sports: "⚽",
  beauty: "💄",
  toys: "🧸",
  automotive: "🚗"
}; 