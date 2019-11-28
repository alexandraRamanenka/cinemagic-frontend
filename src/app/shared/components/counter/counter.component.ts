import { Component, OnInit, Input, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CounterComponent),
  multi: true
};

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class CounterComponent implements OnInit, ControlValueAccessor {
  private onChange = (count: number) => {};

  @Input() hightLimit: number;
  @Input() lowLimit = 0;
  count: number = this.lowLimit;

  constructor() {}

  ngOnInit() {}

  increment() {
    const newValue = this.count + 1;
    this.count = this.checkHighLimit(newValue) ? newValue : this.hightLimit;
    this.onChange(this.count);
  }

  decrement() {
    const newValue = this.count - 1;
    this.count = this.checkLowLimit(newValue) ? newValue : this.lowLimit;
    this.onChange(this.count);
  }

  checkHighLimit(value: number): boolean {
    if (this.hightLimit) return value <= this.hightLimit;
    return true;
  }

  checkLowLimit(value: number): boolean {
    return value >= this.lowLimit;
  }

  writeValue(count: number): void {
    count = this.checkLowLimit(count) ? count : this.lowLimit;
    count = this.checkHighLimit(count) ? count : this.hightLimit;
    this.count = count;
    this.onChange(this.count);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}
}
