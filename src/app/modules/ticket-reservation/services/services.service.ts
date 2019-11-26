import { ReservationService } from './reservation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Service } from '@shared/models/service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Response } from '@shared/models/response';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { StorageKeys } from '@shared/enums/storageKeys';
import { Cart } from '@shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  services: Cart<ServiceOrder> = {};
  private servicesSubject: BehaviorSubject<Cart<ServiceOrder>>;

  get serviceOrders(): Observable<Cart<ServiceOrder>> {
    return this.servicesSubject.asObservable().pipe(distinctUntilChanged());
  }

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService
  ) {
    this.servicesSubject = new BehaviorSubject(this.getServicesOrders());
    this.servicesSubject.subscribe(services => this.saveCart(services));
  }

  getServices() {
    return this.http
      .get('services')
      .pipe(map((res: Response<Service[]>) => res.data));
  }

  addToCart(serviceOrder: ServiceOrder) {
    if (serviceOrder.amount === 0) {
      this.removeFromCart(serviceOrder);
      return;
    }

    this.services[serviceOrder.service._id] = serviceOrder;

    this.servicesSubject.next(this.services);
  }

  removeFromCart(serviceOrder: ServiceOrder) {
    delete this.services[serviceOrder.service._id];
    this.servicesSubject.next(this.services);
  }

  private saveCart(services: Cart<ServiceOrder>) {
    if (services && Object.keys(services).length) {
      localStorage.setItem(
        `${this.reservationService.session._id}_${StorageKeys.Services}`,
        JSON.stringify(services)
      );
    } else {
      localStorage.removeItem(
        `${this.reservationService.session._id}_${StorageKeys.Services}`
      );
    }
  }

  private getServicesOrders(): Cart<ServiceOrder> {
    const saved = localStorage.getItem(
      `${this.reservationService.session._id}_${StorageKeys.Services}`
    );
    const servicesOrders = saved ? JSON.parse(saved) : {};
    return servicesOrders;
  }
}
