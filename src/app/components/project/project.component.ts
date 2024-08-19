import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../models/project';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category } from '../../models/enum/category.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project: Project = {id: 0, title: '', budget: 0, cost: 0,  category: Category.Other, description: '', startDate: '', endDate: '', services: []};
  @Output() projectDeleted = new EventEmitter<void>();
  
  constructor(private projectService: ProjectService, private categoryService: CategoryService, private matDialog: MatDialog){}

  getCategoryInfo() {
    return this.categoryService.getCategoryInfo(this.project.category);
  }

  openDialog(){
    const dialogRef = this.matDialog.open(DialogBodyComponent, {
      width: '400px',
      data: { item: this.project.title, message: 'Excluir projeto' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject();
      }
    });
  }

  deleteProject() {
    if (this.project.id !== undefined) {
      this.projectService.deleteProject(this.project.id).subscribe({
        next: () => {
          console.log('Projeto excluído');
          this.projectDeleted.emit();
        },
        error: (err) => {
          console.error('Erro ao excluir o projeto:', err);
        }
      });
    } else {
      console.error('ID do projeto está indefinido, não é possível excluir.');
    }
  }
  
}
