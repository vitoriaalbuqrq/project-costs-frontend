import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectComponent } from "../../components/project/project.component";
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { LoadingspinnerComponent } from "../../components/loadingspinner/loadingspinner.component";

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectComponent, MatDialogModule, LoadingspinnerComponent],
  providers: [
    ProjectService
  ],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  projects: Project[] = [];
  isLoading: boolean = true;

  constructor(
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.isLoading = false;
    });
  }

  onProjectDeleted(): void {
    this.isLoading = true;
    this.loadProjects();
  }
}
