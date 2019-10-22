import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReserveTicketButtonComponent } from './components/reserve-ticket-button/reserve-ticket-button.component';
import { SliderComponent } from './components/slider/slider.component';
import { SlideDirective } from './components/slider/slide.directive';
import { SlideContentDirective } from './components/slider/slide-content.directive';

@NgModule({
  declarations: [
    SliderComponent,
    SlideDirective,
    SlideContentDirective,
    MovieCardComponent,
    ReserveTicketButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [UserService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MovieCardComponent,
    ReserveTicketButtonComponent,
    SliderComponent,
    SlideDirective
  ]
})
export class SharedModule {}
