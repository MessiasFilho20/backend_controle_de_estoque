import { IsString } from "class-validator";
import { orderDto } from "./order-dto";

export class orderAdminDTO extends orderDto{
    @IsString()
    userName: string

    @IsString()
    userCPF: string

}