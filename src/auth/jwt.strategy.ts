import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        return {
            availableCourses: payload.availableCourses,
            email: payload.email,
            roles: payload.roles,
            _id: payload.sub,
            courseProgress: payload.courseProgress,
            mentors: payload.mentors,
            realName: payload.realName,
            realSurname: payload.realSurname,
            school: payload.school,
            university: payload.university,
            workPlace: payload.workPlace,
        };
    }
}