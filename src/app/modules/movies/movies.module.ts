import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesFiltersComponent } from './components/movies-filters/movies-filters.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailsPageComponent } from './components/movie-details-page/movie-details-page.component';
import { MovieScheduleComponent } from './components/movie-schedule/movie-schedule.component';

@NgModule({
  declarations: [
    MoviesPageComponent,
    MoviesFiltersComponent,
    MoviesListComponent,
    MovieDetailsPageComponent,
    MovieScheduleComponent
  ],
  imports: [MoviesRoutingModule, SharedModule, FormsModule],
  providers: []
})
export class MoviesModule {}
