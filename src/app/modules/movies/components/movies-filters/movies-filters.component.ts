import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, Input } from '@angular/core';
import { AgeRates, AllAgeRates } from '@shared/enums/ageRates';
import {
  AllMovieLanguages,
  MovieLanguages
} from '@shared/enums/movieLanguages';

@Component({
  selector: 'app-movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.scss']
})
export class MoviesFiltersComponent {
  filtersForm: FormGroup;
  ageRates = [...AllAgeRates];
  languages = [...AllMovieLanguages];
  @Input() ageRate;

  constructor(
    private filteringService: FilteringService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      name: [''],
      restriction: [AgeRates.Any],
      genre: [''],
      language: [MovieLanguages.Any],
      year: ['']
    });
  }

  filter() {
    this.filteringService.reset();
    const { name, genre, year } = this.filtersForm.value;
    let { restriction, language } = this.filtersForm.value;
    language = language === MovieLanguages.Any ? null : language;
    restriction = restriction === AgeRates.Any ? null : parseInt(restriction);

    this.filteringService
      .includesString('name', name)
      .includesValue('genre', genre)
      .lessOrEqual('restriction', restriction)
      .includesString('year', year)
      .includesString('language', language);
  }
}
