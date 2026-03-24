import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../../shared/models';
import { MOCK_USERS, validateCredentials, findUserByEmail } from '../../shared/mock-data';

type UserEditableFields = Pick<User, 'firstName' | 'lastName' | 'phone' | 'address'>;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'biomarket_current_user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    // Initialize from sessionStorage first, then localStorage
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Getters
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  public get isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  // Login
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const user = validateCredentials(credentials.email, credentials.password);

        if (user) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = user;
          const safeUser = userWithoutPassword as User;

          this.setCurrentUser(safeUser, credentials.rememberMe ?? false);
          
          observer.next({
            success: true,
            user: safeUser,
            message: 'Sikeres bejelentkezés!'
          });
        } else {
          observer.next({
            success: false,
            user: null as any,
            message: 'Hibás email vagy jelszó!'
          });
        }
        
        observer.complete();
      }, 500); // Simulate network delay
    });
  }

  // Register
  register(request: RegisterRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = findUserByEmail(request.email);
        
        if (existingUser) {
          observer.next({
            success: false,
            user: null as any,
            message: 'Ez az email cím már regisztrálva van!'
          });
          observer.complete();
          return;
        }

        // Validate password confirmation
        if (request.password !== request.passwordConfirm) {
          observer.next({
            success: false,
            user: null as any,
            message: 'A jelszavak nem egyeznek!'
          });
          observer.complete();
          return;
        }

        // Create new user
        const newUser: User = {
          id: MOCK_USERS.length + 1,
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          role: 'user',
          phone: request.phone,
          createdAt: new Date()
        };

        // Add to mock users (in real app, this would be a server call)
        MOCK_USERS.push({ ...newUser, password: request.password });

        this.setCurrentUser(newUser, true);

        observer.next({
          success: true,
          user: newUser,
          message: 'Sikeres regisztráció!'
        });
        
        observer.complete();
      }, 500);
    });
  }

  // Logout
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  // Update user profile
  updateProfile(user: User): void {
    const updatedUser = this.syncUserToMockData(user, false);
    this.setCurrentUser(updatedUser, this.isUsingLocalStorage());
  }

  getAllUsers(): Observable<User[]> {
    return new Observable(observer => {
      setTimeout(() => {
        const safeUsers = MOCK_USERS.map(({ password, ...safeUser }) => safeUser as User);
        observer.next(safeUsers);
        observer.complete();
      }, 300);
    });
  }

  updateUserByAdmin(userId: number, updates: Partial<UserEditableFields & Pick<User, 'role'>>): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        const existing = MOCK_USERS.find(user => user.id === userId);

        if (!existing) {
          observer.next({
            success: false,
            user: null as any,
            message: 'A felhasználó nem található.'
          });
          observer.complete();
          return;
        }

        const updatedUser = this.syncUserToMockData({
          ...existing,
          ...updates,
          address: updates.address ?? existing.address
        } as User, true);

        observer.next({
          success: true,
          user: updatedUser,
          message: 'Felhasználó sikeresen frissítve.'
        });
        observer.complete();
      }, 300);
    });
  }

  // Private helper methods
  private setCurrentUser(user: User, rememberMe: boolean): void {
    const serialized = JSON.stringify(user);

    localStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.STORAGE_KEY);

    if (rememberMe) {
      localStorage.setItem(this.STORAGE_KEY, serialized);
    } else {
      sessionStorage.setItem(this.STORAGE_KEY, serialized);
    }

    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): User | null {
    const sessionUser = sessionStorage.getItem(this.STORAGE_KEY);
    if (sessionUser) {
      try {
        return JSON.parse(sessionUser);
      } catch (error) {
        console.error('Error parsing session user:', error);
        sessionStorage.removeItem(this.STORAGE_KEY);
      }
    }

    const localUser = localStorage.getItem(this.STORAGE_KEY);
    if (localUser) {
      try {
        return JSON.parse(localUser);
      } catch (error) {
        console.error('Error parsing local user:', error);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }

    return null;
  }

  private isUsingLocalStorage(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  private syncUserToMockData(user: User, preservePassword: boolean): User {
    const index = MOCK_USERS.findIndex(mockUser => mockUser.id === user.id);

    if (index !== -1) {
      const existing = MOCK_USERS[index];
      MOCK_USERS[index] = {
        ...existing,
        ...user,
        password: preservePassword ? existing.password : existing.password ?? user.password
      };
    }

    const { password, ...safeUser } = (index !== -1 ? MOCK_USERS[index] : user) as User;
    return safeUser as User;
  }
}
