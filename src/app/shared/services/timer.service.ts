import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  timer,
  Subscription,
  BehaviorSubject
} from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable()
export class TimerService {
  private duration: number;
  private restTime: number;

  private secondsValue: number;
  private secondsSubject: BehaviorSubject<number>;

  private timer$: Observable<number>;
  private timerSubscription: Subscription;

  private completeCallback: any = () => {};

  ignoreRestart: boolean;

  set timerDuration(value: string) {
    this.duration = this.parseTime(value);
    this.restTime = this.duration;
    this.secondsSubject.next(this.restTime);
  }

  get isStarted(): boolean {
    console.log();
    return this.timerSubscription && !this.timerSubscription.closed;
  }

  get seconds(): Observable<number> {
    return this.secondsSubject.asObservable();
  }

  constructor() {}

  init(completeCallback: any, ignoreRestart = false) {
    this.completeCallback = completeCallback;
    this.ignoreRestart = ignoreRestart;
    this.secondsSubject = new BehaviorSubject(this.duration);
    this.secondsSubject.subscribe(seconds => (this.secondsValue = seconds));
  }

  initTimer() {
    this.timer$ = timer(0, 1000).pipe(
      takeUntil(timer(this.restTime)),
      map(secondsLeft => this.restTime - secondsLeft * 1000)
    );
  }

  start() {
    if (this.ignoreRestart && this.isStarted) {
      return;
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.initTimer();
    this.timerSubscription = this.timer$.subscribe({
      next: seconds => {
        this.secondsSubject.next(seconds);
        console.log(seconds);
      },
      complete: this.completeCallback
    });
  }

  stop() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.restTime = this.secondsValue;
      this.timer$ = null;
    }
  }

  reset() {
    this.secondsSubject.next(this.duration);
    this.restTime = this.duration;
    this.clearTimer();
  }

  clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timer$ = null;
  }

  destroy() {
    this.secondsSubject.complete();
  }

  private parseTime(time: string): number {
    const timeValue = parseInt(time, 10);
    const units = /([smh])/i.exec(time);
    if (units) {
      switch (units[1]) {
        case 'm':
          return timeValue * 60 * 1000;
        case 'h':
          return timeValue * 60 * 60 * 1000;
        case 's':
          return timeValue * 1000;
      }
    }
    return timeValue;
  }
}
