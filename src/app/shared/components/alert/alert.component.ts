import { AlertService } from '@shared/services/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from '@shared/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  private subscription: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    const ALERT_EXPIRATION_TIME = 5000;
    this.subscription = this.alertService.alert.subscribe(alert => {
      const alerts = [...this.alerts, alert];
      setTimeout(
        () => this.destroyAlert(alerts.length - 1),
        ALERT_EXPIRATION_TIME
      );
      this.alerts = alerts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private destroyAlert(index) {
    this.alerts.splice(index, 1);
  }

  onClose(index) {
    this.destroyAlert(index);
  }
}
