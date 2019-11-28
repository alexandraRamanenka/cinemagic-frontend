import { TimerService } from './../../services/timer.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TimerEvents } from '@shared/enums/timerEvents';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() set timerDuration(value: string) {
    this.duration = this.parseTime(value);
    this.restTime = this.duration;
    this.seconds = this.duration;
  }
  @Input() ignoreRestart = false;
  @Input() autoStart = false;
  @Output() timerComplete = new EventEmitter<TimerEvents>();

  timer$: Observable<number>;
  seconds: number;

  private timerSubscription: Subscription;
  private duration: number;
  private restTime: number;

  get isStarted(): boolean {
    return this.timerSubscription && !this.timerSubscription.closed;
  }

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.init();
    if (this.autoStart) {
      this.start();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

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
      next: seconds => (this.seconds = seconds),
      complete: () => {
        this.timerComplete.emit(TimerEvents.Complete);
      }
    });
  }

  stop() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.restTime = this.seconds;
      this.timer$ = null;
    }
  }

  reset() {
    this.seconds = this.duration;
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
