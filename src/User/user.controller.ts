import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Request, Res, Response, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { userDto } from "./userDTO/user-DTO";
import { loginDTO } from "./userDTO/auth-login-DTO";
import { authGuard } from "src/guards/auth.guard";
import { paramNumber } from "src/Decoretor/parm_number";
import { response } from "express";
import { userUpdate } from "./userDTO/update-DTO";
import { rouleGuard } from "src/guards/roule.guard";
import { Roles } from "src/Decoretor/role.decorator";
import { role } from "src/enums/role.enum";

@Controller('user')
export class userController {
    constructor (private readonly userService:userService){}

    @Post('login')
    async loginUser(@Body()user: loginDTO, @Res() res  ){
            console.log(user);
            
        const {message,status,token} = await this.userService.loginUser(user)
        if (!status){return res.status(HttpStatus.BAD_REQUEST).json({message: message})}
        return res.status(HttpStatus.OK).json(token)
        }
    
    @Post('create')
    async createUser(@Body() user: userDto , @Res() res  ){

        const {message,status,token} = await this.userService.createUser(user)
        if (!status){return res.status(HttpStatus.BAD_REQUEST).json({message: message})}
            return res.status(HttpStatus.OK).json(token)
        }
    
    
    @UseGuards(authGuard, rouleGuard)
    @Roles(role.admin)
    @Put('update/:id')
    async updateUser(@Body() user: userUpdate, @paramNumber() id , @Res() res){
        const {status, data, message} = await this.userService.updateUser(user, id)
        if (!status){
            return res.status(HttpStatus.BAD_REQUEST).json({message:message})
        }
        return res.status(HttpStatus.OK).json({data: data})
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

    @Delete('delete/:id')
    async deleteUserId(@paramNumber() id: number){
        const {data, status, message} = await this.userService.DeleteUserById(id)
        if (!status) return response.status(HttpStatus.BAD_REQUEST).json({message:message})
        return {data}         
        }   

    }