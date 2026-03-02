import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() message = 'Betöltés...';
  @Input() diameter = 60;
  @Input() strokeWidth = 4;
  @Input() spinnerColor: 'primary' | 'accent' | 'warn' = 'primary';
}
