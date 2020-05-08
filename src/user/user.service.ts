import { Injectable } from '@nestjs/common';
import { IUserRegData, IUserData, IUserRecoveryData } from './user.types';


@Injectable()
export class UserService {
    private users: IUserRegData[] = [
        { email: 'admin@admin.ru', login: 'admin', password: 'admin' },
        { email: 'khakholin@mail.ru', login: 'Alexander', password: '123456' },
        { email: 'fatykhov@google.com', login: 'Timur', password: '654321' },
    ]

    authenticationUser(potentialUser: IUserData) {
        return this.users.find((user: IUserRegData) => ((user.login === potentialUser.login) && (user.password === potentialUser.password)));
    }

    recoveryPassword(recoveryData: IUserRecoveryData) {
        return this.users.find((user: IUserRegData) => user.email === recoveryData.email);
    }

    registrationUser(newUser: IUserRegData) {
        this.users.push(newUser);
    }
}


