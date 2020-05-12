import { IUserRegData, IUserData, IUserRecoveryData } from './user.types';
export declare type User = any;
export declare class UserService {
    private readonly testUsers;
    constructor();
    private users;
    authenticationUser(potentialUser: IUserData): IUserRegData;
    recoveryPassword(recoveryData: IUserRecoveryData): IUserRegData;
    registrationUser(newUser: IUserRegData): void;
    findOne(username: string): Promise<User | undefined>;
}
