'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData, Category } from '@/types';
import { categoryLabels } from '@/lib/sampleData';

interface ProductFormProps {
  product?: Product;
  onSubmit: (formData: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: 'electronics',
    image: '',
    stock: 0,
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {product ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`input-field ${errors.description ? 'border-red-500' : ''}`}
            placeholder="Enter product description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Category and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value as Category)}
              className="input-field"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {categoryLabels[category]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className={`input-field pl-8 ${errors.price ? 'border-red-500' : ''}`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            value={formData.stock}
            onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
            min="0"
            className={`input-field ${errors.stock ? 'border-red-500' : ''}`}
            placeholder="0"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            id="image"
            value={formData.image}
            onChange={(e) => handleInputChange('image', e.target.value)}
            className={`input-field ${errors.image ? 'border-red-500' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
          
          {/* Image Preview */}
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
} 