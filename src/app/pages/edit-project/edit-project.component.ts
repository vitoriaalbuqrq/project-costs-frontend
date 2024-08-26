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
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { ToastrService } from 'ngx-toastr';
import { LoadingspinnerComponent } from "../../components/loadingspinner/loadingspinner.component";

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
  imports: [CommonModule, ReactiveFormsModule, FormComponent, LoadingspinnerComponent],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.scss',
})
export class EditProjectComponent implements OnInit {
  projectEditForm!: FormGroup<ProjectForm>;
  categories: Category[] = [];
  projectId!: number;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router,
    private toastService: ToastrService
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
        this.isLoading = true;
        this.projectService
          .getProjectById(this.projectId)
          .subscribe({
            next: (project) => {
              this.initializeForm(project);
              this.isLoading = false; 
            },
            error: (err) => {
              console.error('Erro ao carregar o projeto:', err);
              this.isLoading = false; 
            }
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
            this.toastService.success('Projeto atualizado com sucesso!');
            this.router.navigate(['/user/myprojects']);
          },
          (error) => {
            this.toastService.error('Erro ao atualizar projeto!');
          }
        );
    }
  }

}
