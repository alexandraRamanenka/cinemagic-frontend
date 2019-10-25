import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilteringService } from '@shared/services/filtering.service';
import { httpInterceptorProviders } from '@shared/interceptors';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesFiltersComponent } from './components/movies-filters/movies-filters.component';

@NgModule({
  declarations: [MoviesPageComponent, MoviesFiltersComponent],
  imports: [MoviesRoutingModule, SharedModule, FormsModule],
  providers: [httpInterceptorProviders, FilteringService]
})
export class MoviesModule {}
