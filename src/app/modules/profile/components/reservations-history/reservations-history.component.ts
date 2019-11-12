import { FilteringService } from '@shared/services/filtering.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Reservation } from '@shared/models/reservation';
import { Response } from '@shared/models/response';
import { CurrentPage } from '@shared/models/currentPage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.scss']
})
export class ReservationsHistoryComponent implements OnInit {
  limitPerPage = 8;
  loading = true;
  reservations: Reservation[] = [];

  private allReservations: Reservation[] = [];
  private unsubscribe$ = new Subject<void>();

  get reservationsAmount(): number {
    return this.allReservations.length;
  }

  constructor(
    private profileService: ProfileService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.profileService
      .getUserHistory()
      .subscribe((res: Response<Reservation[]>) => {
        this.allReservations = res.data;
        this.subscribeToFiltering(this.allReservations);
        this.subscribeToPagination();
      });
  }

  subscribeToFiltering(reservations) {
    this.filteringService.init(reservations, this.limitPerPage);
    this.filteringService.filteredData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(reservations => {
        this.allReservations = reservations;
        this.loading = false;
      });
  }

  subscribeToPagination() {
    this.filteringService.paginatedData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(reservations => {
        this.reservations = reservations;
      });
  }

  onPageChanged(page: CurrentPage) {
    this.filteringService.getItemsForPage(page);
  }
}
