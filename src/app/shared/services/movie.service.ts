import { AlertService } from './alert.service';
import { Movie } from './../models/movie';
import { Response } from '@shared/models/response';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
