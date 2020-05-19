import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { userList } from '../users/data/users.data';
import { IUserRegData } from 'src/users/users.types';
import { UserService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export type User = any;

@Injectable()
export class RegistrationService {
    constructor(@InjectModel('User') private userModel: Model<User>) { }

    async registrationUser(newUser: IUserRegData): Promise<any> {
        if (await this.userModel.findOne({ email: newUser.email })) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'EMAIL_DUPLICATE',
            }, HttpStatus.NOT_FOUND);
        } else {
            if (await this.userModel.findOne({ username: newUser.login })) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USER_DUPLICATE',
                }, HttpStatus.NOT_FOUND);
            } else {
                const createdUser = new this.userModel(newUser);
                return createdUser.save();
            }
        }
    }
}


