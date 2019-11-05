import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getAll() {
    return this.http.get('films');
  }
}
