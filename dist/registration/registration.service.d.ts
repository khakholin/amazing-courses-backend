import { IUserRegData } from 'src/users/users.types';
import { UserService } from 'src/users/users.service';
export declare type User = any;
export declare class RegistrationService {
    private userService;
    private readonly testUsers;
    constructor(userService: UserService);
    registrationUser(newUser: IUserRegData): {
        message: string;
    };
}
