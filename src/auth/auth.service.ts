import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel('User') private userModel: Model<User>
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({ email, password });
        if (user) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            courseProgress: user.courseProgress,
            realName: user.realName,
            realSurname: user.realSurname,
            school: user.school,
            university: user.university,
            workPlace: user.workPlace,
            availableCourses: user.availableCourses,
            mentors: user.mentors,
            email: user.email,
            roles: user.roles,
            sub: user._id,
            username: user.username,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}