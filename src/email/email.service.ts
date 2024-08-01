import { Injectable } from "@nestjs/common";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

@Injectable()
export class emailService {
    private emailSend : MailerSend
    constructor(){
        this.emailSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY
        })
    }


    async sendLowStockAlert(itemname: string, quan: number){
        const sendFrom = new Sender('trial-pq3enl6er2842vwr.mlsender.net','messias')
        const recipients = [new Recipient('messiassantiago18@gmail.com','messias santiago')]

        const emailParams = new EmailParams()
            .setFrom(sendFrom)
            .setTo(recipients)
            .setSubject('Alerta de baixo estoque')
            .setHtml('<h1>Alerta de Baixo Estoque</h1><p>O item ${itemName} está com baixo estoque. Restam apenas ${quantity} unidades.</p>')
            .setText('O item ${itemName} está com baixo estoque. Restam apenas ${quan} unidades.')
  
        try{
            const response = await this.emailSend.email.send(emailParams)
            console.log(response);
            
        }catch(error){
            console.log(error);
            
        }

        }
}