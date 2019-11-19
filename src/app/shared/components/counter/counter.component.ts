import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() hightLimit: number;
  @Input() lowLimit = 0;
  count: number = this.lowLimit;

  constructor() {}

  ngOnInit() {}

  increment() {
    const newValue = this.count + 1;
    this.count =
      this.hightLimit && newValue > this.hightLimit
        ? this.hightLimit
        : newValue;
  }

  decrement() {
    const newValue = this.count - 1;
    this.count = newValue < this.lowLimit ? this.lowLimit : newValue;
  }
}
