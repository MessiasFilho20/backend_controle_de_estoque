import { Module } from "@nestjs/common";
import { categoryController } from "./category.controller";
import { categoryService } from "./category.service";
import { prismaModule } from "src/prisma/prisma.module";

@Module({
    controllers:[categoryController], 
    exports:[categoryService], 
    imports:[prismaModule],
    providers:[categoryService],
})
export class categoryModule{
    
}