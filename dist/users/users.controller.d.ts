import { IUserRegData, IUserRecoveryData } from './users.types';
import { AuthService } from 'src/auth/auth.service';
import { CourseService } from 'src/course/course.service';
import { SendMail } from 'src/email/sendEmail';
import { RegistrationService } from 'src/registration/registration.service';
import { UserService } from './users.service';
export declare class UserController {
    private authService;
    private coursesService;
    private registrationService;
    private sendMail;
    private userService;
    constructor(authService: AuthService, coursesService: CourseService, registrationService: RegistrationService, sendMail: SendMail, userService: UserService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getCourses(req: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        data: any[];
    }>;
    getAllUsers(req: any): Promise<any[]>;
    recoveryPassword(body: IUserRecoveryData): Promise<boolean>;
    registrationUser(body: IUserRegData): Promise<any>;
}
