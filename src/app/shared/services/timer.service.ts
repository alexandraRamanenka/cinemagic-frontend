import { Injectable } from '@angular/core';
import { TimerEvents } from '@shared/enums/timerEvents';
import { Observable, Subject, timer, Subscription } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Injectable()
export class TimerService {
  set timerDuration(value: string) {
    this.duration = this.parseTime(value);
    this.restTime = this.duration;
    this.secondsValue = this.duration;
  }

  private duration: number;
  private restTime: number;
  private secondsValue: number;
  private secondsSubject: Subject<number>;
  private timer$: Observable<number>;
  private timerSubscription: Subscription;

  get seconds(): Observable<number> {
    return this.secondsSubject.asObservable();
  }

  constructor() {}

  init() {
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

    this.init();
    this.timerSubscription = this.timer$.subscribe({
      next: seconds => this.secondsSubject.next(seconds),
      complete: () => {
        this.timerComplete.emit(TimerEvents.Complete);
      }
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
    this.secondsValue = this.duration;
    this.restTime = this.duration;
    this.clearTimer();
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

  private clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timer$ = null;
  }
}
