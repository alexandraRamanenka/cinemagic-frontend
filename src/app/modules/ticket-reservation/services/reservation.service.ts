import { ServicesService } from './services.service';
import { UserService } from '@shared/services/user.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
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

  private blockedSeatsSubject: Subject<BlockedSeat[]> = new Subject();
  private chosenSeatsSubject: Subject<BlockedSeat[]> = new Subject();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  private unsubscribe$ = new Subject<void>();
  private currentUser: User;

  session: Session;

  get blockedSeats(): Observable<BlockedSeat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  get chosenSeats(): Observable<BlockedSeat[]> {
    return this.chosenSeatsSubject.asObservable();
  }

  get loading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private ws: WebSocketService,
    private userService: UserService
  ) {}

  init(sessionId: string) {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.currentUser = user;
      });
    this.getSessionById(sessionId).subscribe((res: Response<Session>) => {
      this.session = res.data;
      this.startReservationSession();
    });
  }

  ngOnDestroy() {
    this.closeReservationSession();
  }

  startReservationSession() {
    this.getBlockedSeats();

    this.ws.connect();

    this.listenSeatAddedEvent();
    this.listenSeatRemovedEvent();
    this.loadingSubject.next(false);
  }

  closeReservationSession() {
    this.blockedSeatsValues = [];
    this.chosenSeatsValues = [];
    this.loadingSubject.next(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ws.closeConnection();
    sessionStorage.removeItem(
      `${this.session._id}_${SessionStorageKeys.Seats}`
    );
    sessionStorage.removeItem(
      `${this.session._id}_${SessionStorageKeys.Services}`
    );
  }

  getSessionById(id: string) {
    return this.http.get(`sessions/${id}`);
  }

  getBlockedSeats() {
    this.http
      .get(`blocked_seats/?session=${this.session._id}`)
      .subscribe((res: Response<BlockedSeat[]>) => {
        this.blockedSeatsValues = res.data;
        this.blockedSeatsSubject.next(res.data);
      });
  }

  getChosenSeats() {
    const chosenSeats = JSON.parse(
      sessionStorage.getItem(`${this.session._id}_${SessionStorageKeys.Seats}`)
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
        `blocked_seats/?session=${this.session._id}&user=${this.currentUser._id}`
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
        filter((seat, i) => seat.session === this.session._id)
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
        filter((seat, i) => seat.session === this.session._id)
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

    if (this.chosenSeatsValues.length) {
      sessionStorage.setItem(
        `${this.session._id}_${SessionStorageKeys.Seats}`,
        JSON.stringify(this.chosenSeatsValues)
      );
    } else {
      sessionStorage.removeItem(
        `${this.session._id}_${SessionStorageKeys.Seats}`
      );
    }
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private addSeatToCart(seat: BlockedSeat) {
    this.chosenSeatsValues.push(seat);
    sessionStorage.setItem(
      `${this.session._id}_${SessionStorageKeys.Seats}`,
      JSON.stringify(this.chosenSeatsValues)
    );
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private isNotRemoved(seat: BlockedSeat, removedSeat: BlockedSeat): boolean {
    return (
      seat.seatNumber !== removedSeat.seatNumber ||
      seat.line !== removedSeat.line
    );
  }
}
