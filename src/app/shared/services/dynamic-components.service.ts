import { Injectable, ComponentFactoryResolver } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentsService {
  constructor(private resolver: ComponentFactoryResolver) {}
}
