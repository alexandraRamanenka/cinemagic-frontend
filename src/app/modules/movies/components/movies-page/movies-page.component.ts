import { FilteringService } from '@shared/services/filtering.service';
import { Response } from '@shared/models/response';
import { MovieService } from '@shared/services/movie.service';
import { Movie } from '@shared/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CurrentPage } from '@shared/models/currentPage';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  limitPerPage = 8;
  loading = true;
  movies: Movie[] = [];
  private allMovies: Movie[] = [];
  private unsubscribe$ = new Subject();

  get moviesAmount(): number {
    return this.allMovies.length;
  }

  constructor(
    private movieService: MovieService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response<Movie[]>) => {
      this.allMovies = res.data;
      this.subscribeToFiltering(res.data);
      this.subscribeToPagination();
    });
  }

  subscribeToFiltering(movies) {
    this.filteringService.init(movies, this.limitPerPage);
    this.filteringService.filteredData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(movies => {
        this.allMovies = movies;
        this.loading = false;
      });
  }

  subscribeToPagination() {
    this.filteringService.paginatedData
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(movies => {
        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onPageChanged(page: CurrentPage) {
    this.filteringService.getItemsForPage(page);
  }
}
