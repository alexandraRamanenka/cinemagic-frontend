import {
  SessionsTimeIntervals,
  AllTimeIntervals
} from '@shared/enums/sessionsTimeIntervals';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, OnInit } from '@angular/core';
import { Interval } from '@shared/models/interval';
import { AgeRates, AllAgeRates } from '@shared/enums/ageRates';
import {
  MovieLanguages,
  AllMovieLanguages
} from '@shared/enums/movieLanguages';

@Component({
  selector: 'app-sessions-filters',
  templateUrl: './sessions-filters.component.html',
  styleUrls: ['./sessions-filters.component.scss']
})
export class SessionsFiltersComponent implements OnInit {
  filtersForm: FormGroup;
  sessionIntervals = [...AllTimeIntervals];
  languages = [...AllMovieLanguages];
  ageRates = [...AllAgeRates];

  constructor(
    private filteringService: FilteringService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      city: [''],
      cinema: [''],
      name: [''],
      restriction: [AgeRates.Any],
      genre: [''],
      language: [''],
      date: [''],
      time: [SessionsTimeIntervals.Any]
    });
  }

  ngOnInit() {}

  getTimeInterval(interval: SessionsTimeIntervals): Interval {
    const from = +interval.substring(0, 2) * 60;
    const to = +interval.substring(8, 10) * 60;
    return { from, to };
  }

  setInterval(e) {
    this.filtersForm.patchValue({ time: e.target.value });

    this.filter();
  }

  filter() {
    this.filteringService.reset();
    const { name, genre, city, cinema } = this.filtersForm.value;

    let { date, restriction, time, language } = this.filtersForm.value;
    restriction = restriction === AgeRates.Any ? null : parseInt(restriction);
    language = language === MovieLanguages.Any ? null : language;
    date = date ? new Date(date) : null;
    time =
      time && time !== SessionsTimeIntervals.Any
        ? this.getTimeInterval(time)
        : null;

    this.filteringService
      .includesString('film.name', name)
      .includesString('hall.cinema.name', cinema)
      .includesString('hall.cinema.city', city)
      .includesValue('film.genre', genre)
      .lessOrEqual('film.restriction', restriction)
      .includesString('film.language', language)
      .onDate('dateTime', date)
      .inTimePeriod('dateTime', time);
  }
}
