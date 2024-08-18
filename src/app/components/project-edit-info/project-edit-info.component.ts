import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-edit-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-edit-info.component.html',
  styleUrl: './project-edit-info.component.scss'
})
export class ProjectEditInfoComponent {
  @Input() project!: Project;
  
  constructor(private categoryService: CategoryService){}

  getCategoryInfo() {
    return this.categoryService.getCategoryInfo(this.project.category);
  }
}
