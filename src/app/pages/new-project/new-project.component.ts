import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultFormLayoutComponent } from "../../components/default-form-layout/default-form-layout.component";
import { Category } from '../../models/enum/category.enum';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { FormInputComponent } from "../../components/form/form-input/form-input.component";
import { FormComponent } from "../../components/form/form.component";
import { FormSelectComponent } from '../../components/form/form-select/form-select.component';

interface ProjectForm {
  projectTitle: FormControl,
  projectBudget: FormControl,
  projectCategory: FormControl,
  projectDescription: FormControl,
  projectStartDate: FormControl,
  projectEndDate: FormControl,
}

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultFormLayoutComponent,
    FormInputComponent,
    FormSelectComponent,
    FormComponent
],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss'
})

export class NewProjectComponent {
  projectCreateForm!: FormGroup<ProjectForm>;
  categories: Category[] = [];

  constructor(private projectService: ProjectService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories = Object.values(Category);
    this.projectCreateForm = new FormGroup<ProjectForm>({
      projectTitle: new FormControl('', [Validators.required]),
      projectBudget: new FormControl('', [Validators.required]),
      projectCategory: new FormControl('', [Validators.required]),
      projectDescription: new FormControl('', [Validators.required]),
      projectStartDate: new FormControl('', [Validators.required]),
      projectEndDate: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.projectCreateForm.valid) {
      const formValue = this.projectCreateForm.value;

      const project: Project = {
        title: formValue.projectTitle,
        description: formValue.projectDescription,
        category: formValue.projectCategory,
        startDate: formValue.projectStartDate,
        endDate: formValue.projectEndDate,
        budget: formValue.projectBudget
      };

      this.projectService.createProject(project).subscribe(
        response => {
          console.log('Projeto criado com sucesso:', response);
        },
        error => {
          console.error('Erro ao criar projeto:', error);
        }
      );
    }
  }
}