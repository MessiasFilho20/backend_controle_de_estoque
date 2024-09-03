import {IsNumber, IsString} from "class-validator"


export class metallurgDto{
    
    @IsNumber()
    quantidade: number
    
    @IsNumber()
    quanti_emerg: number

    @IsString()
    img: string

    @IsString()
    fornecedor: string

    @IsString() 
    descricao: string
    
}
 