import { ServiceOrder } from '@shared/models/serviceOrder';
import { Component, OnDestroy } from '@angular/core';
import { Service } from '@shared/models/service';
import { ServicesService } from '../../services/services.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '@shared/models/cart';

@Component({
  selector: 'app-services-cart',
  templateUrl: './services-cart.component.html',
  styleUrls: ['./services-cart.component.scss']
})
export class ServicesCartComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private servicesCart: Cart<ServiceOrder> = {};

  get serviceOrders(): ServiceOrder[] {
    return Object.values(this.servicesCart);
  }

  loading = true;
  services: Service[];

  constructor(private servicesService: ServicesService) {
    this.servicesService.getServices().subscribe(services => {
      this.services = services;
      this.loading = false;
    });

    this.servicesService.serviceOrders
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(services => (this.servicesCart = services));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToCart(serviceOrder: ServiceOrder) {
    this.servicesService.addToCart(serviceOrder);
  }

  removeFromCart(serviceOrder: ServiceOrder) {
    this.servicesService.removeFromCart(serviceOrder);
  }

  getOrderFromCart(serviceId: string) {
    return this.servicesCart[serviceId];
  }
}
