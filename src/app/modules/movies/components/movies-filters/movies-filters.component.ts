import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteringService } from './../../../../shared/services/filtering.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movies-filters',
  templateUrl: './movies-filters.component.html',
  styleUrls: ['./movies-filters.component.scss']
})
export class MoviesFiltersComponent {
  filtersForm: FormGroup;
  ageRates = ['6+', '13+', '16+', '18+'];
  @Input() ageRate;

  constructor(
    private filteringService: FilteringService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      name: [''],
      restriction: [''],
      genre: [''],
      language: [''],
      year: ['']
    });
  }

  filter() {
    this.filteringService.reset();
    const { name, genre, restriction, year, language } = this.filtersForm.value;

    this.filteringService
      .includesString('name', name)
      .includesValue('genre', genre)
      .lessOrEqual('restriction', restriction)
      .includesString('year', year)
      .includesString('language', language);
  }
}
