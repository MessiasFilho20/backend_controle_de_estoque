import {IsNumber, IsString} from "class-validator"


export class metallurgDto{
    @IsString()
    situation: string

    @IsString()
    material: string

    @IsNumber()
    amount: number

    @IsString()
    condition: string

    @IsString()
    obs: string

    @IsString()
    reference: string

    @IsNumber() 
    categoryID: number
    
}
