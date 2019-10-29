import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';

import { AfishaRoutingModule } from './afisha-routing.module';
import { AfishaPageComponent } from './components/afisha-page/afisha-page.component';

@NgModule({
  declarations: [AfishaPageComponent],
  imports: [AfishaRoutingModule, SharedModule]
})
export class AfishaModule {}
