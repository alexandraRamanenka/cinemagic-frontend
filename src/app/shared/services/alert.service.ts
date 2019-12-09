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

  private assignAlert(message: string, type: ResponseStatusTypes | AlertTypes) {
    const alert = {
      message,
      type:
        type === ResponseStatusTypes.Success || AlertTypes.Success
          ? AlertTypes.Success
          : AlertTypes.Error
    };
    return alert;
  }

  sendAlert(message: string, type: ResponseStatusTypes | AlertTypes) {
    this.alertSubject.next(this.assignAlert(message, type));
  }
  
}
