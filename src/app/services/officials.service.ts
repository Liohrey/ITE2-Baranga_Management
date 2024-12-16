import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/officials';

export interface Official {
  id: string;
  position: string;
  name: string;
  contactNumber: string;
  email: string;
  termStartToEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfficialDTO {
  position: string;
  name: string;
  contactNumber: string;
  email: string;
  termStartToEnd: string;
}

@Injectable({
  providedIn: 'root'
})
export class OfficialsService {
  constructor(private http: HttpClient) {}

  getAllOfficials(): Observable<Official[]> {
    return this.http.get<Official[]>(API_URL);
  }

  createOfficial(data: CreateOfficialDTO): Observable<Official> {
    return this.http.post<Official>(API_URL, data);
  }

  deleteOfficial(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  updateOfficial(id: string, data: Partial<Official>): Observable<Official> {
    return this.http.put<Official>(`${API_URL}/${id}`, data);
  }
} 