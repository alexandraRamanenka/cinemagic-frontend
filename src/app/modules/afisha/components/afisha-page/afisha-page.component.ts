import { PaginationService } from '@shared/services/pagination.service';
import { SessionsService } from './../../../../shared/services/sessions.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Session } from '@shared/models/session';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FilteringService } from '@shared/services/filtering.service';

@Component({
  selector: 'app-afisha-page',
  templateUrl: './afisha-page.component.html',
  styleUrls: ['./afisha-page.component.scss']
})
export class AfishaPageComponent implements OnInit, OnDestroy {
  limit = 8;
  loading = true;
  sessions: Session[] = [];

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private sessionsService: SessionsService,
    private paginationService: PaginationService,
    private filteringService: FilteringService
  ) {
    this.paginationService.limitPerPage = this.limit;
  }

  ngOnInit() {
    this.sessionsService.getAll();
    this.sessionsService.sessions.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: sessions => {
        this.sessions = sessions;

        this.filteringService.init(this.sessions);
        this.filteringService.filteredData
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: sessions => {
              console.log(sessions);
              this.sessions = sessions;
              this.loading = false;

              this.paginationService.totalItems = this.sessions.length;
              this.paginationService.items = this.sessions;
            }
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
