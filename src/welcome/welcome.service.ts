import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WelcomeService {
    constructor() {
    }

    async recovery(user) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mrnortian@gmail.com',
                pass: 'Thenortian2015'
            }
        });

        transporter.sendMail({
            from: '"Amazing Courses" <foo@mail.ru>',
            to: 'khakholin@mail.ru',
            subject: 'Новый пользователь!',
            html: `<b>Зарегистрирован новый пользователь:</b> ${user.city, user.schoolType, user.schoolNumber, user.email}`,
        });
        return true;
    }
}