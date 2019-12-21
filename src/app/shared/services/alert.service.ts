import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Alert } from '@shared/models/alert';
import { AlertTypes } from '../enums/alertTypes';
import { ResponseStatusTypes } from '../enums/responseStatusTypes';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert>();
  public get alert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  constructor() {}

  private assignAlert(
    message: string,
    alertType: ResponseStatusTypes | AlertTypes
  ) {
    const type =
      alertType === ResponseStatusTypes.Success ||
      alertType === AlertTypes.Success
        ? AlertTypes.Success
        : AlertTypes.Error;
    return {
      message,
      type
    };
  }

  sendAlert(message: string, type: ResponseStatusTypes | AlertTypes) {
    const alert = this.assignAlert(message, type);
    this.alertSubject.next(alert);
  }
}
