'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import { storage } from '@/lib/storage';
import ProductCard from '@/components/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedProducts = storage.getProducts();
    setProducts(storedProducts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const query = searchParams.get('q')?.toLowerCase() || '';
    
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchParams, products]);

  const query = searchParams.get('q') || '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for &quot;{query}&quot; ({filteredProducts.length} products found)
            </p>
          )}
        </div>

        {/* Search Results */}
        {!query ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No search query</h2>
            <p className="text-gray-600">
              Please enter a search term to find products
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any products matching &quot;{query}&quot;
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Try:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Checking your spelling</li>
                <li>• Using more general keywords</li>
                <li>• Using fewer keywords</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 