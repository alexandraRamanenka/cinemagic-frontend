import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TooltipService } from './tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  host: {
    position: 'absolute'
  }
})
export class TooltipComponent {
  @Input() text: string;

  constructor() {}
}
