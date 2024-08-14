import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../models/enum/category.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { CategoryService } from '../../services/category.service';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';

interface ProjectForm {
  projectTitle: FormControl;
  projectBudget: FormControl;
  projectCategory: FormControl;
  projectDescription: FormControl;
  projectStartDate: FormControl;
  projectEndDate: FormControl;
}

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent implements OnInit {
  projectEditForm!: FormGroup<ProjectForm>;
  categories: Category[] = [];
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    //Inicializa o form vazio
    this.projectEditForm = new FormGroup<ProjectForm>({
      projectTitle: new FormControl(''),
      projectBudget: new FormControl(''),
      projectCategory: new FormControl(''),
      projectDescription: new FormControl(''),
      projectStartDate: new FormControl(''),
      projectEndDate: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.categories = Object.values(Category);
    this.route.paramMap.subscribe((params) => {
      this.projectId = +params.get('id')!;
      if (this.projectId) {
        this.projectService
          .getProjectById(this.projectId)
          .subscribe((project) => {
            this.initializeForm(project);
          });
      }
    });
  }

  initializeForm(project: Project) {
    this.projectEditForm.setValue({
      projectTitle: project.title,
      projectBudget: project.budget,
      projectCategory: project.category,
      projectDescription: project.description,
      projectStartDate: project.startDate,
      projectEndDate: project.endDate,
    });
  }

  submit() {
    if (this.projectEditForm.valid) {
      const formValues = this.projectEditForm.value;

      const updatedProject: Project = {
        title: formValues.projectTitle,
        description: formValues.projectDescription,
        category: formValues.projectCategory as Category,
        startDate: formValues.projectStartDate,
        endDate: formValues.projectEndDate,
        budget: formValues.projectBudget,
        id: this.projectId,
      };

      this.projectService
        .updateProject(this.projectId, updatedProject)
        .subscribe(
          (response) => {
            console.log('Projeto atualizado com sucesso:', response);
          },
          (error) => {
            console.error('Erro ao atualizar projeto:', error);
          }
        );
    }
  }

}
