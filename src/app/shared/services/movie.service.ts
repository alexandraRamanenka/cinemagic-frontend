import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('films');
  }

  getById(id: string) {
    return this.http.get(`films/${id}`);
  }

  getMovieSessions(id: string) {
    return this.http.get(`films/${id}/sessions`);
  }

  getBestMovies() {
    return this.http.get('films/best');
  }
}
