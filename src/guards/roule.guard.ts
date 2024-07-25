import { CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Response } from 'express';
import { role } from "src/enums/role.enum";

@Injectable()
export class rouleGuard implements CanActivate{

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext){
        const reqRole = this.reflector.getAllAndOverride<role[]>('role',[context.getHandler(), context.getClass()])
        const response = context.switchToHttp().getResponse<Response>()
       
        try {
            if (!reqRole){
                return true
            }
            const {user} = context.switchToHttp().getRequest()
            
            const rolefiltered = reqRole.filter(roles => user.role == roles)
            
            if(rolefiltered[0] === 'users') return true
            if(rolefiltered[0] === 'admin') return true
            return false
        }catch(error){
            response.status(HttpStatus.BAD_REQUEST).json({ message: 'Erro no acesso por roles' });
            return false
        } 

    }
}