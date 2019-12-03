import { UserService } from '@shared/services/user.service';
import { FilteringService } from '@shared/services/filtering.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { CounterComponent } from './components/counter/counter.component';
import { TimerComponent } from './components/timer/timer.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NoContentComponent } from './components/no-content/no-content.component';
import { FilterPipe } from './pipes/filter.pipe';

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
    PhonePipe,
    CounterComponent,
    TimerComponent,
    DropdownComponent,
    NoContentComponent,
    FilterPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [FilteringService],
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
    MovieGenresPipe,
    CounterComponent,
    TimerComponent,
    DropdownComponent,
    NoContentComponent,
    FilterPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [AlertService, UserService]
    };
  }
}
