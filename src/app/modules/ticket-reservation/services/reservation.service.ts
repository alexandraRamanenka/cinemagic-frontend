import { UserService } from '@shared/services/user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';
import { WebSocketService } from 'app/websocket/webSocket.service';
import { WebSocketOnEvents } from '@shared/enums/webSocketOnEvents';
import { WebSocketSendEvents } from '@shared/enums/webSocketSendEvents';
import { takeUntil, filter } from 'rxjs/operators';
import { BlockedSeat } from '@shared/models/blockedSeat';
import { User } from '@shared/models/user';
import { SessionStorageKeys } from '@shared/enums/sessionStorageKeys';

@Injectable()
export class ReservationService implements OnDestroy {
  private blockedSeatsValues: BlockedSeat[] = [];
  private chosenSeatsValues: BlockedSeat[] = [];

  private sessionSubject = new Subject<Session>();
  private blockedSeatsSubject: Subject<BlockedSeat[]> = new Subject();
  private chosenSeatsSubject: Subject<BlockedSeat[]> = new Subject();

  private unsubscribe$ = new Subject<void>();
  private currentUser: User;

  sessionId: string;

  get session(): Observable<Session> {
    return this.sessionSubject.asObservable();
  }

  get blockedSeats(): Observable<BlockedSeat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  get chosenSeats(): Observable<BlockedSeat[]> {
    return this.chosenSeatsSubject.asObservable();
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

    this.ws.connect();

    this.listenSeatAddedEvent();
    this.listenSeatRemovedEvent();
  }

  closeReservationSession() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ws.closeConnection();
    sessionStorage.removeItem('seats');
    sessionStorage.removeItem('serviceOrders');
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

  getChosenSeats() {
    const chosenSeats = JSON.parse(
      sessionStorage.getItem(`${this.sessionId}_${SessionStorageKeys.SEATS}`)
    );

    if (chosenSeats) {
      this.chosenSeatsValues = chosenSeats;
      this.chosenSeatsSubject.next(chosenSeats);
    } else {
      this.getUsersChosenSeatsFromApi();
    }
  }

  addSeat(seat: BlockedSeat) {
    this.addSeatToCart(seat);
    this.ws.send(WebSocketSendEvents.AddSeat, seat);
  }

  removeSeat(seat: BlockedSeat) {
    this.removeSeatFromCart(seat);
    this.ws.send(WebSocketSendEvents.RemoveSeat, seat);
  }

  reserve(seats: BlockedSeat[]) {
    this.ws.send(WebSocketSendEvents.Reserve, seats);
  }

  private getUsersChosenSeatsFromApi() {
    this.http
      .get(
        `blocked_seats/?session=${this.sessionId}&user=${this.currentUser._id}`
      )
      .subscribe((res: Response<BlockedSeat[]>) => {
        this.chosenSeatsValues = res.data;
        this.chosenSeatsSubject.next(res.data);
      });
  }

  private listenSeatAddedEvent() {
    this.ws
      .on<BlockedSeat>(WebSocketOnEvents.SeatAdded)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((seat, i) => seat.session === this.sessionId)
      )
      .subscribe(blockedSeat => {
        this.blockedSeatsValues.push(blockedSeat);
        this.blockedSeatsSubject.next(this.blockedSeatsValues);
      });
  }

  private listenSeatRemovedEvent() {
    this.ws
      .on<BlockedSeat>(WebSocketOnEvents.SeatRemoved)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((seat, i) => seat.session === this.sessionId)
      )
      .subscribe(this.seatRemovedHandler);
  }

  private seatRemovedHandler = (removedSeat: BlockedSeat) => {
    this.blockedSeatsValues = this.blockedSeatsValues.filter(seat =>
      this.isNotRemoved(seat, removedSeat)
    );

    if (removedSeat.user === this.currentUser._id) {
      this.removeSeatFromCart(removedSeat);
    }

    this.blockedSeatsSubject.next(this.blockedSeatsValues);
  };

  private removeSeatFromCart(removedSeat: BlockedSeat) {
    this.chosenSeatsValues = this.chosenSeatsValues.filter(seat =>
      this.isNotRemoved(seat, removedSeat)
    );
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private addSeatToCart(seat: BlockedSeat) {
    this.chosenSeatsValues.push(seat);
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private isNotRemoved(seat: BlockedSeat, removedSeat: BlockedSeat): boolean {
    return (
      seat.seatNumber !== removedSeat.seatNumber ||
      seat.line !== removedSeat.line
    );
  }
}
