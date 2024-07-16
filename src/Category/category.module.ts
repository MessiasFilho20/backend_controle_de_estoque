import { forwardRef, Module } from "@nestjs/common";
import { categoryController } from "./category.controller";
import { categoryService } from "./category.service";
import { prismaModule } from "src/prisma/prisma.module";
import { authModule } from "src/Auth/auth.module";
import { userModule } from "src/User/user.module";

@Module({
    controllers:[categoryController], 
    exports:[categoryService], 
    imports:[prismaModule, 
         forwardRef(() =>(authModule)),
         forwardRef(() =>(userModule))
        ],
    providers:[categoryService],
})
export class categoryModule{
    
}