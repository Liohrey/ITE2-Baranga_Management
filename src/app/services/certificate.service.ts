import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:5000/api/certificates';

export interface Certificate {
  id: string;
  certificateType: string;
  requestedBy: string;
  purpose: string;
  requestedDate: Date;
  status: string;
}

export interface CreateCertificateDTO {
  certificateType: string;
  requestedBy: string;
  purpose: string;
}

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  constructor(private http: HttpClient) {}

  getAllCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(API_URL);
  }

  getCertificate(id: string): Observable<Certificate> {
    return this.http.get<Certificate>(`${API_URL}/${id}`);
  }

  createCertificate(data: CreateCertificateDTO): Observable<Certificate> {
    return this.http.post<Certificate>(API_URL, data);
  }

  updateCertificate(id: string, data: Partial<CreateCertificateDTO>): Observable<Certificate> {
    return this.http.put<Certificate>(`${API_URL}/${id}`, data);
  }

  deleteCertificate(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
} 