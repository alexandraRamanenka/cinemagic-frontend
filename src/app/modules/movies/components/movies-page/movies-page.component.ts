import { FilteringService } from '@shared/services/filtering.service';
import { Response } from '@shared/models/response';
import { MovieService } from '@shared/services/movie.service';
import { Movie } from '@shared/models/movie';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit, OnDestroy {
  limitPerPage = 8;
  loading = true;
  moviesSet: Movie[];

  private unsubscribe$: Subject<void> = new Subject();
  private moviesSubject: BehaviorSubject<Movie[]> = new BehaviorSubject([]);

  get movies(): Observable<Movie[]> {
    return this.moviesSubject.asObservable();
  }

  constructor(
    private movieService: MovieService,
    private filteringService: FilteringService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      this.filteringService.init(res.data);
      this.filteringService.filteredData
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: movies => {
            this.moviesSubject.next(movies);
            this.loading = false;
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onMoviesSetChanged(e) {
    this.moviesSet = e;
    this.changeDetector.detectChanges();
  }
}
