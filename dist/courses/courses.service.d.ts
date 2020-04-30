import { IUserInformation, IUserData } from './courses.types';
export declare class CoursesService {
    private users;
    getUserCourses(user: IUserInformation): IUserData;
}
