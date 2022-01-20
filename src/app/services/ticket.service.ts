import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Ticket> {
    return this.http.get<Ticket>(`${API_CONFIG.baseUrl}/tickets/${id}`);
  }

  findAll(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${API_CONFIG.baseUrl}/tickets`);
  }

  create(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${API_CONFIG.baseUrl}/tickets`, ticket);
  }

  update(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${API_CONFIG.baseUrl}/tickets/${ticket.id}`, ticket);
  }
}