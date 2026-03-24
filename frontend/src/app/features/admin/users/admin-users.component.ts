import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models';

interface EditableUserRow {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  template: `
    <div class="users-container">
      <div class="page-header">
        <h1>Felhasználókezelés</h1>
        <span class="user-count">{{ filteredUsers.length }} felhasználó</span>
      </div>

      <div class="filters">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Keresés (név, email)</mat-label>
          <img matPrefix src="assets/images/search-icon.svg" alt="Keresés" class="search-prefix-icon" />
          <input matInput [(ngModel)]="searchText" (ngModelChange)="applyFilter()" />
        </mat-form-field>

        <div class="role-filter" role="group" aria-label="Szerepkör szűrés">
          <button mat-button [class.active]="roleFilter === 'all'" (click)="setRoleFilter('all')">Összes</button>
          <button mat-button [class.active]="roleFilter === 'admin'" (click)="setRoleFilter('admin')">Admin</button>
          <button mat-button [class.active]="roleFilter === 'user'" (click)="setRoleFilter('user')">Vásárló</button>
        </div>
      </div>

      <div class="table-wrapper">
        <table mat-table [dataSource]="filteredUsers" class="users-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Név</th>
            <td mat-cell *matCellDef="let user">
              <ng-container *ngIf="editingUserId !== user.id; else editNameTpl">
                {{ user.firstName }} {{ user.lastName }}
              </ng-container>
              <ng-template #editNameTpl>
                <div class="name-edit-grid">
                  <input
                    class="inline-input"
                    [(ngModel)]="editableRow.firstName"
                    placeholder="Keresztnév"
                    aria-label="Keresztnév"
                  />
                  <input
                    class="inline-input"
                    [(ngModel)]="editableRow.lastName"
                    placeholder="Vezetéknév"
                    aria-label="Vezetéknév"
                  />
                </div>
              </ng-template>
            </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let user">{{ user.email }}</td>
          </ng-container>

          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef>Telefon</th>
            <td mat-cell *matCellDef="let user">
              <ng-container *ngIf="editingUserId !== user.id; else editPhoneTpl">
                {{ user.phone || '-' }}
              </ng-container>
              <ng-template #editPhoneTpl>
                <input
                  class="inline-input"
                  [(ngModel)]="editableRow.phone"
                  placeholder="Telefonszám"
                  aria-label="Telefonszám"
                />
              </ng-template>
            </td>
          </ng-container>

          <ng-container matColumnDef="city">
            <th mat-header-cell *matHeaderCellDef>Város</th>
            <td mat-cell *matCellDef="let user">
              <ng-container *ngIf="editingUserId !== user.id; else editCityTpl">
                {{ user.address?.city || '-' }}
              </ng-container>
              <ng-template #editCityTpl>
                <input
                  class="inline-input"
                  [(ngModel)]="editableRow.city"
                  placeholder="Város"
                  aria-label="Város"
                />
              </ng-template>
            </td>
          </ng-container>

          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef>Szerepkör</th>
            <td mat-cell *matCellDef="let user">
              <span class="role-badge" [class.admin]="user.role === 'admin'">
                {{ user.role === 'admin' ? 'Admin' : 'Vásárló' }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let user" class="actions-cell">
              <ng-container *ngIf="editingUserId !== user.id">
                <button mat-button color="primary" (click)="startEdit(user)">Szerkesztés</button>
                <button
                  mat-button
                  (click)="toggleRole(user)"
                  [disabled]="user.id === currentUserId"
                  [attr.aria-label]="user.role === 'admin' ? 'Admin jog elvétele' : 'Admin jog adása'"
                >
                  {{ user.role === 'admin' ? 'Legyen vásárló' : 'Legyen admin' }}
                </button>
              </ng-container>

              <ng-container *ngIf="editingUserId === user.id">
                <button mat-button color="primary" (click)="saveEdit(user)">Mentés</button>
                <button mat-button (click)="cancelEdit()">Mégse</button>
              </ng-container>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <p *ngIf="filteredUsers.length === 0" class="no-results">
        Nincs találat a megadott feltételekkel.
      </p>
    </div>
  `,
  styles: [`
    .users-container {
      max-width: 1100px;
      margin: 0 auto;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    h1 {
      margin: 0;
    }

    .user-count {
      color: var(--color-text-secondary);
      font-size: 14px;
    }

    .filters {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: start;
      margin-bottom: 12px;
    }

    .search-field {
      width: 100%;
    }

    .search-prefix-icon {
      width: 18px;
      height: 18px;
      margin-right: 8px;
      opacity: 0.7;
    }

    .role-filter {
      display: inline-flex;
      gap: 4px;
      background: #f7f7f7;
      border: 1px solid #ececec;
      border-radius: 12px;
      padding: 4px;
      flex-wrap: wrap;
    }

    .role-filter button.active {
      background: rgba(76, 175, 80, 0.12);
      color: #2e7d32;
      border-radius: 8px;
      font-weight: 600;
    }

    .table-wrapper {
      overflow-x: auto;
      border: 1px solid #ececec;
      border-radius: 12px;
    }

    .users-table {
      width: 100%;
      min-width: 920px;
    }

    .role-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      background: #f3f4f6;
      color: #52525b;
      font-size: 12px;
      font-weight: 600;
    }

    .role-badge.admin {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .actions-cell {
      white-space: nowrap;
    }

    .inline-input {
      width: 100%;
      min-height: 32px;
      border: 1px solid #d8d8d8;
      border-radius: 8px;
      padding: 6px 10px;
      font: inherit;
      color: var(--color-text-primary);
      background: white;
    }

    .inline-input:focus {
      border-color: var(--color-primary);
      outline: none;
      box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.12);
    }

    .name-edit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      min-width: 220px;
    }

    .no-results {
      text-align: center;
      color: var(--color-text-secondary);
      padding: 20px;
      margin: 0;
    }

    @media (max-width: 900px) {
      .filters {
        grid-template-columns: 1fr;
      }

      .users-table {
        min-width: 760px;
      }
    }

    @media (max-width: 600px) {
      .page-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .users-table {
        min-width: 680px;
      }

      .name-edit-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns = ['name', 'email', 'phone', 'city', 'role', 'actions'];

  searchText = '';
  roleFilter: 'all' | 'admin' | 'user' = 'all';

  editingUserId: number | null = null;
  editableRow: EditableUserRow = {
    firstName: '',
    lastName: '',
    phone: '',
    city: ''
  };

  get currentUserId(): number | null {
    return this.authService.currentUserValue?.id ?? null;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setRoleFilter(filter: 'all' | 'admin' | 'user'): void {
    this.roleFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    const search = this.searchText.trim().toLowerCase();

    this.filteredUsers = this.users.filter(user => {
      const roleMatches = this.roleFilter === 'all' || user.role === this.roleFilter;
      const searchMatches =
        !search ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      return roleMatches && searchMatches;
    });
  }

  startEdit(user: User): void {
    this.editingUserId = user.id;
    this.editableRow = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? '',
      city: user.address?.city ?? ''
    };
  }

  cancelEdit(): void {
    this.editingUserId = null;
    this.editableRow = {
      firstName: '',
      lastName: '',
      phone: '',
      city: ''
    };
  }

  saveEdit(user: User): void {
    const firstName = this.editableRow.firstName.trim();
    const lastName = this.editableRow.lastName.trim();

    if (!firstName || !lastName) {
      this.snackBar.open('A név mezők nem lehetnek üresek.', 'OK', { duration: 2500 });
      return;
    }

    this.authService.updateUserByAdmin(user.id, {
      firstName,
      lastName,
      phone: this.editableRow.phone.trim(),
      address: {
        street: user.address?.street ?? '',
        city: this.editableRow.city.trim(),
        zipCode: user.address?.zipCode ?? '',
        country: user.address?.country ?? 'Magyarország'
      }
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      if (!response.success) {
        this.snackBar.open(response.message || 'Mentés közben hiba történt.', 'OK', { duration: 3000 });
        return;
      }

      this.snackBar.open('Felhasználó adatai mentve.', 'OK', { duration: 2500 });
      this.cancelEdit();
      this.loadUsers();
    });
  }

  toggleRole(user: User): void {
    if (user.id === this.currentUserId) {
      this.snackBar.open('A saját admin jogosultságod itt nem módosítható.', 'OK', { duration: 3000 });
      return;
    }

    const nextRole: User['role'] = user.role === 'admin' ? 'user' : 'admin';

    this.authService.updateUserByAdmin(user.id, { role: nextRole })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        if (!response.success) {
          this.snackBar.open(response.message || 'Szerepkör módosítás sikertelen.', 'OK', { duration: 3000 });
          return;
        }

        this.snackBar.open(
          nextRole === 'admin' ? 'Felhasználó admin jogosultságot kapott.' : 'Admin jogosultság visszavonva.',
          'OK',
          { duration: 3000 }
        );
        this.loadUsers();
      });
  }

  private loadUsers(): void {
    this.authService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.users = users;
        this.applyFilter();
      });
  }
}
