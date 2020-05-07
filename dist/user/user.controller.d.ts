import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    authenticationUser(body: IUserData): string;
    registrationUser(body: IUserRegData): string;
    recoveryPassword(body: IUserRecoveryData): string;
}
