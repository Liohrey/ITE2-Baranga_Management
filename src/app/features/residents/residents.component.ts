import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResidentService, Resident } from '../../services/resident.service';
import { EditResidentModalComponent } from './edit-resident-modal/edit-resident-modal.component';

@Component({
  selector: 'app-residents',
  standalone: true,
  imports: [CommonModule, RouterModule, EditResidentModalComponent],
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.css']
})
export class ResidentsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 5;
  residents: Resident[] = [];
  pageSize: number = 10;
  isEditModalOpen = false;
  selectedResident: Resident | null = null;
  sortField: 'name' | 'age' | 'status' = 'name';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';
  filteredResidents: Resident[] = [];
  searchTerm: string = '';

  constructor(private residentService: ResidentService) {}

  ngOnInit() {
    this.loadResidents();
  }

  loadResidents() {
    this.residentService.getAllResidents().subscribe({
      next: (data: Resident[]) => {
        this.residents = data;
        this.filterAndSortResidents();
      },
      error: (error) => {
        console.error('Error fetching residents:', error);
      }
    });
  }

  openEditModal(resident: Resident) {
    this.selectedResident = resident;
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedResident = null;
  }

  handleSaveChanges(updatedData: any) {
    if (this.selectedResident) {
      const updatePayload = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        middleName: updatedData.middleName,
        age: Number(updatedData.age),
        address: updatedData.address,
        contactNumber: updatedData.contactNumber,
        status: updatedData.status
      };

      this.residentService.updateResident(this.selectedResident.id, updatePayload).subscribe({
        next: () => {
          this.loadResidents();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating resident:', error);
        }
      });
    }
  }

  deleteResident(id: string) {
    if (confirm('Are you sure you want to delete this resident?')) {
      this.residentService.deleteResident(id).subscribe({
        next: () => {
          this.loadResidents();
        },
        error: (error) => {
          console.error('Error deleting resident:', error);
        }
      });
    }
  }

  onStatusFilterChange(event: any) {
    this.statusFilter = event.target.value;
    this.filterAndSortResidents();
  }

  onSortChange(event: any) {
    this.sortField = event.target.value;
    this.filterAndSortResidents();
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterAndSortResidents();
  }

  filterAndSortResidents() {
    // First apply search filter
    this.filteredResidents = this.residents.filter(resident => {
      const matchesSearch = !this.searchTerm || 
        `${resident.firstName} ${resident.middleName} ${resident.lastName}`.toLowerCase().includes(this.searchTerm) ||
        resident.address.toLowerCase().includes(this.searchTerm) ||
        resident.contactNumber.toLowerCase().includes(this.searchTerm);

      // Then apply status filter
      const matchesStatus = this.statusFilter === 'all' || 
        (this.statusFilter === 'active' ? resident.status === 'Active' : resident.status === 'Inactive');

      return matchesSearch && matchesStatus;
    });

    // Then sort the filtered results
    this.filteredResidents.sort((a, b) => {
      switch (this.sortField) {
        case 'age':
          return a.age - b.age;
        case 'status':
          return a.status.localeCompare(b.status);
        case 'name':
        default:
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      }
    });
  }
}
