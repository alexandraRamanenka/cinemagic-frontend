import { Response } from '@shared/models/response';
import { MovieService } from '@shared/services/movie.service';
import { Movie } from '@shared/models/movie';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilteringService } from '@shared/services/filtering.service';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  movies: Movie[];
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private movieService: MovieService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      this.movies = res.data;

      this.filteringService.init(this.movies);
      this.filteringService.filteredData
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: movies => (this.movies = movies)
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
