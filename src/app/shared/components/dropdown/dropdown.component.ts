import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  forwardRef,
  Output,
  EventEmitter,
  ViewContainerRef,
  TemplateRef,
  NgZone,
  EmbeddedViewRef,
  HostListener
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
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() options = [];
  @Input() selected: number;
  @Input() valueKey = 'value';
  @Input() idKey = 'id';

  @Output() selectChanged = new EventEmitter();
  private onChange = () => {};
  private optionsRef: EmbeddedViewRef<any>;

  get value(): string {
    return this.selected
      ? this.valueKey
        ? this.options[this.selected][this.valueKey]
        : this.options[this.selected]
      : this.placeholder;
  }

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit() {}

  writeValue(index: number): void {
    this.selected = index;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  showOptions(dropdownTemplate: TemplateRef<any>, parent: HTMLElement) {
    this.optionsRef = this.viewContainerRef.createEmbeddedView(
      dropdownTemplate
    );
    const dropdown = this.optionsRef.rootNodes[0];

    document.body.appendChild(dropdown);
    dropdown.style.width = `${parent.offsetWidth}px`;
  }

  select() {}
}
