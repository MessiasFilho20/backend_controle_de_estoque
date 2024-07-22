import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { categoryDto } from "src/Category/category-DTO/categry-DTO";
import { orederService } from "./order.service";
import { authGuard } from "src/guards/auth.guard";
import { orderDto } from "./oreder-DTO/order-dto";
import { userDto } from "src/User/userDTO/user-DTO";

@UseGuards(authGuard)
@Controller('order')
export class orederController {
    constructor(private readonly orderservice: orederService){}

    @Post('create')
    async createOreder(@Body() order: orderDto, @Request() req){
         
        const orderall = await this.orderservice.createOreder(req.user, order)
        return orderall
    }

          

}