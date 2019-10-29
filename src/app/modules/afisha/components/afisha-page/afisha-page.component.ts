import { SessionsService } from './../../../../shared/services/sessions.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@shared/models/session';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-afisha-page',
  templateUrl: './afisha-page.component.html',
  styleUrls: ['./afisha-page.component.scss']
})
export class AfishaPageComponent implements OnInit, OnDestroy {
  loading = true;
  sessions: Session[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private sessionsService: SessionsService) {}

  ngOnInit() {
    this.sessionsService.getAll();
    this.sessionsService.sessions.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: sessions => {
        this.sessions = sessions;
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
