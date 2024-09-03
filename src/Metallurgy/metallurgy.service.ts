import { Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { metallurgDto } from "./metallurgy-DTO/metallurg-dto";


export interface showmetallurgy{
     message: string, 
     status: boolean, 
     datas: any[]
}

export interface metallurgInterface extends showmetallurgy{
    data : metallurgDto | null, 
  
}

@Injectable()
export class metallurgyService{
    
    constructor(private readonly prismaservice: prismaService){}
    
    async createItemStoque( id :number, items: metallurgDto ): Promise <metallurgInterface> {
        console.log(items.descricao);
        
        if (items.descricao == '' || items.fornecedor == '' || items.quantidade < 0 || items.quantidade < 0){
            return {status: false, datas: null, data: null,  message: 'error ao preencher campos dos items'}
        }


        try {
            const item = await this.prismaservice.metalurgy.create({
                data:{
                    quanti_emerg: Number(items.quanti_emerg), 
                    quantidade: Number(items.quantidade), 
                    descricao: items.descricao, 
                    fornecedor: items.fornecedor, 
                    img: items.img, 
                    categoryID: id
                }
            })
            return {status: true, datas: null, data: item,  message: 'Item adicionado a categoria'}

        }catch(error){
            return {status: false, datas: null, data: null, message: `error ao adicionar Item ao estoque ${error}`}

        }
    }

    async updateStoque( id: number, items:any ): Promise <metallurgInterface> {
        try {
            const category = await this.prismaservice.category.findFirst({
                where: {id: id}
            })
            if (!category){
                return {status: false, datas: null, data: null, message: 'categoria Não encontrada'}
            }
            const ite = await this.prismaservice.metalurgy.findFirst({
                where:{id: items.id}
            })
            if (!ite){
                return {status: false, datas: null, data: null, message: 'item Não encontrado'}
            }

                const item = await this.prismaservice.metalurgy.update({
                    where: {id: id},
                    data:{
                        quanti_emerg: items.quanti_emerg, 
                        quantidade: items.quantidade, 
                        descricao: items.descricao, 
                        fornecedor: items.fornecedor, 
                        img: items.img, 
                        categoryID: id
                    }
        
                })
                return {status: true, datas: null, data: item, message: 'Item Atualizado no estoque'}
            } catch (error) {
                return {status: false, datas: null, data: null, message: `error ao Atualizar Item ao estoque ${error}`}
            }
    }

    async getAllStoque():Promise <showmetallurgy>{
        try {
            const items = await this.prismaservice.metalurgy.findMany()
            
            return {status: true, datas: items, message: 'todos os item do estoque'}
        } catch (error) {
            return {status: false, datas: null, message: `error ao buscar todo os items do estoque${error}`}
           
        }
       
    }

    async getOneStoque( id: number): Promise <metallurgInterface> {
        try {

            const ite = await this.prismaservice.metalurgy.findFirst({
                where:{id}
            })
            if (!ite){
                return {status: false, datas: null, data: null, message: 'item Não encontrado'}
            }

            const item = await this.prismaservice.metalurgy.findFirst({
                where: {id}
            })
            return {status: true, datas: null, data: item, message: 'ok'}
        } catch (error) {
            return {status: false, datas: null, data: null, message: `error ${error}`}
            
        }
    }

    async getAllById (id : number):Promise <showmetallurgy>{
        try {

            const ite = await this.prismaservice.metalurgy.findFirst({
                where:{categoryID: id}
            })
            if (!ite){
                return {status: false, datas: null, message: 'item Não encontrado'}
            }

            const item = await this.prismaservice.metalurgy.findMany({
                where: {categoryID: id}
            })
            return {status: true, datas: item, message: 'ok'}
        } catch (error) {
            return {status: false, datas: null, message: `error ${error}`}
            
        }
    }

}