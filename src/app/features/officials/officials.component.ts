import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OfficialsService, Official } from '../../services/officials.service';

@Component({
  selector: 'app-officials',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './officials.component.html',
  styleUrls: ['./officials.component.css']
})
export class OfficialsComponent implements OnInit {
  officials: Official[] = [];
  filteredOfficials: Official[] = [];
  searchTerm: string = '';
  editMode: boolean = false;
  selectedOfficial: Official | null = null;

  positions = [
    'Barangay Captain',
    'Barangay Secretary',
    'Barangay Treasurer',
    'Kagawad - Peace and Order',
    'Kagawad - Health and Sanitation',
    'Kagawad - Education',
    'Kagawad - Infrastructure',
    'SK Chairman'
  ];

  constructor(private officialsService: OfficialsService) {}

  ngOnInit() {
    this.loadOfficials();
  }

  loadOfficials() {
    this.officialsService.getAllOfficials().subscribe({
      next: (data) => {
        this.officials = data;
        this.filterOfficials();
      },
      error: (error) => {
        console.error('Error fetching officials:', error);
      }
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterOfficials();
  }

  filterOfficials() {
    if (!this.searchTerm) {
      this.filteredOfficials = this.officials;
      return;
    }
    
    this.filteredOfficials = this.officials.filter(official => 
      official.name.toLowerCase().includes(this.searchTerm) ||
      official.position.toLowerCase().includes(this.searchTerm) ||
      official.email.toLowerCase().includes(this.searchTerm)
    );
  }

  onEdit(official: Official) {
    this.selectedOfficial = { ...official };
    this.editMode = true;
  }

  closeEdit() {
    this.editMode = false;
    this.selectedOfficial = null;
  }

  onSaveEdit() {
    if (this.selectedOfficial) {
      this.officialsService.updateOfficial(this.selectedOfficial.id, this.selectedOfficial).subscribe({
        next: () => {
          this.loadOfficials();
          this.closeEdit();
        },
        error: (error) => {
          console.error('Error updating official:', error);
        }
      });
    }
  }

  deleteOfficial(id: string) {
    if (confirm('Are you sure you want to delete this official?')) {
      this.officialsService.deleteOfficial(id).subscribe({
        next: () => {
          this.loadOfficials();
        },
        error: (error) => {
          console.error('Error deleting official:', error);
        }
      });
    }
  }
}
