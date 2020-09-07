import { Model } from 'mongoose';
import { IUserStudents } from './users.types';
export declare type User = any;
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsernames(): Promise<any[]>;
    getUserMentors(data: any): Promise<any[]>;
    getAllUsers(roles: string[]): Promise<any[]>;
    getUserData(data: any): Promise<any[]>;
    changeUserMentors(data: any): Promise<any[]>;
    getUserStudents(data: IUserStudents): Promise<any[]>;
    updateUserData(data: any): Promise<any[]>;
    updateUserEmail(data: any): Promise<any[]>;
    updateUserPassword(data: any): Promise<any[]>;
}
