import { Injectable } from '@nestjs/common';
import { IUserRegData } from './users.types';
import { userList } from './data/users.data';

export type User = any;
@Injectable()
export class UserService {
    private readonly testUsers: User[];

    constructor() {
        this.testUsers = userList;
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.testUsers.find(user => user.username === username);
    }

    async findEmailDuplicate(email: string): Promise<User | undefined> {
        return this.testUsers.find(user => user.email === email);
    }
}


