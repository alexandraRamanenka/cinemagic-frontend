import { ServiceOrder } from '@shared/models/serviceOrder';
import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Service } from '@shared/models/service';
import { ServicesService } from '../../services/services.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-services-cart',
  templateUrl: './services-cart.component.html',
  styleUrls: ['./services-cart.component.scss']
})
export class ServicesCartComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loading = true;
  services: Service[];
  serviceOrders: ServiceOrder[] = [];

  constructor(private servicesService: ServicesService) {
    this.servicesService.getServices().subscribe(services => {
      this.services = services;
      this.loading = false;
    });

    this.servicesService.serviceOrders
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(services => (this.serviceOrders = services));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onServiceAdd(serviceOrder: ServiceOrder) {
    this.servicesService.addToCart(serviceOrder);
  }

  removeFromCart(serviceOrder: ServiceOrder) {
    this.servicesService.removeFromCart(serviceOrder);
  }

  isInCart(serviceId: string) {
    return this.serviceOrders.some(order => order.service._id === serviceId);
  }
}
