import { forwardRef, Module } from "@nestjs/common";
import { orederController } from "./oreder.controller";
import { orederService } from "./order.service";
import { prismaModule } from "src/prisma/prisma.module";
import { userModule } from "src/User/user.module";
import { authModule } from "src/Auth/auth.module";
import { metallurgyModule } from "src/Metallurgy/metallugy.module";
import { categoryModule } from "src/Category/category.module";
import { emailModule } from "src/email/email.module";


@Module({
    controllers: [orederController], 
     exports: [orederService],
     imports:[
         emailModule,
         prismaModule,
         userModule,
         authModule,
         forwardRef(()=> metallurgyModule),
         forwardRef(()=> categoryModule),
        ], 
     providers:[orederService]
})
export class orderModule{

}