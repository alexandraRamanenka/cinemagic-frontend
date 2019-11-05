import { SessionsService } from '@shared/services/sessions.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Session } from '@shared/models/session';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
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
  allSessions: Session[] = [];
  sessionsForPage: Session[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private sessionsService: SessionsService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.sessionsService.getAll().subscribe((res: Response<Session[]>) => {
      this.allSessions = res.data;
      this.subscribeToFiltering(res.data);
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
      .subscribe(sessions => {
        this.allSessions = sessions;
        this.sessionsForPage = this.allSessions.slice(0, this.limitPerPage);
        this.loading = false;
      });
  }

  onPageChanged(page: CurrentPage) {
    this.sessionsForPage = this.allSessions.slice(
      page.itemsStartIndex,
      page.itemsEndIndex
    );
  }
}
