import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cert-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cert-preview.component.html',
  styleUrls: ['./cert-preview.component.css']
})
export class CertPreviewComponent implements OnInit {
  certificateData: any;
  showPreview: boolean = true;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.certificateData = navigation.extras.state['certificateData'];
    }
  }

  ngOnInit() {
    if (!this.certificateData) {
      this.router.navigate(['/certificates']);
      return;
    }

    // Check if we're in print mode
    if (this.certificateData.printMode) {
      setTimeout(() => {
        this.printCertificate();
      }, 500); // Small delay to ensure content is rendered
    }
  }

  closePreview() {
    this.router.navigate(['/certificates']);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  printCertificate(): void {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const certificateContent = document.querySelector('.certificate')?.innerHTML;
    if (!certificateContent) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate</title>
          <style>
            body {
              margin: 0;
              padding: 2rem;
              background: white;
              font-family: Arial, sans-serif;
            }
            .certificate {
              padding: 2rem;
              max-width: 800px;
              margin: 0 auto;
            }
            .certificate-header {
              text-align: center;
              margin-bottom: 3rem;
            }
            .certificate-header h1 {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
            }
            .certificate-header h2 {
              font-size: 1.25rem;
              margin: 0.25rem 0;
            }
            .certificate-title {
              text-align: center;
              margin-bottom: 3rem;
            }
            .certificate-title h1 {
              font-size: 2rem;
              text-transform: uppercase;
              border-bottom: 2px solid #000;
              display: inline-block;
              padding: 0 2rem 0.5rem;
            }
            .certificate-body {
              line-height: 1.8;
              margin-bottom: 3rem;
            }
            .signature-section {
              width: 300px;
              margin-left: auto;
              text-align: center;
              margin-top: 4rem;
            }
            .signature-line {
              border-bottom: 1px solid #000;
              margin-bottom: 0.5rem;
            }
            @media print {
              body { background: white; }
              .certificate { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            ${certificateContent}
          </div>
          <script>
            window.onload = () => {
              window.print();
              window.onafterprint = () => window.close();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  }
}
