import { Movie } from '@shared/models/movie';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  get movieInfoLink(): string[] {
    return [`/movies/${this.movie._id}`];
  }

  constructor() {}

  ngOnInit() {}
}
