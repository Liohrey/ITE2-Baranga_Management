import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnnouncementsService, Announcement, CreateAnnouncementDTO } from '../../services/announcement.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  announcements: Announcement[] = [];
  filteredAnnouncements: Announcement[] = [];
  searchTerm: string = '';
  editMode: boolean = false;
  selectedAnnouncement: Announcement | null = null;

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

  constructor(private announcementsService: AnnouncementsService) {}

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.announcementsService.getAllAnnouncements().subscribe({
      next: (data) => {
        this.announcements = data;
        this.filterAnnouncements();
      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      }
    });
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filterAnnouncements();
  }

  filterAnnouncements() {
    if (!this.searchTerm) {
      this.filteredAnnouncements = this.announcements;
      return;
    }
    
    this.filteredAnnouncements = this.announcements.filter(announcement => 
      announcement.title.toLowerCase().includes(this.searchTerm) ||
      announcement.content.toLowerCase().includes(this.searchTerm) ||
      announcement.category.toLowerCase().includes(this.searchTerm)
    );
  }

  onEdit(announcement: Announcement) {
    this.selectedAnnouncement = { ...announcement };
    this.editMode = true;
  }

  closeEdit() {
    this.editMode = false;
    this.selectedAnnouncement = null;
  }

  onSaveEdit() {
    if (this.selectedAnnouncement) {
      const updateData: CreateAnnouncementDTO = {
        title: this.selectedAnnouncement.title,
        content: this.selectedAnnouncement.content,
        category: this.selectedAnnouncement.category,
        priority: this.selectedAnnouncement.priority,
        validUntil: this.selectedAnnouncement.validUntil,
        targetAudience: this.selectedAnnouncement.targetAudience,
        status: this.selectedAnnouncement.status
      };

      this.announcementsService.updateAnnouncement(this.selectedAnnouncement.id, updateData).subscribe({
        next: () => {
          this.loadAnnouncements();
          this.closeEdit();
        },
        error: (error) => {
          console.error('Error updating announcement:', error);
        }
      });
    }
  }

  deleteAnnouncement(id: string) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      this.announcementsService.deleteAnnouncement(id).subscribe({
        next: () => {
          this.loadAnnouncements();
        },
        error: (error) => {
          console.error('Error deleting announcement:', error);
        }
      });
    }
  }
}
