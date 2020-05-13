"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const users_data_1 = require("../users/data/users.data");
exports.sendEmail = async (email) => {
    const tempUserList = users_data_1.userList;
    const user = tempUserList.find((item) => item.email === email);
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
    }
    else {
        return false;
    }
};
//# sourceMappingURL=sendEmail.js.map