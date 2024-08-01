import { Module } from "@nestjs/common";
import { emailService } from "./email.service";

@Module({
    exports:[emailService],
    providers:[emailService]
})
export class emailModule{}