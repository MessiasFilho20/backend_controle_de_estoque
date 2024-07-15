import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { metallurgyModule } from './Metallurgy/metallugy.module';
import { categoryModule } from './Category/category.module';
import { prismaModule } from './prisma/prisma.module';
import { userModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { authModule } from './Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    metallurgyModule,
     categoryModule,
     prismaModule,
      userModule,
      authModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
