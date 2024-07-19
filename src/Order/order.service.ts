import { forwardRef, Inject, Injectable, Logger } from "@nestjs/common";
import { categoryService } from "src/Category/category.service";
import { metallurgyService } from "src/Metallurgy/metallurgy.service";
import { prismaService } from "src/prisma/prisma.service";

import { orderDto } from "./oreder-DTO/order-dto";
import { userDto } from "src/User/userDTO/user-DTO";

Injectable()
export class orederService {
    constructor(
               
                @Inject(forwardRef(() => prismaService))
                private readonly prisma: prismaService,
                private readonly metallurgy: metallurgyService, 
                private readonly category: categoryService    
    ){ }

    async createOreder(user: userDto, order: orderDto){
        try {  
           
            const metallugy = await this.metallurgy.getOneStoque(order.itemID)
            const category = await this.category.ShowCategory(order.categoryID)
         
          const {quantidade} = metallugy.data
        
          let rest = quantidade - order.unidade

         await this.prisma.metalurgy.update({
            where: {id: order.itemID},
            data: {quantidade: rest}
         })
         
        const ordercreated =  await this.prisma.oreder.create({
            data:{
                category_description: category.data.description,
                category_name: category.data.name, 
                item_descricao: metallugy.data.descricao,
                item_fornecedor: metallugy.data.fornecedor,
                itemID: order.itemID,
                unidade: order.unidade, 
                userName: user.nome, 
                quantidade: rest,
                userCpf: user.cpf 
            }
         })

         return ordercreated
        } catch (error) {
            console.log(error);
            
        }

    }

}