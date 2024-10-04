import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Res, UseGuards } from "@nestjs/common";
import { metallurgDto } from "./metallurgy-DTO/metallurg-dto";
import { metallurgyService } from "./metallurgy.service";
import { paramNumber } from "src/Decoretor/parm_number";
import { authGuard } from "src/guards/auth.guard";
import { rouleGuard } from "src/guards/roule.guard";
import { Roles } from "src/Decoretor/role.decorator";
import { role } from "src/enums/role.enum";

@Controller('metallurgy')
export class metallurgyController{
    constructor(private readonly metallurgyService: metallurgyService){}
    
    @UseGuards(authGuard, rouleGuard)
    @Roles(role.admin)
    @Post('create/:id')
    async createMetallurgy(@Body() item: metallurgDto, @paramNumber() id, @Res() res ){
      
        
        const {status,message, data} = await  this.metallurgyService.createItemStoque(id ,item)
        if (!status) {return res.status(HttpStatus.BAD_REQUEST).json({message: message})}
        return res.status(HttpStatus.OK).json({messege: message, data: data})
    }

    @UseGuards(authGuard, rouleGuard)
    @Roles(role.admin)
    @Put('update/:id')
    async uploadMetallurgy(@Body() item: any, @paramNumber() id, @Res() res ){
        const metall = await  this.metallurgyService.updateStoque(id, item)
        if (!metall.status) return res.status(HttpStatus.BAD_REQUEST).json({error: metall.message})
        return res.status(HttpStatus.OK).json({messege: metall.message, data: metall.data})
    }

    @Get('all')
    async getAllMetallury(@Res() res){
        const metall = await this.metallurgyService.getAllStoque()
        if (!metall.status) return res.status(HttpStatus.BAD_REQUEST).json({error: metall.message})
        return res.status(HttpStatus.OK).json({messege: metall.message, data: metall.datas})

    }   
    
    @Get('list/:id')
    async getAllMetalluryID(@paramNumber() id , @Res() res){
        const { status, datas, message } = await this.metallurgyService.getAllById(id)
        if (!status) return res.status(HttpStatus.BAD_REQUEST).json(message)
        return res.status(HttpStatus.OK).json(datas)

    } 

    @Get('show/:id')
    async getMetallury(@paramNumber() id, @Res() res){
        const {data,status,message} = await this.metallurgyService.getOneStoque(id)
        if (!status) return res.status(HttpStatus.BAD_REQUEST).json({error: message})
        return res.status(HttpStatus.OK).json(data)
    }

    @UseGuards(authGuard, rouleGuard)
    @Roles(role.admin)
    @Delete('delete/:id')
    async deleteItemMetallurgy(@paramNumber() id , @Res() res ){
       const {data,status,message} = await this.metallurgyService.deleteItemMellury(id)
       if (!status) return res.status(HttpStatus.BAD_REQUEST).json({error: message})
        return res.status(HttpStatus.OK).json(data)
        
    }    
}
