import { ServicesService } from './../../services/services.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@shared/models/session';
import { Subject } from 'rxjs';
import { ReservationService } from '../../services/reservation.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-reservation-page',
  templateUrl: './ticket-reservation-page.component.html',
  styleUrls: ['./ticket-reservation-page.component.scss']
})
export class TicketReservationPageComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loading = true;
  session: Session;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

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
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.reservationService.closeReservationSession();
  }
}
