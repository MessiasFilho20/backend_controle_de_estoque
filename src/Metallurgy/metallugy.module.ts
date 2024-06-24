import { Module } from "@nestjs/common";
import { metallurgyController } from "./metallurgy.controller";
import { metallurgyService } from "./metallurgy.service";
import { prismaModule } from "src/prisma/prisma.module";


@Module({
    controllers:[metallurgyController],
    providers:[metallurgyService], 
    exports:[metallurgyService],
    imports:[prismaModule]
})
export class metallurgyModule{}