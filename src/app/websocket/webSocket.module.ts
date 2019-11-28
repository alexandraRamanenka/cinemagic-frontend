import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { config } from './webSocket.config';
import { WebSocketConfig } from './webSocketConfig';
import { WebSocketService } from './webSocket.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [WebSocketService]
})
export class WebSocketModule {
  static config(wsConfig: WebSocketConfig): ModuleWithProviders {
    return {
      ngModule: WebSocketModule,
      providers: [{ provide: config, useValue: wsConfig }]
    };
  }
}
