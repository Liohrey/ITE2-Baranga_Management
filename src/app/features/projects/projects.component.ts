import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  editMode = false;
  selectedProject: Project | null = null;
  searchTerm = '';

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filterProjects();
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  onEdit(project: Project) {
    this.selectedProject = { ...project };
    this.editMode = true;
  }

  closeEdit() {
    this.editMode = false;
    this.selectedProject = null;
  }

  onSaveEdit() {
    if (this.selectedProject) {
      const updatedProject = {
        ...this.selectedProject,
        projectBudget: parseFloat(this.selectedProject.projectBudget.toString())
      };

      this.projectsService.updateProject(this.selectedProject.id, updatedProject).subscribe({
        next: () => {
          this.loadProjects();
          this.closeEdit();
        },
        error: (error) => {
          console.error('Error updating project:', error);
        }
      });
    }
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterProjects();
  }

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = this.projects;
      return;
    }
    
    this.filteredProjects = this.projects.filter(project => 
      project.projectName.toLowerCase().includes(this.searchTerm) ||
      project.address.toLowerCase().includes(this.searchTerm) ||
      project.projectStatus.toLowerCase().includes(this.searchTerm)
    );
  }

  deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectsService.deleteProject(id).subscribe({
        next: () => {
          this.loadProjects();
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    }
  }
}
