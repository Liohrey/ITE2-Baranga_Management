import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HouseholdService } from '../../../services/household.service';

@Component({
  selector: 'app-add-household',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-household.component.html',
  styleUrls: ['./add-household.component.css']
})
export class AddHouseholdComponent {
  householdData = {
    houseHoldHead: '',
    address: '',
    memberCount: 0,
    type: ''
  };

  householdTypes = [
    'Single Family',
    'Extended Family',
    'Multi-Family'
  ];

  constructor(
    private router: Router,
    private householdService: HouseholdService
  ) {}

  onSubmit() {
    const dataToSubmit = {
      ...this.householdData,
      memberCount: Number(this.householdData.memberCount)
    };

    this.householdService.createHousehold(dataToSubmit).subscribe({
      next: (response) => {
        console.log('Household created:', response);
        this.router.navigate(['/households']);
      },
      error: (error) => {
        console.error('Error creating household:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/households']);
  }
}
