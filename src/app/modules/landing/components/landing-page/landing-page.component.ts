import { SessionsService } from '@shared/services/sessions.service';
import { MovieService } from '@shared/services/movie.service';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';
import { environment } from '@env/environment';
import { Session } from '@shared/models/session';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  slideStyle = {};
  bestMovies: Movie[];
  movies: Movie[];
  sessions: Session[];

  get movieSlides(): Movie[] {
    return this.splitDataIntoSlides(this.movies, this.itemsPerSlide);
  }

  get sessionSlides(): Session[] {
    return this.splitDataIntoSlides(this.sessions, this.itemsPerSlide);
  }

  private itemsPerSlide = 4;
  private resizeTimeout: any;

  constructor(
    private movieService: MovieService,
    private sessionsService: SessionsService
  ) {}

  @HostListener('window:resize') onWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.setItemsPerSlideLimit();
    }, environment.resizeDebounce);
  }

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response<Movie[]>) => {
      this.movies = res.data;
    });

    this.movieService.getBestMovies().subscribe((res: Response<Movie[]>) => {
      this.bestMovies = res.data;
    });

    this.sessionsService
      .getTodaySessions()
      .subscribe((res: Response<Session[]>) => {
        this.sessions = res.data;
      });
  }

  ngAfterViewInit() {
    this.setItemsPerSlideLimit();
  }

  getMovieInfoLink(movie: Movie): string[] {
    return [`/movies/${movie._id}`];
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

  private splitDataIntoSlides(
    results: Session[] | Movie[],
    limit: number
  ): any[] {
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
