import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { categoryDto } from "./category-DTO/categry-DTO";
import { promises } from "dns";

export interface categoryInterface{
    status: boolean, 
    message: string, 
    data: categoryDto | null,
    datas: categoryDto[] | null
}


@Injectable()
export class categoryService {
    constructor(private readonly prismaService: prismaService){}

    async createCategory(category:categoryDto): Promise <categoryInterface>{
        try {
            const cate = await this.prismaService.category.create({
                data: {name: category.name}
            })      
            return {status: true, data: cate, datas: null,  message: 'categoria creiada com sucesso'}
        } catch (error) {
            return {status: false, data: null, datas: null, message: `error a criar categoria ${error}`}
        }    
    }
    async UpdateCategory(id: number, category: categoryDto): Promise<categoryInterface> {
        try {
            const cate = await this.prismaService.category.update({
                where: {id}, 
                data:{name: category.name}
            })
            return {status: true, data: cate, datas: null, message: 'categoria atualizada com sucesso'}

        } catch (error) {
            return {status: false, data: null, datas: null, message: `erro na atualização da categoria ${error}`}
        }
    }
    async DeleteCategory(id: number):  Promise<categoryInterface>{
        try {
            const cate = await this.prismaService.category.delete({
                where: {id}
            })
            return {status: true, data: cate, datas: null, message: 'categoria deletada com sucesso'}

        } catch (error) {
            return {status: false, data: null, datas: null, message: `error deletar categoria ${error}`}
            
        }
    }
    async ShowAllCategorys():Promise <categoryInterface>{
        try {
            const categorys = await this.prismaService.category.findMany() 
            return{status: true, data: null, datas: categorys, message: 'sucesso' }    
        } catch (error) {
            return {status: false, data: null, datas: null, message: `error ${error}`}
        }
    }
    async ShowCategory(id: number): Promise<categoryInterface>{
        try {
            const categorys = await this.prismaService.category.findFirst({
                where: {id}
            })
            if (!categorys) {return{status: false, data: null, datas: null, message: 'categoria não encontrada '}}
            
            
            return{status: true, data: categorys, datas: null, message: 'sucesso'}    
        } catch (error) {
            return {status: false, data: null, datas: null, message: `error ${error}`}
        }
    }
}