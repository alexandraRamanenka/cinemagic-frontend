import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '@shared/models/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() moviesSet: Movie[];
  constructor() {}

  ngOnInit() {}
}
