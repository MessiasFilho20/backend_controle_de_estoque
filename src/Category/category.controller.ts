import { Body, Controller, Get, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { categoryDto } from "./category-DTO/categry-DTO";
import { categoryService } from "./category.service";
import { paramNumber } from "src/Decoretor/parm_number";

@Controller('category')
export class categoryController{
    
    constructor(private readonly categoryService: categoryService){}

    @Post('create')
    async createCategory(@Body() category: categoryDto, @Res() res){
        const cat = await this.categoryService.createCategory(category)
    
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
            
        return res.status(HttpStatus.OK).json({message: cat.message, data: cat.data})    
    }

    @Put('update/:id')
    async updatedCategory(@Body() category: categoryDto, @paramNumber() id, @Res() res ){
        const cat = await this.categoryService.UpdateCategory( id ,category)
    
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
        
        return res.status(HttpStatus.OK).json({message: cat.message, data: cat.data})    
    
    }

    @Get('all')
    async showAllcategorys(@Res() res){
        const cat = await this.categoryService.ShowAllCategorys()
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
        return res.status(HttpStatus.OK).json({message: cat.message, datas: cat.datas})    
    }

    @Get('show/:id')
    async showcategory(@Res() res, @paramNumber() id ){
        const cat = await this.categoryService.ShowCategory(id)
        if (!cat.status) {return res.status(HttpStatus.BAD_REQUEST).json({error: cat.message})}
        return res.status(HttpStatus.OK).json({message: cat.message, data: cat.data})    
    }
}