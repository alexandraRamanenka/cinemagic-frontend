import { UserService } from '@shared/services/user.service';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';
import { WebSocketService } from 'app/websocket/webSocket.service';
import { WS_EVENTS } from 'app/websocket/webSocket.events';
import { takeUntil } from 'rxjs/operators';
import { BlockedSeat } from '@shared/models/blockedSeat';
import { User } from '@shared/models/user';

@Injectable()
export class ReservationService implements OnDestroy {
  private blockedSeatsValues: BlockedSeat[] = [];
  private sessionSubject: Subject<Session> = new Subject();
  private blockedSeatsSubject: Subject<BlockedSeat[]> = new Subject();
  private choosedSeatsSubject: Subject<BlockedSeat[]> = new Subject();
  private unsubscribe$ = new Subject<void>();
  private currentUser: User;

  sessionId: string;

  get session(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  get blockedSeats(): Observable<BlockedSeat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  get choosedSeats(): Observable<BlockedSeat[]> {
    return this.choosedSeatsSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private ws: WebSocketService,
    private userService: UserService
  ) {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.closeReservationSession();
  }

  startReservationSession(id: string) {
    this.getSessionById(id);
    this.getBlockedSeats();
    this.getChoosedSeats();

    this.ws.connect();

    this.ws
      .on<BlockedSeat>(WS_EVENTS.ON.SEAT_ADDED)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeat => {
        this.blockedSeatsValues.push(blockedSeat);
        this.blockedSeatsSubject.next(this.blockedSeatsValues);
      });

    this.ws
      .on<BlockedSeat>(WS_EVENTS.ON.SEAT_REMOVED)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(blockedSeat => {
        this.blockedSeatsValues = this.blockedSeatsValues.filter(seat => {
          return (
            seat.seatNumber !== blockedSeat.seatNumber ||
            seat.line !== blockedSeat.line
          );
        });

        this.blockedSeatsSubject.next(this.blockedSeatsValues);
      });
  }

  closeReservationSession() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ws.closeConnection();
  }

  getSessionById(id: string) {
    this.sessionId = id;
    this.http.get(`sessions/${id}`).subscribe((res: Response<Session>) => {
      this.sessionSubject.next(res.data);
    });
  }

  getBlockedSeats() {
    this.http
      .get(`blocked_seats/?session=${this.sessionId}`)
      .subscribe((res: Response<BlockedSeat[]>) => {
        this.blockedSeatsValues = res.data;
        this.blockedSeatsSubject.next(res.data);
      });
  }

  getChoosedSeats() {
    this.http
      .get(
        `blocked_seats/?session=${this.sessionId}&user=${this.currentUser._id}`
      )
      .subscribe((res: Response<BlockedSeat[]>) => {
        this.choosedSeatsSubject.next(res.data);
      });
  }

  addSeat(seat: BlockedSeat) {
    this.ws.send(WS_EVENTS.SEND.ADD_SEAT, seat);
  }

  removeSeat(seat: BlockedSeat) {
    this.ws.send(WS_EVENTS.SEND.REMOVE_SEAT, seat);
  }

  reserve(seats: BlockedSeat[]) {
    this.ws.send(WS_EVENTS.SEND.RESERVE, seats);
  }
}
