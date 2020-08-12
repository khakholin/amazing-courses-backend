import * as nodemailer from 'nodemailer';
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
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                host: "smtp-mail.outlook.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'amazing-courses@outlook.com',
                    pass: 'Thenortian2015'
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            });
            let result = await transporter.sendMail({
                from: 'Amazing Courses<amazing-courses@outlook.com>',
                to: email,
                subject: 'Восстановление пароля',
                html: `<b>Ваш пароль:</b> ${user.password}`,
            });
            return result;
        } else {
            return false;
        }
    }
}