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

  private assignAlert(message: string, type: ResponseStatusTypes) {
    const alert = {
      message,
      type:
        type === ResponseStatusTypes.Error
          ? AlertTypes.Error
          : AlertTypes.Success
    };
    return alert;
  }

  sendAlert(message: string, type: ResponseStatusTypes) {
    this.alertSubject.next(this.assignAlert(message, type));
  }
}
