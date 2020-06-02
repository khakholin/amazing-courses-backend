import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request, Param, Res, Header } from '@nestjs/common';

import { IUserRegData, IUserRecoveryData } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
import { join } from 'path';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private coursesService: CourseService,
        private registrationService: RegistrationService,
        private sendMail: SendMail,
        private userService: UserService,
    ) { }

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

    @UseGuards(JwtAuthGuard)
    @Post('courses')
    async getCourses(@Request() req) {
        return this.coursesService.getUserCourses(req.user.availableCourses);
    }

    @UseGuards(JwtAuthGuard)
    @Get('list')
    getAllUsers(@Request() req) {
        return this.userService.getAllUsers(req.user.role);
    }

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData) {
        return this.sendMail.recovery(body.email);
    }

    @Post('registration')
    async registrationUser(@Body() body: IUserRegData) {
        return this.registrationService.registrationUser(body);
    }
}
