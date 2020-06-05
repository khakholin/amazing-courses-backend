import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IUserRegData } from 'src/users/users.types';

export type User = any;

@Injectable()
export class RegistrationService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async registrationUser(newUser: IUserRegData): Promise<any> {
        if (await this.userModel.findOne({ email: newUser.email.toLowerCase() })) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'EMAIL_DUPLICATE',
            }, HttpStatus.NOT_FOUND);
        } else {
            if (await this.userModel.findOne({ username: newUser.username })) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USER_DUPLICATE',
                }, HttpStatus.NOT_FOUND);
            } else {
                const createdUser = new this.userModel(newUser);
                createdUser.save();
                throw new HttpException({
                    status: HttpStatus.CREATED,
                    message: 'SUCCESS',
                }, HttpStatus.CREATED);
            }
        }
    }
}


