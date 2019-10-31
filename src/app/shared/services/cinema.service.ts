import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@shared/models/response';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cinema } from '@shared/models/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private cinemaSubject: BehaviorSubject<Cinema[]>;

  public get cinema(): Observable<Cinema[]> {
    return this.cinemaSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    this.cinemaSubject = new BehaviorSubject([]);
  }

  getAllCinema() {
    this.http.get('cinema').subscribe({
      next: (res: Response) => {
        this.cinemaSubject.next(res.data as Cinema[]);
      }
    });
  }
}
