import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OfficialsService } from '../../../services/officials.service';

@Component({
  selector: 'app-add-official',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-official.component.html',
  styleUrls: ['./add-official.component.css']
})
export class AddOfficialComponent {
  officialData = {
    position: '',
    name: '',
    contactNumber: '',
    email: '',
    termStartToEnd: ''
  };

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

  constructor(
    private router: Router,
    private officialsService: OfficialsService
  ) {}

  onSubmit() {
    this.officialsService.createOfficial(this.officialData).subscribe({
      next: () => {
        this.router.navigate(['/officials']);
      },
      error: (error) => {
        console.error('Error creating official:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/officials']);
  }
} 