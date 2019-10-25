import { FilteringService } from './services/filtering.service';
import { MovieService } from './services/movie.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReserveTicketButtonComponent } from './components/reserve-ticket-button/reserve-ticket-button.component';
import { SliderComponent } from './components/slider/slider.component';
import { SlideDirective } from './components/slider/slide.directive';
import { AlertService } from './services/alert.service';
import { MovieGeneresPipe } from './pipes/movie-generes.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    SliderComponent,
    SlideDirective,
    MovieCardComponent,
    ReserveTicketButtonComponent,
    MovieGeneresPipe,
    FilterComponent,
    PaginationComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [UserService, AlertService, MovieService],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MovieCardComponent,
    ReserveTicketButtonComponent,
    SliderComponent,
    SlideDirective,
    CommonModule
  ]
})
export class SharedModule {}
