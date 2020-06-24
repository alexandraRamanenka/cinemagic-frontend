import { filter } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '@shared/services/movie.service';
import { Session } from '@shared/models/session';
import { Response } from '@shared/models/response';

@Component({
  selector: 'app-movie-schedule',
  templateUrl: './movie-schedule.component.html',
  styleUrls: ['./movie-schedule.component.scss']
})
export class MovieScheduleComponent implements OnInit {
  @Input() movieId;
  sessions: Session[];
  loading = true;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService
      .getMovieSessions(this.movieId)
      .subscribe((res: Response<Session[]>) => {
        this.sessions = res.data;
        this.sessions = this.sessions.filter((session) => new Date(session.dateTime) >= new Date());
        this.loading = false;
      });
  }
}
