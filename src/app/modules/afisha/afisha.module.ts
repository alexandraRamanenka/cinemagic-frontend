import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfishaRoutingModule } from './afisha-routing.module';
import { AfishaPageComponent } from './components/afisha-page/afisha-page.component';


@NgModule({
  declarations: [AfishaPageComponent],
  imports: [
    CommonModule,
    AfishaRoutingModule
  ]
})
export class AfishaModule { }
