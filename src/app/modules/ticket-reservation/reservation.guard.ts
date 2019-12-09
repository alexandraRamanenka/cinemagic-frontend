import { AlertService } from '@shared/services/alert.service';
import { StorageKeys } from '@shared/enums/storageKeys';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AlertTypes } from '@shared/enums/alertTypes';

@Injectable()
export class ReservationGuard implements CanActivate {
  constructor(private router: Router, private alertService: AlertService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const sessionId = /(?<=reserve-ticket\/)[a-f\d]{24}/.exec(state.url)[0];
    let seats;
    try {
      seats = JSON.parse(
        localStorage.getItem(`${sessionId}_${StorageKeys.Seats}`)
      );
    } catch (error) {
      this.alertService.sendAlert(
        'Cannot read chosen seats! Try again later!',
        AlertTypes.Error
      );
      this.router.navigateByUrl(`/`);
      return false;
    }

    if (!seats || !seats.length) {
      this.router.navigateByUrl(`/reserve-ticket/${sessionId}/seats`);
      return false;
    }
    return Object.values(seats).length !== 0;
  }
}
