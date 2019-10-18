import { AlertService } from '@shared/services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from '@shared/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Array<Alert> = [];
  private subscription: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.alert.subscribe(alert => {
      this.alerts.push(alert);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
