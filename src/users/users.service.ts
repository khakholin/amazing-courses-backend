import { Injectable } from '@nestjs/common';
import { IUserRegData, IUserData, IUserRecoveryData } from './users.types';
import { userList } from './data/users.data';

export type User = any;
@Injectable()
export class UserService {
    private readonly testUsers: User[];

    constructor() {
        this.testUsers = userList;
    }

    authenticationUser(potentialUser: IUserData) {
        return this.testUsers.find((user: IUserRegData) => ((user.login === potentialUser.login) && (user.password === potentialUser.password)));
    }

    recoveryPassword(recoveryData: IUserRecoveryData) {
        return this.testUsers.find((user: IUserRegData) => user.email === recoveryData.email);
    }

    registrationUser(newUser: IUserRegData) {
        this.testUsers.push(newUser);
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.testUsers.find(user => user.username === username);
    }
}


