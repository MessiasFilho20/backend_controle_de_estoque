import { IsSemVer, IsString, IsStrongPassword } from "class-validator";

export class loginDTO {
    @IsString() 
    data: string 

    @IsStrongPassword({
        minLength: 3
    })
    password: string

}