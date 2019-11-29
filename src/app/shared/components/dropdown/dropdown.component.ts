import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, forwardRef, ViewContainerRef } from '@angular/core';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true
};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options = [];
  @Input() placeholder = '';
  @Input() selected: number;

  private open = false;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  get value(): string {
    return this.selected ? this.options[this.selected] : this.placeholder;
  }

  get isOpen(): boolean {
    return this.open;
  }

  constructor(private vcr: ViewContainerRef) {}

  writeValue(index: number): void {
    this.selected = index;
    this.onChange(index);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(index: number) {
    this.writeValue(index);
    this.open = false;
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
