import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class userDto {
    @IsString()
    nome: string

    @IsString()
    cpf: string

    @IsEmail()
    gmail: string 
    
   
    @IsStrongPassword({
        minLength: 3, 
        minUppercase: 0 , 
        minSymbols: 0, 
        minLowercase:0,
        minNumbers:0
    })
    password: string 

   
    @IsStrongPassword({
        minLength: 3, 
        minUppercase: 0, 
        minSymbols: 0, 
        minLowercase:0,
        minNumbers: 0    
    })
    passwordconfirm: string
}
