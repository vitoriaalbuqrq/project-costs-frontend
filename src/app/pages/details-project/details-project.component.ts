import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { ProjectEditInfoComponent } from "../../components/project-edit-info/project-edit-info.component";
import { ServiceContainerComponent } from "../../components/service-container/service-container.component";
import { ServiceCardComponent } from "../../components/service-card/service-card.component";
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-details-project',
  standalone: true,
  imports: [CommonModule, ProjectEditInfoComponent, ServiceContainerComponent, ServiceCardComponent],
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.scss'],
})
export class DetailsProjectComponent implements OnInit {
  project: Project = {
    id: 0,
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    budget: 0,
    services: []
  };
  categoryColor: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => {
          this.project = data;
          this.categoryColor = this.categoryService.getCategoryInfo(this.project.category)?.color || '#000';
        },
        error: (err) => {
          console.error('Erro ao carregar os detalhes do projeto', err);
        }
      });
    }
  }
}