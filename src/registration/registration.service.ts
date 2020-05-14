import { Injectable } from '@nestjs/common';
import { userList } from '../users/data/users.data';
import { IUserRegData } from 'src/users/users.types';
import { UserService } from 'src/users/users.service';

export type User = any;

@Injectable()
export class RegistrationService {
    private readonly testUsers: User[];

    constructor(private userService: UserService) {
        this.testUsers = userList;
    }

    registrationUser(newUser: IUserRegData) {
        if (this.userService.findEmailDuplicate) {
            return { message: 'EMAIL_DUPLICATE' };
        } else {
            if (this.userService.findOne) {
                return { message: 'USER_DUPLICATE' };
            } else {
                this.testUsers.push({ email: newUser.email, username: newUser.login, password: newUser.password, userId: this.testUsers.length + 1, availableCourses: [] });
                return { message: 'SUCCESS' };
            }
        }
    }
}


