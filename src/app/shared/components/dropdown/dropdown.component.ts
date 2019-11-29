import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  Input,
  forwardRef,
  ViewContainerRef,
  HostListener,
  ElementRef,
  ViewChild,
  QueryList,
  ViewChildren
} from '@angular/core';

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

  private open = false;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  @HostListener('keydown.arrowdown', ['$event']) onArrowDown(event) {
    if (this.isOpen) {
      event.preventDefault();
      let el =
        document.querySelector('.option.hovered') ||
        document.querySelector('.option.selected');
      el.classList.remove('hovered');
      if (el.nextElementSibling) {
        el.nextElementSibling.classList.add('hovered');
      } else {
        el.parentNode.firstElementChild.classList.add('hovered');
      }
    }
  }

  @HostListener('keydown.arrowup', ['$event']) onArrowUp(event) {
    if (this.isOpen) {
      event.preventDefault();
      let el =
        document.querySelector('.option.hovered') ||
        document.querySelector('.option.selected');
      el.classList.remove('hovered');
      if (el.previousElementSibling) {
        el.previousElementSibling.classList.add('hovered');
      } else {
        el.parentNode.firstElementChild.classList.add('hovered');
      }
    }
  }

  get value(): string {
    if (this.selected) {
      let value = this.selected;
      if (this.valueKey) {
        value = value[this.valueKey];
      }
      return value ? value : this.placeholder;
    }
    return this.placeholder;
  }

  get isOpen(): boolean {
    return this.open;
  }

  isSelected(option: any): boolean {
    if (this.selected) {
      if (this.idKey) {
        return option[this.idKey] === this.selected[this.idKey];
      } else if (this.valueKey) {
        return option[this.valueKey] === this.selected[this.valueKey];
      }
      return option === this.selected;
    }
  }

  constructor(private er: ElementRef) {}

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

  select(option: any) {
    this.writeValue(option);
    this.unfocus();
  }

  toggleOpen() {
    this.open = !this.open;
    console.log('toggle');
  }

  unfocus() {
    this.open = false;
  }
}
