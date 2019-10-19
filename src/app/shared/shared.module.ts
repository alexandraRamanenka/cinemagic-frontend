import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { ReserveTicketButtonComponent } from './components/reserve-ticket-button/reserve-ticket-button.component';

@NgModule({
  declarations: [MovieCardComponent, ReserveTicketButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [UserService],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    MovieCardComponent,
    ReserveTicketButtonComponent
  ]
})
export class SharedModule {}
