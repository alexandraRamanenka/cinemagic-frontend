import { MovieService } from '@shared/services/movie.service';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';
import { environment } from '@env/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  slideStyle = {};

  get movieSlides(): any[] {
    return this.splitDataIntoSlides(this.movies, this.itemsPerSlide);
  }

  private movies: any[];
  private itemsPerSlide = 4;
  private resizeTimeout: any;

  constructor(private movieService: MovieService) {}

  @HostListener('window:resize') onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(
      (() => {
        this.setItemsPerSlideLimit();
      }).bind(this),
      environment.resizeDebounce
    );
  }

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response<Movie[]>) => {
      this.movies = res.data;
    });
  }

  private setItemsPerSlideLimit() {
    if (window.innerWidth <= 800) {
      this.itemsPerSlide = 1;
      this.slideStyle = {
        justifyContent: 'center'
      };
      return;
    } else if (window.innerWidth <= 1080) {
      this.itemsPerSlide = 2;
    } else if (window.innerWidth <= 1680) {
      this.itemsPerSlide = 3;
    } else {
      this.itemsPerSlide = 4;
    }
    this.slideStyle = {
      justifyContent: 'space-around'
    };
  }

  private splitDataIntoSlides(results: any[], limit: number) {
    const result = [];
    if (!results) {
      return result;
    }
    const wholeParts = results.length / limit;

    for (let i = 0; i < wholeParts; i++) {
      result.push(results.slice(i * limit, i * limit + limit));
    }

    return result;
  }
}
