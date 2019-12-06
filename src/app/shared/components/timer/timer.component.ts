import { TimerService } from './../../services/timer.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  timer$: Observable<number>;
  seconds: number;

  @Input() set timerDuration(value: string) {
    this.timerService.timerDuration = value;
  }
  @Input() autoStart = false;
  @Input() set ignoreRestart(value: boolean) {
    this.timerService.ignoreRestart = value;
  }

  constructor(private timerService: TimerService) {
    this.timerService.init();
  }

  ngOnInit() {
    this.timerService.initTimer();
    this.timerService.seconds.subscribe(seconds => (this.seconds = seconds));
    if (this.autoStart) {
      this.timerService.start();
    }
  }

  ngOnDestroy(): void {
    this.timerService.clearTimer();
    this.timerService.destroy();
  }
}
