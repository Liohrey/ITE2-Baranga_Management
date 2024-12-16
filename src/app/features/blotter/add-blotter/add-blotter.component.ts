import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlotterService } from '../../../services/blotter.service';

@Component({
  selector: 'app-add-blotter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-blotter.component.html',
  styleUrls: ['./add-blotter.component.css']
})
export class AddBlotterComponent {
  blotterData = {
    complaintant: '',
    repondent: '',
    natureOfCase: '',
  };

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

  constructor(
    private router: Router,
    private blotterService: BlotterService
  ) {}

  onSubmit() {
    this.blotterService.createBlotter(this.blotterData).subscribe({
      next: () => {
        this.router.navigate(['/blotter']);
      },
      error: (error) => {
        console.error('Error creating blotter:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/blotter']);
  }
}
