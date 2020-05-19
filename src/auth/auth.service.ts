import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
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

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userModel.findOne({ username });

        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, email: user.email, availableCourses: user.availableCourses, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}