import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';

import { IUserRegData, IUserRecoveryData } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { sendEmail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private registrationService: RegistrationService,
        private coursesService: CoursesService,
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

    @Post('recovery')
    async recoveryPassword(@Body() body: IUserRecoveryData) {
        return sendEmail(body.email);
    }

    @Post('registration')
    async registrationUser(@Body() body: IUserRegData) {
        return this.registrationService.registrationUser(body);
    }

}
