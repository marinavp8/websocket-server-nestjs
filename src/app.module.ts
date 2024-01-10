import { Module } from '@nestjs/common';
import { GatewayModule } from './websockets/websocket.module';

@Module({
  imports: [GatewayModule],

})
export class AppModule { }
