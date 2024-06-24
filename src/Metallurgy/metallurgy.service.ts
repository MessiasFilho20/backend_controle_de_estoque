import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { metallurgDto } from "./metallurgy-DTO/metallurg-dto";


export interface metallurgInterface{
    data : metallurgDto | null, 
    status: boolean, 
    message: string, 
    datas: metallurgDto[] | null
}

@Injectable()
export class metallurgyService{
    constructor(private readonly prismaservice: prismaService){}
    
    async createStoque( items: metallurgDto ): Promise <metallurgInterface> {
        try {
            const item = await this.prismaservice.metalurgy.create({
                data:{
                    amount: items.amount, 
                    condition: items.condition, 
                    material: items.material, 
                    obs: items.obs, 
                    situation: items.situation, 
                    reference: items.reference
                }
    
            })
            return {status: true, datas: null, data: item, message: 'Item adicionado ao estoque'}

        }catch(error){
            return {status: false, datas: null, data: null, message: `error ao adicionar Item ao estoque ${error}`}

        }
    }

    async updateStoque( id: number, items: metallurgDto ): Promise <metallurgInterface> {
        try {
            const item = await this.prismaservice.metalurgy.update({
                where: {id},
                data:{
                    amount: items.amount, 
                    condition: items.condition, 
                    material: items.material, 
                    obs: items.obs, 
                    situation: items.situation, 
                    reference: items.reference
                }
    
            })
            return {status: true, datas: null, data: item, message: 'Item Atualizado no estoque'}
        } catch (error) {
            return {status: false, datas: null, data: null, message: `error ao Atualizar Item ao estoque ${error}`}
        }
    }

    async getAllStoque( ):Promise <metallurgInterface>{
        try {
            const items = this.prismaservice.metalurgy.findMany()
            const filterItems: metallurgDto[] = (await items).map(item =>{
                const { created_at, updated_at, ...rest } = item;
                return rest as metallurgDto
            })
            return {status: true, data: null, datas: filterItems, message: 'todos os item do estoque'}
        } catch (error) {
            return {status: false, data: null, datas: null, message: `error ao buscar todo os items do estoque${error}`}
           
        }
       
    }

    async getOneStoque( id: number): Promise <metallurgInterface> {
        try {
            const item = await this.prismaservice.metalurgy.findFirst({
                where: {id}
            })
            return {status: true, datas: null, data: item, message: 'ok'}
        } catch (error) {
            return {status: false, datas: null, data: null, message: `error ${error}`}
            
        }
    }

}