import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Request, Res, Response, UseGuards } from "@nestjs/common";
import { categoryDto } from "./category-DTO/categry-DTO";
import { categoryService } from "./category.service";
import { paramNumber } from "src/Decoretor/parm_number";
import { authGuard } from "src/guards/auth.guard";
import { rouleGuard } from "src/guards/roule.guard";
import { role } from "src/enums/role.enum";
import {Roles} from "src/Decoretor/role.decorator";

@Controller('category')
export class categoryController{
    
    constructor(private readonly categoryService: categoryService){}

    @UseGuards(authGuard, rouleGuard)
    @Roles(role.admin)
    @Post('create')
    async createCategory(@Body() category: categoryDto, @Response() res, ){
        const cat = await this.categoryService.createCategory(category)
    
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({message: cat.message})}
            
        return res.status(HttpStatus.OK).json({message: cat.message, data: cat.data})    
    }

    @Put('update/:id')
    async updatedCategory(@Body() category: categoryDto, @paramNumber() id, @Res() res ){
        const cat = await this.categoryService.UpdateCategory( id ,category)
    
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
        
        return res.status(HttpStatus.OK).json({message: cat.message, data: cat.data})    
    
    }

    @Get('all')
    async showAllcategorys(@Res() res, @Req() req ){
      
        const cat = await this.categoryService.ShowAllCategorys()
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
        return res.status(HttpStatus.OK).json(cat.datas)    
    }

    @Get('show/:id')
    async showcategory(@Res() res, @paramNumber() id ){
        const {status, data , message}= await this.categoryService.ShowCategory(id)
        if (!status) {return res.status(HttpStatus.BAD_REQUEST).json(message)}
        return res.status(HttpStatus.OK).json(data)    
    }

    @Delete('delete/:id')
    async deleteCategory(@Res() res, @paramNumber() id ){
          const {status, message, data}= await this.categoryService.DeleteCategory(id)
          if (!status) {return res.status(HttpStatus.BAD_REQUEST).json(message)}
          return res.status(HttpStatus.OK).json(data)   
    }
    

}