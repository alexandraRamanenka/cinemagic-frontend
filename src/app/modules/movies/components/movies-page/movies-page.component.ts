import { FilteringService } from '@shared/services/filtering.service';
import { Response } from '@shared/models/response';
import { MovieService } from './../../../../shared/services/movie.service';
import { Movie } from '@shared/models/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss'],
  providers: [FilteringService]
})
export class MoviesPageComponent implements OnInit {
  movies: Movie[];
  constructor(
    private movieService: MovieService,
    private filteringService: FilteringService
  ) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      this.movies = res.data as Movie[];

      this.filteringService.init(this.movies);
    });
  }
}
