import { Component, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProjectServices } from '../../models/projectServices';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Input() service!: ProjectServices;
  @Input() borderColor!: string;
  
  constructor(){}

}
