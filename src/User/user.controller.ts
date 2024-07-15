import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { userService } from "./user.service";
import { userDto } from "./userDTO/user-DTO";
import { loginDTO } from "./userDTO/auth-login-DTO";

@Controller('user')
export class userController {
    constructor (private readonly userService:userService){}


    @Post('login')
    async loginUser(@Body()user: loginDTO, @Res() res  ){
        const {message,status,token} = await this.userService.loginUser(user)
        if (!status){return res.status(HttpStatus.BAD_REQUEST).json(message)}
            return res.status(HttpStatus.OK).json(token)
        }
    
        @Post('create')
        async createUser(@Body()user: userDto, @Res() res  ){
            const {message,status,token} = await this.userService.createUser(user)
            if (!status){return res.status(HttpStatus.BAD_REQUEST).json(message)}
                return res.status(HttpStatus.OK).json(token)
            }
    

    }