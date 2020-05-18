import { Injectable } from '@nestjs/common';
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

    async findOne(username: string): Promise<User | undefined> {
        return this.testUsers.find(user => user.username === username);
    }

    async findEmailDuplicate(email: string): Promise<User | undefined> {
        return this.testUsers.find(user => user.email === email);
    }

    async create(createUserDto: any): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
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


