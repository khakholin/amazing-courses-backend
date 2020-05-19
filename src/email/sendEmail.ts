import * as nodemailer from 'nodemailer';
import { userList } from '../users/data/users.data';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type User = any;
@Injectable()
export class SendMail {
    constructor(@InjectModel('User') private userModel: Model<User>) {
    }

    async recovery(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mrnortian@gmail.com',
                    pass: 'Thenortian2015'
                }
            });

            transporter.sendMail({
                from: '"Amazing Courses" <foo@mail.ru>',
                to: email,
                subject: 'Восстановление пароля',
                html: `<b>Ваш пароль:</b> ${user.password}`,
            });
            return true;
        } else {
            return false;
        }
    }
}