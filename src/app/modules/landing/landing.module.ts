import { SharedModule } from '@shared/index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, SharedModule]
})
export class LandingModule {}
