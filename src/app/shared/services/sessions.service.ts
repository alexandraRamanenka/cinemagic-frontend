import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  constructor(private http: HttpClient) {}

  getCinemaSessions(cinemaId) {
    return this.http.get(`cinema/${cinemaId}/schedule`);
  }

  getAll() {
    return this.http.get(`sessions`);
  }

  getTodaySessions() {
    return this.http.get(`sessions/today`);
  }
}
