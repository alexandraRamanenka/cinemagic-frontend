import { TimerService } from './../../services/timer.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { TimerEvents } from '@shared/enums/timerEvents';

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
  @Output() timerComplete = new EventEmitter<TimerEvents>();
  @Input() set ignoreRestart(value: boolean) {
    this.timerService.ignoreRestart = value;
  }

  constructor(private timerService: TimerService) {
    const completeCallback = () =>
      this.timerComplete.emit(TimerEvents.Complete);
    this.timerService.init(completeCallback);
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
