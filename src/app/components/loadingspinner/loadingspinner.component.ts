import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loadingspinner',
  standalone: true,
  imports: [CommonModule,
    MatProgressSpinnerModule],
  templateUrl: './loadingspinner.component.html',
  styleUrl: './loadingspinner.component.scss'
})
export class LoadingspinnerComponent {
  @Input() diameter: number = 50;  
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';
  @Input() value: number = 0;
}
