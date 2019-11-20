import { ServiceOrder } from '@shared/models/serviceOrder';
import { Component, OnDestroy } from '@angular/core';
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
    this.servicesService.getServices();
    this.servicesService.services
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(services => {
        this.services = services;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onServiceAdd(serviceOrder: ServiceOrder) {
    if (serviceOrder.amount === 0) {
      this.serviceOrders = this.serviceOrders.filter(
        order => order.service._id !== serviceOrder.service._id
      );
      return;
    }
    const orderIndex = this.serviceOrders.findIndex(
      order => order.service._id === serviceOrder.service._id
    );
    if (orderIndex === -1) {
      this.serviceOrders.push(serviceOrder);
    } else {
      this.serviceOrders[orderIndex] = serviceOrder;
    }
  }

  removeFromCart(orderId: string) {
    this.serviceOrders = this.serviceOrders.filter(
      order => order.service._id !== orderId
    );
  }

  isInCart(serviceId: string) {
    return this.serviceOrders.some(order => order.service._id === serviceId);
  }
}
