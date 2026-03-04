import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card [class]="'alert alert-' + type" *ngIf="visible">
      <mat-card-content>
        <span class="alert-icon">{{ getIcon() }}</span>
        <span class="alert-message">{{ message }}</span>
        <button mat-icon-button (click)="close()" class="close-btn">
          <mat-icon>close</mat-icon>
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
    }

    mat-card {
      margin: 16px 0;
      border-left: 4px solid;
    }

    mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
    }

    .alert-icon {
      font-size: 20px;
      min-width: 24px;
      text-align: center;
    }

    .alert-message {
      flex: 1;
      font-weight: 500;
    }

    .close-btn {
      margin-left: auto;
      flex-shrink: 0;
    }

    /* Alert Type Styles */
    .alert-error {
      background-color: #ffebee;
      border-left-color: #f44336;
      color: #c62828;
    }

    .alert-success {
      background-color: #e8f5e9;
      border-left-color: #4caf50;
      color: #2e7d32;
    }

    .alert-info {
      background-color: #e3f2fd;
      border-left-color: #2196F3;
      color: #1565c0;
    }

    .alert-warning {
      background-color: #fff3e0;
      border-left-color: #ff9800;
      color: #e65100;
    }
  `]
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() type: 'error' | 'success' | 'info' | 'warning' = 'success';
  @Input() duration: number = 5000; // ms
  @Output() closed = new EventEmitter<void>();

  visible = true;
  private dismissTimer: any;

  ngOnInit(): void {
    if (this.duration > 0) {
      this.dismissTimer = setTimeout(() => this.close(), this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
  }

  getIcon(): string {
    const icons: Record<string, string> = {
      error: '❌',
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️'
    };
    return icons[this.type] || '';
  }
}
