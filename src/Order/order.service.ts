import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { categoryService } from "src/Category/category.service";
import { metallurgyService } from "src/Metallurgy/metallurgy.service";
import { prismaService } from "src/prisma/prisma.service";

import { orderDto } from "./oreder-DTO/order-dto";

import { orderAdminDTO } from "./oreder-DTO/orderadmin-dto";
import { emailService } from "src/email/email.service";

export interface orderInterface {
    status: boolean,
    data: any | null,
    datas: any[] | null
    messege: string
}

Injectable()
export class orederService {
    constructor(

        @Inject(forwardRef(() => prismaService))
        private readonly prisma: prismaService,
        private readonly metallurgy: metallurgyService,
        private readonly category: categoryService,
        private readonly emailservice: emailService 
    ) { }

    async createOreder(user , order: orderDto): Promise<orderInterface> {
        try {
            
            const metallugy = await this.metallurgy.getOneStoque(order.itemID)
            const category = await this.category.ShowCategory(order.categoryID)

           
            
            const { quantidade, descricao, tamanho } = metallugy.data

           
            

            if (quantidade <= 0){
                return {status: false, data: null , datas: null, messege: 'Não há Items no estoque para ser retirado'}
            }
            
            const  {novaQuantidade , novoTotal}= await this.calcRestante(quantidade, tamanho, order.unidade, order.tamanho)
            
            
            if (novaQuantidade < 0 ) return {status: false, data: null , datas: null, messege: 'A quantidade que está retirando é maior que a quantidade em estoque'}
            
           
            
            await this.prisma.metalurgy.update({
                where: { id: order.itemID },
                data: { quantidade: novaQuantidade }
            })


            const ord = await this.prisma.oreder.create({
                data: {
                    category_description: category.data.description,
                    category_name: category.data.name,
                    item_descricao: descricao,
                    item_fornecedor: metallugy.data.fornecedor,
                    itemID: order.itemID,
                    unidade: order.unidade,
                    userName: user.nome,
                    quantidade: novaQuantidade,
                    userCpf: user.cpf,
                    role: user.role, 
                    tamanho: order.tamanho, 
                    tamanho_total: novoTotal
                }
            })
          
            
           
            return { status: true, data: null, datas: null, messege: 'retirada feira com sucesso' }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ao fazer retirada ${error}` }
        }
    }

    async calcRestante(quantidade : number, tamanho: number, QR: number, TR:number ) {

        
        let  total = quantidade * tamanho 
        
        if (QR > 0 ){
            quantidade -= QR
            total = quantidade * tamanho
            
        }
        if (TR > 0 ){
            const quantidadeRemovida = TR / tamanho;
            quantidade -= quantidadeRemovida;
            total = quantidade * tamanho;
            
          
            

        }
        
        return {
            novaQuantidade: quantidade,
            novoTotal: total
    
        }
    }

    async createOrderByAdmin(user,  order: orderAdminDTO): Promise<orderInterface> {
        try {
            const metallugy = await this.metallurgy.getOneStoque(order.itemID)
            const category = await this.category.ShowCategory(order.categoryID)

            const { quantidade, descricao, tamanho } = metallugy.data

          
           
            if (quantidade <= 0){
                return {status: false, data: null , datas: null, messege: 'Não há Items no estoque para ser retirado'}
            }

            const  {novaQuantidade , novoTotal}= await this.calcRestante(quantidade, tamanho, order.unidade, order.tamanho)
           
           
            if (novaQuantidade <= 0){
                return {status: false, data: null , datas: null, messege: 'Não há Items no estoque para ser retirado'}
            }


            await this.prisma.metalurgy.update({
                where: { id: order.itemID },
                data: { quantidade: novaQuantidade }
            })

            await this.prisma.oreder.create({
                data: {
                    category_description: category.data.description,
                    category_name: category.data.name,
                    item_descricao: metallugy.data.descricao,
                    item_fornecedor: metallugy.data.fornecedor,
                    itemID: order.itemID,
                    unidade: order.unidade,
                    userName: user.nome,
                    quantidade: novaQuantidade,
                    tamanho: tamanho, 
                    tamanho_total: novoTotal, 
                    userCpf: user.cpf,
                    role: user.role
                }
            })

            return { status: true, data: null, datas: null, messege: 'retirada feira com sucesso' }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ao fazer retirada ${error}` }
        }
    }

    async updadateOrder() {

    }

    async getOrderByID(id: number): Promise<orderInterface> {
        try {
            const order = await this.prisma.oreder.findFirst({
                where: { id }
            })
            return { status: true, data: order, datas: null, messege: "ordem encontrada" }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ordem não encontrada ${error}` }
        }
    }

    async getAllOrders(): Promise<orderInterface> {
        try {
            const orders = await this.prisma.oreder.findMany({
                orderBy: {created_at: 'desc'}, 

            })

            const format = orders.map(order =>({
                ...order, 
                quantidade: Math.round(order.quantidade), 
                tamanho_total: parseFloat(order.tamanho_total.toFixed(3))
            }) )
           

            return { status: true, data: null, datas: format, messege: "ordems encontradas" }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ordem não encontrada ${error}` }
        }
    }
}