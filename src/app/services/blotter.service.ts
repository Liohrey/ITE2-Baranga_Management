import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/blotter';

export interface Blotter {
  caseId: string;
  date: string;
  complaintant: string;
  repondent: string;
  natureOfCase: string;
  status: string;
}

export interface CreateBlotterDTO {
  complaintant: string;
  repondent: string;
  natureOfCase: string;
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlotterService {
  constructor(private http: HttpClient) {}

  getAllBlotters(): Observable<Blotter[]> {
    return this.http.get<Blotter[]>(API_URL);
  }

  createBlotter(data: CreateBlotterDTO): Observable<Blotter> {
    return this.http.post<Blotter>(API_URL, data);
  }

  deleteBlotter(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  updateBlotter(id: string, data: Partial<Blotter>): Observable<Blotter> {
    return this.http.put<Blotter>(`${API_URL}/${id}`, data);
  }
} 