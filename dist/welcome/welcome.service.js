"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let WelcomeService = class WelcomeService {
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
};
WelcomeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WelcomeService);
exports.WelcomeService = WelcomeService;
//# sourceMappingURL=welcome.service.js.map