import { IUserRegData, IUserData, IUserRecoveryData } from './users.types';
export declare type User = any;
export declare class UserService {
    private readonly testUsers;
    constructor();
    authenticationUser(potentialUser: IUserData): any;
    recoveryPassword(recoveryData: IUserRecoveryData): any;
    registrationUser(newUser: IUserRegData): void;
    findOne(username: string): Promise<User | undefined>;
}
