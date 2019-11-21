import { ReservationService } from './reservation.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Service } from '@shared/models/service';
import { Subject, Observable } from 'rxjs';
import { Response } from '@shared/models/response';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { SessionStorageKeys } from '@shared/enums/sessionStorageKeys';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  services: ServiceOrder[] = [];
  private servicesSubject = new Subject<ServiceOrder[]>();

  get serviceOrders(): Observable<ServiceOrder[]> {
    return this.servicesSubject.asObservable();
  }

  constructor(
    private http: HttpClient,
    private reservationService: ReservationService
  ) {}

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

    const orderIndex = this.services.findIndex(
      order => order.service._id === serviceOrder.service._id
    );

    if (orderIndex === -1) {
      this.services.push(serviceOrder);
    } else {
      this.services[orderIndex] = serviceOrder;
    }

    this.servicesSubject.next(this.services);
    this.changeCart(this.services);
  }

  removeFromCart(serviceOrder: ServiceOrder) {
    this.services = this.services.filter(
      order => order.service._id !== serviceOrder.service._id
    );
    this.servicesSubject.next(this.services);
    this.changeCart(this.services);
  }

  private changeCart(services: ServiceOrder[]) {
    if (services.length) {
      sessionStorage.setItem(
        `${this.reservationService.session._id}_${SessionStorageKeys.Services}`,
        JSON.stringify(services)
      );
    } else {
      sessionStorage.removeItem(
        `${this.reservationService.session._id}_${SessionStorageKeys.Services}`
      );
    }
  }
}
