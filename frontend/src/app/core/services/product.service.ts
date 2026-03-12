import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../../shared/models';
import { MOCK_PRODUCTS, CATEGORIES } from '../../shared/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly STORAGE_KEY = 'biomarket_products';

  private productsSubject!: BehaviorSubject<Product[]>;
  public products$!: Observable<Product[]>;

  constructor() {
    const initial = this.loadFromStorage();
    this.productsSubject = new BehaviorSubject<Product[]>(initial);
    this.products$ = this.productsSubject.asObservable();
  }

  // --- Persistence helpers ---

  private loadFromStorage(): Product[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Product[];
        if (parsed.length > 0 && parsed[0].sku !== undefined) {
          return parsed;
        }
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    return [...MOCK_PRODUCTS];
  }

  private saveToStorage(products: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
  }

  private emit(products: Product[]): void {
    this.productsSubject.next(products);
    this.saveToStorage(products);
  }

  // --- Read ---

  getAllProducts(): Observable<Product[]> {
    return of([...this.productsSubject.value]).pipe(delay(300));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.productsSubject.value.find(p => p.id === id);
    return of(product).pipe(delay(200));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.productsSubject.value.filter(
      p => p.isActive && p.category.toLowerCase() === category.toLowerCase()
    );
    return of(filtered).pipe(delay(300));
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.productsSubject.value.filter(
      p => p.isActive && (
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      )
    );
    return of(filtered).pipe(delay(300));
  }

  getFeaturedProducts(limit: number = 6): Observable<Product[]> {
    const featured = this.productsSubject.value
      .filter(p => p.isActive && p.inStock && p.rating >= 4)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
    return of(featured).pipe(delay(300));
  }

  getProductsOnSale(): Observable<Product[]> {
    const onSale = this.productsSubject.value.filter(
      p => p.isActive && p.originalPrice && p.originalPrice > p.price
    );
    return of(onSale).pipe(delay(300));
  }

  getCategories(): Observable<readonly string[]> {
    return of(CATEGORIES);
  }

  filterProducts(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    minRating?: number;
  }): Observable<Product[]> {
    let filtered = this.productsSubject.value.filter(p => p.isActive);

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

  sortProducts(
    products: Product[],
    sortBy: 'price-asc' | 'price-desc' | 'name' | 'rating'
  ): Product[] {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':  return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc': return sorted.sort((a, b) => b.price - a.price);
      case 'name':       return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'rating':     return sorted.sort((a, b) => b.rating - a.rating);
      default:           return sorted;
    }
  }

  // --- Write (CRUD) ---

  createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    return new Observable(observer => {
      setTimeout(() => {
        const products = this.productsSubject.value;
        const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
        const newProduct: Product = {
          ...data,
          id: maxId + 1,
          inStock: data.stockQuantity > 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.emit([...products, newProduct]);
        observer.next(newProduct);
        observer.complete();
      }, 300);
    });
  }

  updateProduct(
    id: number,
    data: Partial<Omit<Product, 'id' | 'createdAt'>>
  ): Observable<Product | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const products = [...this.productsSubject.value];
        const idx = products.findIndex(p => p.id === id);
        if (idx === -1) {
          observer.next(null);
          observer.complete();
          return;
        }
        const stockQ =
          data.stockQuantity !== undefined
            ? data.stockQuantity
            : products[idx].stockQuantity;
        products[idx] = {
          ...products[idx],
          ...data,
          id,
          inStock: stockQ > 0,
          updatedAt: new Date()
        };
        this.emit(products);
        observer.next(products[idx]);
        observer.complete();
      }, 300);
    });
  }

  deleteProduct(id: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const products = this.productsSubject.value;
        if (!products.find(p => p.id === id)) {
          observer.next(false);
          observer.complete();
          return;
        }
        this.emit(products.filter(p => p.id !== id));
        observer.next(true);
        observer.complete();
      }, 300);
    });
  }

  resetToMockData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.productsSubject.next([...MOCK_PRODUCTS]);
  }

  isSkuUnique(sku: string, excludeId?: number): boolean {
    return !this.productsSubject.value.some(
      p => p.sku === sku && p.id !== excludeId
    );
  }
}
