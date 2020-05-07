import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {
    }

    @Post('auth')
    authenticationUser(@Body() body: IUserData) {
        return 'Auth! Login: ' + body.login + ' Password: ' + body.password;
    }

    @Post('reg')
    registrationUser(@Body() body: IUserRegData) {
        return 'Reg! Email: ' + body.email + ' Login: ' + body.login + ' Password: ' + body.password;
    }

    @Post('recovery')
    recoveryPassword(@Body() body: IUserRecoveryData) {
        return 'Recovery! Email: ' + body.email;
    }
}
