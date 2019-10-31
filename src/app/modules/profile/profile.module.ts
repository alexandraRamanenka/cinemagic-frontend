import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SharedModule } from '@shared/index';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { httpInterceptorProviders } from '@shared/interceptors';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [SharedModule, ProfileRoutingModule],
  providers: [ProfileService, httpInterceptorProviders]
})
export class ProfileModule {}
