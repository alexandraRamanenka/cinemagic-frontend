import { Injectable, Inject, OnDestroy } from '@angular/core';
import { WebSocketMessage } from './webSocketMessage';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { WebSocketConfig } from './webSocketConfig';
import { config } from './webSocket.config';
import { environment } from '@env/environment';
import { distinctUntilChanged, filter, map, share } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private config: WebSocketSubjectConfig<WebSocketMessage<any>>;

  private socket$: WebSocketSubject<WebSocketMessage<any>>;
  private connection$ = new Subject<boolean>();
  private messagesSubject$ = new Subject<WebSocketMessage<any>>();
  private unsubscribe$ = new Subject<void>();

  isConnected: boolean;

  get connectionStatus(): Observable<boolean> {
    return this.connection$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  constructor(@Inject(config) private wsConfig: WebSocketConfig) {
    this.messagesSubject$ = new Subject<WebSocketMessage<any>>();

    this.config = {
      url: this.wsConfig.url,
      openObserver: {
        next: (event: Event) => {
          console.log('WS connection');
          this.connection$.next(true);
        }
      },
      closeObserver: {
        next: (event: CloseEvent) => {
          console.log('Close conection');
          this.socket$.unsubscribe();
          this.connection$.next(false);
        }
      }
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  connect(): void {
    this.socket$ = new WebSocketSubject(this.config);

    this.socket$.subscribe(message => {
      console.log(message);
      this.messagesSubject$.next(message);
    });
  }

  on<T>(event: string): Observable<T> {
    if (event) {
      return this.messagesSubject$.pipe(
        filter((message: WebSocketMessage<T>) => message.event === event),
        map((message: WebSocketMessage<T>) => message.data)
      );
    }
  }

  send(event: string, data: any): void {
    if (event && this.connectionStatus) {
      this.socket$.next(JSON.stringify({ event, data }) as any);
    }
  }

  closeConnection() {
    if (this.socket$) {
      this.socket$.unsubscribe();
    }
  }
}
