import { Body, Controller, Post, Get, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';

import { IUserRegData, IUserRecoveryData } from './users.types';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
    constructor(
        private authService: AuthService,
        private coursesService: CoursesService,
        private registrationService: RegistrationService,
        private usersService: UserService,
        private sendMail: SendMail,
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
        return this.sendMail.recovery(body.email);
    }

    @Post('registration')
    async registrationUser(@Body() body: IUserRegData) {
        return this.registrationService.registrationUser(body);
    }



    @Post('testcreate')
    async testCreat(@Body() body: IUserRegData) {
        return this.usersService.create({ email: body.email, username: body.username, password: body.password, availableCourses: [] });
    }

    @Post('testfind')
    async testFind(@Body() body: IUserRegData) {
        return this.usersService.findUser({ email: body.email, username: body.username, password: body.password });
    }

    @Post('testremove')
    async testRemove(@Body() body: IUserRegData) {
        return this.usersService.remove({ email: body.email, username: body.username, password: body.password, });
    }

    @Get('testfindall')
    async testFindAll() {
        return this.usersService.findAll();
    }

    @Get('testremoveall')
    async testRemoveAll() {
        return this.usersService.removeAll();
    }


}
