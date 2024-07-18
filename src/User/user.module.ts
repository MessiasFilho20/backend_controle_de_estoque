import { forwardRef, Module } from "@nestjs/common";
import { authModule } from "src/Auth/auth.module";

import { userService } from "./user.service";
import { userController } from "./user.controller";
import { prismaModule } from "src/prisma/prisma.module";

@Module({
    controllers: [userController], 
    exports: [userService], 
    imports: [ forwardRef(() =>prismaModule),
           forwardRef(() =>authModule)], 
    providers: [userService]
})
export class userModule{}