import { Body, Controller, Get, HttpStatus, Post, Request, Res, Response, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { userDto } from "./userDTO/user-DTO";
import { loginDTO } from "./userDTO/auth-login-DTO";
import { authGuard } from "src/guards/auth.guard";
import { paramNumber } from "src/Decoretor/parm_number";

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
    async createUser(@Body() user: userDto , @Res() res  ){

        const {message,status,token} = await this.userService.createUser(user)
        if (!status){return res.status(HttpStatus.BAD_REQUEST).json(message)}
            return res.status(HttpStatus.OK).json(token)
        }
    
    @UseGuards(authGuard)
    @Get('getuser')
    async getuser(@Request() req,){
        const {data} = await this.userService.getUserById(req.user.id)
        
        return {data}
    }

    @Get('get/:id')
    async getUserById(@paramNumber() id: number){
        const {data} = await this.userService.getUserById(id)
        
        return {data}
    }

    @Get('all')
    async getAllUsers(){
        const {datas} = await this.userService.getAllUsers()
        return {datas}
    }

    }