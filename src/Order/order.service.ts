import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { categoryService } from "src/Category/category.service";
import { metallurgyService } from "src/Metallurgy/metallurgy.service";
import { prismaService } from "src/prisma/prisma.service";

import { orderDto } from "./oreder-DTO/order-dto";
import { userDto } from "src/User/userDTO/user-DTO";
import { orderAdminDTO } from "./oreder-DTO/orderadmin-dto";

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
        private readonly category: categoryService
    ) { }

    async createOreder(user , order: orderDto): Promise<orderInterface> {
        try {

            const metallugy = await this.metallurgy.getOneStoque(order.itemID)
            const category = await this.category.ShowCategory(order.categoryID)

            const { quantidade } = metallugy.data
            if (quantidade == 0){
                return {status: false, data: null , datas: null, messege: 'Não há Items no estoque para ser retirado'}
            }


            let rest = quantidade - order.unidade

            if (rest < 0 ) return {status: false, data: null , datas: null, messege: 'A quantidade que está retirando é maior que a quantidade em estoque'}
            
            await this.prisma.metalurgy.update({
                where: { id: order.itemID },
                data: { quantidade: rest }
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
                    quantidade: rest,
                    userCpf: user.cpf,
                    role: user.role
                }
            })

            return { status: true, data: null, datas: null, messege: 'retirada feira com sucesso' }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ao fazer retirada ${error}` }
        }
    }

    async createOrderByAdmin(user,  order: orderAdminDTO): Promise<orderInterface> {
        try {
            const metallugy = await this.metallurgy.getOneStoque(order.itemID)
            const category = await this.category.ShowCategory(order.categoryID)

            const { quantidade } = metallugy.data
            if (quantidade == 0){
                return {status: false, data: null , datas: null, messege: 'Não há Items no estoque para ser retirado'}
            }


            let rest = quantidade - order.unidade

            await this.prisma.metalurgy.update({
                where: { id: order.itemID },
                data: { quantidade: rest }
            })

            await this.prisma.oreder.create({
                data: {
                    category_description: category.data.description,
                    category_name: category.data.name,
                    item_descricao: metallugy.data.descricao,
                    item_fornecedor: metallugy.data.fornecedor,
                    itemID: order.itemID,
                    unidade: order.unidade,
                    userName: order.userName,
                    quantidade: rest,
                    userCpf: order.userCPF,
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
                orderBy: {created_at: 'desc'}
            })
            return { status: true, data: null, datas: orders, messege: "ordems encontradas" }
        } catch (error) {
            return { status: false, data: null, datas: null, messege: `error ordem não encontrada ${error}` }
        }
    }
}