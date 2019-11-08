import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Reservation } from '@shared/models/reservation';
import { Response } from '@shared/models/response';
import { CurrentPage } from '@shared/models/currentPage';

@Component({
  selector: 'app-reservations-history',
  templateUrl: './reservations-history.component.html',
  styleUrls: ['./reservations-history.component.scss']
})
export class ReservationsHistoryComponent implements OnInit {
  limitPerPage = 8;
  loading = true;
  allReservations: Reservation[] = [];
  reservationsForPage: Reservation[] = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService
      .getUserHistory()
      .subscribe((res: Response<Reservation[]>) => {
        this.allReservations = res.data;
        this.reservationsForPage = this.allReservations.slice(
          0,
          this.limitPerPage
        );
        this.loading = false;
      });
  }

  onPageChanged(page: CurrentPage) {
    this.reservationsForPage = this.allReservations.slice(
      page.itemsStartIndex,
      page.itemsEndIndex
    );
  }
}
