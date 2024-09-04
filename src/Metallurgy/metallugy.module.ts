import { Module, forwardRef } from "@nestjs/common";
import { metallurgyController } from "./metallurgy.controller";
import { metallurgyService } from "./metallurgy.service";
import { prismaModule } from "src/prisma/prisma.module";
import { categoryModule } from "src/Category/category.module";
import { authModule } from "src/Auth/auth.module";
import { userModule } from "src/User/user.module";


@Module({
    controllers:[metallurgyController],
    providers:[metallurgyService], 
    exports:[metallurgyService],
    imports:[
        forwardRef(() => (prismaModule)),
        forwardRef(() => (categoryModule)),
        forwardRef(() => (authModule)),
        forwardRef(() => (userModule))
    ]
})
export class metallurgyModule{}