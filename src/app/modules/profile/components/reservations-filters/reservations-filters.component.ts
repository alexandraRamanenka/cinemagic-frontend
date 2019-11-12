import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations-filters',
  templateUrl: './reservations-filters.component.html',
  styleUrls: ['./reservations-filters.component.scss']
})
export class ReservationsFiltersComponent implements OnInit {
  filtersForm: FormGroup;

  constructor(
    private filteringService: FilteringService,
    private fb: FormBuilder
  ) {
    this.filtersForm = this.fb.group({
      showPast: false
    });
  }

  ngOnInit() {
    this.filteringService.afterInit = () => this.filter();
  }

  filter() {
    this.filteringService.reset();
    const { showPast } = this.filtersForm.value;

    if (!showPast) {
      this.filteringService.inFuture('session.dateTime', new Date());
    }
  }
}
