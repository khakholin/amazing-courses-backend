import { Model } from 'mongoose';
export declare type User = any;
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(role: string): Promise<any[]>;
    getUserData(data: any): Promise<any[]>;
    updateUserData(data: any): Promise<any[]>;
    updateUserEmail(data: any): Promise<any[]>;
    updateUserPassword(data: any): Promise<any[]>;
}
