import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TimerEvents } from '@shared/enums/timerEvents';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() set timerDuration(value: string) {
    this.duration = this.parseTime(value);
    this.restTime = this.duration;
  }
  @Input() ignoreRestart = false;
  @Output() timerEvent = new EventEmitter<TimerEvents>();
  timer$: Observable<number>;
  seconds: number;
  private timerSubscription: Subscription;
  private duration: number;
  private restTime: number;

  constructor() {}
  ngOnInit() {
    this.init();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
  init() {
    this.timer$ = timer(0, 1000).pipe(
      take(this.restTime),
      map(v => this.restTime - v * 1000)
    );
  }

  start() {
    if (this.ignoreRestart && this.timerSubscription) {
      return;
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerEvent.emit(TimerEvents.Reset);
    }
    this.init();
    this.timerSubscription = this.timer$.subscribe(
      seconds => (this.seconds = seconds)
    );
    this.timerEvent.emit(TimerEvents.Started);
  }

  stop() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.restTime = this.seconds;
      this.timer$ = null;
    }
    this.timerEvent.emit(TimerEvents.Stopped);
  }

  reset() {
    this.seconds = this.duration;
    this.restTime = this.duration;
    this.clearTimer();
    this.timerEvent.emit(TimerEvents.Reset);
  }

  private clearTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timer$ = null;
  }
  private parseTime(time: string): number {
    const timeValue = parseInt(time, 10);
    const units = /([smh])/i.exec(time);
    switch (units[1]) {
      case 'm':
        return timeValue * 60 * 1000;
      case 'h':
        return timeValue * 60 * 60 * 1000;
      case 's':
        return timeValue * 1000;
    }

    return timeValue * 1000;
  }
}
