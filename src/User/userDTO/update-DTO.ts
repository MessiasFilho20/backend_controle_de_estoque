import { IsEmail, IsString } from "class-validator"

export class userUpdate {

    @IsString()
    nome: string

    @IsString()
    cpf: string

    @IsEmail()
    gmail: string 

    @IsString()
    role: string

}