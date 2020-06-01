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
}


