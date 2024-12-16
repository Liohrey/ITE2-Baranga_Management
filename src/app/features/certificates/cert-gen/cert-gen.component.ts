import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CertificateService } from '../../../services/certificate.service';

@Component({
  selector: 'app-cert-gen',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cert-gen.component.html',
  styleUrls: ['./cert-gen.component.css']
})
export class CertGenComponent {
  certificateData = {
    certificateType: '',
    requestedBy: '',
    purpose: ''
  };

  certificateTypes = [
    'Barangay Clearance',
    'Certificate of Residency',
    'Certificate of Indigency',
    'Business Permit',
    'Good Moral Character'
  ];

  constructor(
    private router: Router,
    private certificateService: CertificateService
  ) {}

  onSubmit() {
    this.certificateService.createCertificate(this.certificateData).subscribe({
      next: (response) => {
        console.log('Certificate created:', response);
        this.router.navigate(['/certificates']);
      },
      error: (error) => {
        console.error('Error creating certificate:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/certificates']);
  }
}
