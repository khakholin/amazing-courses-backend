import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type User = any;
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {
    }

    async getAllUsers(role: string): Promise<any[]> {
        if (role === 'admin') {
            return await this.userModel.find();
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'ACCESS_IS_DENIED',
            }, HttpStatus.FORBIDDEN);
        }
    }

    async getUserData(data): Promise<any[]> {
        return await this.userModel.findOne({ username: data.username });
    }

    async updateUserData(data): Promise<any[]> {
        const user = await this.userModel.findOne({ username: data.oldUserName });
        if (user) {
            user.realName = data.realName;
            user.realSurname = data.realSurname;
            user.school = data.school;
            user.university = data.university;
            user.username = data.newUserName;
            user.workPlace = data.workPlace;
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_DATA_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async updateUserEmail(data): Promise<any[]> {
        const user = await this.userModel.findOne({ username: data.username, password: data.password });
        if (user) {
            user.email = data.newEmail;
            await user.save();
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'USER_EMAIL_SUCCESSFULLY_UPDATED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'WRONG_PASSWORD',
            }, HttpStatus.FORBIDDEN);
        }
    }
}


