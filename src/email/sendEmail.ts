import * as nodemailer from 'nodemailer';
import { userList } from '../users/data/users.data';

export const sendEmail = async (email: string) => {
    const tempUserList = userList;
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
    } else {
        return false;
    }
};