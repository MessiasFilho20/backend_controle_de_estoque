import {IsString} from "class-validator"


export class metallurgDto{
    @IsString()
    situation: string

    @IsString()
    material: string

    @IsString()
    amount: number

    @IsString()
    condition: string

    @IsString()
    obs: string

    @IsString()
    reference: string
    
}
