import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SharedModule } from '@shared/index';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, SharedModule]
})
export class LandingModule {}
