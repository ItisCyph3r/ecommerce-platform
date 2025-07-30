'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { storage } from '@/lib/storage';
import { categoryLabels, categoryIcons } from '@/lib/sampleData';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productId = params.id as string;
    const products = storage.getProducts();
    const foundProduct = products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to products page
      router.push('/products');
    }
    setIsLoading(false);
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      storage.addToCart(product, quantity);
      setIsAddingToCart(false);
      
      // Show success message
      alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product!.stock) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-primary-600">
                Products
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/products?category=${product.category}`} className="hover:text-primary-600">
                {categoryLabels[product.category]}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{categoryIcons[product.category]}</span>
              <Link
                href={`/products?category=${product.category}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {categoryLabels[product.category]}
              </Link>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
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
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 font-medium">✗ Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </button>
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="ml-2 font-medium">{categoryLabels[product.category]}</span>
                </div>
                <div>
                  <span className="text-gray-600">Stock:</span>
                  <span className="ml-2 font-medium">{product.stock} units</span>
                </div>
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <span className="ml-2 font-medium">{product.rating}/5</span>
                </div>
                <div>
                  <span className="text-gray-600">Reviews:</span>
                  <span className="ml-2 font-medium">{product.reviews}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 