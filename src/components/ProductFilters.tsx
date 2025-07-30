'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterOptions, Category } from '@/types';
import { categoryLabels, categoryIcons } from '@/lib/sampleData';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  totalProducts: number;
  filteredCount: number;
}

export default function ProductFilters({
  filters,
  onFilterChange,
  totalProducts,
  filteredCount,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || '',
    max: filters.maxPrice || '',
  });

  const categories: Category[] = [
    'electronics',
    'clothing',
    'books',
    'home',
    'sports',
    'beauty',
    'toys',
    'automotive',
  ];

  const updateURL = (newFilters: FilterOptions) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newFilters.category) {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }
    
    if (newFilters.minPrice !== undefined) {
      params.set('minPrice', String(newFilters.minPrice));
    } else {
      params.delete('minPrice');
    }
    
    if (newFilters.maxPrice !== undefined) {
      params.set('maxPrice', String(newFilters.maxPrice));
    } else {
      params.delete('maxPrice');
    }
    
    if (newFilters.sortBy) {
      params.set('sortBy', newFilters.sortBy);
    } else {
      params.delete('sortBy');
    }
    
    if (newFilters.sortOrder) {
      params.set('sortOrder', newFilters.sortOrder);
    } else {
      params.delete('sortOrder');
    }

    const newURL = params.toString() ? `?${params.toString()}` : '/products';
    router.push(newURL);
  };

  const handleCategoryChange = (category: Category | undefined) => {
    const newFilters = { ...filters, category };
    onFilterChange(newFilters);
    updateURL(newFilters);
  };

  const handlePriceChange = () => {
    const newFilters = {
      ...filters,
      minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
      maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    };
    onFilterChange(newFilters);
    updateURL(newFilters);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    onFilterChange({});
    router.push('/products');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Filters</h2>
        <p className="text-sm text-gray-600">
          {filteredCount} of {totalProducts} products
        </p>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.minPrice || filters.maxPrice) && (
        <button
          onClick={clearFilters}
          className="w-full mb-6 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                {categoryIcons[category]} {categoryLabels[category]}
              </span>
            </label>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!filters.category}
              onChange={() => handleCategoryChange(undefined)}
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">All Categories</span>
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max Price</label>
            <input
              type="number"
              placeholder="1000"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="input-field text-sm"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full btn-primary text-sm py-2"
          >
            Apply Price Filter
          </button>
        </div>
      </div>

      {/* Quick Price Filters */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Quick Price Filters</h3>
        <div className="space-y-2">
          {[
            { label: 'Under $25', min: 0, max: 25 },
            { label: '$25 - $50', min: 25, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $200', min: 100, max: 200 },
            { label: 'Over $200', min: 200, max: undefined },
          ].map((range) => (
            <button
              key={range.label}
              onClick={() => {
                const newFilters = {
                  ...filters,
                  minPrice: range.min,
                  maxPrice: range.max,
                };
                setPriceRange({
                  min: range.min.toString(),
                  max: range.max?.toString() || '',
                });
                onFilterChange(newFilters);
                updateURL(newFilters);
              }}
              className="w-full text-left text-sm text-gray-700 hover:text-primary-600 py-1"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </div>
    </div>
  );
} 