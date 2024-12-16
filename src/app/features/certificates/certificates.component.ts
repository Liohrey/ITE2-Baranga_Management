import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CertificateService, Certificate } from '../../services/certificate.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 5;
  certificates: Certificate[] = [];
  filteredCertificates: Certificate[] = [];
  searchTerm: string = '';
  statusFilter: string = '';
  sortBy: string = 'date';
  editMode: boolean = false;
  selectedCertificate: Certificate | null = null;
  certificateTypes = [
    'Barangay Clearance',
    'Certificate of Residency',
    'Certificate of Indigency',
    'Business Permit',
    'Good Moral Character'
  ];

  constructor(
    private certificateService: CertificateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCertificates();
  }

  loadCertificates() {
    this.certificateService.getAllCertificates().subscribe({
      next: (data) => {
        this.certificates = data;
        this.filterAndSortCertificates();
      },
      error: (error) => {
        console.error('Error fetching certificates:', error);
      }
    });
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterAndSortCertificates();
  }

  onStatusFilterChange(event: any) {
    this.statusFilter = event.target.value;
    this.filterAndSortCertificates();
  }

  onSortChange(event: any) {
    this.sortBy = event.target.value;
    this.filterAndSortCertificates();
  }

  filterAndSortCertificates() {
    // Apply filters
    this.filteredCertificates = this.certificates.filter(cert => {
      const matchesSearch = !this.searchTerm || 
        cert.certificateType.toLowerCase().includes(this.searchTerm) ||
        cert.requestedBy.toLowerCase().includes(this.searchTerm) ||
        cert.purpose.toLowerCase().includes(this.searchTerm);

      const matchesStatus = !this.statusFilter || 
        cert.status.toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    // Apply sorting
    this.filteredCertificates.sort((a, b) => {
      switch (this.sortBy) {
        case 'date':
          return new Date(b.requestedDate).getTime() - new Date(a.requestedDate).getTime();
        case 'type':
          return a.certificateType.localeCompare(b.certificateType);
        case 'name':
          return a.requestedBy.localeCompare(b.requestedBy);
        default:
          return 0;
      }
    });
  }

  viewCertificate(cert: Certificate) {
    this.router.navigate(['/certificates/preview'], {
      state: { 
        certificateData: {
          type: cert.certificateType,
          requestedBy: cert.requestedBy,
          purpose: cert.purpose,
          // Add any additional data needed for the preview
          civilStatus: 'Single', // This should come from your data
          yearOfResidency: '5', // This should come from your data
          address: '123 Sample St.' // This should come from your data
        }
      }
    });
  }

  deleteCertificate(id: string) {
    if (confirm('Are you sure you want to delete this certificate?')) {
      this.certificateService.deleteCertificate(id).subscribe({
        next: () => {
          this.loadCertificates();
        },
        error: (error) => {
          console.error('Error deleting certificate:', error);
        }
      });
    }
  }

  onEdit(cert: Certificate) {
    this.selectedCertificate = { ...cert };
    this.editMode = true;
  }

  onSaveEdit() {
    if (this.selectedCertificate) {
      this.certificateService.updateCertificate(
        this.selectedCertificate.id, 
        this.selectedCertificate
      ).subscribe({
        next: () => {
          this.loadCertificates();
          this.closeEdit();
        },
        error: (error) => {
          console.error('Error updating certificate:', error);
        }
      });
    }
  }

  closeEdit() {
    this.editMode = false;
    this.selectedCertificate = null;
  }

  printCertificate(cert: Certificate) {
    this.router.navigate(['/certificates/preview'], {
      state: { 
        certificateData: {
          type: cert.certificateType,
          requestedBy: cert.requestedBy,
          purpose: cert.purpose,
          status: cert.status,
          requestedDate: cert.requestedDate,
          civilStatus: 'Single',
          yearOfResidency: '5',
          address: '123 Sample St.',
          printMode: true
        }
      }
    });
  }
}
