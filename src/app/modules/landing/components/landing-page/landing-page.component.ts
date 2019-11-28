import { MovieService } from '@shared/services/movie.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private itemsPerSlide = 4;
  movieSlides = [];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response<Movie[]>) => {
      const movies = res.data;
      this.movieSlides = this.splitDataIntoSlides(movies, this.itemsPerSlide);
    });
  }

  private splitDataIntoSlides(results: any[], limit: number) {
    const result = [];
    const wholeParts = results.length / limit;

    for (let i = 0; i < wholeParts; i++) {
      result.push(results.slice(i * limit, i * limit + limit));
    }

    return result;
  }
}
