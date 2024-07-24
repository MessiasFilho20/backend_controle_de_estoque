import { IsEmail, IsSemVer, IsString, IsStrongPassword } from "class-validator";

export class loginDTO {
    @IsEmail() 
    data: string 

    @IsStrongPassword({
        minLength: 3, 
        minUppercase: 0 , 
        minSymbols: 0, 
        minLowercase:0,
        minNumbers:0
    })
    password: string

}