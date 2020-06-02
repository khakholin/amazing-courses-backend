import { Model } from 'mongoose';
export declare type User = any;
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    getAllUsers(role: string): Promise<any[]>;
}
