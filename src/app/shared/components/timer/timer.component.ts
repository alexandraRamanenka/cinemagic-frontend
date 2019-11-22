import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, timer, Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() set time(value: string) {
    this.timeValue = this.parseTime(value);
    console.log(this.timeValue);
  }
  timer$: Observable<number>;
  private timeValue: number;
  private unsubscribe$ = new Subject<void>();

  constructor() {}
  ngOnInit() {
    this.timer$ = timer(0, 1000).pipe(
      take(this.timeValue),
      map(v => this.timeValue - v * 1000)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startTimer()
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
