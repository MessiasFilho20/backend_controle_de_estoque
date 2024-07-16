import { IsEmail, IsString } from "class-validator"

export class userDto{
    @IsString()
    nome: string

    @IsString()
    cpf: string

    @IsEmail()
    gmail: string 
    
    @IsString()
    password: string 

    @IsString()
    passwordconfirm: string
}
