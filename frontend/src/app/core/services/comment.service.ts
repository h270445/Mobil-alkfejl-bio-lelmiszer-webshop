import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Comment } from '../../shared/models';

// Mock data for comments
const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: 'Nagy Anna',
    text: 'Nagyon friss és ízletes tejtermék! Már másodszor rendeltem. Ajánlom mindenkinek!',
    rating: 5,
    timestamp: new Date('2026-03-20')
  },
  {
    id: 2,
    productId: 1,
    userId: 3,
    userName: 'Kovács Péter',
    text: 'Jó minőség, de az ár egy kicsit magas.',
    rating: 4,
    timestamp: new Date('2026-03-19')
  },
  {
    id: 3,
    productId: 1,
    userId: 4,
    userName: 'Szilágyi Márta',
    text: 'Nem érkezett meg időben, és már romlott volt az érkezéskor.',
    rating: 1,
    timestamp: new Date('2026-03-18')
  },
  {
    id: 4,
    productId: 2,
    userId: 5,
    userName: 'Tóth László',
    text: 'Kiváló joghurt! A Bio Góra joghurt a kedvencem.',
    rating: 5,
    timestamp: new Date('2026-03-21')
  },
  {
    id: 5,
    productId: 2,
    userId: 6,
    userName: 'Kiss Beatrice',
    text: 'Gusztustalan az ízprofilja, nem tetszett.',
    rating: 2,
    timestamp: new Date('2026-03-17')
  },
  {
    id: 6,
    productId: 3,
    userId: 7,
    userName: 'Virág Dániel',
    text: 'Remek kenyér! Hosszú tartósítóanya-lista, bio minőség.',
    rating: 5,
    timestamp: new Date('2026-03-16')
  }
];

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly STORAGE_KEY = 'biomarket_comments';
  private commentsSubject!: BehaviorSubject<Comment[]>;
  public comments$!: Observable<Comment[]>;

  constructor() {
    const initial = this.loadFromStorage();
    this.commentsSubject = new BehaviorSubject<Comment[]>(initial);
    this.comments$ = this.commentsSubject.asObservable();
  }

  // --- Persistence helpers ---

  private loadFromStorage(): Comment[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Comment[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Convert ISO strings back to Date objects
          return parsed.map(c => ({
            ...c,
            timestamp: new Date(c.timestamp as any)
          }));
        }
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }
    return [...MOCK_COMMENTS];
  }

  private saveToStorage(comments: Comment[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
  }

  private emit(comments: Comment[]): void {
    this.commentsSubject.next(comments);
    this.saveToStorage(comments);
  }

  // --- Read ---

  getCommentsByProductId(productId: number): Observable<Comment[]> {
    return of(this.commentsSubject.value).pipe(
      delay(300),
      map(comments => comments.filter(c => c.productId === productId))
    );
  }

  getCommentsByProductIdAndRating(productId: number, rating: number): Observable<Comment[]> {
    return of(this.commentsSubject.value).pipe(
      delay(300),
      map(comments =>
        comments.filter(c => c.productId === productId && c.rating === rating)
      )
    );
  }

  getCommentsByProductIdAndMinRating(productId: number, minRating: number): Observable<Comment[]> {
    return of(this.commentsSubject.value).pipe(
      delay(300),
      map(comments =>
        comments.filter(c => c.productId === productId && c.rating >= minRating)
      )
    );
  }

  // --- Write ---

  addComment(comment: Omit<Comment, 'id' | 'timestamp'>): Observable<Comment> {
    const current = this.commentsSubject.value;
    const newId = current.length > 0 ? Math.max(...current.map(c => c.id)) + 1 : 1;
    const newComment: Comment = {
      ...comment,
      id: newId,
      timestamp: new Date()
    };

    this.emit([...current, newComment]);
    return of(newComment).pipe(delay(300));
  }

  updateComment(id: number, updates: Partial<Omit<Comment, 'id' | 'productId' | 'userId' | 'userName' | 'timestamp'>>): Observable<Comment | null> {
    const current = this.commentsSubject.value;
    const index = current.findIndex(c => c.id === id);

    if (index === -1) {
      return of(null).pipe(delay(300));
    }

    const updated = { ...current[index], ...updates };
    const newComments = [...current];
    newComments[index] = updated;

    this.emit(newComments);
    return of(updated).pipe(delay(300));
  }

  deleteComment(id: number): Observable<boolean> {
    const current = this.commentsSubject.value;
    const filtered = current.filter(c => c.id !== id);

    if (filtered.length === current.length) {
      return of(false).pipe(delay(300));
    }

    this.emit(filtered);
    return of(true).pipe(delay(300));
  }

  // --- Stats ---

  getAverageRating(productId: number): number {
    const comments = this.commentsSubject.value.filter(c => c.productId === productId);
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, c) => acc + c.rating, 0);
    return Math.round((sum / comments.length) * 10) / 10;
  }

  getRatingDistribution(productId: number): { [key: number]: number } {
    const comments = this.commentsSubject.value.filter(c => c.productId === productId);
    const dist: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    comments.forEach(c => {
      dist[c.rating]++;
    });
    return dist;
  }
}
