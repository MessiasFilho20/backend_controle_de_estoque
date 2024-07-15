import { IsString } from "class-validator"

export class userDto{
    @IsString()
    nome: string

    @IsString()
    cpf: string

    @IsString()
    gmail: string 
    
    @IsString()
    password: string 

    @IsString()
    passwordconfirm: string
}
