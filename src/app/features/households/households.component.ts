import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HouseholdService, Household } from '../../services/household.service';

@Component({
  selector: 'app-households',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.css']
})
export class HouseholdsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 5;
  households: Household[] = [];
  isModalOpen = false;
  selectedHousehold: Household | null = null;
  householdTypes = ['Single Family', 'Extended Family', 'Multi-Family'];
  editData = {
    houseHoldHead: '',
    address: '',
    memberCount: 0,
    type: '',
    status: 'Active'
  };

  constructor(private householdService: HouseholdService) {}

  ngOnInit() {
    this.loadHouseholds();
  }

  loadHouseholds() {
    this.householdService.getAllHouseholds().subscribe({
      next: (data) => {
        this.households = data;
        console.log('Loaded households:', data);
      },
      error: (error) => {
        console.error('Error fetching households:', error);
      }
    });
  }

  openEditModal(household: Household) {
    this.selectedHousehold = household;
    this.editData = {
      houseHoldHead: household.houseHoldHead,
      address: household.address,
      memberCount: household.memberCount,
      type: household.type,
      status: household.status
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedHousehold = null;
  }

  onSubmit() {
    if (this.selectedHousehold) {
      const updatePayload = {
        ...this.editData,
        memberCount: Number(this.editData.memberCount)
      };

      this.householdService.updateHousehold(this.selectedHousehold.id, updatePayload).subscribe({
        next: () => {
          this.loadHouseholds();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating household:', error);
          alert('Failed to update household. Please try again.');
        }
      });
    }
  }

  deleteHousehold(id: string) {
    if (confirm('Are you sure you want to delete this household?')) {
      this.householdService.deleteHousehold(id).subscribe({
        next: () => {
          this.loadHouseholds();
        },
        error: (error) => {
          console.error('Error deleting household:', error);
          alert('Failed to delete household. Please try again.');
        }
      });
    }
  }
}
