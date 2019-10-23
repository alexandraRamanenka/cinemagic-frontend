import { MovieService } from './../../../../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from '@shared/models/movie';
import { Response } from '@shared/models/response';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  items = [];
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAll().subscribe((res: Response) => {
      let movies = res.data as [];
      for (let i = 0; i < movies.length; i += 3) {
        this.items.push([movies[i], movies[i + 1], movies[i + 2]]);
      }
      console.log(this.items);
    });
  }
}
