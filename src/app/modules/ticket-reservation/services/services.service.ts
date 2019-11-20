import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Service } from '@shared/models/service';
import { Subject, Observable } from 'rxjs';
import { Response } from '@shared/models/response';
import { ServiceOrder } from '@shared/models/serviceOrder';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private servicesSubject = new Subject<Service[]>();

  get services(): Observable<Service[]> {
    return this.servicesSubject.asObservable().pipe(distinctUntilChanged());
  }

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get('services').subscribe((res: Response<Service[]>) => {
      this.servicesSubject.next(res.data);
    });
  }

  changeCart(services: ServiceOrder[]) {
    sessionStorage.setItem('serviceOrders', JSON.stringify(services));
  }
}
