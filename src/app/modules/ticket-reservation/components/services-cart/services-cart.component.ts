import { Component, OnInit, OnDestroy } from '@angular/core';
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
}
