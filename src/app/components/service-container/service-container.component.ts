import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AddServiceFormComponent } from '../add-service-form/add-service-form.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectServicesService } from '../../services/project-services.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectServices } from '../../models/projectServices';
import { ProjectService } from '../../services/project.service';

interface ServiceForm {
  serviceName: FormControl;
  serviceBudget: FormControl;
  serviceDescription: FormControl;
}

@Component({
  selector: 'app-service-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddServiceFormComponent],
  templateUrl: './service-container.component.html',
  styleUrls: ['./service-container.component.scss'],
})
export class ServiceContainerComponent implements OnInit {
  serviceAddForm!: FormGroup<ServiceForm>;
  isFormVisible = false;
  projectId!: number;
  projectBudget!: number;
  totalServiceBudget = 0;
  @Output() serviceCreated = new EventEmitter<ProjectServices>();

  constructor(
    private route: ActivatedRoute,
    private projectServicesService: ProjectServicesService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.serviceAddForm = new FormGroup<ServiceForm>({
      serviceName: new FormControl(''),
      serviceBudget: new FormControl(0),
      serviceDescription: new FormControl(''),
    });
    this.loadProjectData();

  }
  loadProjectData(): void {
    // Recupera o orçamento do projeto
    this.projectService.getProjectById(this.projectId).subscribe(project => {
      this.projectBudget = project.budget;
    });

    // Recupera os serviços e calcula o total
    this.projectServicesService.getServicesByProjectId(this.projectId).subscribe(services => {
      this.totalServiceBudget = services.reduce((sum, service) => sum + service.budget, 0);
    });
  }

  toggleFormVisibility(): void {
    this.isFormVisible = !this.isFormVisible;
  }

  submit(): void {
    const formValue = this.serviceAddForm.value;
    const serviceData: ProjectServices = {
      name: formValue.serviceName,
      budget: Number(formValue.serviceBudget),
      description: formValue.serviceDescription,
    };

    if (this.totalServiceBudget + serviceData.budget > this.projectBudget) {
      alert('O custo total dos serviços ultrapassa o orçamento do projeto.');
      return;
    }

    this.projectServicesService
      .addService(this.projectId, serviceData)
      .subscribe(
        (response) => {
          this.totalServiceBudget += serviceData.budget;
          this.toggleFormVisibility();
          this.serviceCreated.emit(response);
        },
        (error) => {
          console.log('Erro ao criar serviço:', error);
        }
      );
  }
}
