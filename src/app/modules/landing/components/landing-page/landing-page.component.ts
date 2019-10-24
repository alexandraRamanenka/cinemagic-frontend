import { MovieService } from './../../../../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  movieSlides = [];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      let movies = res.data as [];
      for (let i = 0; i < movies.length; i += 4) {
        this.movieSlides.push([
          movies[i],
          movies[i + 1],
          movies[i + 2],
          movies[i + 3]
        ]);
      }
    });
  }
}
