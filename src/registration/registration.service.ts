import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

    async registrationUser(newUser: IUserRegData): Promise<any> {
        if (await this.userService.findEmailDuplicate(newUser.email)) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'EMAIL_DUPLICATE',
            }, HttpStatus.NOT_FOUND);
        } else {
            if (await this.userService.findOne(newUser.login)) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    message: 'USER_DUPLICATE',
                }, HttpStatus.NOT_FOUND);
            } else {
                this.testUsers.push({ email: newUser.email, username: newUser.login, password: newUser.password, userId: this.testUsers.length + 1, availableCourses: [] });
                throw new HttpException({
                    status: HttpStatus.CREATED,
                    message: 'SUCCESS',
                }, HttpStatus.CREATED);
            }
        }
    }
}


