import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { metallurgyModule } from './Metallurgy/metallugy.module';
import { categoryModule } from './Category/category.module';
import { prismaModule } from './prisma/prisma.module';
import { userModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { authModule } from './Auth/auth.module';

import { orderModule } from './Order/oreder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    metallurgyModule,
     categoryModule,
      forwardRef(()=>prismaModule),
      userModule,
      authModule, 
      orderModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
