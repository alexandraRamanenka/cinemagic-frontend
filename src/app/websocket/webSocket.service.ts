import { Injectable, Inject, OnDestroy } from '@angular/core';
import { WebSocketMessage } from './webSocketMessage';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { WebSocketConfig } from './webSocketConfig';
import { config } from './webSocket.config';
import { environment } from '@env/environment';
import {
  distinctUntilChanged,
  takeUntil,
  takeWhile,
  filter,
  map,
  share
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private config: WebSocketSubjectConfig<WebSocketMessage<any>>;

  private socket$: WebSocketSubject<WebSocketMessage<any>>;
  private connection$ = new Subject<boolean>();
  // private reconnection$: Observable<number>;
  private messagesSubject$ = new Subject<WebSocketMessage<any>>();
  private unsubscribe$ = new Subject<void>();

  private reconnectInterval: number;
  private reconnectAttempts: number;

  isConnected: boolean;

  get connectionStatus(): Observable<boolean> {
    return this.connection$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  constructor(
    @Inject(config) private wsConfig: WebSocketConfig,
    private router: Router
  ) {
    this.messagesSubject$ = new Subject<WebSocketMessage<any>>();

    this.reconnectInterval =
      this.wsConfig.reconnectInterval || environment.wsDefaultReconnectInterval;
    this.reconnectAttempts =
      this.wsConfig.reconnectAttempts || environment.wsDefaultReconnectAttempts;

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

    this.messagesSubject$.subscribe(null, (error: ErrorEvent) => {
      console.log('WebSocket error!', error);
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  connect(): void {
    this.socket$ = new WebSocketSubject(this.config);

    this.socket$.subscribe(
      message => {
        console.log(message);
        this.messagesSubject$.next(message);
      },
      error => {
        console.log(error);
        // if (!this.socket$) {
        //   this.reconnect();
        // }
      }
    );
  }

  // private reconnect(): void {
  //   this.reconnection$ = interval(this.reconnectInterval).pipe(
  //     takeWhile((v, i) => i < this.reconnectAttempts && !this.socket$)
  //   );

  //   this.reconnection$.pipe(takeUntil(this.unsubscribe$)).subscribe(
  //     () => this.connect(),
  //     null,
  //     () => {
  //       this.reconnection$ = null;
  //       if (!this.socket$) {
  //         this.messagesSubject$.complete();
  //         this.connection$.complete();
  //       }
  //     }
  //   );
  // }

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
      console.log(`event: ${event}, data: ${data}`);
      this.socket$.next(JSON.stringify({ event, data }) as any);
    }
  }

  closeConnection() {
    console.log('complete');
    if (this.socket$) {
      this.socket$.unsubscribe();
    }
  }
}
