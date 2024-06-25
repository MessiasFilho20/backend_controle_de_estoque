import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { metallurgyModule } from './Metallurgy/metallugy.module';
import { categoryModule } from './Category/category.module';
import { prismaModule } from './prisma/prisma.module';

@Module({
  imports: [metallurgyModule, categoryModule, prismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
