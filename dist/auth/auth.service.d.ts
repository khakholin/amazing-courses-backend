import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
export declare type User = any;
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
