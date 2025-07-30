import { Product, CartItem } from '@/types';

const PRODUCTS_KEY = 'ecommerce_products';
const CART_KEY = 'ecommerce_cart';

export const storage = {
  // Products
  getProducts: (): Product[] => {
    if (typeof window === 'undefined') return [];
    try {
      const products = localStorage.getItem(PRODUCTS_KEY);
      return products ? JSON.parse(products) : [];
    } catch (error) {
      console.error('Error reading products from localStorage:', error);
      return [];
    }
  },

  setProducts: (products: Product[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    } catch (error) {
      console.error('Error writing products to localStorage:', error);
    }
  },

  addProduct: (product: Product): void => {
    const products = storage.getProducts();
    products.push(product);
    storage.setProducts(products);
  },

  updateProduct: (updatedProduct: Product): void => {
    const products = storage.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      storage.setProducts(products);
    }
  },

  deleteProduct: (productId: string): void => {
    const products = storage.getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    storage.setProducts(filteredProducts);
  },

  // Cart
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
      const cart = localStorage.getItem(CART_KEY);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  setCart: (cart: CartItem[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error writing cart to localStorage:', error);
    }
  },

  addToCart: (product: Product, quantity: number = 1): void => {
    const cart = storage.getCart();
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    
    storage.setCart(cart);
  },

  removeFromCart: (productId: string): void => {
    const cart = storage.getCart();
    const filteredCart = cart.filter(item => item.product.id !== productId);
    storage.setCart(filteredCart);
  },

  updateCartItemQuantity: (productId: string, quantity: number): void => {
    const cart = storage.getCart();
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      storage.setCart(cart);
    }
  },

  clearCart: (): void => {
    storage.setCart([]);
  }
}; 