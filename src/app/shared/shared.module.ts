import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [SliderComponent],
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
    SliderComponent
  ]
})
export class SharedModule {}
