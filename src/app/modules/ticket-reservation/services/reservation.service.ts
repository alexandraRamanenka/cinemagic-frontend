import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';
import { Seat } from '@shared/models/seat';
import { WebSocketService } from 'app/websocket/webSocket.service';
import { WebSocketMessage } from 'app/websocket/webSocketMessage';
import { WS_EVENTS } from 'app/websocket/webSocket.events';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class ReservationService implements OnDestroy {
  private sessionSubject: Subject<Session> = new Subject();
  private blockedSeatsSubject: Subject<Seat[]> = new Subject();
  private unsubscribe$ = new Subject<void>();

  get session(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  get blockedSeats(): Observable<Seat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  constructor(private http: HttpClient, private ws: WebSocketService) {
    this.ws
      .on<Seat[]>(WS_EVENTS.ON.BLOCKED_SEATS_CHANGED)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeats => {
        this.blockedSeatsSubject.next(blockedSeats);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  connect() {
    this.ws.connect();
  }

  complete() {
    this.ws.complete();
  }

  startReservationSession(id: string) {
    this.getSessionById(id);
    this.getBlockedSeats(id);
  }

  getSessionById(id: string) {
    this.http.get(`sessions/${id}`).subscribe((res: Response<Session>) => {
      this.sessionSubject.next(res.data);
    });
  }

  getBlockedSeats(sessionId: string) {
    this.http
      .get(`blocked_seats/?session=${sessionId}`)
      .subscribe((res: Response<Seat[]>) => {
        this.blockedSeatsSubject.next(res.data);
      });
  }

  addSeat(seat: Seat) {
    this.ws.send(WS_EVENTS.SEND.ADD_SEAT, seat);
  }

  removeSeat(seat: Seat) {
    this.ws.send(WS_EVENTS.SEND.REMOVE_SEAT, seat);
  }

  reserve(seats: Seat[]) {
    this.ws.send(WS_EVENTS.SEND.RESERVE, seats);
  }
}
