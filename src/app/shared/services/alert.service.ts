import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '@shared/models/alert';
import { AlertTypes } from '../enums/alertTypes';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  public alert: Observable<Alert>;

  constructor() {
    this.alert = this.alertSubject.asObservable();
  }

  private assignAlert(message: string, type: string) {
    const alert = {
      message,
      type: type === 'fail' || 'error' ? AlertTypes.error : AlertTypes.success
    };
    return alert;
  }

  sendAlert(message: string, type: string) {
    this.alertSubject.next(this.assignAlert(message, type));
  }
}
