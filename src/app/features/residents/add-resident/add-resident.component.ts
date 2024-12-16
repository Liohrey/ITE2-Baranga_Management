import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResidentService } from '../../../services/resident.service';

interface CreateResident {
  firstName: string;
  lastName: string;
  middleName?: string;
  age: number;
  address: string;
  contactNumber: string;
}

@Component({
  selector: 'app-add-resident',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.css']
})
export class AddResidentComponent {
  residentData: CreateResident = {
    firstName: '',
    lastName: '',
    middleName: '',
    age: 0,
    address: '',
    contactNumber: ''
  };

  constructor(
    private router: Router,
    private residentService: ResidentService
  ) {}

  onSubmit() {
    // Convert age to number before sending
    const dataToSubmit = {
      ...this.residentData,
      age: Number(this.residentData.age)
    };

    this.residentService.createResident(dataToSubmit).subscribe({
      next: (response) => {
        console.log('Resident created:', response);
        this.router.navigate(['/residents']);
      },
      error: (error) => {
        console.error('Error creating resident:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/residents']);
  }
}
