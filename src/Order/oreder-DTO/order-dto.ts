import { IsNumber } from "class-validator";

export class orderDto {
    @IsNumber()
    categoryID: number 
    
    @IsNumber()
    itemID: number 

    @IsNumber()
    unidade: number
}