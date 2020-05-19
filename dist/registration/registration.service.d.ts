import { Model } from 'mongoose';
import { IUserRegData } from 'src/users/users.types';
export declare type User = any;
export declare class RegistrationService {
    private userModel;
    constructor(userModel: Model<User>);
    registrationUser(newUser: IUserRegData): Promise<any>;
}
