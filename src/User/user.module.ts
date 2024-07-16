import { forwardRef, Module } from "@nestjs/common";
import { authModule } from "src/Auth/auth.module";
import { prismaModule } from "src/prisma/prisma.module";
import { userService } from "./user.service";
import { userController } from "./user.controller";

@Module({
    controllers: [userController], 
    exports: [userService], 
    imports: [forwardRef(() => (authModule)) ,prismaModule], 
    providers: [userService]
})
export class userModule{}