import { StorageKeys } from '@shared/enums/storageKeys';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable()
export class ReservationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const sessionId = /(?<=reserve-ticket\/)[a-f\d]{24}/.exec(state.url)[0];
    const seats = JSON.parse(
      localStorage.getItem(`${sessionId}_${StorageKeys.Seats}`)
    );
    if (!seats) {
      this.router.navigateByUrl(`/reserve-ticket/${sessionId}/seats`);
      return false;
    }
    return Object.values(seats).length !== 0;
  }
}
