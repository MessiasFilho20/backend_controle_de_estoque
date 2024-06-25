import { Module, forwardRef } from "@nestjs/common";
import { metallurgyController } from "./metallurgy.controller";
import { metallurgyService } from "./metallurgy.service";
import { prismaModule } from "src/prisma/prisma.module";
import { categoryService } from "src/Category/category.service";
import { categoryModule } from "src/Category/category.module";


@Module({
    controllers:[metallurgyController],
    providers:[metallurgyService], 
    exports:[metallurgyService],
    imports:[prismaModule, forwardRef(() => (categoryModule))]
})
export class metallurgyModule{}