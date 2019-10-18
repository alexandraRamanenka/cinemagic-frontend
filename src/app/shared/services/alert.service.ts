import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '@shared/models/alert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  public alert: Observable<Alert>;

  constructor(private router: Router) {
    this.alert = this.alertSubject.asObservable();
  }

  sendAlert(message: string, type: string) {
    const alert = {
      message,
      type: type === 'fail' ? 'error' : 'success'
    };
    this.alertSubject.next(alert);
  }
}
