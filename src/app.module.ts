import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { metallurgyModule } from './Metallurgy/metallugy.module';

@Module({
  imports: [metallurgyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
