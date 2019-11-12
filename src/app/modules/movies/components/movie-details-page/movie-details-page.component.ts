import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';
import { MovieService } from '@shared/services/movie.service';

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.scss']
})
export class MovieDetailsPageComponent implements OnInit {
  loading = true;
  movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieSevice: MovieService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.movieSevice.getById(params.get('id'));
        })
      )
      .subscribe((res: Response<Movie>) => {
        this.movie = res.data;
        this.loading = false;
      });
  }
}
