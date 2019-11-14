import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';
import { Seat } from '@shared/models/seat';

@Injectable()
export class ReservationService {
  private sessionSubject: Subject<Session> = new Subject();
  private blockedSeatsSubject: Subject<Seat[]> = new Subject();

  get session(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  get blockedSeats(): Observable<Seat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  getSessionById(id: string) {
    this.httpClient
      .get(`sessions/${id}`)
      .subscribe((res: Response<Session>) => {
        this.sessionSubject.next(res.data);
      });

    this.getBlockedSeats(id);
  }

  getBlockedSeats(sessionId: string) {
    this.httpClient
      .get(`blocked_seats/?session=${sessionId}`)
      .subscribe((res: Response<Seat[]>) => {
        this.blockedSeatsSubject.next(res.data);
      });
  }
}
