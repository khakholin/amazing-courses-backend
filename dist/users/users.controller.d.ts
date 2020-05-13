import { UserService } from './users.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './users.types';
import { AuthService } from 'src/auth/auth.service';
import { CoursesService } from 'src/courses/courses.service';
export declare class UserController {
    private authService;
    private usersService;
    private coursesService;
    constructor(authService: AuthService, usersService: UserService, coursesService: CoursesService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    getCourses(req: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        data: any[];
    }>;
    authenticationUser(body: IUserData): Promise<IUserRegData>;
    recoveryPassword(body: IUserRecoveryData): Promise<IUserRegData>;
    asyncregistrationUser(body: IUserRegData): void;
}
