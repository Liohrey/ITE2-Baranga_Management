import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/announcements';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: boolean;
  validUntil: Date;
  targetAudience: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAnnouncementDTO {
  title: string;
  content: string;
  category: string;
  priority: boolean;
  validUntil: Date;
  targetAudience: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {
  constructor(private http: HttpClient) {}

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(API_URL);
  }

  createAnnouncement(data: CreateAnnouncementDTO): Observable<Announcement> {
    return this.http.post<Announcement>(API_URL, data);
  }

  deleteAnnouncement(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  updateAnnouncement(id: string, data: CreateAnnouncementDTO): Observable<Announcement> {
    return this.http.put<Announcement>(`${API_URL}/${id}`, data);
  }
}