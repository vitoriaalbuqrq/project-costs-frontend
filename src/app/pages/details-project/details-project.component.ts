import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { ProjectEditInfoComponent } from "../../components/project-edit-info/project-edit-info.component";
import { ServiceContainerComponent } from "../../components/service-container/service-container.component";
import { ServiceCardComponent } from "../../components/service-card/service-card.component";
import { CategoryService } from '../../services/category.service';
import { ProjectServices } from '../../models/projectServices';
import { ProjectServicesService } from '../../services/project-services.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-details-project',
  standalone: true,
  imports: [CommonModule, ProjectEditInfoComponent, ServiceContainerComponent, ServiceCardComponent, MatDialogModule],
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
    cost: 0,
    services: []
  };
  categoryColor: string = '';
  projectId!: number;
  services: ProjectServices[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private projectServicesService: ProjectServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (data) => {
          this.project = data;
          this.project.services = this.project.services || [];
          this.categoryColor = this.categoryService.getCategoryInfo(this.project.category)?.color || '#000';
        },
        error: (err) => {
          console.error('Erro ao carregar os detalhes do projeto', err);
        }
      });
      this.loadServices();

    }
  }

  loadServices(): void {
    this.projectServicesService.getServicesByProjectId(this.projectId).subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.log('Erro ao carregar serviços:', error);
      }
    );
  }
  
  onServiceCreated(newService: ProjectServices): void {
    if (this.project.services) {
      this.project.services.push(newService);
    } else {
      this.project.services = [newService];
    }
    if (this.project.cost === undefined) {
      this.project.cost = 0;
    }
    this.project.cost += newService.budget;
    this.cdr.detectChanges();
  }

  onServiceDeleted(serviceId: number): void {
    if (this.project.services) {
      this.project.services = this.project.services.filter(service => service.id !== serviceId);
      this.cdr.detectChanges();
    }
  }  
  
}