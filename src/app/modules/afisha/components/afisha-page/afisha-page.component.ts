import { SessionsService } from './../../../../shared/services/sessions.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@shared/models/session';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { FilteringService } from '@shared/services/filtering.service';

@Component({
  selector: 'app-afisha-page',
  templateUrl: './afisha-page.component.html',
  styleUrls: ['./afisha-page.component.scss']
})
export class AfishaPageComponent implements OnInit, OnDestroy {
  limitPerPage = 8;
  loading = true;
  sessionsSet: Session[];

  private sessionsSubject: BehaviorSubject<Session[]> = new BehaviorSubject([]);
  private unsubscribe$: Subject<void> = new Subject();

  get sessions(): Observable<Session[]> {
    return this.sessionsSubject.asObservable();
  }

  constructor(
    private sessionsService: SessionsService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.sessionsService.getAll();
    this.sessionsService.sessions.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: sessions => {
        this.subscribeToFiltering(sessions);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribeToFiltering(sessions) {
    this.filteringService.init(sessions);
    this.filteringService.filteredData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: sessions => {
          this.sessionsSubject.next(sessions);
          this.loading = false;
        }
      });
  }
}
