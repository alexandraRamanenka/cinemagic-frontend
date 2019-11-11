import { FormGroup, FormBuilder } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
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
      period: false
    });
  }

  ngOnInit() {
    this.filteringService.afterInit = () => this.filter();
  }

  filter() {
    this.filteringService.reset();
    const { period } = this.filtersForm.value;
    console.log(period);
    if (!period) {
      this.filteringService.future('session.dateTime', new Date());
    }
  }
}
