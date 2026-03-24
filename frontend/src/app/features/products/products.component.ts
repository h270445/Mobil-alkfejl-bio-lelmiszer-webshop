import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { CartFeedbackService } from '../../core/services/cart-feedback.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { Product } from '../../shared/models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    ProductCardComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: readonly string[] = [];

  loading = true;
  searchQuery = '';
  selectedCategory = '';
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' = 'name';
  showSearchPanel = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private cartFeedbackService: CartFeedbackService
  ) {}

  ngOnInit(): void {
    this.productService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories;
      });

    this.loadProducts();

    combineLatest([
      this.route.queryParamMap,
      this.route.paramMap
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([queryParams, params]) => {
        const querySearch = queryParams.get('search') ?? '';
        const queryCategory = queryParams.get('category') ?? '';
        const pathCategory = params.get('category') ?? '';

        this.searchQuery = querySearch;
        this.selectedCategory = pathCategory || queryCategory;

        this.applyFilters();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(): void {
    this.updateQueryParams({
      search: this.searchQuery.trim() || null,
      category: this.selectedCategory || null
    });
  }

  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.updateQueryParams({
      category: category || null,
      search: this.searchQuery.trim() || null
    });
  }

  onSortChange(): void {
    this.applyFilters();
  }

  onAddToCart(product: Product): void {
    const addResult = this.cartService.addToCart(product);
    if (addResult.addedQuantity > 0) {
      this.cartFeedbackService.showAddToCartStatus(product.name, addResult.addedQuantity);
      return;
    }

    this.cartFeedbackService.showPurchaseFailedStatus(
      'A termékből már nincs rendelhető készlet, ezért nem került a kosárba.'
    );
  }

  get activeCategoryName(): string {
    if (!this.selectedCategory) {
      return 'Összes termék';
    }

    const bySlug = this.categories.find(
      category => this.normalizeCategory(category) === this.normalizeCategory(this.selectedCategory)
    );

    return bySlug ?? this.selectedCategory;
  }

  private loadProducts(): void {
    this.loading = true;

    this.productService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: products => {
          this.allProducts = products;
          this.applyFilters();
          this.loading = false;
        },
        error: () => {
          this.allProducts = [];
          this.filteredProducts = [];
          this.loading = false;
        }
      });
  }

  private applyFilters(): void {
    let filtered = [...this.allProducts];

    if (this.selectedCategory) {
      const selectedSlug = this.normalizeCategory(this.selectedCategory);
      filtered = filtered.filter(
        product => this.normalizeCategory(product.category) === selectedSlug
      );
    }

    const normalizedQuery = this.searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      );
    }

    this.filteredProducts = this.productService.sortProducts(filtered, this.sortBy);
  }

  private updateQueryParams(params: { search?: string | null; category?: string | null }): void {
    this.router.navigate(['/products'], {
      queryParams: {
        search: params.search ?? null,
        category: params.category ?? null
      }
    });
  }

  normalizeCategory(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
  }

  toggleSearchPanel(): void {
    this.showSearchPanel = !this.showSearchPanel;
  }

  closeSearchPanel(): void {
    this.showSearchPanel = false;
  }
}
