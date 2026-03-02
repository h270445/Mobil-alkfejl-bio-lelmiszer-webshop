import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../../shared/models';
import { MOCK_USERS, validateCredentials, findUserByEmail } from '../../shared/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'biomarket_current_user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    // Initialize from localStorage
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
          
          this.setCurrentUser(safeUser);
          
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

        this.setCurrentUser(newUser);

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
    this.currentUserSubject.next(null);
  }

  // Update user profile
  updateProfile(user: User): void {
    this.setCurrentUser(user);
  }

  // Private helper methods
  private setCurrentUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    return null;
  }
}
