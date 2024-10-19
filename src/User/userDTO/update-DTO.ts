import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class userUpdate {

    @IsString()
    nome: string

    @IsString()
    cpf: string

    @IsEmail()
    gmail: string 

    @IsString()
    role: string

    @IsStrongPassword(
        {
            minLength: 8, 
            minUppercase: 1 , 
            minSymbols: 1, 
            minLowercase:0,
            minNumbers:1
        }
    )
    password: string

}