import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlotterService, Blotter } from '../../services/blotter.service';

@Component({
  selector: 'app-blotter',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blotter.component.html',
  styleUrls: ['./blotter.component.css']
})
export class BlotterComponent implements OnInit {
  blotters: Blotter[] = [];
  filteredBlotters: Blotter[] = [];
  editMode: boolean = false;
  selectedBlotter: Blotter | null = null;
  searchTerm: string = '';
  
  caseTypes = [
    'Peace and Order',
    'Noise Complaint',
    'Property Dispute',
    'Physical Injury',
    'Verbal Abuse',
    'Theft',
    'Family Problems',
    'Other'
  ];

  constructor(private blotterService: BlotterService) {}

  ngOnInit() {
    this.loadBlotters();
  }

  loadBlotters() {
    this.blotterService.getAllBlotters().subscribe({
      next: (data) => {
        this.blotters = data;
        this.filteredBlotters = data;
      },
      error: (error: Error) => {
        console.error('Error fetching blotters:', error);
      }
    });
  }

  deleteBlotter(id: string) {
    if (confirm('Are you sure you want to delete this blotter record?')) {
      this.blotterService.deleteBlotter(id).subscribe({
        next: () => {
          this.loadBlotters();
        },
        error: (error: Error) => {
          console.error('Error deleting blotter:', error);
        }
      });
    }
  }

  onEdit(blotter: Blotter) {
    this.selectedBlotter = { ...blotter };
    this.editMode = true;
  }

  closeEdit() {
    this.editMode = false;
    this.selectedBlotter = null;
  }

  onSaveEdit() {
    if (this.selectedBlotter) {
      this.blotterService.updateBlotter(
        this.selectedBlotter.caseId,
        this.selectedBlotter
      ).subscribe({
        next: () => {
          this.loadBlotters();
          this.closeEdit();
        },
        error: (error: Error) => {
          console.error('Error updating blotter:', error);
        }
      });
    }
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = searchValue;
    
    this.filteredBlotters = this.blotters.filter(blotter => 
      blotter.caseId.toLowerCase().includes(searchValue) ||
      blotter.complaintant.toLowerCase().includes(searchValue) ||
      blotter.repondent.toLowerCase().includes(searchValue)
    );
  }
}
