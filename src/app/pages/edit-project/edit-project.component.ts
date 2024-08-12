import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { ProjectEditInfoComponent } from "../../components/project-edit-info/project-edit-info.component";
import { ServiceContainerComponent } from "../../components/service-container/service-container.component";
import { ServiceCardComponent } from "../../components/service-card/service-card.component";

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ProjectEditInfoComponent, ProjectEditInfoComponent, ServiceContainerComponent, ServiceCardComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent implements OnInit{
  //project: Project = {id: 1, title: 'teste', budget: 100, category: 'Other', description: 'teste teste teste', startDate: '', endDate: ''};
  //projectId: number | null = null;
  project!: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => {
          this.project = data;
          //this.isLoading = false;
        },
        error: (err) => {
          //this.errorMessage = 'Failed to load project details.';
          //this.isLoading = false;
        }
      });
    }
  }
  // ngOnInit(): void {
  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');
  //     this.projectId = id ? +id : null; // Convertendo para número
  //     if (this.projectId !== null) {
  //       this.loadProjectDetails(this.projectId);
  //     }
  //   });
  // }

  // loadProjectDetails(id: number): void {
  //   this.projectService.getProjectById(id).subscribe(
  //     (project) => this.project = project,
  //     (error) => console.error('Error fetching project details', error)
  //   );
  // }

}
