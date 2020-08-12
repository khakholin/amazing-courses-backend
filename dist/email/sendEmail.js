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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SendMail = class SendMail {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async recovery(email) {
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
        }
        else {
            return false;
        }
    }
};
SendMail = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SendMail);
exports.SendMail = SendMail;
//# sourceMappingURL=sendEmail.js.map