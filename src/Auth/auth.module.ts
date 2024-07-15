import { forwardRef, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { prismaModule } from "src/prisma/prisma.module";
import { userModule } from "src/User/user.module";
import { authService } from "./auth.service";

@Module({
    controllers: [], 
    exports: [authService], 
    imports: [JwtModule.register({secret: process.env.pass}), 
        prismaModule, 
       forwardRef(() => userModule)
    ], 
    providers: [authService]
})
export class authModule{

}