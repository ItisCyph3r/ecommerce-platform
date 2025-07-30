'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { storage } from '@/lib/storage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      storage.addToCart(product, 1);
      setIsAddingToCart(false);
      
      // Show success feedback
      const button = e.currentTarget as HTMLButtonElement;
      if (button) {
        const originalText = button.textContent || 'Add to Cart';
        button.textContent = 'Added!';
        button.classList.add('bg-green-600');
        
        setTimeout(() => {
          if (button) {
            button.textContent = originalText;
            button.classList.remove('bg-green-600');
          }
        }, 2000);
      }
    }, 500);
  };

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-200">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({product.reviews})
              </span>
            </div>
            
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAddingToCart}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 