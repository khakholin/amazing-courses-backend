import { IUserRegData, IUserRecoveryData } from './users.types';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { RegistrationService } from 'src/registration/registration.service';
export declare class UserController {
    private authService;
    private registrationService;
    private coursesService;
    constructor(authService: AuthService, registrationService: RegistrationService, coursesService: CoursesService);
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
    registrationUser(body: IUserRegData): Promise<{
        message: string;
    }>;
}
