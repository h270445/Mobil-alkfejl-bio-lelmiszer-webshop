import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Comment } from '../../shared/models';

// Mock data for comments
const MOCK_COMMENTS: Comment[] = [
  // Product 1 - Diverse ratings
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: 'Nagy Anna',
    text: 'Nagyon friss és ízletes tejtermék! Már másodszor rendeltem. Ajánlom mindenkinek! Kiváló minőség és ár-érték arány.',
    rating: 5,
    timestamp: new Date('2026-03-20')
  },
  {
    id: 2,
    productId: 1,
    userId: 3,
    userName: 'Kovács Péter',
    text: 'Jó minőség, de az ár egy kicsit magas. Az ízéről nem lehet panasz, de olcsóbb alternatívák is vannak.',
    rating: 4,
    timestamp: new Date('2026-03-19')
  },
  {
    id: 3,
    productId: 1,
    userId: 4,
    userName: 'Szilágyi Márta',
    text: 'Nem érkezett meg időben, és már romlott volt az érkezéskor. Nagyon csalódott vagyok, nem ajánlom!',
    rating: 1,
    timestamp: new Date('2026-03-18')
  },
  {
    id: 4,
    productId: 1,
    userId: 8,
    userName: 'Szabó László',
    text: 'Átlagos termék, semmi különleges. Elég jó, de már jobb véleményt vártam. Újra nem rendelek belőle.',
    rating: 3,
    timestamp: new Date('2026-03-15')
  },
  {
    id: 5,
    productId: 1,
    userId: 9,
    userName: 'Bakos Éva',
    text: 'Csodálatos! Finom, friss és teljesen bio. Az egész család szereti. Folyamatosan ezt rendelek!',
    rating: 5,
    timestamp: new Date('2026-03-14')
  },

  // Product 2 - Diverse ratings
  {
    id: 6,
    productId: 2,
    userId: 5,
    userName: 'Tóth László',
    text: 'Kiváló joghurt! A Bio Góra joghurt a kedvencem, simán krémesebb, mint a nagy márkák. Teljes folyamatosan ezt eszem!',
    rating: 5,
    timestamp: new Date('2026-03-21')
  },
  {
    id: 7,
    productId: 2,
    userId: 6,
    userName: 'Kiss Beatrice',
    text: 'Gusztustalan az ízprofilja, nem tetszett. Túl sava és nem olyan krémesnek találtam, ahogyan hirdetik.',
    rating: 2,
    timestamp: new Date('2026-03-17')
  },
  {
    id: 8,
    productId: 2,
    userId: 10,
    userName: 'Fehér Dániel',
    text: 'Jó joghurt, de az ár magas. Ízében nem rossz, azonban kevés az élelmiszer nyomában. Kell még jobbat keresni.',
    rating: 3,
    timestamp: new Date('2026-03-16')
  },
  {
    id: 9,
    productId: 2,
    userId: 11,
    userName: 'Molnár Zsuzsanna',
    text: 'Szuperb! Pont olyan, amilyennek kell lennie egy bio joghurtnak. Kellemesen édes, friss és egészséges!',
    rating: 5,
    timestamp: new Date('2026-03-13')
  },

  // Product 3 - Diverse ratings
  {
    id: 10,
    productId: 3,
    userId: 7,
    userName: 'Virág Dániel',
    text: 'Remek kenyér! Hosszú tartósítóanya-lista, bio minőség. Pont amit kerestem! Már megint rendelni fogok.',
    rating: 5,
    timestamp: new Date('2026-03-16')
  },
  {
    id: 11,
    productId: 3,
    userId: 12,
    userName: 'Farkas Ildikó',
    text: 'Szánalmas! A kenyér már romlott volt, amikor megérkezett. Az ízéről nem is beszélve.',
    rating: 1,
    timestamp: new Date('2026-03-12')
  },
  {
    id: 12,
    productId: 3,
    userId: 13,
    userName: 'Kováts Sándor',
    text: 'Rendben van, de nem olyan friss, amint vártam. Az ízére semmi panasz, csak az süllyedése gyors.',
    rating: 3,
    timestamp: new Date('2026-03-11')
  },
  {
    id: 13,
    productId: 3,
    userId: 14,
    userName: 'Bodnár Réka',
    text: 'Ízében finom, de az ár a pénztárcámnak magas. Azonban nem lehet besszetelni az ízéről, teljesen bio.',
    rating: 4,
    timestamp: new Date('2026-03-10')
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

  private toSignature(comment: Comment): string {
    return [
      comment.productId,
      comment.userId,
      comment.userName,
      comment.rating,
      comment.text.trim(),
      new Date(comment.timestamp).toISOString()
    ].join('|');
  }

  private normalizeIds(comments: Comment[]): Comment[] {
    return comments.map((comment, index) => ({
      ...comment,
      isPinned: !!comment.isPinned,
      id: index + 1
    }));
  }

  private mergeStoredWithMocks(storedComments: Comment[]): Comment[] {
    const signatures = new Set(storedComments.map(comment => this.toSignature(comment)));
    const merged = [...storedComments];

    for (const mock of MOCK_COMMENTS) {
      const signature = this.toSignature(mock);
      if (!signatures.has(signature)) {
        merged.push({ ...mock });
      }
    }

    return this.normalizeIds(merged);
  }

  private loadFromStorage(): Comment[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Comment[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Convert ISO strings back to Date objects
          const hydrated = parsed.map(c => ({
            ...c,
            isPinned: !!c.isPinned,
            timestamp: new Date(c.timestamp as any)
          }));

          const merged = this.mergeStoredWithMocks(hydrated);
          if (merged.length !== hydrated.length) {
            this.saveToStorage(merged);
          }

          return merged;
        }
      } catch {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    }

    const seeded = this.normalizeIds([...MOCK_COMMENTS]);
    this.saveToStorage(seeded);
    return seeded;
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
      isPinned: false,
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

  setPinnedComment(commentId: number, isPinned: boolean): Observable<boolean> {
    const current = this.commentsSubject.value;
    const target = current.find(c => c.id === commentId);

    if (!target) {
      return of(false).pipe(delay(300));
    }

    const updated = current.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, isPinned };
      }

      if (isPinned && comment.productId === target.productId && comment.isPinned) {
        return { ...comment, isPinned: false };
      }

      return comment;
    });

    this.emit(updated);
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
