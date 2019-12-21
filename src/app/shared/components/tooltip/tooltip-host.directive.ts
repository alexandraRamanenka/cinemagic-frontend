import { Directive, ViewContainerRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appTooltipHost]'
})
export class TooltipHostDirective {
  constructor(public vcr: ViewContainerRef) {}
}
