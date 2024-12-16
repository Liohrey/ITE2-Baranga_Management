import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService, CreateProjectDTO } from '../../../services/projects.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  projectData: CreateProjectDTO = {
    projectName: '',
    projectDescription: '',
    projectStatus: 'Pending',
    projectBudget: 0,
    projectStartDate: new Date(),
    projectEndDate: new Date(),
    address: ''
  };

  constructor(
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  onSubmit() {
    // Ensure projectBudget is a number
    this.projectData.projectBudget = parseFloat(this.projectData.projectBudget.toString());

    // Convert string dates to Date objects
    this.projectData.projectStartDate = new Date(this.projectData.projectStartDate);
    this.projectData.projectEndDate = new Date(this.projectData.projectEndDate);

    this.projectsService.createProject(this.projectData).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
