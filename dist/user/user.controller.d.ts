import { UserService } from './user.service';
import { IUserData, IUserRegData, IUserRecoveryData } from './user.types';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UserService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    authenticationUser(body: IUserData): Promise<IUserRegData>;
    recoveryPassword(body: IUserRecoveryData): Promise<IUserRegData>;
    asyncregistrationUser(body: IUserRegData): void;
}
