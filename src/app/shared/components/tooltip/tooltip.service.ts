import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  Renderer2,
  ApplicationRef,
  EmbeddedViewRef
} from '@angular/core';
import { TooltipHostDirective } from './tooltip-host.directive';

@Injectable()
export class TooltipService {
  public hasTooltip = false;
  private tooltipRef: ComponentRef<any>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2,
    private appRef: ApplicationRef
  ) {}

  createTooltip(
    component: any,
    host: TooltipHostDirective,
    inputs: object,
    outputs: object,
    offsetX = 0,
    offsetY = 0
  ) {
    if (this.hasTooltip) return;
    const factory = this.resolver.resolveComponentFactory(component);
    const tooltipRef = host.vcr.createComponent(factory);
    this.tooltipRef = tooltipRef;
    this.attachConfig(tooltipRef, { inputs, outputs });
    const tooltipElement = (tooltipRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    const offsetTop = host.vcr.element.nativeElement.offsetTop - offsetY;
    this.renderer.setStyle(tooltipElement, 'top', `${offsetTop}px`);
    this.hasTooltip = true;
  }

  removeTooltip(host: TooltipHostDirective) {
    host.vcr.clear();
    this.hasTooltip = false;
  }

  attachConfig(componentRef: ComponentRef<any>, config: any) {
    const { inputs, outputs } = config;

    for (let key in inputs) {
      componentRef.instance[key] = inputs[key];
    }

    for (let key in outputs) {
      componentRef.instance[key] = outputs[key];
    }
  }
}
