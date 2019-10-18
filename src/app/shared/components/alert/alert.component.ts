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
      const alerts = [...this.alerts, alert];
      setTimeout(() => this.destroyAlert(alerts.length - 1), 5000);
      this.alerts = alerts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private destroyAlert(index) {
    const updatedAlerts = [
      ...this.alerts.slice(0, index),
      ...this.alerts.slice(index + 1)
    ];
    this.alerts = updatedAlerts;
  }

  onClose(index) {
    this.destroyAlert(index);
  }
}
