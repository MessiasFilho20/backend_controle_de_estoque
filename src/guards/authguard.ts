import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { authService } from "src/Auth/auth.service";
import { userService } from "src/User/user.service";



@Injectable()
export class authGuard implements CanActivate{
    constructor(
                @Inject(forwardRef(() => authService))
                private readonly authserv: authService, 
                private readonly userserv: userService
     ){}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const {authorization} = request.headers
        try {
            const data = this.authserv.checkToken((authorization ?? '').split(' ')[1])
            request.tokenPayload = data
            request.user = await this.userserv.getUserById(data.id)
            return true
        } catch (error) {
            return false    
        }
        
    }
}