import { TimerService } from '@shared/services/timer.service';
import { TimerCommands } from '@shared/enums/timerCommands';
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
import {
  ActivatedRoute,
  ParamMap,
  Router,
  NavigationStart,
  RouterEvent
} from '@angular/router';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { environment } from '@env/environment';
import { TimerComponent } from '@shared/components/timer/timer.component';

@Component({
  selector: 'app-ticket-reservation-page',
  templateUrl: './ticket-reservation-page.component.html',
  styleUrls: ['./ticket-reservation-page.component.scss'],
  providers: [TimerService]
})
export class TicketReservationPageComponent implements OnInit, OnDestroy {
  loading = true;
  session: Session;
  timeKey: string;
  seatBlockingTime = environment.seatBlockingTime;

  @ViewChild(TimerComponent, { static: false }) private timer: TimerComponent;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private reservationService: ReservationService,
    private timerService: TimerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: RouterEvent) => {
        if (!event.url.includes(`reserve-ticket/${this.session._id}`)) {
          this.reservationService.closeReservationSession();
        }
      });
  }

  @HostListener('window:beforeunload', ['$event']) beforeUnload(e) {
    if (this.timerService.isStarted) {
      e.preventDefault();
      e.returnValue = '';
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

          this.subscribeToTimerCommands();
          this.timerService.timerComplete
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.timeIsOver());
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.reservationService.closeReservationSession();
  }

  timeIsOver() {
    alert('Time for reservation is over!');
    this.router.navigateByUrl('/afisha');
  }

  private subscribeToTimerCommands() {
    this.reservationService.timerCommands
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(command => {
        switch (command) {
          case TimerCommands.Start:
            this.timerService.start();
            break;

          case TimerCommands.Reset:
            this.timerService.reset();
            break;
        }
      });
  }
}
