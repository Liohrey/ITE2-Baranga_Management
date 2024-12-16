import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardStats, Announcement } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return forkJoin({
      residents: this.http.get<any[]>(`${this.apiUrl}/residents`),
      certificates: this.http.get<any[]>(`${this.apiUrl}/certificates`),
      blotter: this.http.get<any[]>(`${this.apiUrl}/blotter`),
      announcements: this.http.get<Announcement[]>(`${this.apiUrl}/announcements`)
    }).pipe(
      map(data => ({
        totalResidents: data.residents.length,
        pendingDocuments: data.certificates.filter(cert => cert.status === 'Pending').length,
        todaysCases: data.blotter.filter(case_ => 
          new Date(case_.date).toDateString() === new Date().toDateString()
        ).length,
        recentAnnouncements: data.announcements
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
      }))
    );
  }
}
