import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectServices } from '../../models/projectServices';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProjectServicesService } from '../../services/project-services.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent implements OnInit{
  @Input() service!: ProjectServices;
  @Input() borderColor!: string;
  @Output() serviceDeleted = new EventEmitter<number>();
  projectId!: number;

  constructor(private services: ProjectServicesService, 
    private matDialog: MatDialog, 
    private route: ActivatedRoute,
    private toastService: ToastrService
  ){}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
  }

  openDialog(){
    const dialogRef = this.matDialog.open(DialogBodyComponent, {
      width: '400px',
      data: { item: this.service.name, message: 'Excluir serviço' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteService();
      }
    });
  }

  deleteService() {
    if (this.projectId !== undefined && this.service.id !== undefined) {
      //recupera o id do project na url
      this.services.deleteService(this.projectId, this.service.id).subscribe({
        next: () => {
          this.toastService.success('Serviço excluído com sucesso!');
          this.serviceDeleted.emit(this.service.id);
        },
        error: (err) => {
          this.toastService.error('Erro ao excluir o serviço!');
        }
      });
    } else {
      this.toastService.warning('ID do service está indefinido, não é possível excluir.');
    }
  }

}
