import {IsNumber, IsString} from "class-validator"


export class metallurgDto{
    @IsString()
    quantidade: number

    @IsString()
    quanti_emerg: number


    @IsString()
    img: string

    @IsString()
    fornecedor: string

    @IsNumber() 
    descricao: string

    
}
 