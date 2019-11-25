import { SessionStorageKeys } from '@shared/enums/sessionStorageKeys';
import { TimerCommands } from '@shared/enums/timerCommands';
import { TimerEvents } from '@shared/enums/timerEvents';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener
} from '@angular/core';
import { Session } from '@shared/models/session';
import { Subject } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { environment } from '@env/environment';
import { TimerComponent } from '@shared/components/timer/timer.component';

@Component({
  selector: 'app-ticket-reservation-page',
  templateUrl: './ticket-reservation-page.component.html',
  styleUrls: ['./ticket-reservation-page.component.scss']
})
export class TicketReservationPageComponent implements OnInit, OnDestroy {
  loading = true;
  session: Session;
  timeKey: string;
  seatBlockingTime = environment.seatBlockingTime;
  timerRest = environment.seatBlockingTime;

  @ViewChild(TimerComponent, { static: false }) private timer: TimerComponent;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:beforeunload', ['$event']) beforeUnload(e) {
    if (this.timer.isStarted) {
      const message = 'Would you really want to restart reservation?';
      e.returnValue = message;
      return message;
    }
  }

  @HostListener('window:unload') afterUnload() {
    this.reservationService.closeReservationSession();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id');
          this.reservationService.init(id);
          return this.reservationService.loading;
        })
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(loading => {
        this.loading = loading;
        if (!loading) {
          this.session = this.reservationService.session;
          this.timeKey = `${this.session._id}_${SessionStorageKeys.Time}`;
          this.timerRest = sessionStorage.getItem(this.timeKey);
          this.subscribeToTimerCommands();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.reservationService.closeReservationSession();
  }

  timeIsOver(eventType: TimerEvents) {
    if (eventType === TimerEvents.Complete) {
      alert('Time for reservation is over!');
      console.log(
        'Time for reservation is over, return and choose seats again'
      );
    }
  }

  private subscribeToTimerCommands() {
    this.reservationService.timerCommands
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(command => {
        switch (command) {
          case TimerCommands.Start:
            console.log('start timer');
            this.timer.start();
            break;
          case TimerCommands.Reset:
            this.timer.reset();
            break;
        }
      });
  }
}
