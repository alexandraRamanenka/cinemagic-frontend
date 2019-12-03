import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl
} from '@angular/forms';
import { Component, Input, forwardRef } from '@angular/core';

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
  @Input() optionsList = [];
  @Input() placeholder = '';
  @Input() valueKey: string;
  @Input() idKey: string;
  @Input() selected: any;
  @Input() default: any;
  @Input() autocomplete = false;
  hovered: any;
  control = new FormControl();
  term: string;

  private open = false;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  get value(): string {
    if (this.selected) {
      let value = this.selected;
      if (this.valueKey) {
        value = value[this.valueKey];
      }
      return value ? value : this.placeholder;
    }
    return this.autocomplete ? null : this.placeholder;
  }

  get isOpen(): boolean {
    return this.open;
  }

  isSelected(option: any): boolean {
    if (this.selected) {
      return this.compareOptions(option, this.selected);
    }
  }

  isHovered(option: any): boolean {
    if (this.hovered) {
      return this.compareOptions(option, this.hovered);
    }
  }

  constructor() {
    if (this.default && !this.selected) {
      this.selected = this.default;
    }
  }

  writeValue(option: any): void {
    if (!option) {
      this.selected = this.default ? this.default : null;
    }
    this.selected = option;
    if (this.autocomplete) {
      this.control.setValue(this.value);
    }
    this.onChange(this.selected);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  select(option?: any) {
    if (!option) {
      option = this.hovered;
    }
    this.writeValue(option);
    this.unfocus();
    (document.activeElement as HTMLElement).blur();
  }

  unfocus() {
    this.hovered = null;
    this.open = false;
  }

  focus() {
    this.open = true;
  }

  hover(option: any) {
    this.hovered = option;
  }

  next(event) {
    event.preventDefault();
    this.hovered =
      this.optionsList[this.getStartOptionIndex() + 1] || this.optionsList[0];
  }

  previouse(event) {
    event.preventDefault();
    this.hovered =
      this.optionsList[this.getStartOptionIndex() - 1] ||
      this.optionsList[this.optionsList.length - 1];
  }

  private getStartOptionIndex(): number {
    const startOption = this.hovered || this.selected;
    if (!startOption) {
      return -1;
    }

    const startIndex = this.optionsList.findIndex(option =>
      this.compareOptions(option, startOption)
    );

    return startIndex;
  }

  private compareOptions(first: any, second: any) {
    if (this.idKey) {
      return first[this.idKey] === second[this.idKey];
    } else if (this.valueKey) {
      return first[this.valueKey] === second[this.valueKey];
    }
    return first === second;
  }
}
