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
const nodemailer = require("nodemailer");
const common_1 = require("@nestjs/common");
let WelcomeService = class WelcomeService {
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
};
WelcomeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], WelcomeService);
exports.WelcomeService = WelcomeService;
//# sourceMappingURL=welcome.service.js.map