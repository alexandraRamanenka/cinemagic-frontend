import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, Input } from '@angular/core';
import { AgeRates } from '@shared/enums/ageRates';

@Component({
  selector: 'app-movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.scss']
})
export class MoviesFiltersComponent {
  filtersForm: FormGroup;
  ageRates = [
    AgeRates.Any,
    AgeRates.SixPlus,
    AgeRates.ThirteenPlus,
    AgeRates.EighteenPlus
  ];
  @Input() ageRate;

  constructor(
    private filteringService: FilteringService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      name: [''],
      restriction: [AgeRates.Any],
      genre: [''],
      language: [''],
      year: ['']
    });
  }

  filter() {
    this.filteringService.reset();
    const { name, genre, year, language } = this.filtersForm.value;
    let { restriction } = this.filtersForm.value;
    restriction = restriction === AgeRates.Any ? null : parseInt(restriction);

    this.filteringService
      .includesString('name', name)
      .includesValue('genre', genre)
      .lessOrEqual('restriction', restriction)
      .includesString('year', year)
      .includesString('language', language);
  }
}
