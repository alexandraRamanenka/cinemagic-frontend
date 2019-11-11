import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { SharedModule } from '@shared/index';
import { ProfileRoutingModule } from './profile-routing.module';
import { httpInterceptorProviders } from '@shared/interceptors';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';

@NgModule({
  declarations: [ProfilePageComponent, SettingsFormComponent],
  imports: [SharedModule, ProfileRoutingModule],
  providers: [httpInterceptorProviders]
})
export class ProfileModule {}
