import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectServices } from '../models/projectServices';

@Injectable({
  providedIn: 'root'
})
export class ProjectServicesService {
  private apiUrl = 'http://localhost:8080/projects';

  constructor(private httpClient: HttpClient) { }

  getServicesByProjectId(projectId: number): Observable<ProjectServices[]> {
    return this.httpClient.get<ProjectServices[]>(`${this.apiUrl}/${projectId}/services`);
  }

  getServiceById(projectId: number, serviceId: number): Observable<ProjectServices> {
    return this.httpClient.get<ProjectServices>(`${this.apiUrl}/${projectId}/services/${serviceId}`);
  }

  addService(projectId: number, service: ProjectServices): Observable<ProjectServices> {
    return this.httpClient.post<ProjectServices>(`${this.apiUrl}/${projectId}/services`, service);
  }

  updateService(projectId: number, serviceId: number, service: ProjectServices): Observable<ProjectServices> {
    return this.httpClient.put<ProjectServices>(`${this.apiUrl}/${projectId}/services/${serviceId}`, service);
  }

  deleteService(projectId: number, serviceId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${projectId}/services/${serviceId}`);
  }
}
