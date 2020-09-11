import { Model } from 'mongoose';
import { IUserStudents, IChangeRoles } from './users.types';
export declare type User = any;
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsernames(): Promise<any[]>;
    changeRoles(data: IChangeRoles): Promise<any>;
    getUserMentors(data: any): Promise<any[]>;
    getAllUsers(data: {
        email: string;
    }): Promise<any[]>;
    getUserData(data: any): Promise<any[]>;
    changeUserMentors(data: any): Promise<any[]>;
    getUserStudents(data: IUserStudents): Promise<any[]>;
    updateUserData(data: any): Promise<any[]>;
    updateUserEmail(data: any): Promise<any[]>;
    updateUserPassword(data: any): Promise<any[]>;
}
