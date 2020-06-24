import { environment } from '@env/environment';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from '@shared/services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const apiReq = req.clone({
      url: req.url.includes(environment.url) ? req.url : `${environment.url}${req.url}`,
      withCredentials: true
    });

    let observable = new Observable<HttpEvent<any>>(subscriber => {
      let originalRequestSubscription = next.handle(apiReq).subscribe({
        next: res => {
          subscriber.next(res);
        },

        error: err => {
          if (err.status === 401) {
            this.handleUnauthorizedError(subscriber, req, err);
          } else {
            subscriber.error(err);
          }
        },

        complete: () => {
          subscriber.complete();
        }
      });

      return () => {
        originalRequestSubscription.unsubscribe();
      };
    });

    return observable;
  }

  private handleUnauthorizedError(
    subscriber: Subscriber<any>,
    req: HttpRequest<any>,
    err: Error
  ) {
    this.userService.deleteCurrentUser();
    if (req.url.startsWith('auth')) {
      return subscriber.error(err);
    }
    this.router.navigateByUrl('');
  }
}
