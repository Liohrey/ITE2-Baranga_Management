import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Resident } from '../../../services/resident.service';

interface EditResident {
  firstName: string;
  lastName: string;
  middleName?: string;
  age: number;
  address: string;
  contactNumber: string;
  status: string;
}

@Component({
  selector: 'app-edit-resident-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-resident-modal.component.html',
  styleUrls: ['./edit-resident-modal.component.css']
})
export class EditResidentModalComponent {
  @Input() isOpen = false;
  @Input() resident: Resident | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<EditResident>();

  editData: EditResident = {
    firstName: '',
    lastName: '',
    middleName: '',
    age: 0,
    address: '',
    contactNumber: '',
    status: 'Active'
  };

  ngOnChanges() {
    if (this.resident) {
      this.editData = {
        firstName: this.resident.firstName,
        lastName: this.resident.lastName,
        middleName: this.resident.middleName || '',
        age: this.resident.age,
        address: this.resident.address,
        contactNumber: this.resident.contactNumber,
        status: this.resident.status
      };
    }
  }

  onSubmit() {
    const dataToSubmit = {
      ...this.editData,
      age: Number(this.editData.age)
    };
    this.saveChanges.emit(dataToSubmit);
  }

  close() {
    this.closeModal.emit();
  }
}
