import { Sessions } from '../../../../shared/models/Sessions';
import { Cinema } from './../../../../shared/models/cinema';
import { Response } from '@shared/models/response';
import { CinemaService } from '@shared/services/cinema.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Session } from '@shared/models/session';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-cinema-page',
  templateUrl: './cinema-page.component.html',
  styleUrls: ['./cinema-page.component.scss']
})
export class CinemaPageComponent implements OnInit, OnDestroy {
  cinemaTheatres: Cinema[] = [];
  sessions: Sessions = {};
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private cinemaService: CinemaService) {}

  ngOnInit() {
    this.cinemaService.getAllCinema();
    this.cinemaService.cinema.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: cinemaTheatres => {
        this.cinemaTheatres = cinemaTheatres;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
