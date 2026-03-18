import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models';

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'Tejtermékek':        'assets/images/placeholder-dairy.svg',
  'Pékáruk':            'assets/images/placeholder-bakery.svg',
  'Zöldség-gyümölcs':   'assets/images/placeholder-produce.svg',
  'Húskészítmények':    'assets/images/placeholder-meat.svg',
  'Italok':             'assets/images/placeholder-drinks.svg',
  'Snackek':            'assets/images/placeholder-snacks.svg',
};

const CATEGORIES = Object.keys(CATEGORY_IMAGE_MAP);

const CATEGORY_SKU_PREFIX: Record<string, string> = {
  'Tejtermékek':     'TEJ',
  'Pékáruk':         'PEK',
  'Zöldség-gyümölcs':'ZGY',
  'Húskészítmények': 'HUS',
  'Italok':          'ITA',
  'Snackek':         'SNA',
};

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [
    CommonModule, RouterLink, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule
  ],
  template: `
    <div class="form-container">
      <button mat-button routerLink="/admin/products" class="back-btn">
        <img src="assets/images/arrow-back-icon.svg" class="btn-icon" alt="Vissza" />
        Termékek listája
      </button>

      <h1>{{ editMode ? 'Termék szerkesztése' : 'Új termék hozzáadása' }}</h1>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="product-form">

        <!-- Name -->
        <mat-form-field appearance="outline">
          <mat-label>Név</mat-label>
          <input matInput formControlName="name" placeholder="pl. Bio tej 1L" />
          <mat-error *ngIf="form.get('name')?.hasError('required')">Kötelező mező</mat-error>
          <mat-error *ngIf="form.get('name')?.hasError('minlength')">Legalább 3 karakter</mat-error>
        </mat-form-field>

        <!-- Category -->
        <mat-form-field appearance="outline">
          <mat-label>Kategória</mat-label>
          <mat-select formControlName="category" (selectionChange)="onCategoryChange($event.value)">
            <mat-option *ngFor="let cat of categories" [value]="cat">{{ cat }}</mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('category')?.hasError('required')">Kötelező mező</mat-error>
        </mat-form-field>

        <!-- SKU row -->
        <div class="sku-row">
          <mat-form-field appearance="outline" class="sku-field">
            <mat-label>SKU</mat-label>
            <input matInput formControlName="sku" placeholder="pl. TEJ-001" />
            <mat-error *ngIf="form.get('sku')?.hasError('required')">Kötelező mező</mat-error>
            <mat-error *ngIf="form.get('sku')?.hasError('skuTaken')">Ez az SKU már foglalt</mat-error>
          </mat-form-field>
          <button mat-stroked-button type="button" (click)="generateSku()"
                  matTooltip="SKU automatikus generálása a kategória alapján">
            <img src="assets/images/refresh-icon.svg" class="btn-icon" alt="Generálás" />
            Generálás
          </button>
        </div>

        <!-- Price row -->
        <div class="price-row">
          <mat-form-field appearance="outline">
            <mat-label>Ár (Ft)</mat-label>
            <input matInput type="number" formControlName="price" min="0" />
            <mat-error *ngIf="form.get('price')?.hasError('required')">Kötelező mező</mat-error>
            <mat-error *ngIf="form.get('price')?.hasError('min')">Minimum 0</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Eredeti ár (Ft, opcionális)</mat-label>
            <input matInput type="number" formControlName="originalPrice" min="0" />
          </mat-form-field>
        </div>

        <!-- Stock quantity -->
        <mat-form-field appearance="outline">
          <mat-label>Készlet (db)</mat-label>
          <input matInput type="number" formControlName="stockQuantity" min="0" />
          <mat-error *ngIf="form.get('stockQuantity')?.hasError('required')">Kötelező mező</mat-error>
          <mat-error *ngIf="form.get('stockQuantity')?.hasError('min')">Minimum 0</mat-error>
        </mat-form-field>

        <!-- Description -->
        <mat-form-field appearance="outline">
          <mat-label>Leírás</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
          <mat-error *ngIf="form.get('description')?.hasError('required')">Kötelező mező</mat-error>
        </mat-form-field>

        <!-- Image URL -->
        <div class="image-row">
          <mat-form-field appearance="outline" class="image-field">
            <mat-label>Kép URL</mat-label>
            <input matInput formControlName="imageUrl" />
          </mat-form-field>
          <button mat-stroked-button type="button" (click)="autoFillImage()"
                  matTooltip="Kép automatikus kitöltése kategória alapján">
            Kategória kép
          </button>
        </div>

        <!-- Active toggle -->
        <div class="toggle-row">
          <mat-slide-toggle formControlName="isActive" color="primary">
            Aktív termék (megjelenik a boltban)
          </mat-slide-toggle>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button mat-button type="button" routerLink="/admin/products">Mégse</button>
          <button mat-raised-button color="primary" type="submit" [disabled]="saving">
            {{ saving ? 'Mentés...' : (editMode ? 'Frissítés' : 'Létrehozás') }}
          </button>
        </div>

      </form>
    </div>
  `,
  styles: [`
    .form-container { max-width: 640px; margin: 0 auto; }

    .back-btn { margin-bottom: 16px; }
    h1 { margin: 0 0 24px; }

    .product-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sku-row, .price-row, .image-row {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .sku-field   { flex: 1; }
    .image-field { flex: 1; }

    .price-row mat-form-field { flex: 1; }

    .toggle-row { margin: 4px 0; }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    .btn-icon { width: 18px; height: 18px; vertical-align: middle; margin-right: 4px; }
  `]
})
export class AdminProductFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  form!: FormGroup;
  editMode = false;
  editId: number | null = null;
  saving = false;
  categories = CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:          ['', [Validators.required, Validators.minLength(3)]],
      category:      ['', Validators.required],
      sku:           ['', Validators.required],
      price:         [null, [Validators.required, Validators.min(0.01)]],
      originalPrice: [null],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      description:   ['', Validators.required],
      imageUrl:      [''],
      isActive:      [true]
    });

    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const idParam = params.get('id');

        if (!idParam) {
          this.editMode = false;
          this.editId = null;
          this.form.reset({
            name: '',
            category: '',
            sku: '',
            price: null,
            originalPrice: null,
            stockQuantity: 0,
            description: '',
            imageUrl: '',
            isActive: true
          });
          return;
        }

        this.editMode = true;
        this.editId = Number(idParam);
        this.loadProductForEdit(this.editId);
      });
  }

  private loadProductForEdit(id: number): void {
    this.productService.getProductById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(product => {
        if (product) {
          this.form.patchValue({
            name: product.name,
            category: product.category,
            sku: product.sku,
            price: product.price,
            originalPrice: product.originalPrice ?? null,
            stockQuantity: product.stockQuantity,
            description: product.description,
            imageUrl: product.imageUrl,
            isActive: product.isActive
          });
        } else {
          this.snackBar.open('Termék nem található.', 'OK', { duration: 3000 });
          this.router.navigate(['/admin/products']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryChange(category: string): void {
    const currentImage = this.form.get('imageUrl')?.value;
    const isPlaceholder = Object.values(CATEGORY_IMAGE_MAP).includes(currentImage) || !currentImage;
    if (isPlaceholder) {
      this.form.patchValue({ imageUrl: CATEGORY_IMAGE_MAP[category] ?? '' });
    }
  }

  autoFillImage(): void {
    const category = this.form.get('category')?.value;
    if (category && CATEGORY_IMAGE_MAP[category]) {
      this.form.patchValue({ imageUrl: CATEGORY_IMAGE_MAP[category] });
    }
  }

  generateSku(): void {
    const category = this.form.get('category')?.value;
    const prefix = CATEGORY_SKU_PREFIX[category] ?? category?.substring(0, 3).toUpperCase() ?? 'PRD';
    const suffix = String(Date.now()).slice(-4);
    this.form.patchValue({ sku: `${prefix}-${suffix}` });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const sku: string = this.form.value.sku;
    if (!this.productService.isSkuUnique(sku, this.editId ?? undefined)) {
      this.form.get('sku')!.setErrors({ skuTaken: true });
      return;
    }

    this.saving = true;
    const data = this.form.value;

    const op$ = this.editMode && this.editId !== null
      ? this.productService.updateProduct(this.editId, data)
      : this.productService.createProduct(data);

    op$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.saving = false;
        const msg = this.editMode ? 'Termék frissítve.' : 'Termék létrehozva.';
        this.snackBar.open(msg, 'OK', { duration: 3000 });
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Hiba történt. Próbáld újra.', 'OK', { duration: 3000 });
      }
    });
  }
}
