'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';
import { Product, FilterOptions, Category } from '@/types';
import { storage } from '@/lib/storage';
import { sampleProducts, categoryLabels, categoryIcons } from '@/lib/sampleData';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize products from localStorage or sample data
    const storedProducts = storage.getProducts();
    if (storedProducts.length === 0) {
      storage.setProducts(sampleProducts);
      setProducts(sampleProducts);
    } else {
      setProducts(storedProducts);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Apply URL search params to filters
    const category = searchParams.get('category') as Category;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy') as FilterOptions['sortBy'];
    const sortOrder = searchParams.get('sortOrder') as FilterOptions['sortOrder'];
    const search = searchParams.get('search');

    setFilters({
      category: category || undefined,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy: sortBy || undefined,
      sortOrder: sortOrder || undefined,
    });

    // Filter and sort products
    let filtered = [...products];

    // Search filter
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price filter
    if (minPrice !== null) {
      filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Sort
    if (sortBy) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortBy];
        let bValue: any = b[sortBy];

        if (sortBy === 'price') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        } else {
          return aValue > bValue ? 1 : -1;
        }
      });
    }

    setFilteredProducts(filtered);
  }, [products, searchParams]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our amazing collection of products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              totalProducts={products.length}
              filteredCount={filteredProducts.length}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilters({});
                    window.history.pushState({}, '', '/products');
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={`${filters.sortBy || 'name'}-${filters.sortOrder || 'asc'}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        const newFilters = { ...filters, sortBy: sortBy as any, sortOrder: sortOrder as any };
                        handleFilterChange(newFilters);
                      }}
                      className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="price-asc">Price (Low to High)</option>
                      <option value="price-desc">Price (High to Low)</option>
                      <option value="rating-desc">Rating (High to Low)</option>
                      <option value="createdAt-desc">Newest First</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 