import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/projects';

export interface Project {
  id: string;
  projectName: string;
  projectDescription: string;
  projectStatus: string;
  projectBudget: number;
  projectStartDate: string;
  projectEndDate: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDTO {
  projectName: string;
  projectDescription: string;
  projectStatus?: string; // Optional, defaults to "Pending"
  projectBudget: number;
  projectStartDate: Date;
  projectEndDate: Date;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_URL);
  }

  createProject(data: CreateProjectDTO): Observable<Project> {
    return this.http.post<Project>(API_URL, data);
  }

  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  updateProject(id: string, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${API_URL}/${id}`, data);
  }
} 