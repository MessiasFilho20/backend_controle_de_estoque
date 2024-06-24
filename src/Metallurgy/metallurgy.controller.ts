import { Body, Controller, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { metallurgDto } from "./metallurgy-DTO/metallurg-dto";
import { metallurgyService } from "./metallurgy.service";
import { paramNumber } from "src/Decoretor/parm_number";

@Controller('metallurgy')
export class metallurgyController{
    constructor(private readonly metallurgyService: metallurgyService){}

    @Post('create')
    async createMetallurgy(@Body() item: metallurgDto, @Res() res){
       
        const metall = await  this.metallurgyService.createStoque(item)
        if (!metall.status) return res.status(HttpStatus.BAD_REQUEST).json({error: metall.message})
        return res.status(HttpStatus.OK).json({messege: metall.message, data: metall.data})
    }

    @Put('update/:id')
    async uploadMetallurgy(@Body() item: metallurgDto, @paramNumber() id, @Res() res ){
        
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

    @Get('show/:id')
    async getMetallury(@paramNumber() id, @Res() res){
        const metall = await this.metallurgyService.getOneStoque(id)
        if (!metall.status) return res.status(HttpStatus.BAD_REQUEST).json({error: metall.message})
        return res.status(HttpStatus.OK).json({messege: metall.message, data: metall.data})
    }
    
}
