import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class authService {
    constructor(private readonly jwtservice:JwtService){}
    
    createToken(user: User){
        return {
             acessToken: this.jwtservice.sign({
                id: user.id, 
                name: user.nome, 
                email: user.gmail
             },{

                expiresIn: '7 days', 
                subject: String(user.id), 
                audience: 'users'
             })
        }}

    checkToken(token: string){
        try {
            const data = this.jwtservice.verify( token,{
                audience: 'user', 
                issuer: 'login'
            })
            return data 
        }catch(e){
            throw new BadRequestException(e)
        }
    }
}