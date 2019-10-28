import { Cinema } from './../../../../shared/models/cinema';
import { Response } from '@shared/models/response';
import { CinemaService } from '@shared/services/cinema.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cinema-page',
  templateUrl: './cinema-page.component.html',
  styleUrls: ['./cinema-page.component.scss']
})
export class CinemaPageComponent implements OnInit, OnDestroy {
  cinemaTheatres: Cinema[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private cinemaService: CinemaService) {}

  ngOnInit() {
    this.cinemaService
      .getAllCinema()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: Response) => {
          this.cinemaTheatres = res.data as Cinema[];
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
