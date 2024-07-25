import { Body, Controller, Get, HttpStatus, Post, Put, Request, UseGuards } from "@nestjs/common";
import { orederService } from "./order.service";
import { authGuard } from "src/guards/auth.guard";
import { orderDto } from "./oreder-DTO/order-dto";
import { rouleGuard } from "src/guards/roule.guard";
import { Roles } from "src/Decoretor/role.decorator";
import { role } from "src/enums/role.enum";
import { response } from "express";
import { orderAdminDTO } from "./oreder-DTO/orderadmin-dto";

@UseGuards(authGuard, rouleGuard)
@Controller('order')
export class orederController {
    constructor(private readonly orderservice: orederService){}

    @Roles(role.admin, role.user)
    @Post('create')
    async createOreder(@Body() order: orderDto, @Request() req){     
        const orderall = await this.orderservice.createOreder(req.user, order)
        return orderall
    }

    @Roles(role.admin)
    @Post('create-admin')
    async createOrederAdmin(@Body() order: orderAdminDTO , @Request() req){     
        const orderall = await this.orderservice.createOrderByAdmin(req.user, order)
        return orderall
    }

    @Roles(role.admin)
    @Put('update/:id')
    async updateOrder (){}

    
    @Roles(role.admin)
    @Get('all')
    async getAllOrder ( ){
        const {datas,messege,status} = await this.orderservice.getAllOrders()
        if (!status) return response.status(HttpStatus.BAD_REQUEST).json(messege)
        return {datas}
    }

    @Get('/:id')
    async getOneOrderById(){
        return {id: "oi"}
    }

}