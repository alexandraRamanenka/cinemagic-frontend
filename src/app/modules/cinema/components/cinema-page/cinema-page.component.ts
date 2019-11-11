import { Cinema } from '@shared/models/cinema';
import { Response } from '@shared/models/response';
import { CinemaService } from '@shared/services/cinema.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cinema-page',
  templateUrl: './cinema-page.component.html',
  styleUrls: ['./cinema-page.component.scss']
})
export class CinemaPageComponent implements OnInit {
  cinemaTheatres: Cinema[] = [];

  constructor(private cinemaService: CinemaService) {}

  ngOnInit() {
    this.cinemaService
      .getAllCinema()
      .subscribe((res: Response<Cinema[]>) => (this.cinemaTheatres = res.data));
  }
}
