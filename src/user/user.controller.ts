import { Body, Controller, Param, Post, Get, HttpException, HttpStatus } from '@nestjs/common';

import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';
import e = require('express');

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {
    }

    @Post('auth')
    async authenticationUser(@Body() body: IUserData): Promise<IUserRegData> {
        const response = this.usersService.authenticationUser(body);
        if (response) {
            return response;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'INVALID_USER'
            }, HttpStatus.NOT_FOUND);
        }
    }

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData): Promise<IUserRegData> {
        const response = this.usersService.recoveryPassword(body);
        if (response) {
            return response;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'INVALID_EMAIL'
            }, HttpStatus.NOT_FOUND);
        }
    }

    @Post('reg')
    asyncregistrationUser(@Body() body: IUserRegData) {
        this.usersService.registrationUser(body);
    }

}
