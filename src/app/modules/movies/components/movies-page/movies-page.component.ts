import { PaginationService } from '@shared/services/pagination.service';
import { FilteringService } from '@shared/services/filtering.service';
import { Response } from '@shared/models/response';
import { MovieService } from '@shared/services/movie.service';
import { Movie } from '@shared/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  providers: [FilteringService]
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  limitPerPage = 8;
  loading = true;
  private movies: Movie[];
  private unsubscribe$: Subject<void> = new Subject();

  get moviesSet(): Movie[] {
    return this.paginationService.currentItemsSet;
  }

  constructor(
    private movieService: MovieService,
    private filteringService: FilteringService,
    private paginationService: PaginationService
  ) {
    this.paginationService.limitPerPage = this.limitPerPage;
  }

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      this.movies = res.data as Movie[];

      this.filteringService.init(this.movies);
      this.filteringService.filteredData
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: movies => {
            this.movies = movies;
            this.loading = false;

            this.paginationService.totalItems = this.movies.length;
            this.paginationService.items = this.movies;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
