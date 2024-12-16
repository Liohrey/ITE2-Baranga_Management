import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementsService, CreateAnnouncementDTO } from '../../../services/announcement.service';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.css']
})
export class AddAnnouncementComponent {
  announcementData: CreateAnnouncementDTO = {
    title: '',
    content: '',
    category: '',
    priority: false,
    validUntil: new Date(),
    targetAudience: '',
    status: 'Draft'
  };

  categories = [
    'General',
    'Events',
    'Health',
    'Emergency',
    'Community',
    'Projects'
  ];

  statuses = [
    'Draft',
    'Published',
    'Archived'
  ];

  constructor(
    private router: Router,
    private announcementsService: AnnouncementsService
  ) {}

  onSubmit() {
    this.announcementsService.createAnnouncement(this.announcementData).subscribe({
      next: () => {
        this.router.navigate(['/announcements']);
      },
      error: (error) => {
        console.error('Error creating announcement:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/announcements']);
  }
}
