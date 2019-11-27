import { UserService } from '@shared/services/user.service';
import { Injectable } from '@angular/core';
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
import { StorageKeys } from '@shared/enums/storageKeys';
import { TimerCommands } from '@shared/enums/timerCommands';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { Reservation } from '@shared/models/reservation';

@Injectable()
export class ReservationService {
  private blockedSeatsValues: BlockedSeat[] = [];
  private chosenSeatsValues: BlockedSeat[] = [];

  private blockedSeatsSubject = new Subject<BlockedSeat[]>();
  private chosenSeatsSubject = new Subject<BlockedSeat[]>();
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private timerSubject = new Subject<TimerCommands>();

  private unsubscribe$ = new Subject<void>();
  private currentUser: User;

  session: Session;

  get timerCommands(): Observable<TimerCommands> {
    return this.timerSubject.asObservable();
  }

  get blockedSeats(): Observable<BlockedSeat[]> {
    return this.blockedSeatsSubject.asObservable();
  }

  get chosenSeats(): Observable<BlockedSeat[]> {
    return this.chosenSeatsSubject.asObservable();
  }

  get loading(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  get seats(): BlockedSeat[] {
    let seats = this.loadFromLocalStorage(
      `${this.session._id}_${StorageKeys.Seats}`,
      Object.values,
      null
    );
    return seats;
  }

  get services(): ServiceOrder[] {
    let services = this.loadFromLocalStorage(
      `${this.session._id}_${StorageKeys.Services}`,
      Object.values,
      []
    );
    return services;
  }

  get totalPrice(): number {
    const seatsSchema = this.session.hall.seatsSchema;
    let seats = this.seats;

    let services = JSON.parse(
      localStorage.getItem(`${this.session._id}_${StorageKeys.Services}`)
    );
    services = services ? Object.values(services) : [];

    let price = seats.reduce((acc, seat) => {
      return acc + seatsSchema[seat.line].seatType.price;
    }, 0);

    price += services.reduce((acc, order) => {
      return acc + order.service.price * order.amount;
    }, 0);

    return (price += this.session.price);
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

  startReservationSession() {
    this.getBlockedSeats();

    this.ws.connect();

    this.listenSeatAddedEvent();
    this.listenSeatRemovedEvent();
    this.loadingSubject.next(false);
  }

  closeReservationSession() {
    this.blockedSeatsValues = [];
    this.chosenSeatsValues.forEach(seat => this.removeSeat(seat));
    this.chosenSeatsValues = [];
    this.loadingSubject.next(true);
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.ws.closeConnection();
    localStorage.removeItem(`${this.session._id}_${StorageKeys.Seats}`);
    localStorage.removeItem(`${this.session._id}_${StorageKeys.Services}`);
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
      localStorage.getItem(`${this.session._id}_${StorageKeys.Seats}`)
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

  reserve() {
    return this.http.post('reservations', this.buildReservation());
  }

  private buildReservation(): Reservation {
    let reservation: Reservation = {
      user: this.currentUser._id,
      session: this.session._id,
      seats: this.seats,
      services: this.services
    };

    return reservation;
  }

  private loadFromLocalStorage(key: string, parser: any, defaultValue?: any) {
    let item = JSON.parse(localStorage.getItem(key));
    if (parser && item) {
      return parser(item);
    }
    item = item ? item : defaultValue ? defaultValue : null;
    return item;
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
      localStorage.setItem(
        `${this.session._id}_${StorageKeys.Seats}`,
        JSON.stringify(this.chosenSeatsValues)
      );
    } else {
      localStorage.removeItem(`${this.session._id}_${StorageKeys.Seats}`);
      this.timerSubject.next(TimerCommands.Reset);
    }
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private addSeatToCart(seat: BlockedSeat) {
    this.chosenSeatsValues.push(seat);
    localStorage.setItem(
      `${this.session._id}_${StorageKeys.Seats}`,
      JSON.stringify(this.chosenSeatsValues)
    );
    this.timerSubject.next(TimerCommands.Start);
    this.chosenSeatsSubject.next(this.chosenSeatsValues);
  }

  private isNotRemoved(seat: BlockedSeat, removedSeat: BlockedSeat): boolean {
    return (
      seat.seatNumber !== removedSeat.seatNumber ||
      seat.line !== removedSeat.line
    );
  }
}
