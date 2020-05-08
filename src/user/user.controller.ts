import { Body, Controller, Param, Post, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {
    }

    @Post('auth')
    async authenticationUser(@Body() body: IUserData): Promise<IUserRegData> {
        return this.usersService.authenticationUser(body);
    }

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData): Promise<IUserRegData> {
        return this.usersService.recoveryPassword(body);
    }

    @Post('reg')
    asyncregistrationUser(@Body() body: IUserRegData) {
        this.usersService.registrationUser(body);
    }

}
