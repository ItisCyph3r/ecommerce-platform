import Link from 'next/link';
import { categoryLabels, categoryIcons } from '@/lib/sampleData';
import { Category } from '@/types';

export default function CategoriesPage() {
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products organized by category. Find exactly what you're looking for with our easy-to-navigate category system.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {categoryIcons[category]}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {categoryLabels[category]}
              </h3>
              <p className="text-gray-600 text-sm">
                Browse {categoryLabels[category].toLowerCase()} products
              </p>
            </Link>
          ))}
        </div>

        {/* Category Descriptions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            About Our Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">📱</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Electronics</h3>
              <p className="text-sm text-gray-600">
                Latest gadgets, smartphones, laptops, and tech accessories for the modern lifestyle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">👕</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clothing</h3>
              <p className="text-sm text-gray-600">
                Fashionable apparel, accessories, and footwear for all seasons and occasions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Books</h3>
              <p className="text-sm text-gray-600">
                Educational materials, fiction, non-fiction, and professional development resources.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Home & Garden</h3>
              <p className="text-sm text-gray-600">
                Furniture, decor, kitchen essentials, and outdoor living products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">⚽</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sports & Fitness</h3>
              <p className="text-sm text-gray-600">
                Equipment, apparel, and accessories for sports, fitness, and outdoor activities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">💄</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Beauty & Health</h3>
              <p className="text-sm text-gray-600">
                Skincare, makeup, personal care, and wellness products for your daily routine.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🧸</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Toys & Games</h3>
              <p className="text-sm text-gray-600">
                Educational toys, board games, puzzles, and entertainment for all ages.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🚗</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Automotive</h3>
              <p className="text-sm text-gray-600">
                Car accessories, maintenance products, and automotive tools and equipment.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-gray-600 mb-6">
              Use our search feature to find specific products or browse all products to discover new items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                Browse All Products
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 