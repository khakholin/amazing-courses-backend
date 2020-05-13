import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';

import { UserService } from './users.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './users.types';
import e = require('express');
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private authService: AuthService,
        private usersService: UserService) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
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
