import { IUserRegData, IUserRecoveryData, IUserTestingProgress, IUserStudents, IChangeRoles, IChangeLectureStatus, IChangeAvailableCourses } from './users.types';
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
    changeRoles(body: IChangeRoles): Promise<any>;
    getAllUsernames(): Promise<any[]>;
    getUserMentors(body: any): Promise<any[]>;
    getUserData(body: any): Promise<any[]>;
    getCourses(body: any): Promise<{
        totalNumOfLectures: number;
        totalTime: number;
        courses: any[];
    }>;
    getTestingProgress(body: IUserTestingProgress): Promise<any>;
    getAllUsers(body: {
        email: string;
    }): Promise<any[]>;
    getUserAvailableCourses(body: any): Promise<any>;
    getUserCourseProgress(body: any): Promise<any>;
    changeUserMentors(body: any): Promise<any[]>;
    changeUserAvailableCourses(body: IChangeAvailableCourses): Promise<any>;
    changeUserLectureAvailable(body: IChangeLectureStatus): Promise<any>;
    changeUserLectureChecked(body: IChangeLectureStatus): Promise<any>;
    updateUserData(body: any): Promise<any[]>;
    updateUserEmail(body: any): Promise<any[]>;
    updateUserPassword(body: any): Promise<any[]>;
    recoveryPassword(body: IUserRecoveryData): Promise<any>;
    registrationUser(body: IUserRegData): Promise<any>;
    getUserStudents(body: IUserStudents): Promise<any[]>;
}
