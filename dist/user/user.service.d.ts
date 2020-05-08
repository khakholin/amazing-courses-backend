import { IUserRegData, IUserData, IUserRecoveryData } from './user.types';
export declare class UserService {
    private users;
    authenticationUser(potentialUser: IUserData): IUserRegData;
    recoveryPassword(recoveryData: IUserRecoveryData): IUserRegData;
    registrationUser(newUser: IUserRegData): void;
}
