import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/enum/category.enum';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project: Project = {id: 0, title: '', budget: 0, category: Category.Other, description: '', startDate: '', endDate: ''};

  constructor(private categoryService: CategoryService){}

  getCategoryInfo() {
    return this.categoryService.getCategoryInfo(this.project.category);
  }

  // delete(){
  //   console.log('excluir')
  // }
}
