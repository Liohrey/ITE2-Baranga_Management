import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/households';

export interface Household {
  id: string;
  houseHoldHead: string;
  address: string;
  memberCount: number;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHouseholdDTO {
  houseHoldHead: string;
  address: string;
  memberCount: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {
  constructor(private http: HttpClient) {}

  getAllHouseholds(): Observable<Household[]> {
    return this.http.get<Household[]>(API_URL);
  }

  createHousehold(data: CreateHouseholdDTO): Observable<Household> {
    return this.http.post<Household>(API_URL, data);
  }

  updateHousehold(id: string, data: CreateHouseholdDTO): Observable<Household> {
    return this.http.put<Household>(`${API_URL}/${id}`, data);
  }

  deleteHousehold(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
} 