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
      const movies = res.data as [];
      this.movieSlides = this.splitData(movies, 4);
    });
  }

  private splitData(results: [], limit: number) {
    const result = [];

    for (let i = 0; i < results.length / limit; i += limit) {
      result.push(results.slice(i, i + limit));
    }

    const rest = results.length % limit;

    if (rest !== 0) {
      result.push(results.slice(results.length - rest));
    }

    return result;
  }
}
