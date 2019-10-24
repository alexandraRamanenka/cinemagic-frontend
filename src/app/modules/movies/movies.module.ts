import { httpInterceptorProviders } from '@shared/interceptors';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { MoviesPageComponent } from './components/movies-page/movies-page.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [MoviesPageComponent],
  imports: [MoviesRoutingModule, SharedModule],
  providers: [httpInterceptorProviders]
})
export class MoviesModule {}
