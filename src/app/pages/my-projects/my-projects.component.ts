import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectComponent } from "../../components/project/project.component";
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectComponent],
  providers: [
    ProjectService
  ],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})
export class MyProjectsComponent {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    })
  }

}
