import { IsEmail, IsSemVer, IsString, IsStrongPassword } from "class-validator";

export class loginDTO {
    @IsString() 
    data: string 

    @IsStrongPassword({
        minLength: 8, 
        minUppercase: 1 , 
        minSymbols: 1, 
        minLowercase:0,
        minNumbers:1
    })
    password: string

}