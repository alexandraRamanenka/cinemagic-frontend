import { SessionsService } from '@shared/services/sessions.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@shared/models/session';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilteringService } from '@shared/services/filtering.service';
import { Response } from '@shared/models/response';
import { CurrentPage } from '@shared/models/currentPage';

@Component({
  selector: 'app-afisha-page',
  templateUrl: './afisha-page.component.html',
  styleUrls: ['./afisha-page.component.scss']
})
export class AfishaPageComponent implements OnInit, OnDestroy {
  limitPerPage = 8;
  loading = true;
  sessions: Session[] = [];

  private allSessions: Session[] = [];
  private unsubscribe$: Subject<void> = new Subject();

  get sessionsAmount(): number {
    return this.allSessions.length;
  }

  constructor(
    private sessionsService: SessionsService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.sessionsService.getAll().subscribe((res: Response<Session[]>) => {
      this.allSessions = res.data;
      this.subscribeToFiltering(res.data);
      this.subscribeToPagination();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  subscribeToFiltering(sessions) {
    this.filteringService.init(sessions, this.limitPerPage);
    this.filteringService.filteredData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sessions => {
        this.allSessions = sessions;
        this.loading = false;
      });
  }

  subscribeToPagination() {
    this.filteringService.paginatedData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(sessions => {
        this.sessions = sessions;
      });
  }

  onPageChanged(page: CurrentPage) {
    this.filteringService.getItemsForPage(page);
  }
}
