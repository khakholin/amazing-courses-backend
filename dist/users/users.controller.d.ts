import { IUserRegData, IUserRecoveryData } from './users.types';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
import { RegistrationService } from 'src/registration/registration.service';
import { UserService } from './users.service';
export declare class UserController {
    private authService;
    private coursesService;
    private registrationService;
    private usersService;
    constructor(authService: AuthService, coursesService: CoursesService, registrationService: RegistrationService, usersService: UserService);
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
    testCreat(body: IUserRegData): Promise<any>;
    testRemove(body: IUserRegData): Promise<any>;
    testFindAll(): Promise<any[]>;
    testRemoveAll(): Promise<any>;
}
