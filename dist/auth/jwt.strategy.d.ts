import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        availableCourses: any;
        email: any;
        roles: any;
        username: any;
        _id: any;
        courseProgress: any;
        mentors: any;
        realName: any;
        realSurname: any;
        school: any;
        university: any;
        workPlace: any;
    }>;
}
export {};
