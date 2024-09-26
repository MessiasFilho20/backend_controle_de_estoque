import { BadRequestException, Injectable } from "@nestjs/common";
import { prismaService } from "src/prisma/prisma.service";
import { userDto } from "./userDTO/user-DTO";
import { loginDTO } from "./userDTO/auth-login-DTO";
import { authService } from "src/Auth/auth.service";
import * as bcrypt from 'bcrypt';
import { userUpdate } from "./userDTO/update-DTO";

export interface userInterface {
    data: {} | null, 
    message: string, 
    status: boolean, 
    datas : any[] | null
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
                    role: 'users'
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
            } else{
            
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

    async getUserById(id: number):Promise <userInterface>{
        try {
            const user = await this.prismaservice.user.findFirst({
                where: {id}
            })
            if (!user) return {status: false, data: null,datas: null,message: 'usuario não encontrado'}
            
            return {status: true, data: user, datas:null, message: ''}
        } catch (error) {
            return {status: false , data : null , datas: null,message: `error ${error}`}
        }
    }

    async getAllUsers():Promise<userInterface>{
        try {
            const users = await this.prismaservice.user.findMany()
            // if (!user) return {status: false, data: null,datas: null,message: 'usuario não encontrado'}


            
            return {status: true, data: null, datas:users, message: ''}
        } catch (error) {
            return {status: false , data : null , datas: null,message: `error ${error}`}
        }
    }

    async updateUser(user: userUpdate, id: number  ): Promise <userInterface>{
        try{
            const userid = await this.prismaservice.user.findFirst(
                {where: {id}}
            )
            if (!userid){
                return {data: null, datas: null, status: false, message: 'user não encontrado'}
            }

            const updated = await this.prismaservice.user.update({
                where: {id}, 
                data:{
                    gmail: user.gmail,
                    cpf: user.cpf,
                    nome: user.nome, 
                    role: user.role
                }
            })
            return {data: updated, datas: null, status: true, message: 'Usuario atualizado com sucesso '}

        }catch(error ){
            return {data: null, datas: null, status: false, message: `erro prisma data bese ${error}`}

        }
    }

    async DeleteUserById(id: number):Promise <userInterface>{
        try {
            const user = await this.prismaservice.user.delete({
                where: {id}
            })
            if (!user) return {status: false, data: null,datas: null,message: 'usuario não encontrado'}

            return {status: true, data: user, datas:null, message: 'usuario deletado'}
        } catch (error) {
            return {status: false , data : null , datas: null,message: `error ${error}`}
        }
    }

    
}