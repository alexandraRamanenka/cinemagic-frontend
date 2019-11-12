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
import { MovieGenresPipe } from './pipes/movie-genres.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SessionPreviewComponent } from './components/session-preview/session-preview.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [
    SliderComponent,
    SlideDirective,
    MovieCardComponent,
    ReserveTicketButtonComponent,
    MovieGenresPipe,
    PaginationComponent,
    SessionPreviewComponent,
    LoadingSpinnerComponent,
    PhonePipe
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [AlertService],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MovieCardComponent,
    ReserveTicketButtonComponent,
    SliderComponent,
    SlideDirective,
    CommonModule,
    PaginationComponent,
    SessionPreviewComponent,
    LoadingSpinnerComponent,
    PhonePipe,
    MovieGenresPipe
  ]
})
export class SharedModule {}
