import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private sessionsSubject: BehaviorSubject<Session[]>;

  get sessions(): Observable<Session[]> {
    return this.sessionsSubject.asObservable();
  }

  constructor(private http: HttpClient) {
    this.sessionsSubject = new BehaviorSubject([]);
  }

  getCinemaSessions(cinemaId) {
    this.http.get(`cinema/${cinemaId}/schedule`);
  }

  getAll() {
    this.http.get(`sessions`).subscribe({
      next: (res: Response) => {
        this.sessionsSubject.next(res.data as Session[]);
      }
    });
  }
}
