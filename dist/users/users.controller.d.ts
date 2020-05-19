import { IUserRegData, IUserRecoveryData } from './users.types';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
export declare class UserController {
    private authService;
    private coursesService;
    private registrationService;
    private sendMail;
    constructor(authService: AuthService, coursesService: CoursesService, registrationService: RegistrationService, sendMail: SendMail);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getCourses(req: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        data: any[];
    }>;
    recoveryPassword(body: IUserRecoveryData): Promise<boolean>;
    registrationUser(body: IUserRegData): Promise<any>;
}
