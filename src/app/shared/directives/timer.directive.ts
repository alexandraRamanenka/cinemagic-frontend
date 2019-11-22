import { Directive, Input } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective {
  @Input('appTimer') set time(value: string) {
    this.timeValue = this.parseTime(value);
  }
  timer$: Observable<number>;
  private timeValue: number;

  constructor() {
    this.timer$ = timer(0, 1000).pipe(
      take(this.timeValue),
      map(() => --this.timeValue)
    );
  }

  private parseTime(time: string): number {
    const timeValue = parseInt(time, 10);
    const units = /([smh])/i.exec(time);
    switch (units[1]) {
      case 'm':
        return timeValue * 60;
      case 'h':
        return timeValue * 60 * 60;
      case 's':
        return timeValue;
    }

    return timeValue;
  }
}
