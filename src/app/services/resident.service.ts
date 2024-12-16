import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/residents';

export interface Resident {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name?: string;
  age: number;
  address: string;
  contactNumber: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateResidentDTO {
  firstName: string;
  middleName?: string;
  lastName: string;
  age: number;
  address: string;
  contactNumber: string;
}

export interface UpdateResidentDTO extends CreateResidentDTO {
  status?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResidentService {
  constructor(private http: HttpClient) {}

  getAllResidents(): Observable<Resident[]> {
    return this.http.get<Resident[]>(API_URL);
  }

  createResident(residentData: CreateResidentDTO): Observable<Resident> {
    return this.http.post<Resident>(API_URL, residentData);
  }

  updateResident(id: string, residentData: UpdateResidentDTO): Observable<Resident> {
    return this.http.put<Resident>(`${API_URL}/${id}`, residentData);
  }

  deleteResident(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
} 