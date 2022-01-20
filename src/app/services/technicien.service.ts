import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Technicien } from '../models/technicien';

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Technicien> {
    return this.http.get<Technicien>(`${API_CONFIG.baseUrl}/techniciens/${id}`);
  }

  findAll(): Observable<Technicien[]> {
    return this.http.get<Technicien[]>(`${API_CONFIG.baseUrl}/techniciens`);
  }

  create(technicien: Technicien): Observable<Technicien> {
    return this.http.post<Technicien>(`${API_CONFIG.baseUrl}/techniciens`, technicien);
  }

  update(technicien: Technicien): Observable<Technicien> {
    return this.http.put<Technicien>(`${API_CONFIG.baseUrl}/techniciens/${technicien.id}`, technicien);
  }

  delete(id: any): Observable<Technicien> {
    return this.http.delete<Technicien>(`${API_CONFIG.baseUrl}/techniciens/${id}`);
  }
  
}
