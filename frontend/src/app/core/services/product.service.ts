import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../../shared/models';
import { MOCK_PRODUCTS, CATEGORIES, CategoryType } from '../../shared/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [...MOCK_PRODUCTS];

  constructor() {}

  // Get all products
  getAllProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(300));
  }

  // Get product by ID
  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(
      p => p.category.toLowerCase() === category.toLowerCase()
    );
    return of(filtered).pipe(delay(300));
  }

  // Search products by name
  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.products.filter(
      p => p.name.toLowerCase().includes(lowerQuery) ||
           p.description.toLowerCase().includes(lowerQuery)
    );
    return of(filtered).pipe(delay(300));
  }

  // Get featured products (high rating, in stock)
  getFeaturedProducts(limit: number = 6): Observable<Product[]> {
    const featured = this.products
      .filter(p => p.inStock && p.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return of(featured).pipe(delay(300));
  }

  // Get products on sale
  getProductsOnSale(): Observable<Product[]> {
    const onSale = this.products.filter(p => p.originalPrice && p.originalPrice > p.price);
    return of(onSale).pipe(delay(300));
  }

  // Get categories
  getCategories(): Observable<readonly string[]> {
    return of(CATEGORIES);
  }

  // Filter products with multiple criteria
  filterProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    minRating?: number;
  }): Observable<Product[]> {
    let filtered = [...this.products];

    if (filters.category) {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter(p => p.rating >= filters.minRating!);
    }

    return of(filtered).pipe(delay(300));
  }

  // Sort products
  sortProducts(products: Product[], sortBy: 'price-asc' | 'price-desc' | 'name' | 'rating'): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }
}
