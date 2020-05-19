import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { userList } from './data/users.data';
export type User = any;

@Injectable()
export class UserService {
    private readonly testUsers: User[];

    constructor(@InjectModel('User') private userModel: Model<User>) {
        this.testUsers = userList;
    }

    async findUser(userDto: any): Promise<User> {
        if (await this.userModel.findOne(userDto)) {
            return this.userModel.findOne(userDto)
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'USER_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async create(createUserDto: any): Promise<User> {
        if (await this.userModel.findOne(createUserDto)) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: 'USER_DUPLICATE',
            }, HttpStatus.FORBIDDEN);
        } else {
            const createdUser = new this.userModel(createUserDto);
            return createdUser.save();
        }
    }

    async remove(removeUserDto: any): Promise<User> {
        return this.userModel.deleteOne(removeUserDto);
    }

    async removeAll(): Promise<User> {
        return this.userModel.deleteMany({});
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}


