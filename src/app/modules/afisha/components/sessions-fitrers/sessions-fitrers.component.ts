import { FormBuilder, FormGroup } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions-fitrers',
  templateUrl: './sessions-fitrers.component.html',
  styleUrls: ['./sessions-fitrers.component.scss']
})
export class SessionsFitrersComponent implements OnInit {
  filtersForm: FormGroup;

  constructor(
    private filteringService: FilteringService,
    private formBuilder: FormBuilder
  ) {
    this.filtersForm = this.formBuilder.group({
      city: [''],
      cinema: [''],
      name: [''],
      restriction: [''],
      genre: [''],
      language: [''],
      date: [new Date().toISOString().substring(0, 10)],
      time: ['']
    });
  }

  ngOnInit() {}

  filter() {
    this.filteringService.reset();
    const {
      name,
      genre,
      restriction,
      city,
      cinema,
      date,
      time,
      language
    } = this.filtersForm.value;

    this.filteringService
      .includesString('name', name)
      .includesValue('genre', genre)
      .lessOrEqual('restriction', restriction)
      .includesString('language', language);
  }
}
