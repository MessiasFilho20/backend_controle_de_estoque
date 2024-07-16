import { BadRequestException, Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { userDto } from "./userDTO/user-DTO";
import { loginDTO } from "./userDTO/auth-login-DTO";
import { authService } from "src/Auth/auth.service";
import * as bcrypt from 'bcrypt';

export interface userInterface {
    data: {} | null, 
    message: string, 
    status: boolean, 
    datas : [] | null
}
export interface usertoken extends userInterface{
    token: string
}

@Injectable()
export class userService {
    constructor(private readonly prismaservice: prismaService, 
                private readonly authservice: authService
    ){}

    async createUser(user: userDto): Promise <usertoken>{
        const salt = await bcrypt.genSalt()
        
        if (user.password  != user.passwordconfirm){
            return {status: false, data: null, datas: null, message: 'senhas diferentes', token: ''}
        }
      
        
        try{

            const cpf = await this.prismaservice.user.findFirst({
                where: {cpf: user.cpf}
            })

            const email = await this.prismaservice.user.findFirst({
                where: {gmail: user.cpf}
            })

            if (cpf) return {status: false, data: null,datas: null,message: 'CPF já cadastrado', token:''}
            if (email) return {status: false, data: null,datas: null,message: 'Email já cadastrado', token:''}

            user.password = await bcrypt.hash(user.password, salt)
             const usercreate = await this.prismaservice.user.create({
                data: {
                    cpf: user.cpf, 
                    gmail: user.gmail, 
                    nome: user.nome, 
                    password: user.password, 
                    role: ''
                }
             })

             const {acessToken} = this.authservice.createToken(usercreate)
             return {status: true, data: null, datas: null, message: `usuario criado com sucesso`, token: acessToken}
        }catch(e){
            return{data: null, status: false, datas: null, message:`error ao criar usuario ${e}`, token: ''}
        } 
    
    }

    async loginUser(user: loginDTO):Promise<usertoken>{
        try{
            const isEmail = user.data.includes('@')
            let userLogin 
        
            if (isEmail){
                userLogin = await this.prismaservice.user.findFirst({
                    where: {gmail: user.data}
                })
            }else{
                userLogin = await this.prismaservice.user.findFirst({
                    where: {cpf: user.data}
                })
            }

            if (!userLogin) {
                return { status: false, data: null, datas: null, message: `Usuário Não encontrado`, token: '' };
            }

             if (!await bcrypt.compare(user.password, userLogin.password)){
                return{status: false, data: null, datas: null , message: 'senha incorreta', token: ''}
             }
           
            const {acessToken} = this.authservice.createToken(userLogin )

            return {status: true, data: null, datas: null, message: `Logado com sucesso`, token: acessToken}

        }catch(e){
            return{status:false, data: null, datas: null, message: 'error login', token: '' }
        }
    }

    async getUserById(id: number){
        try {
            const user = await this.prismaservice.user.findFirst({
                where: {id}
            })
            return user
        } catch (error) {
            throw new BadRequestException(`user not found ${error}`)
        }
    }
}