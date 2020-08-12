import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WelcomeService {
    constructor() {
    }

    async registration(user) {
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
            to: 'amazing-courses@outlook.com',
            subject: 'Новый пользователь!',
            html: `<div style="font-family: Arial, Helvetica, sans-serif; color: #ffffff; text-shadow: 1px 1px 2px black;">
            <div
                style="padding: 20px 0; box-sizing: border-box; width: 400px; background: linear-gradient(-45deg, #34254b, #1c1e37); border-radius: 5px; display: flex; flex-direction: column; align-items: center;">
                <div
                    style="box-sizing: border-box; margin-bottom: 20px; text-align: center;  text-transform: uppercase; font-weight: 700;  font-size: 22px;">
                    Зарегистрирован новый пользователь!</div>
                <div style="box-sizing: border-box; width: 100%; padding: 0 20px; display: flex; flex-direction: column;">
                    <span style="margin-bottom: 5px;">Город: ${user.city}</span>
                    <span style="margin-bottom: 5px;">Школа: ${user.schoolType} №${user.schoolNumber}</span>
                    <span style="margin-bottom: 5px;">Email: ${user.email}</span>
                </div>
            </div>
        </div>`,
        });
        return result;
    }
}