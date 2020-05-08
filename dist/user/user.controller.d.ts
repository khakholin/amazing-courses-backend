import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    authenticationUser(body: IUserData): Promise<IUserRegData>;
    recoveryPassword(body: IUserRecoveryData): Promise<IUserRegData>;
    asyncregistrationUser(body: IUserRegData): void;
}
